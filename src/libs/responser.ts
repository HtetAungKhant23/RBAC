type ResponseType<T> = {
  statusCode: number;
  message: string;
  devMessage: string;
  body: T;
};

type ReturnType<T> = {
  meta: {
    success: boolean;
    message: string;
    devMessage: string;
  };
  body: T;
};

export const Responser = ({ statusCode, message, devMessage, body }: ResponseType<typeof body>): ReturnType<typeof body> => {
  return {
    meta: {
      success: statusCode >= 200 && statusCode <= 300 ? true : false,
      message,
      devMessage,
    },
    body,
  };
};
