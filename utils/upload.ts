import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { getUploadThingUrl, getUploadThingKey } from "./env";

export interface UploadResult {
  url: string;
  key: string;
}

/**
 * Upload a file to UploadThing
 * Works with React Native using expo-file-system
 */
export const uploadToUploadThing = async (
  uri: string,
  fileName?: string
): Promise<UploadResult> => {
  const uploadUrl = getUploadThingUrl();
  const key = getUploadThingKey();

  if (!uploadUrl || !key) {
    throw new Error(
      "UploadThing is not configured. Please set EXPO_PUBLIC_UPLOADTHING_URL and EXPO_PUBLIC_UPLOADTHING_KEY in your environment variables."
    );
  }

  // Read file as base64
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // Get file extension
  const ext = uri.split(".").pop() || "jpg";
  const mimeType = getMimeType(ext);

  // Convert base64 to blob
  const response = await fetch(`data:${mimeType};base64,${base64}`);
  const blob = await response.blob();

  // Create FormData
  const formData = new FormData();
  formData.append("file", blob as any, fileName || `file.${ext}`);

  // Upload to UploadThing
  const uploadResponse = await fetch(`${uploadUrl}/api/upload`, {
    method: "POST",
    headers: {
      "X-Uploadthing-Key": key,
    },
    body: formData,
  });

  if (!uploadResponse.ok) {
    const errorText = await uploadResponse.text();
    throw new Error(`Upload failed: ${uploadResponse.statusText} - ${errorText}`);
  }

  const data = await uploadResponse.json();
  return {
    url: data.url,
    key: data.key,
  };
};

/**
 * Pick an image and upload it
 */
export const pickAndUploadImage = async (): Promise<UploadResult> => {
  // Request permissions
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access media library is required!");
  }

  // Pick image
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.8,
  });

  if (result.canceled) {
    throw new Error("Image picker was canceled");
  }

  if (!result.assets || result.assets.length === 0) {
    throw new Error("No image selected");
  }

  const asset = result.assets[0];
  return await uploadToUploadThing(asset.uri, asset.fileName || "image.jpg");
};

/**
 * Take a photo and upload it
 */
export const takeAndUploadPhoto = async (): Promise<UploadResult> => {
  // Request permissions
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permission to access camera is required!");
  }

  // Take photo
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 0.8,
  });

  if (result.canceled) {
    throw new Error("Camera was canceled");
  }

  if (!result.assets || result.assets.length === 0) {
    throw new Error("No photo taken");
  }

  const asset = result.assets[0];
  return await uploadToUploadThing(asset.uri, asset.fileName || "photo.jpg");
};

const getMimeType = (ext: string): string => {
  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    txt: "text/plain",
  };
  return mimeTypes[ext.toLowerCase()] || "application/octet-stream";
};

