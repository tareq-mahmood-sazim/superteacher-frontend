export interface IOption {
  id: string;
  label: string;
}
export interface IStudentProfile {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  role: {
    id: number;
  };
}
