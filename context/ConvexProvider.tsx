import React, { ReactNode } from "react";
// import { ConvexProvider as BaseConvexProvider } from "convex/react";
import { getConvexClient } from "@/utils/convex";

export const ConvexProvider = ({ children }: { children: ReactNode }) => {
  const convex = getConvexClient();
  
  return <BaseConvexProvider client={convex}>{children}</BaseConvexProvider>;
};

