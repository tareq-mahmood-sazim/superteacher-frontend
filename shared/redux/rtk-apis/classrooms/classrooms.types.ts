
import { TUserProfile } from "../users/users.types";
export interface IClassroomRequest {
  title: string;
  subject: string;
  classTime: string;
  daysOfTheWeek: string[];
}

export interface IClassroomResponse {
  id: number;
  title: string;
  subject: string;
  classTime: string;
  daysOfTheWeek: string[];
  teacher?: number;
  participants?: TUserProfile[];
  message?: string;
}
