/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import classNames from "classnames";

export default function Products({ selectedCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [1, 2, 3, 4, 5];
  const pageSize = 20; // Her sayfada gösterilecek ürün sayısı

  async function getProducts() {
    try {
      const skipAmount = (currentPage - 1) * pageSize;
      const response = await axios.get(
        !selectedCategory
          ? `https://dummyjson.com/products?limit=${pageSize}&skip=${skipAmount}`
          : `https://dummyjson.com/products/category/${selectedCategory}?limit=${pageSize}&skip=${skipAmount}`
      );
      setProducts(response.data?.products);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    getProducts();
  }, [selectedCategory, currentPage]);

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex justify-center items-center flex-wrap gap-x-2">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center flex-col ">
            <div className="my-10 w-16 h-16 border-t-4 border-blue-200 border-solid rounded-full animate-spin"></div>
            <h2>Loading...</h2>
          </div>
        ) : (
          <>
            {products.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </>
        )}
      </div>
      <div className="flex justify-around mx-auto w-[300px] my-4">
        {!selectedCategory ? (
          <>
            {pages.map((page, idx) => (
              <button
                className={classNames({
                  "w-8 h-8 p-1 border bg-white border-zinc-200 rounded-full": true,
                  "!bg-blue-900 !text-white": page === currentPage,
                })}
                onClick={() => handlePage(page)}
                key={idx}
              >
                {page}
              </button>
            ))}
          </>
        ) : (
          <button
            className={classNames({
              "w-8 h-8 p-1 border bg-white border-zinc-200 rounded-full": true,
              "!bg-blue-900 !text-white": 1 === currentPage,
            })}
            onClick={() => handlePage(1)}
          >
            1
          </button>
        )}
      </div>
    </>
  );
}
