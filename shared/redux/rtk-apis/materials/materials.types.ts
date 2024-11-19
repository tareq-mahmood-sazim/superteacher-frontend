import type { IClassroomResponse } from "../classrooms/classrooms.types";

type TSubmissionProps = {
  attachment: string[];
  createdAt: string;
  id: number;
  isLate: boolean;
  materials: number;
  submittedAt: string;
  updatedAt: string;
  userProfile: number;
};
enum EMaterialsEnum {
  ASSIGNMENT = "ASSIGNMENT",
  STUDYMATERIALS = "STUDYMATERIALS",
  EXAM = "EXAM",
}
export type TMaterial = {
  id: number;
  submissions: TSubmissionProps[];
  createdAt: string;
  updatedAt: string;
  title: string;
  instructions: string;
  dueDate: string;
  category: EMaterialsEnum;
  attachments: string[];
  classroom: IClassroomResponse | number;
};
export type TMaterialRequest = {
  id?: number;
  title: string;
  instructions: string;
  dueDate: Date | null;
  attachments?: string[];
  classroom: number;
};
export type TMaterialResponse = {
  statusCode: number;
  message: string;
  data: TMaterial;
};
