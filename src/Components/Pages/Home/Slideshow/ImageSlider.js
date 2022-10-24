import React, { useEffect, useState } from "react";
import { SliderData } from "./SliderData";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const delay = 3000;

  useEffect(() => {
    setTimeout(() => nextSlide(), delay);
  });

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div>
      {SliderData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && <img src={slide.image} className="image" />}
          </div>
        );
      })}
    </div>
  );
};

export default ImageSlider;
