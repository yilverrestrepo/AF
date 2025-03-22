// This file provides fallback values for environment variables
// during development to avoid disrupting the workflow

export const env = {
  // Authentication
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "sample-google-client-id-123456789.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "sample-google-client-secret-GOCSPX-123456789",
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID || "sample-facebook-client-id-123456789",
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET || "sample-facebook-client-secret-123456789",
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "sample-nextauth-secret-very-long-and-secure-string-123456789",
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",

  // Database
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/fincos",

  // Payment Gateway
  STRIPE_SECRET_KEY:
    process.env.STRIPE_SECRET_KEY || "sk_test_sample51234567890123456789012345678901234567890123456789",
  STRIPE_WEBHOOK_SECRET:
    process.env.STRIPE_WEBHOOK_SECRET || "whsec_sample1234567890123456789012345678901234567890123456789",
  STRIPE_PUBLIC_KEY:
    process.env.STRIPE_PUBLIC_KEY || "pk_test_sample51234567890123456789012345678901234567890123456789",

  // Maps
  MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN || "pk.sample1234567890123456789012345678901234567890123456789",

  // Image Storage
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "sample-cloud-name",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "123456789012345",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "sample-api-secret-1234567890",

  // Real-time Notifications
  PUSHER_APP_ID: process.env.PUSHER_APP_ID || "1234567",
  PUSHER_KEY: process.env.PUSHER_KEY || "sample-pusher-key-1234567890",
  PUSHER_SECRET: process.env.PUSHER_SECRET || "sample-pusher-secret-1234567890",
  PUSHER_CLUSTER: process.env.PUSHER_CLUSTER || "eu",
}

