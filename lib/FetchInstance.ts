import { cookies } from "next/headers";
import returnFetch, { FetchArgs } from "return-fetch";

const headers: HeadersInit | undefined = {
  Accept: "*/*",
  "Content-Type": "application/json; charset=utf-8",
  "X-Requested-With": "XMLHttpRequest",
};

const injectToken = (args: FetchArgs) => {
  try {
    const requestInit: RequestInit = args[1]!;
    const headers = requestInit.headers!;
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const newHeaders = new Headers(headers);
    newHeaders.append("Authorization", `Bearer ${token?.value}`);
    return newHeaders;
  } catch (error) {
    throw new Error(error as string);
  }
};

const fetchInstance = returnFetch({
  baseUrl: "https://server.42greenbox.com",
  headers: headers,
  interceptors: {
    request: async args => {
      const newHeaders: HeadersInit = injectToken(args);
      const newArgs = [
        args[0],
        {
          headers: newHeaders,
        },
      ];
      return newArgs;
    },
    response: async (response, requestArgs) => {
      //console.log("********after receiving response*********");
      //console.log("url:", requestArgs[0].toString());
      //console.log("requestInit:", requestArgs[1], "\n\n");
      return response;
    },
  },
});

export default fetchInstance;
