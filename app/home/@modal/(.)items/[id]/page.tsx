import { ActorContext } from "@/app/machine-provider";
import { ItemType } from "@/domain/Item";
import ItemUI from "@/ui/components/ItemDetail";
import { useActor } from "@xstate/react";
import { useContext } from "react";

export default function ItemModal({
  params: { id: itemId },
}: {
  params: { id: string };
}) {
  const { itemActor } = useContext(ActorContext);
  const [state, send] = useActor(itemActor);
  const { items } = state.context;
  const item: ItemType = items.find((item) => item.id === itemId)!;

  return <ItemUI {...item} />;
}
