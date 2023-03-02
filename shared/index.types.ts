export type TApiResponse<TData> = {
  statusCode: number;
  message: string;
  data: TData;
};

export type TApiErrorResponse = {
  status: number;
  data: {
    statusCode: number;
    message: string[] | string;
    error: string;
  };
};

export type TNullable<T> = { [K in keyof T]: T[K] | null };
