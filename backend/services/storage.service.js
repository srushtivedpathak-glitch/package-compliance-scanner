import { ImageKit } from "@imagekit/nodejs";
import "dotenv/config"

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATEKEY
})

async function uploadFile(buffer) {
    const response = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName: 'file-name.jpg',
    });
    return response;
}

export default uploadFile;
