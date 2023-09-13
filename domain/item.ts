export type ItemType = {
  id: string;
  img: string;
  owner: string;
  title: string;
  expiredAt: number;
  location: string;
  share: boolean;
  rental: boolean;
};

const mockItems: ItemType[] = [
  {
    id: "1",
    title: "Kevin Canlas",
    owner: "@kvncnls",
    img: "https://pbs.twimg.com/media/FGz_t1wXIAIFyT-?format=jpg",
    expiredAt: 1694763491,
    location: "R1",
    share: true,
    rental: false,
  },
  {
    id: "2",
    title: "Pedro Duarte",
    owner: "@peduarte",
    img: "https://pbs.twimg.com/media/FFDOtLkWYAsWjTM?format=jpg",
    expiredAt: 3,
    location: "R1",
    share: true,
    rental: false,
  },
  {
    id: "3",
    title: "Ahmad Awais",
    owner: "@MrAhmadAwais",
    img: "https://pbs.twimg.com/media/EpIR281XIAMUrEM?format=jpg",
    expiredAt: 1694763491,
    location: "R1",
    share: true,
    rental: false,
  },
  {
    id: "4",
    title: "Leandro Soengas",
    owner: "@lsoengas",
    img: "https://pbs.twimg.com/media/EsRYK8oWMAEkObV?format=jpg",
    expiredAt: 1694763491,
    location: "R1",
    share: true,
    rental: false,
  },
  {
    id: "5",
    title: "Samina",
    owner: "@saminacodes",
    img: "https://pbs.twimg.com/media/FFn7X76VgAEVTgs?format=jpg",
    expiredAt: 3,
    location: "R1",
    share: true,
    rental: false,
  },
  {
    id: "6",
    title: "lafond.eth",
    owner: "@laf0nd",
    img: "https://pbs.twimg.com/media/FFNyYEAXsAMdOhV?format=jpg",
    expiredAt: 1,
    location: "R1",
    share: true,
    rental: false,
  },
  {
    id: "7",
    title: "山岸和利💛",
    owner: "@ykzts",
    img: "https://pbs.twimg.com/media/E8txb2yVkAQxRVw?format=jpg",
    expiredAt: 1,
    location: "R2",
    share: false,
    rental: false,
  },
  {
    id: "8",
    title: "Altngelo",
    owner: "@AfterDarkAngelo",
    img: "https://pbs.twimg.com/media/FDYTZN1VIAAT-X1?format=jpg",
    expiredAt: 3,
    location: "R2",
    share: true,
    rental: false,
  },
  {
    id: "9",
    title: "Matias Baldanza",
    owner: "@matiasbaldanza",
    img: "https://pbs.twimg.com/media/E374pyaWEAMCT2R?format=jpg",
    expiredAt: 1,
    location: "R3",
    share: true,
    rental: false,
  },
];

export default mockItems;
