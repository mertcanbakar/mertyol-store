import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames";

/* eslint-disable react/prop-types */
export default function Categories({
  categories,
  setSelectedCategory,
  selectedCategory,
}) {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 6,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };
  const categorySelect = (key) => {
    if (selectedCategory !== key) {
      setSelectedCategory(key);
    } else if (selectedCategory === key) {
      setSelectedCategory("");
    }
  };
  return (
    <Slider {...sliderSettings}>
      {categories.map((category, idx) => (
        <div key={idx}>
          <button
            onClick={() => categorySelect(category.key)}
            className={classNames(
              "w-20 h-10 flex justify-center items-center text-center text-xs p-1 bg-white text-zinc-600 border border-zinc-300 rounded-xl",
              {
                "!bg-zinc-600 !text-white !border-white":
                  selectedCategory === category.key,
              }
            )}
          >
            {category.title}
          </button>
        </div>
      ))}
    </Slider>
  );
}
