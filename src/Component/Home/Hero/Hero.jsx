import { SecondaryBtn } from "../../../SubComponents/Buttons/Button";

function Hero() {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <style>
        {`
          .text-outline {
            color: transparent;
            -webkit-text-stroke: 2px #FF4601;
          }
        `}
      </style>
      <div className="flex pb-4 relative flex-col space-y-5 mb-5">
        {/* Text Section */}
        <h2 className="sm:w-full md:w-full lg:w-2/3  font-orbitron font-bold xl:text-[120px] lg:text-[60px] md:text-5xl text-4xl  lg:tracking-wider xl:tracking-[0.04em] xl:-mr-[15rem] leading-none text-white bg-gradient-to-r from-[#BD1F1700] relative z-10 py-3 pr-2">
          <span className="text-outline">Unleash</span> your Inner Athlete
        </h2>
        <p className="sm:w-full md:w-full  lg:w-2/3  font-out xl:text-xl lg:text-lg md:text-base text-sm xl:mt-4 font-thin xl:mr-32">
          Get ready to sweat it out and achieve your fitness goals with our
          high-energy fitness classes! Our classes are designed to cater to all
          fitness levels and provide a fun and motivating environment to help
          you reach your peak performance.
        </p>
        <SecondaryBtn text="Start free trial" className="w-40" />
      </div>
    </div>
  );
}

export default Hero;
