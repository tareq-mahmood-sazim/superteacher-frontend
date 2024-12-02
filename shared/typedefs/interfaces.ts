export interface IExample {
  id: string;
}

export interface IProfileResponse {
  statusCode: number;
  message: string;
  data: IUserData;
}

export interface IUserData {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  password: string;
  userProfile: UserProfile;
}

interface UserProfile {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  role: UserRole;
  highestEducationLevel: number;
  majorSubject: string;
  subjectsToTeach: string[];
  educationLevel: number;
  medium: number;
  classLevel: string;
  degree: string | null;
  major: string;
  semesterOrYear: string;
  user: number;
}

interface UserRole {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  permissions: string[];
}
