import { getUploadThingUrl, getUploadThingKey } from "./env";

export const uploadFile = async (file: File | Blob, fileName: string): Promise<string> => {
  const url = getUploadThingUrl();
  const key = getUploadThingKey();

  if (!url || !key) {
    throw new Error("UploadThing is not configured. Please set EXPO_PUBLIC_UPLOADTHING_URL and EXPO_PUBLIC_UPLOADTHING_KEY in your environment variables.");
  }

  const formData = new FormData();
  formData.append("file", file as Blob, fileName);

  const response = await fetch(`${url}/api/upload`, {
    method: "POST",
    headers: {
      "X-Uploadthing-Key": key,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.url;
};

