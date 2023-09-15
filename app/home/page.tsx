import { ItemType } from "@/domain/Item";
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

export async function getItems() {
  // ...
  const res = await fetch("https://server.42greenbox.com/storage");
  const items: ItemType[] = await res.json();

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return items;
}
