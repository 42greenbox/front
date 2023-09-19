import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { deleteCookie, getCookie } from "./cookie";

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
  BadRequest = 400,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "*/*",
  "Content-Type": "application/json; charset=utf-8",
  "X-Requested-With": "XMLHttpRequest",
};

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (
  config: InternalAxiosRequestConfig<any>
):
  | InternalAxiosRequestConfig<any>
  | Promise<InternalAxiosRequestConfig<any>> => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log("token", token);
    //const token = getCookie("csrftoken");
    if (token != null) {
      console.log("쿠키설정 완");
      config.headers!.Authorization = `Bearer ${token}`;
    } else {
      const token = getCookie("token");
      console.log("notoken", token);
      if (token != null) {
        config.headers!.Authorization = `Bearer ${token}`;
        deleteCookie("token");
        localStorage.setItem("accessToken", token);
      }
    }
    return config;
  } catch (error) {
    throw new Error(error as string);
  }
};

class HttpClient {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: "https://server.42greenbox.com",
      //baseURL: "https://42greenbox.com/api", //TODO: 프록시용 임시 접두 주소
      withCredentials: true,
      headers,
    });

    http.interceptors.request.use(injectToken, error => Promise.reject(error));

    http.interceptors.response.use(
      response => {
        if (response.data.error) {
          this.handleError(response.data.error.statusCode);
          const errorInstance = new Error(
            response.data.error.statusCode + response.data.error.code
          );
          return Promise.reject(errorInstance);
        }
        return response;
      },
      error => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private handleError(error: any) {
    const status = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }

      case StatusCode.BadRequest: {
        console.log("bad request");
        break;
      }
    }
  }
}

export const http = new HttpClient();
