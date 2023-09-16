import { ItemType } from "@/domain/Item";
import { dayLeft } from "@/lib/datetime";
import { CSSInterpolation } from "@emotion/serialize";
import Image from "next/image";
import { Spacing } from "./Spacing";

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
      <Image css={{ width: "90vw" }} alt="" src={img} width={90} height={90} />
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

const locationCSS: CSSInterpolation = {
  textAlign: "left",
};
const imageCSS: CSSInterpolation = {
  width: "90px",
  objectFit: "contain",
};

const flexCSS: CSSInterpolation = {
  display: "flex",
  justifyContent: "space-between",
};
