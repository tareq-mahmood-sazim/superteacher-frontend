import { IClassroomResponse } from "@/shared/redux/rtk-apis/classrooms/classrooms.types";

export type TUserProfile = {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  gender?: string;
  role?: number;
  highestEducationLevel?: number | null;
  majorSubject?: string | null;
  subjectsToTeach?: string | null;
  educationLevel?: number;
  medium?: string | null;
  classLevel?: string | null;
  degree?: string | null;
  major?: string | null;
  semesterOrYear?: string | null;
  user?: number;
  classrooms: IClassroomResponse[];
};
