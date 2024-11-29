import { EUserRole } from "../auth/auth.types";

export type IMessageType = {
  content: string;
  classroomId: string;
  senderType: EUserRole;
  sender: number;
  createdAt: string;
};
