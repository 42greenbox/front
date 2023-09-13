import { ItemType } from "@/domain/Item";

export default function ItemDetail(props: ItemType) {
  return <div>item {props.id}s detail</div>;
}
