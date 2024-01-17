import "../globals.css";

const COLOR_VARIANTS = {
  primary: "bg-primary-main hover:bg-primary-hover hover:text-[#FFFFFF]",
};

export default function Mylist() {
  return (
    <>
      <h1>Mylist</h1>
      <h1 className="text-3xl font-bold underline">hello</h1>
      <button className={COLOR_VARIANTS["primary"]}>button</button>
      <button className="bg-black">button2</button>
    </>
  );
}
