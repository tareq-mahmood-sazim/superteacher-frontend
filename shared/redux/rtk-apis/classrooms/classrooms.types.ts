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
