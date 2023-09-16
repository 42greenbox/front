import { useState } from "react";

let idCounter = 0;

export const generateID = (prefix = "toss-id-") => {
  idCounter = idCounter + 1;
  return `${prefix}${idCounter}`;
};

const useId = (prefix?: string) => {
  const [id] = useState(() => {
    return generateID(prefix);
  });

  return id;
};

export default useId;
