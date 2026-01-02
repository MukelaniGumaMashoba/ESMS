import { ConvexReactClient } from "convex/react";
import { getConvexUrl } from "./env";

let convexClient: ConvexReactClient | null = null;

export const getConvexClient = () => {
  if (!convexClient) {
    // const url = getConvexUrl();
    const url = process.env.EXPO_PUBLIC_CONVEX_URL;
    if (!url) {
      throw new Error("Convex URL is not configured. Please set EXPO_PUBLIC_CONVEX_URL in your environment variables.");
    }
    convexClient = new ConvexReactClient(url);
  }
  return convexClient;
};

