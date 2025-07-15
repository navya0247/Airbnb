import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

const uploadOnCloudinary = async (filepath) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        if (!filepath) {
            return null;
        }

        const uploadResult = await cloudinary.uploader.upload(filepath);
        

        // Safely delete the file if it exists
        // if (fs.existsSync(filepath)) {
        //     fs.unlinkSync(filepath);
        // }

        return uploadResult.secure_url;

    } catch (error) {
        // Avoid trying to delete a non-existent file again
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};

export default uploadOnCloudinary;
