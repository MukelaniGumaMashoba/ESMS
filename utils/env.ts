/**
 * Environment configuration utility
 * Handles switching between development, test, and production environments
 */

export type Environment = 'development' | 'test' | 'production';

export const getEnvironment = (): Environment => {
  const env = process.env.EXPO_PUBLIC_ENV || 'development';
  
  if (env === 'production' || env === 'test' || env === 'development') {
    return env;
  }
  
  return 'development';
};

export const isDevelopment = () => getEnvironment() === 'development';
export const isTest = () => getEnvironment() === 'test';
export const isProduction = () => getEnvironment() === 'production';

export const getConvexUrl = (): string => {
  const env = getEnvironment();
  
  switch (env) {
    case 'production':
      return process.env.EXPO_PUBLIC_CONVEX_URL_PROD || '';
    case 'test':
      return process.env.EXPO_PUBLIC_CONVEX_URL_TEST || '';
    case 'development':
    default:
      return process.env.EXPO_PUBLIC_CONVEX_URL_DEV || '';
  }
};

export const getUploadThingUrl = (): string => {
  return process.env.EXPO_PUBLIC_UPLOADTHING_URL || '';
};

export const getUploadThingKey = (): string => {
  return process.env.EXPO_PUBLIC_UPLOADTHING_KEY || '';
};

