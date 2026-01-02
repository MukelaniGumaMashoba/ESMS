# ESMS - E-Learning Management System

An e-learning app built with React Native (Expo), Convex, and UploadThing for managing courses, educational YouTube videos, and student progress.

## Features

- 🎓 Course Management - Create and manage educational courses
- 📹 YouTube Integration - Filter and display educational videos
- 📁 File Uploads - Upload course materials using UploadThing
- 🔐 Authentication - Secure user authentication with Convex
- 📱 Cross-Platform - Works on iOS, Android, and Web
- 🎨 Modern UI - Beautiful and intuitive user interface
- ⚡ Fast - Powered by Bun for lightning-fast performance

## Tech Stack

- **Runtime**: Bun (fast JavaScript runtime)
- **Frontend**: React Native (Expo), TypeScript
- **Backend**: Convex (Database & Backend)
- **File Storage**: UploadThing
- **Navigation**: Expo Router
- **State Management**: Zustand, Convex React

## Getting Started

### Prerequisites

- **Bun** installed ([Install Bun](https://bun.sh))
- Convex account (sign up at [convex.dev](https://convex.dev))
- UploadThing account (sign up at [uploadthing.com](https://uploadthing.com))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ESMS
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Convex deployment URLs for each environment
   - Add your UploadThing API key and URL

4. Set up Convex:
```bash
bunx convex dev
```
This will create a `convex` folder and guide you through setup.

5. Deploy Convex schema:
```bash
bunx convex deploy
```

### Environment Configuration

The app supports three environments:
- **Development**: `EXPO_PUBLIC_ENV=development`
- **Test**: `EXPO_PUBLIC_ENV=test`
- **Production**: `EXPO_PUBLIC_ENV=production`

Set the appropriate Convex URLs for each environment in your `.env` file.

### Running the App

#### Development
```bash
bun run start:dev
```

#### Test
```bash
bun run start:test
```

#### Production
```bash
bun run start:prod
```

#### Standard Start
```bash
bun start
```

### Building

#### Android
```bash
bun run android
```

#### iOS
```bash
bun run ios
```

#### Web
```bash
bun run web
```

## Why Bun?

This project uses [Bun](https://bun.sh) instead of Node.js/npm for:
- ⚡ **Faster installs** - Bun installs dependencies up to 30x faster than npm
- 🚀 **Better performance** - Native speed JavaScript runtime
- 🛠️ **Built-in tools** - Test runner, bundler, and package manager in one
- 📦 **npm compatible** - Works with all npm packages

## Project Structure

```
ESMS/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main app tabs
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── convex/                # Convex backend functions
│   ├── schema.ts          # Database schema
│   ├── auth.ts            # Authentication functions
│   ├── courses.ts         # Course management
│   └── videos.ts          # Video management
├── context/               # React contexts
├── hooks/                 # Custom hooks
├── store/                 # Zustand stores
├── utils/                 # Utility functions
│   ├── env.ts             # Environment configuration
│   ├── convex.ts         # Convex client setup
│   └── upload.ts         # File upload utilities
└── types/                 # TypeScript types
```

## Key Features

### Course Management
- Create courses with categories (Commerce, Science, General, Life Science)
- Upload course thumbnails
- Enroll students
- Track progress

### Video Integration
- Add YouTube videos to courses
- Filter educational content
- Track video progress
- View analytics

### Authentication
- Email/password authentication
- User profiles
- Role-based access (Student, Instructor, Admin)

### File Uploads
- Upload course materials
- Image picker integration
- Camera support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, email mukelanilastborn@gmail.com
