import { ItemType } from "@/domain/Item";
import Image from "next/image";

export default function ItemDetail({
  id,
  img,
  owner,
  title,
  expiredAt,
  location,
  share,
  rental,
}: ItemType) {
  const days = dayLeft(expiredAt);
  const text = days < 0 ? "처분가능" : `${days}일 남음`;
  return (
    <div>
      <Image alt="" src={img} />
      <Spacing size={20} />
      <div css={flexCSS}>
        <div css={{ fontWeight: "bold" }}>{title}</div>
        <div css={{ fontWeight: "bold" }}>{owner}</div>
      </div>
      <div css={flexCSS}>
        <div css={text === "처분가능" ? { color: "red" } : {}}>{text}</div>
        <div>{share ? "나눔💚" : ""}</div>
      </div>
      <div css={locationCSS}>{location}</div>
    </div>
  );
}
