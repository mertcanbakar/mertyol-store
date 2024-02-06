/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdAddShoppingCart } from "react-icons/md";
import {
  calculateTotal,
  clearBasket,
  removeItem,
  updateQuantity,
} from "../../store/basket/basket";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Modal from "../../components/Modal";
import SneakBar from "../../components/SneakBar";
import { MdVerified } from "react-icons/md";
import { ToastContainer } from "react-toastify";

function Basket() {
  const [shippingCost, setShippingCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discountState, setDiscountState] = useState(false);
  const [sneakbar, setSneakbar] = useState(false);
  const [complete, setComplete] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);

  const basket = useSelector((state) => state.basket.basketItems);
  const totalPrice = useSelector((state) => state.basket.totalPrice);
  const dispatch = useDispatch();

  const decreaseAmount = (itemId) => {
    const item = basket.find((item) => item.id === itemId);

    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const increaseAmount = (itemId) => {
    const item = basket.find((item) => item.id === itemId);

    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };
  const clearBasketHandle = () => {
    dispatch(clearBasket());
  };
  const completeOrder = () => {
    setSneakbar(true);
    setTimeout(() => {
      setSneakbar(false);
      setComplete(true);
      dispatch(clearBasket());
      random5DigitNumber();
    }, 2000);
  };
  const random5DigitNumber = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    setRandomNumber(randomNumber);
  };

  useEffect(() => {
    dispatch(calculateTotal());
    if (basket.length === 0) {
      setDiscountState(false);
    }
  }, [basket]);
  useEffect(() => {
    if (totalPrice > 0) setShippingCost(19.9);
    else setShippingCost(0);
  }, [totalPrice]);
  useEffect(() => {
    if (discountState) setDiscount(50);
    else setDiscount(0);
  }, [discountState]);

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto flex flex-wrap justify-center gap-x-5">
        <div className="w-[90%] flex flex-col justify-between lg:min-w-[60%] lg:max-w-[60%] min-h-[300px] my-10 bg-white border border-blue-200 rounded-md">
          {!complete ? (
            <>
              {basket.length > 0 ? (
                basket.map((item, idx) => (
                  <div
                    key={idx}
                    className="w-full my-2 p-2 flex gap-x-1 lg:justify-center items-center"
                  >
                    <div className="w-[100px] h-14 lg:min-w-[150px] lg:h-[80px] border border-zinc-300 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={item.thumbnail}
                        alt=""
                      />
                    </div>
                    <div className="w-[30%] lg:w-[25%] text-sm lg:text-lg ml-2 flex flex-col justify-end">
                      <h2 className="font-bold">{item.brand}</h2>
                      <h4>{item.title}</h4>
                      <div className="w-[60px] h-5 text-xs border rounded-md flex lg:hidden justify-center items-center border-zinc-300">
                        <button
                          onClick={() => decreaseAmount(item.id)}
                          disabled={item.quantity === 1}
                          className="w-[30%] h-full flex justify-center items-center disabled:bg-zinc-100"
                        >
                          -
                        </button>
                        <span className="w-[40%] h-full flex justify-center items-center border-l border-r border-zinc-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseAmount(item.id)}
                          className="w-[30%] h-full flex justify-center items-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="w-[75px] h-8 border rounded-md hidden lg:flex justify-center items-center border-zinc-300">
                      <button
                        onClick={() => decreaseAmount(item.id)}
                        disabled={item.quantity === 1}
                        className="w-[30%] h-full flex justify-center items-center disabled:bg-zinc-100"
                      >
                        -
                      </button>
                      <span className="w-[40%] h-full flex justify-center items-center border-l border-r border-zinc-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseAmount(item.id)}
                        className="w-[30%] h-full flex justify-center items-center"
                      >
                        +
                      </button>
                    </div>
                    <p className="w-[20%] text-right text-sm lg:text-lg text-blue-900">
                      ${item.price.toFixed(2)}
                    </p>
                    <span className="w-[10%] flex justify-center ">
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="p-1 text-md lg:text-lg rounded-full flex justify-center text-red-700 hover:bg-red-100 transition-all"
                      >
                        <MdDelete />{" "}
                      </button>
                    </span>
                  </div>
                ))
              ) : (
                <div>
                  <div className="h-[300px] flex flex-col justify-center items-center gap-y-2 text-zinc-500">
                    <MdAddShoppingCart size={60} />
                    <h1 className="text-center">
                      Sepetinde ürün bulunmamaktadır.
                    </h1>
                    <Link className="text-black" to={"/"}>
                      Ana Sayfaya Dön
                    </Link>
                  </div>
                </div>
              )}
              {basket.length > 0 && (
                <div className="flex justify-end items-end mr-2 gap-x-2 my-2">
                  <button
                    onClick={clearBasketHandle}
                    className="text-sm rounded-md border border-red-800 p-1 text-red-800"
                  >
                    Sepeti Temizle
                  </button>
                  <button
                    onClick={completeOrder}
                    className="text-sm rounded-md border border-blue-800 p-1 text-blue-800"
                  >
                    Siparişi Tamamla
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="h-[300px] flex flex-col justify-center items-center gap-y-2">
              <MdVerified className="text-green-800" size={100} />
              <h1 className="text-center">
                <span className="font-bold mr-1">{randomNumber}</span>numaralı
                siparişiniz tamamlandı.
              </h1>
              <p className="text-center text-zinc-500 text-xs">
                Sipariş detaylarınızı kısa süre içerisinde mail yoluyla
                alacaksınız.
              </p>
              <Link className="text-zinc-900 hover:text-black mt-4" to={"/"}>
                Ana Sayfaya Dön
              </Link>
            </div>
          )}
        </div>

        <div className="w-[90%] lg:w-[300px] p-3 h-[300px] mb-10 lg:mt-10 bg-white border border-blue-200 rounded-md">
          <div className="mt-1">
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
                {discountState && (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-left text-sm pr-10 text-blue-700"
                    >
                      İndirim Kuponu
                    </td>
                    <td className="text-right text-sm text-blue-700">
                      -${(50).toFixed(2)}
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
                      ? (totalPrice - discount).toFixed(2)
                      : (totalPrice + shippingCost - discount).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" w-full h-[100px] flex justify-center items-end">
            <button
              onClick={() => setIsOpen(true)}
              className="w-full flex justify-center items-center text-sm px-2 py-1 gap-x-1 border border-zinc-300 rounded-lg mb-2"
            >
              KUPON KODU GİR{" "}
              <span>
                <FaPlus />
              </span>
            </button>
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              code={code}
              setCode={setCode}
              discountState={discountState}
              setDiscountState={setDiscountState}
            />
          </div>
        </div>
        {sneakbar && <SneakBar />}
      </div>
    </>
  );
}

export default Basket;
