import { env } from "@/lib/env"

export const cloudinaryConfig = {
  cloudName: env.CLOUDINARY_CLOUD_NAME,
  apiKey: env.CLOUDINARY_API_KEY,
  apiSecret: env.CLOUDINARY_API_SECRET,
}

export const getCloudinaryUploadSignature = () => {
  // In a real app, this would generate a signature for secure uploads
  // For development, we'll return a mock signature
  return {
    signature: "sample-signature-1234567890",
    timestamp: Math.floor(Date.now() / 1000),
  }
}

export const getCloudinaryUrl = (publicId: string, transformations = "") => {
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformations}/${publicId}`
}

