import { TUserProfile } from "../users/users.types";
export interface IClassroomRequest {
  title: string;
  subject: string;
  classTime: string;
  daysOfTheWeek: string[];
}
export interface IClassroomResponse {
  data: boolean;
  message: string;
  status: number;
}
export interface IClassroom {
  id: number;
  title: string;
  subject: string;
  classTime: string;
  daysOfTheWeek: string[];
  teacher?: number;
  participants?: TUserProfile[];
}
