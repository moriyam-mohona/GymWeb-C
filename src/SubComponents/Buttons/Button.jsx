import React from "react";
import { motion } from "motion/react";
import { MdAddTask } from "react-icons/md";

export const PrimaryBtn = ({ text, className, onClick, type }) => (
  <>
    <motion.button
      type={type || "button"}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-5 py-2 font-orbitron font-bold text-base text-white bg-orange transform ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
      }}
    >
      <span className="relative z-10 transform ">{text || "Button"}</span>
    </motion.button>
  </>
);

export const SubmitBtn = ({ text, className, onClick, type }) => (
  <>
    <motion.button
      type={type || "submit"}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center w-2/3 pl-4 pr-6 shadow-xl py-2 font-out font-light text-base text-white bg-gradient-to-r  transform rounded outline-double outline-1  hover:outline-none hover:bg-orange hover:text-white  ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // style={{
      //   clipPath: "polygon(0% 0%, 100% 0%, 92% 100%, 0% 100%)",
      // }}
    >
      <span className="relative z-10 transform ">{text || "Button"}</span>
    </motion.button>
  </>
);

export const SecondaryBtn = ({ text, className, onClick, type }) => (
  <>
    <motion.button
      type={type || "button"}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center pl-4 pr-6 shadow-xl py-2 font-out font-light text-base text-white bg-gradient-to-r bg-orange transform ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 92% 100%, 0% 100%)",
      }}
    >
      <span className="relative z-10 transform ">{text || "Button"}</span>
    </motion.button>
  </>
);

export const AddBtn = ({ text, className, onClick, type }) => (
  <>
    <motion.button
      type={type || "button"}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2 pl-4 pr-6 shadow-xl py-2 font-out font-light text-base text-white bg-gradient-to-r  bg-transparent border hover:bg-orange rounded transform ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={
        {
          // clipPath: "polygon(0% 0%, 100% 0%, 92% 100%, 0% 100%)",
        }
      }
    >
      <MdAddTask className="text-lg" />
      <span className="relative z-10 transform ">{text || "Button"}</span>
    </motion.button>
  </>
);
