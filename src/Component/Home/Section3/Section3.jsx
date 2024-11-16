import React from "react";
import Heading from "../../../SubComponents/Heading";
import img from "../../../assets/Images/img-5.png";
const Section3 = () => {
  return (
    <div className="px-3 md:px-7 lg:px-10 py-10 relative mt-0 md:mt-5 lg:mt-10">
      <Heading
        title="Fit for your lifestyle"
        subtitle="Wake up with a sunrise meditation, sweat it out with lunchtime HIIT, or unwind with an evening flow. You’ll find movement for every mood with classes sorted by time, style, and skill level."
      />

      {/* Rectangles */}
      <div className="hidden lg:flex">
        <div className="absolute bottom-44 right-0 w-[30%] h-[15%] bg-orange opacity-30 transform translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute bottom-16 right-0 w-[120%] lg:w-[95%] h-[15%] bg-orange opacity-40 transform translate-x-1/2 translate-y-1/3"></div>
      </div>

      {/* Image */}
      <div className="flex flex-col items-center my-10 relative z-10">
        <img
          src={img}
          alt="Lifestyle"
          className="h-56 md:h-72 border-b-8 border-r-8 border-opacity-80 rounded border-orange"
        />
      </div>
    </div>
  );
};

export default Section3;
