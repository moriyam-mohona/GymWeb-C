import React from "react";

const Heading = ({ title, subtitle, className = "", subtitleClass = "" }) => {
  return (
    <div
      className={`flex flex-col items-center text-center mb-10 ${className}`}
    >
      <h1 className="text-2xl md:text-3xl text-white font-bold font-orbitron mb-3 md:mb-5">
        {title}
      </h1>
      {subtitle && (
        <p
          className={`text-center w-full md:w-2/3 text-sm md:text-base font-thin font-out text-white  ${subtitleClass}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Heading;
