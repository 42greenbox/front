export const dayDiff = (dateNow: string, dateFuture: string) => {
  const now = new Date(dateNow);
  const future = new Date(dateFuture);
  return Math.floor((now.getTime() - future.getTime()) / (1000 * 60 * 60 * 24));
};

export const dayLeft = (epochExpiredAt: number) => {
  const now = new Date();
  const expiredAt = new Date(epochExpiredAt);
  return Math.floor(
    (now.getTime() - expiredAt.getTime()) / (1000 * 60 * 60 * 24),
  );
};
