/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { addBasket } from "../store/basket/basket";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const addToCard = () => {
    dispatch(addBasket({ product, quantity: 1 }));
  };
  return (
    <div className="h-[300px] w-[250px] my-3 bg-white p-2 rounded-md  border border-blue-200 relative">
      <div className="h-[120px] w-full border border-zinc-200 shadow-sm rounded-sm overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={product.thumbnail}
          alt=""
        />
      </div>
      <div className="overflow-ellipsis pt-2 pb-5 border-b border-zinc-100">
        <h2 className="font-semibold text-sm truncate">{product.title}</h2>
        <p className="mt-2 h-8 text-xs line-clamp-2">{product.description}</p>
      </div>
      <div className="w-full h-16 flex justify-between items-end">
        <p className="flex justify-center items-center gap-x-1 text-yellow-400">
          <FaStar />{" "}
          <span className="text-zinc-600">{product.rating.toFixed(2)}</span>
        </p>
        <p className="text-blue-900">${product.price.toFixed(2)}</p>
      </div>
      <button
        onClick={addToCard}
        className="absolute right-4 top-3 bg-white text-blue-900 rounded-full p-1 shadow-md text-3xl hover:text-4xl transition-all"
      >
        <CiSquarePlus />
      </button>
    </div>
  );
}
