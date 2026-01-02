# Setup Guide for ESMS

This guide will help you set up the ESMS e-learning app with Convex and UploadThing.

## Prerequisites

1. **Bun** - [Install Bun](https://bun.sh) (Bun is a fast all-in-one JavaScript runtime)
2. **Convex Account** - Sign up at [convex.dev](https://convex.dev)
3. **UploadThing Account** - Sign up at [uploadthing.com](https://uploadthing.com)

## Step 1: Install Dependencies

```bash
bun install
```

## Step 2: Set Up Convex

1. **Initialize Convex** (Bun will automatically install convex if needed):
```bash
bunx convex dev
```

This will:
- Create a `convex` folder (if it doesn't exist)
- Guide you through authentication
- Create a deployment URL
- Start the Convex development server

3. **Get your Convex deployment URL** from the terminal output or your Convex dashboard.

## Step 3: Set Up UploadThing

1. **Create an UploadThing account** at [uploadthing.com](https://uploadthing.com)

2. **Create a new app** in your UploadThing dashboard

3. **Get your API key** from the UploadThing dashboard

4. **Set up your UploadThing endpoint** (you'll need to create a server endpoint, but for React Native, we use the direct API)

## Step 4: Configure Environment Variables

1. **Create a `.env` file** in the root directory:

```env
# Environment: development, test, or production
EXPO_PUBLIC_ENV=development

# Convex URLs (get these from your Convex dashboard)
EXPO_PUBLIC_CONVEX_URL_DEV=https://your-dev-deployment.convex.cloud
EXPO_PUBLIC_CONVEX_URL_TEST=https://your-test-deployment.convex.cloud
EXPO_PUBLIC_CONVEX_URL_PROD=https://your-prod-deployment.convex.cloud

# UploadThing Configuration
EXPO_PUBLIC_UPLOADTHING_URL=https://your-app.uploadthing.com
EXPO_PUBLIC_UPLOADTHING_KEY=your-uploadthing-key
```

2. **Replace the placeholder values** with your actual URLs and keys.

## Step 5: Deploy Convex Schema

The schema is already defined in `convex/schema.ts`. When you run `bunx convex dev`, it will automatically deploy the schema.

To manually deploy:
```bash
bunx convex deploy
```

## Step 6: Run the App

### Development Mode
```bash
bun run start:dev
```

### Test Mode
```bash
bun run start:test
```

### Production Mode
```bash
bun run start:prod
```

### Standard Start
```bash
bun start
```

## Step 7: Create Your First User

1. Open the app
2. Navigate to the Sign Up screen
3. Create an account
4. The user will be automatically created in Convex

## Step 8: Create Your First Course (Optional)

You can create courses through the app UI (if you implement an admin/instructor interface) or directly through Convex dashboard:

1. Go to your Convex dashboard
2. Navigate to the `courses` table
3. Insert a new course document

Example course:
```json
{
  "name": "Introduction to JavaScript",
  "description": "Learn the basics of JavaScript programming",
  "category": "General",
  "color": "#007BFF",
  "isPublished": true,
  "createdAt": 1234567890,
  "updatedAt": 1234567890,
  "enrolledStudents": []
}
```

## Troubleshooting

### Convex Connection Issues
- Make sure your Convex deployment URL is correct
- Check that `bunx convex dev` is running
- Verify your environment variables are set correctly

### UploadThing Issues
- Verify your API key is correct
- Check that your UploadThing URL is correct
- Make sure you have proper permissions set up in UploadThing

### Authentication Issues
- The current auth system uses a simple password-based approach (for development)
- In production, consider integrating Clerk or another auth provider
- Passwords are stored in plain text (NOT SECURE for production)

### TypeScript Errors
- Run `bunx convex dev` to generate TypeScript types
- Make sure all dependencies are installed: `bun install`

## Next Steps

1. **Set up proper authentication** - Consider integrating Clerk for production
2. **Configure UploadThing server** - Set up proper file upload endpoints
3. **Add YouTube API integration** - For filtering educational videos
4. **Set up environment-specific deployments** - Configure separate Convex deployments for dev/test/prod

## Environment Switching

The app supports three environments:
- **Development**: Uses `EXPO_PUBLIC_CONVEX_URL_DEV`
- **Test**: Uses `EXPO_PUBLIC_CONVEX_URL_TEST`
- **Production**: Uses `EXPO_PUBLIC_CONVEX_URL_PROD`

Switch environments by setting `EXPO_PUBLIC_ENV` in your `.env` file or using the appropriate bun script.

## Support

For issues or questions:
- Check the [Convex documentation](https://docs.convex.dev)
- Check the [UploadThing documentation](https://docs.uploadthing.com)
- Email: mukelanilastborn@gmail.com

