import { Link, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import MyBasket from "./MyBasket";

export default function Header() {
  const location = useLocation();
  return (
    <div className="w-full h-14 px-10 bg-white border-b shadow-sm flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        Mertyol
      </Link>
      <div className="min-w-[300px] relative hidden lg:block">
        <input
          type="text"
          placeholder="Search"
          className="bg-zinc-100 p-2 w-full rounded-md outline-none border border-transparent focus-within:border-zinc-300"
        />
        <CiSearch
          size={20}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500"
        />
      </div>
      {location.pathname !== "/basket" ? <MyBasket /> : <div></div>}
    </div>
  );
}
