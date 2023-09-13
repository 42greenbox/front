import { ItemType } from "@/domain/item";

export default function ItemDetail(props: ItemType) {
  return <div>item {props.id}s detail</div>;
}
