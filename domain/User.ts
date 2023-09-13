export type UserType = {
  id: string;
  point: number;
};

export const hasEnoughPoint = (user: UserType, pointToUse: number) => {
  if (user.point - pointToUse < 0) {
    throw new Error("Not Enough Point");
  }
  return true;
};
