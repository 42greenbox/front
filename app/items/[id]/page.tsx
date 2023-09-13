import mockItems, { ItemType } from "@/domain/item";
import ItemUI from "@/ui/components/ItemDetail";

export default function ItemPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const items = mockItems;
  const item: ItemType = items.find((item) => item.id === id)!;

  return <ItemUI {...item} />;
}
