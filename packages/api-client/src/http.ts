import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export type ApiClientConfig = {
  baseURL: string;
  getToken?: () => string | null;
  onUnauthorized?: () => void;
};

export function createApiClient(config: ApiClientConfig): AxiosInstance {
  const instance = axios.create({
    baseURL: config.baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 60000,
  });

  instance.interceptors.request.use(
    (req: InternalAxiosRequestConfig) => {
      const token = config.getToken?.();
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    (error: AxiosError<any>) => {
      const status = error.response?.status;

      if (status === 401) {
        config.onUnauthorized?.();
      }

      return Promise.reject(error);
    }
  );

  return instance;
}
