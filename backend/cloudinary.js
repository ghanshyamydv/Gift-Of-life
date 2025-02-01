import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config(
    {
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.CLOUD_API_KEY,
        api_secret:process.env.CLOUD_API_SECRET
    }
)

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "Gift_Of_Life", // Folder name in Cloudinary
    format: file.mimetype.split("/")[1], // Get file format dynamically
    allowed_formats: ["png", "jpeg", "jpg"], // Allowed formats
  }),
  });

export { 
    cloudinary,
    storage
}