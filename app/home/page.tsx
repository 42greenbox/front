import { itemService } from "@/application/useItem";
import Item from "@/ui/components/Item";
import Link from "next/link";

export default async function Home() {
  //const { itemActor } = useContext(ActorContext);
  //const [state, send] = useActor(itemActor);
  //const { items } = state.context;
  //const [itemState] = useAppMachine(itemsMachine, "showing");
  //const service = itemState.children.itemsMachine;
  //const [state, send] = useActor(
  //  service as InterpreterFrom<typeof itemsMachine>
  //);
  //const items = state.context.items;
  const { getItems } = itemService();
  const items = await getItems();
  return (
    <>
      <h1>home</h1>
      <>
        {items.map(({ id, img, title, share, expiredAt }) => (
          <Link key={id} href={`/items/${id}`}>
            <Item img={img} title={title} share={share} expiredAt={expiredAt} />
          </Link>
        ))}
      </>
    </>
  );
}
