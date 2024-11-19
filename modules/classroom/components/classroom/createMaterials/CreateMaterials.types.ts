export type TMaterialFormValues = {
  title: string;
  instructions: string;
  dueDate: Date | null;
  attachments?: File[];
  classroomId: number;
};
