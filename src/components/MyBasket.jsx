/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Popover } from "@headlessui/react";
import { LuShoppingBasket } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { MdAddShoppingCart } from "react-icons/md";
import BasketItem from "./BasketItem";
import { calculateTotal, clearBasket } from "../store/basket/basket";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MyBasket() {
  const shippingCost = 19.9;
  const dispatch = useDispatch();

  const basketCount = useSelector((state) => state.basket.basketItems);
  const totalPrice = useSelector((state) => state.basket.totalPrice);

  const clearBasketHandle = () => {
    dispatch(clearBasket());
  };

  useEffect(() => {
    dispatch(calculateTotal());
  }, [basketCount]);
  return (
    <Popover className="w-7 h-7 flex justify-center items-center relative border border-zinc-200 rounded-full">
      <Popover.Button>
        <LuShoppingBasket size={24} />
        <span className="absolute w-4 h-4 rounded-full bg-red-600 text-white -top-1 -right-1 flex items-center justify-center text-xs">
          {basketCount.length}
        </span>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 top-8 rounded-md rounded-tr-none p-5 right-0 w-[350px] min-h-[400px] bg-white shadow-md border">
        {basketCount.length > 0 ? (
          <>
            <div className="w-[95%] h-[300px] overflow-scroll">
              {basketCount.map((product, idx) => (
                <BasketItem key={idx} product={product} />
              ))}
            </div>
            <div className="pt-3 mt-1 border-t border-zinc-300">
              <h4 className="font-semibold mb-2">Sipariş Özeti</h4>
              <table className="border-collapse w-full">
                <tbody className="w-full">
                  <tr>
                    <td colSpan="3" className="text-left text-sm pr-3">
                      Sepet Tutarı
                    </td>
                    <td className="font-semibold text-right text-sm">
                      ${totalPrice.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-left text-sm pr-3">
                      Kargo Bedeli
                    </td>
                    <td className="font-semibold text-right text-sm">
                      ${shippingCost.toFixed(2)}
                    </td>
                  </tr>
                  {totalPrice >= 200 && (
                    <tr>
                      <td colSpan="3" className="text-left text-sm pr-10">
                        $200 ve Üzeri Kargo Bedava (Satıcı Karşılar)
                      </td>
                      <td className="text-right text-sm">
                        -${shippingCost.toFixed(2)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <table className="w-full mt-3 pt-5 border-t border-zinc-200">
                <tbody className="pt-5">
                  <tr>
                    <td colSpan="3" className="text-left text-sm pr-3">
                      Toplam
                    </td>
                    <td className="font-semibold text-right text-sm">
                      $
                      {totalPrice >= 200
                        ? totalPrice.toFixed(2)
                        : (totalPrice + shippingCost).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="w-full flex justify-between mt-3">
                <button
                  onClick={clearBasketHandle}
                  className="text-sm rounded-md border border-red-800 p-1 text-red-800"
                >
                  Sepeti Temizle
                </button>
                <Link
                  to={"/basket"}
                  className="text-sm rounded-md border border-blue-800 p-1 text-blue-800"
                >
                  Sepeti Onayla
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="h-[300px] flex flex-col justify-center items-center gap-y-2 text-zinc-500">
            <MdAddShoppingCart size={60} />
            <h1 className="text-center">
              Sepetin boş, sipariş vermek için sepetine bir şeyler ekle.
            </h1>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
}
