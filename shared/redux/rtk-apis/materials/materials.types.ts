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
enum MaterialsEnum {
  ASSIGNMENT = "ASSIGNMENT",
  STUDYMATERIALS = "STUDYMATERIALS",
  EXAM = "EXAM",
}
export type TMaterials = {
  id: number;
  submissions: TSubmissionProps[];
  createdAt: string;
  updatedAt: string;
  title: string;
  instructions: string;
  dueDate: string;
  category: MaterialsEnum;
  attachments: string[];
  classroom: IClassroomResponse | number;
};
export type TMaterialRequest = {
  title: string;
  instructions: string;
  dueDate: Date | null;
  attachments?: string[];
  classroomId: number;
};
export type TMaterialResponse = {
  statusCode: number;
  message: string;
  data: TMaterials;
};
