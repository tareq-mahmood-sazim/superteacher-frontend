export type TFormValues = {
  title: string;
  instructions: string;
  dueDate: Date | null;
  attachments: File[];
};

export type TPresignedUrlResponse = {
  signedUrl: string;
};
