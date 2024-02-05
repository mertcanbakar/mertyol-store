/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export default function SneakBar({ message, type = "complete" }) {
  return (
    <>
      <div className="fixed inset-0 z-20 bg-black opacity-50"></div>
      <div className="w-[400px] h-[200px] flex flex-col justify-center items-center fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-20 p-4 max-w-md mx-auto rounded-md shadow-lg">
        <div className="my-10 w-16 h-16 border-t-4 border-blue-200 border-solid rounded-full animate-spin"></div>
        Siparişiniz alınıyor lütfen bekleyin...
      </div>
    </>
  );
}
