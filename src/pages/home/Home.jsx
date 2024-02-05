import { useState } from "react";
import Categories from "../../components/Categories";
import Products from "../../components/Products";
import categoriesData from "../../data/categoriesData.json";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="container flex justify-center items-center">
      <div className="w-[90%] h-full mx-auto mt-10">
        <Categories
          categories={categoriesData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Products selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}

export default Home;
