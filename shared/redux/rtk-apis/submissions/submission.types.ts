export interface TCreateSubmissionRequest {
  materialId: number;
  userId: number;
  attachment: string[];
}

export interface TUpdateSubmissionRequest {
  attachment?: string[];
  isLate?: boolean;
}

export interface TSubmission {
  id: number;
  materialId: number;
  userProfileId: number;
  attachment: string[];
  submittedAt: string;
  isLate: boolean;
}

export interface TSubmissionResponse {
  id: number;
  message: string;
  data: TSubmission;
}
