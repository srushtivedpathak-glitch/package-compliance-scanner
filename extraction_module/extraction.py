import io
import os
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from google import genai
from google.genai import types
from PIL import Image
from pydantic import BaseModel, Field

# Load environment variables
load_dotenv()

# Initialize Gemini client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


# ------------------------------------------------------------------
# 1. Base Extraction Wrapper (No `default` values in Field)
# ------------------------------------------------------------------
class StringField(BaseModel):
    detected: bool = Field(
        description="True if the field is visually present on the packaging."
    )
    confidence: float = Field(
        description="Confidence score from 0.0 to 1.0 regarding extraction accuracy."
    )
    raw_text: Optional[str] = Field(
        description="Exact raw text visible on the package, or empty if missing."
    )


class NetQuantityDetail(BaseModel):
    detected: bool = Field(description="True if net quantity is detected.")
    confidence: float = Field(description="Confidence score between 0.0 and 1.0.")
    raw_text: Optional[str] = Field(description="Exact net quantity string (e.g., '500 g', '1 L').")
    value: Optional[float] = Field(description="Parsed numeric value (e.g., 500.0).")
    unit: Optional[str] = Field(description="Standardized unit (e.g., 'g', 'kg', 'ml', 'l', 'm', 'pcs').")
    category: Optional[str] = Field(description="Category of unit (weight, volume, length, area, number).")


class PricingDetail(BaseModel):
    detected: bool = Field(description="True if price is detected.")
    confidence: float = Field(description="Confidence score between 0.0 and 1.0.")
    raw_text: Optional[str] = Field(description="Exact raw MRP declaration string.")
    numeric_mrp: Optional[float] = Field(description="Parsed maximum retail price in INR.")
    currency: Optional[str] = Field(description="Currency code (e.g., INR).")
    includes_all_taxes_statement: bool = Field(
        description="True if explicit text like 'incl. of all taxes' is present."
    )
    unit_sale_price_raw: Optional[str] = Field(
        description="Raw Unit Sale Price (USP) string if printed (e.g., '₹0.50 per g')."
    )


class DateDetail(BaseModel):
    detected: bool = Field(description="True if date is detected.")
    confidence: float = Field(description="Confidence score between 0.0 and 1.0.")
    raw_text: Optional[str] = Field(description="Exact date declaration string (e.g., 'Pkd: 05/2025').")
    month: Optional[int] = Field(description="Parsed numerical month (1-12).")
    year: Optional[int] = Field(description="Parsed 4-digit year (e.g., 2025).")


class EntityDetail(BaseModel):
    detected: bool = Field(description="True if entity details are present.")
    confidence: float = Field(description="Confidence score between 0.0 and 1.0.")
    name: Optional[str] = Field(description="Name of the company/business.")
    address: Optional[str] = Field(description="Complete address details.")
    pincode: Optional[str] = Field(description="6-digit PIN code if available.")


class ConsumerCareDetail(BaseModel):
    name_or_designation: StringField = Field(description="Name or designation for customer care.")
    address: StringField = Field(description="Postal address for customer complaints.")
    phone: StringField = Field(description="Customer care contact phone number.")
    email: StringField = Field(description="Customer care contact email address.")


# ------------------------------------------------------------------
# 2. Master Metrology Data Schema
# ------------------------------------------------------------------
class LegalMetrologyData(BaseModel):
    product_name: StringField = Field(description="Generic or common name of the commodity.")
    net_quantity: NetQuantityDetail = Field(description="Parsed Net Quantity attributes.")
    mrp_details: PricingDetail = Field(description="Parsed MRP and tax inclusive attributes.")
    date_of_manufacture_or_pack: DateDetail = Field(description="Month and Year of manufacture/pack.")
    country_of_origin: StringField = Field(description="Country of origin declaration.")

    manufacturer: EntityDetail = Field(description="Name and address of Manufacturer.")
    packer: EntityDetail = Field(description="Name and address of Packer (if distinct).")
    importer: EntityDetail = Field(description="Name and address of Importer (if imported).")

    consumer_care: ConsumerCareDetail = Field(description="Consumer care grievance details.")


# ------------------------------------------------------------------
# 3. FastAPI Endpoint
# ------------------------------------------------------------------
app = FastAPI(
    title="Legal Metrology Compliance Extraction API",
    description="API that receives an image and extracts structured packaging fields for compliance checking.",
    version="2.0.0",
)


@app.post("/extract", response_model=LegalMetrologyData)
async def extract_information(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No image was uploaded")

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Please upload a valid image file")

    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))
        image.load()
    except Exception:
        raise HTTPException(status_code=400, detail="Could not read the uploaded image")

    try:
        # Request content generation with structured output
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=[
                image,
                """
                Analyze this product package image and extract compliance information 
                according to Legal Metrology (Packaged Commodities) Rules, 2011:
                - Extract product name, net quantity, MRP, manufacturing date, and country of origin.
                - Extract details for manufacturer, packer, importer, and consumer care channels.
                - For each section, mark 'detected' as true or false.
                """,
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=LegalMetrologyData,
                temperature=0.0,
            ),
        )

        return LegalMetrologyData.model_validate_json(response.text)

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error while processing image: {str(e)}"
        )


@app.get("/")
def root():
    return {"message": "Image Extraction API is running"}