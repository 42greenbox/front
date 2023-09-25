import { cookies } from "next/headers";
import returnFetch, { FetchArgs } from "return-fetch";
const winston = require("winston");
const { format } = winston;
const consoleFormat = format.combine(
  format.prettyPrint(),
  format.splat(),
  format.printf((info: any) => {
    if (typeof info.message === "object") {
      info.message = JSON.stringify(info.message, null, 3);
    }
    return info.message;
  })
);
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "server.log",
      format: consoleFormat,
    }),
    new winston.transports.Console(consoleFormat),
  ],
});

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
      console.log("**********newheaders*********", newHeaders);
      const newArgs = [
        args[0],
        {
          headers: newHeaders,
        },
      ];
      console.log("*************newArgs1*************", newArgs[1]);
      logger.info("********* before sending request *********");
      logger.info(newArgs);
      console.log("url:", newArgs[0].toString());
      console.log("requestInit:", newArgs[1], "\n\n");
      return newArgs;
    },
    response: async (response, requestArgs) => {
      logger.info("********after receiving response*********");
      logger.info(response);
      console.log(response);
      console.log("url:", requestArgs[0].toString());
      console.log("requestInit:", requestArgs[1], "\n\n");
      return response;
    },
  },
});

export default fetchInstance;
