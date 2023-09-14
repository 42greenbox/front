import Item from "@/ui/components/Item";
import { useActor } from "@xstate/react";
import Link from "next/link";
import { useContext } from "react";
import { ActorContext } from "../machine-provider";

export default function Home() {
  const { itemActor } = useContext(ActorContext);
  const [state, send] = useActor(itemActor);
  const { items } = state.context;
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
