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
    console.log("********headers*********\n", headers);
    const cookieStore = cookies();
    const token = cookieStore.get("token");
    const newHeaders = new Headers(headers);
    newHeaders.append("Authorization", `Bearer ${token?.value}`);
    //const token = localStorage.getItem("accessToken");

    //const token = getCookie("csrftoken");
    /*const newHeaders = {
      ...headers,
      Authorization: `Bearer ${token?.value}`,
    };*/
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
      console.log(args, typeof args);
      console.log("************************************");
      console.log("url:", args[0].toString());
      console.log("requestInit:", args[1], "\n\n***********************");
      console.log("line37");
      const newHeaders: HeadersInit = injectToken(args);
      console.log("line39");
      const newArgs = [
        args[0],
        {
          headers: newHeaders,
        },
      ];
      console.log("***************after assign headers************");
      console.log("url:", newArgs[0].toString());
      console.log("requestInit:", args[1], "\n\n***********************");
      console.log("requestAfter:", newArgs[1], "\n\n***********************");
      console.log("************************************");
      console.log(newArgs, typeof newArgs);
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
