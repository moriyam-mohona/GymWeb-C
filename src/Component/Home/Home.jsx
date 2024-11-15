import React from "react";
import Hero from "./Hero/Hero";
import Navbar from "../Navbar/Navbar";
import Section2 from "./Section2/Section2";
import Section3 from "./Section3/section3";

const Home = () => {
  return (
    <>
      <div className="relative lg:h-screen">
        {/* Background Image Layer */}
        <div className="absolute inset-0 bg-hero-bg -z-10"></div>

        {/* Overlay Layer */}
        <div className="absolute inset-0 bg-black opacity-[20%] "></div>

        {/* Content Layer */}
        <div className="relative z-10 text-white font-bold text-2xl flex flex-col h-full px-3 md:px-7 lg:px-10">
          <Navbar />
          <Hero />
        </div>
      </div>
      <Section2 />
      <Section3 />
    </>
  );
};

export default Home;
