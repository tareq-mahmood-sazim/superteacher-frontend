export type TLoginRequestFields = {
  email: string;
  password: string;
};

export enum EUserRole {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  NONE = "NONE",
}

export type TTokenizedUser = {
  id: number;
  claim: EUserRole;
  email: string;
  claimId: number;
};

export type TLoginResponse = {
  accessToken: string;
  user: TTokenizedUser;
};
