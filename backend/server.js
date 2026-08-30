import express from "express"
import app from "./src/app.js"
const PORT=3000;

app.listen(PORT,() => { 
    console.log(`backend server is running on port ${PORT}`); 
 })