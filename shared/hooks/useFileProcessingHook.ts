import { v4 as uuidv4 } from "uuid";

import { useGetPresignedUrlMutation } from "@/shared/redux/rtk-apis/file-uploads/file-uploads.api";

type PresignedUrlResponse = {
  signedUrl: string;
};

export function useFileProcessingHook() {
  const [uploadFile] = useGetPresignedUrlMutation();

  async function UploadToS3(file: File, presignedUrl: string): Promise<string> {
    if (!presignedUrl || !file) throw new Error("Presigned URL and File both required");
    try {
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(`File upload failed with status: ${response.status}`, text);
        throw new Error(`File upload failed: ${response.statusText}`);
      }
      if (response.ok) {
        console.log(response);
        const presignedUrl_split = presignedUrl.split("?")[0];
        if (!presignedUrl_split) throw new Error("Failed to extract presigned URL");
        const fileKey = presignedUrl_split.split("/").pop();
        if (!fileKey) throw new Error("Failed to extract file key from URL");
        return response.url;
      } else {
        console.error("File upload failed:", response.statusText);
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw error;
    }
  }

  async function FileProcessing(data: File[]): Promise<string[]> {
    const files = data;
    if (files.length === 0) return [];

    const fileData = files.map((file) => ({
      name: `${uuidv4()}_${file.name}`,
      type: file.type,
    }));

    const response: PresignedUrlResponse[] = await uploadFile(fileData).unwrap();
    const uploadPromises = files.reduce<Promise<string>[]>((promises, file, index) => {
      const signedUrl = response[index]?.signedUrl;
      if (signedUrl) {
        promises.push(UploadToS3(file, signedUrl));
      }
      return promises;
    }, []);

    return Promise.all(uploadPromises);
  }
  return { FileProcessing };
}
