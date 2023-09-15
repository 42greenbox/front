import { IItemRepository } from "../domain/IItemRepository";
import {
  ItemDto,
  ItemSendType,
  ItemType,
  totalPointToUse,
} from "../domain/Item";
import { UserType, hasEnoughPoint } from "../domain/User";
import { http } from "../lib/HttpClient";

export default class ItemRepository implements IItemRepository {
  public getItems = async () => {
    const res = await fetch("https://server.42greenbox.com/storage");
    const rawItems: ItemDto[] = await res.json();
    const items: ItemType[] = rawItems.map((dto) => {
      return {
        id: dto.item_id,
        img: dto.img,
        owner: dto.user_id,
        title: dto.title,
        expiredAt: dto.expiredAt,
        location: dto.location,
        share: dto.share,
        rental: dto.rental,
      };
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return items;
  };

  public getItem = async (item: ItemType) => {
    return await http
      .get<ItemDto>(`/storage?user_id=${item.owner}&item_id=${item.id}`)
      .then((res) => {
        return {
          id: res.data.item_id,
          img: res.data.img,
          owner: res.data.user_id,
          title: res.data.title,
          expiredAt: res.data.expiredAt,
          location: res.data.location,
          share: res.data.share,
          rental: res.data.rental,
        };
      })
      .catch((err) => {
        return err;
      });
  };

  public getMyItems = async () => {
    return await http
      .get<ItemDto[]>("/storage/me")
      .then((res) => {
        const items = res.data.map((dto) => {
          return {
            id: dto.item_id,
            img: dto.img,
            owner: dto.user_id,
            title: dto.title,
            expiredAt: dto.expiredAt,
            location: dto.location,
            share: dto.share,
            rental: dto.rental,
          };
        });
        return items;
      })
      .catch((err) => {
        return err;
      });
  };

  public putItem = async (item: ItemType, status: string) => {
    const newItem = { ...item, item_id: item.id, user_id: item.owner, status };
    await http.put("/storage", newItem).catch((err) => console.log(err));
  };

  public postItem = async (user: UserType, item: ItemSendType) => {
    if (hasEnoughPoint(user, totalPointToUse(item))) {
      const blob = await base64ToBlob(item.img);
      const formData = new FormData();
      formData.append("user_id", item.owner);
      formData.append("item_id", item.itemId!);
      formData.append("title", item.title);
      formData.append("img", blob);
      formData.append("expiryDate", item.expiryDate);
      formData.append("share", item.share);
      formData.append("rental", item.rental);
      formData.append("location", item.location);

      await http
        .post("/storage", formData, {
          headers: { "Content-Type": "multipart/form-data;" },
        })
        .catch((err) => console.log(err));
    }
  };
}

const base64ToBlob = async (base64: string) => {
  const blob = await fetch(base64).then((res) => res.blob());
  return blob;
};
