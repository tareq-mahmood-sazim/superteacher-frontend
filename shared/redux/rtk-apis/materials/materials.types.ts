import type { IClassroomResponse } from "../classrooms/classrooms.types";

enum MaterialsEnum {
  ASSIGNMENT = "ASSIGNMENT",
  STUDYMATERIALS = "STUDYMATERIALS",
  EXAM = "EXAM",
}
export type TMaterials = {
  id: number;
  submissions: IClassroomResponse[];
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
