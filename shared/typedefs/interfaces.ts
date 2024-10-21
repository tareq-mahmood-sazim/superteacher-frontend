export interface IExample {
  id: string;
}
export interface IErrorProps {
  status: number;
  data: {
    error: string;
    message: string[];
    statusCode: number;
  };
}
