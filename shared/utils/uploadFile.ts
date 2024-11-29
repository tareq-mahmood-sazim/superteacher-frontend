export async function UploadToS3(file: File, presignedUrl: string): Promise<string> {
  if (!presignedUrl || !file) throw new Error("Presigned URL and File both required");
  try {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
    });

    if (response.ok) {
      const presignedUrl_split = presignedUrl.split("?")[0];
      if (!presignedUrl_split) throw new Error("Failed to extract presigned URL");
      const fileKey = presignedUrl_split.split("/").pop();
      if (!fileKey) throw new Error("Failed to extract file key from URL");
      return fileKey;
    } else {
      console.error("File upload failed:", response.statusText);
      throw new Error("File upload failed");
    }
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}
