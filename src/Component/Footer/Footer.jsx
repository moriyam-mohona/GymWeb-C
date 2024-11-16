import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoTiktok } from "react-icons/io5";

function Footer() {
  return (
    <div className="bg-footer-bg relative text-white px-3 md:px-7 lg:px-10 mt-5  lg:mt-24 font-out">
      <div className="relative z-20 pt-16 pb-5">
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="font-orbitron text-white font-extrabold text-3xl uppercase">
            gymweb
          </h3>
          <p className="font-out w-full md:w-2/3 lg:w-1/2 text-sm md:text-base leading-relaxed">
            Join us today and experience the transformative power of our fitness
            classes. Don't wait to start your fitness journey. Take the first
            step towards a healthier, stronger you. Let's sweat, have fun, and
            make fitness a way of life together!
          </p>
        </div>

        <hr className="border-t border-gray-600 my-8" />

        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6 text-white text-2xl">
            <FaFacebookF className="hover:text-blue-500 transition" />
            <FaXTwitter className="hover:text-sky-500 transition" />
            <FaInstagram className="hover:text-pink-500 transition" />
            <IoLogoTiktok className="hover:text-black transition" />
          </div>

          <p className="text-sm mt-4">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
