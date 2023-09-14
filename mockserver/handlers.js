import { rest } from "msw";

export const handlers = [
  rest.get("https://server.42greenbox.com/storage", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json([
        {
          id: "1234",
          title: "test",
          img: "https://picsum.photos/100",
          owner: "sohan",
          expiredAt: 1693530927,
          location: "R1",
          share: true,
          rental: false,
        },
        {
          id: "1235",
          title: "test",
          img: "https://picsum.photos/100",
          owner: "sohan",
          expiredAt: 1693530927,
          location: "R2",
          share: true,
          rental: false,
        },
        {
          id: "1236",
          title: "test",
          img: "https://picsum.photos/100",
          owner: "sohan",
          expiredAt: 1693530927,
          location: "F1",
          share: true,
          rental: false,
        },
      ])
    );
  }),
  rest.get("https://server.42greenbox.com/storage/me", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json([
        {
          id: "sohan",
          title: "내꺼",
          img: "https://picsum.photos/100",
          owner: "sohan",
          expiredAt: 1693530927,
          location: "R1",
          share: true,
          rental: false,
        },
        {
          id: "sohan",
          title: "내꺼",
          img: "https://picsum.photos/100",
          owner: "sohan",
          expiredAt: 1693530927,
          location: "R2",
          share: true,
          rental: false,
        },
        {
          id: "sohan",
          title: "내꺼",
          img: "https://picsum.photos/100",
          owner: "sohan",
          expiredAt: 1693530927,
          location: "F1",
          share: true,
          rental: false,
        },
      ])
    );
  }),
  rest.get("https://server.42greenbox.com/user/me", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        id: "sohan",
        point: 10000,
        createdAt: 1693271727,
      })
    );
  }),
];

export default handlers;
