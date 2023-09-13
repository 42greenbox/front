import Image from "next/image";

interface ItemProps {
  img: string;
  title: string;
  share: boolean;
  expiredAt: number;
}

const Item = ({ img, title, share, expiredAt }: ItemProps) => {
  return (
    <div>
      <Image alt="" src={img} height={100} width={100} />
      {title}
      {share}
      {expiredAt}
    </div>
  );
};

export default Item;
