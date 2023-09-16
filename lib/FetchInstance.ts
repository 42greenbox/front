import returnFetch, { FetchArgs } from "return-fetch";
import { deleteCookie, getCookie } from "./cookie";

const headers: HeadersInit | undefined = {
  Accept: "*/*",
  "Content-Type": "application/json; charset=utf-8",
  "X-Requested-With": "XMLHttpRequest",
};

const injectToken = (args: FetchArgs) => {
  try {
    const requestInit: RequestInit = args[1]!;
    const headers = requestInit.headers!;
    const token = localStorage.getItem("accessToken");

    console.log("token", token);
    //const token = getCookie("csrftoken");
    if (token != null) {
      console.log("쿠키설정 완");
    } else {
      const token = getCookie("token");
      console.log("notoken", token);
      if (token != null) {
        deleteCookie("token");
        localStorage.setItem("accessToken", token);
      }
    }
    const newHeaders = {
      ...headers,
      Autorization: `Bearer ${token}`,
    };
    return newHeaders;
  } catch (error) {
    throw new Error(error as string);
  }
};

const fetchInstance = returnFetch({
  baseUrl: "https://server.42greenbox.com",
  headers: headers,
  interceptors: {
    request: async (args) => {
      console.log("********before sending request*********");
      console.log("url:", args[0].toString());
      console.log("requestInit:", args[1], "\n\n");
      const newHeaders: HeadersInit = injectToken(args);
      const newArgs = {
        ...args,
        headers: newHeaders,
      };
      console.log("**********after inject token**********", newArgs);
      return newArgs;
    },
    response: async (response, requestArgs) => {
      console.log("********after receiving response*********");
      console.log("url:", requestArgs[0].toString());
      console.log("requestInit:", requestArgs[1], "\n\n");
      return response;
    },
  },
});

export default fetchInstance;
