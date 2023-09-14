export type ItemDto = {
  user_id: string;
  item_id: string;
  title: string;
  img: string;
  createdAt: string;
  expiredAt: string;
  location: string;
  share: boolean;
  rental: boolean;
};

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

export type ItemSendType = {
  itemId: string;
  owner: string;
  img: string;
  title: string;
  expiryDate: string; //단순 일수(1, 3... 등 정수) 정확한 날짜 저장은 백에서
  share: string;
  rental: string;
  location: string;
};

export const totalPointToUse = (item: ItemSendType) => {
  return parseInt(item.expiryDate) * 100;
};
