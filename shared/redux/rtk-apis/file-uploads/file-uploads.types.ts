export type TPresignedUrlInput = { name: string; type: string };

export type TPresignedUrlFileDto = TPresignedUrlInput[];

export type TPresignedFileUrl = TPresignedUrlInput & {
  signedUrl: string;
};
