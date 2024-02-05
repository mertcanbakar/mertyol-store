/* eslint-disable react/prop-types */

import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../store/basket/basket";

export default function BasketItem({ product }) {
  const dispatch = useDispatch();

  const decreaseAmount = () => {
    if (product.quantity > 1) {
      dispatch(
        updateQuantity({ id: product.id, quantity: product.quantity - 1 })
      );
    }
  };

  const increaseAmount = () => {
    dispatch(
      updateQuantity({ id: product.id, quantity: product.quantity + 1 })
    );
  };
  return (
    <div className="w-full h-[70px] pb-4 flex justify-between border-b border-zinc-200 mb-4">
      <div className="h-full flex gap-x-2">
        <div className="w-[100px] h-full rounded-md overflow-hidden border border-zinc-200">
          <img
            className="w-full h-full object-cover"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>
        <div className="h-full flex flex-col text-xs text-nowrap">
          <h3 className="font-bold">{product.brand}</h3>
          <h4 className=" text-zinc-500 truncate w-[100px]">{product.title}</h4>
          <div className="w-12 border border-zinc-300 flex justify-center rounded-sm">
            <button
              onClick={decreaseAmount}
              className="w-4 border-r border-zinc-300"
            >
              -
            </button>
            <span className="w-4 flex justify-center">{product.quantity}</span>
            <button
              onClick={increaseAmount}
              className="w-4 border-l border-zinc-300"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="text-left flex flex-col justify-between items-end">
        <p className="text-blue-900">${product.price.toFixed(2)}</p>
        <button
          onClick={() => dispatch(removeItem(product.id))}
          className="text-red-700"
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
}
