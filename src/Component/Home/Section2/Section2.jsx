import React from "react";
import Heading from "../../../SubComponents/Heading";
import img1 from "../../../assets/Images/img1.png";
import img2 from "../../../assets/Images/img2.png";
import img3 from "../../../assets/Images/img3.png";
import img4 from "../../../assets/Images/img4.png";

const Section2 = () => {
  const otherImages = [
    { img: img2, title: "Yoga" },
    { img: img3, title: "Meditation" },
    { img: img4, title: "Dance" },
  ];

  return (
    <div className="px-3 md:px-7 lg:px-10">
      <Heading title="Find what moves you" />

      <div className="grid grid-cols-10 gap-16 mt-8">
        <div className="relative col-span-4 h-[400px] flex flex-col justify-between">
          {/* Dark Gradient Overlay on Image */}

          {/* Image */}
          <div className="relative z-10">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-95 rounded-tl-3xl"></div>
            <img
              src={img1}
              alt="Gym"
              className="w-full rounded-tl-3xl h-full object-cover"
              style={{
                filter: "blur(px) drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))", // No blur initially
              }}
            />
          </div>

          {/* Text Overlay */}
          <div className="relative z-20 flex items-center justify-between gap-5 bottom-10 left-4 text-white bg-black p-4 rounded-tl-3xl">
            <h2 className="font-out text-4xl font-thin">GYM</h2>
            <p className="font-out text-base mt-2">
              Expect a heart-pumping workout that will leave you feeling
              energized and accomplished. Our supportive community of
              like-minded individuals.
            </p>
          </div>
        </div>

        {otherImages.map((item, index) => (
          <div key={index} className="col-span-2 relative h-[380px] w-[170px]">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover object-center rounded-tl-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-95 rounded-tl-3xl"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="font-out text-xl font-medium">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section2;
