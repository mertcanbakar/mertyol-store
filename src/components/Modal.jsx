/* eslint-disable react/prop-types */
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Modal({
  isOpen,
  setIsOpen,
  code,
  setCode,
  discountState,
  setDiscountState,
}) {
  const couponCode = "MERTYOL50";
  const totalPrice = useSelector((state) => state.basket.totalPrice);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const handleCouponCode = () => {
    if (!discountState) {
      if (code === couponCode) {
        if (totalPrice >= 100) {
          setDiscountState(true);
          setIsOpen(false);
          setErrorMessage(false);
          setCode("");
          toast("Kupon kodun başarıyla kullanıldı.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Bu kupon $100 ve üzeri alışverişlerde geçerlidir.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        setError("Lütfen geçerli bir kupon kodu giriniz");
        setErrorMessage(true);
      }
    } else if (discountState) {
      setError("Zaten bir kod kullandınız");
      setErrorMessage(true);
    }
  };
  const cancelCouponCode = () => {
    setErrorMessage(false);
    setIsOpen(false);
    setCode("");
  };
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 z-20 bg-black opacity-50"></div>
      <Dialog.Panel className="w-[400px] h-[200px] fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-20 p-4 max-w-md mx-auto rounded-md shadow-lg">
        <Dialog.Title className="text-lg font-bold mb-2">
          Kupon Kodu Gir
        </Dialog.Title>
        <div className="flex flex-col items-center justify-end">
          <div className="w-[300px] my-3">
            <input
              className="w-full outline-none p-2 border border-zinc-100 rounded-lg focus:border-zinc-300"
              type="text"
              placeholder="MERTYOL50"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <div className="w-full h-5 flex items-center justify-center">
              {errorMessage && (
                <p className="text-sm p-1 text-red-800">{error}</p>
              )}
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              disabled={!code}
              onClick={handleCouponCode}
              className="px-4 py-2 mr-2 text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 disabled:opacity-30 disabled:hover:bg-blue-100"
            >
              Kaydet
            </button>
            <button
              onClick={cancelCouponCode}
              className="px-4 py-2 text-red-600 bg-red-100 rounded-md hover:bg-red-200"
            >
              İptal
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
