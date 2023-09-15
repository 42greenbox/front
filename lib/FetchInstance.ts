import returnFetch from "return-fetch";

const headers: HeadersInit | undefined = {
  Accept: "*/*",
  "Content-Type": "application/json; charset=utf-8",
  "X-Requested-With": "XMLHttpRequest",
};

const fetchInstance = returnFetch({
  baseUrl: "https://server.42greenbox.com",
  headers: headers,
  interceptors: {
    request: async (args) => {
      console.log("********before sending request*********");
      console.log("url:", args[0].toString());
      console.log("requestInit:", args[1], "\n\n");
      return args;
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
