import { Link } from "react-router-dom";
import { navLists } from "../../constants";
import { appleImg, bagImg, searchImg } from "../../utils";
import { React, useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("translate-y-[-100%]");
  
  useEffect(() => {
    if (isOpen) {
      //small delay to ensure the element is in the DOM before animating
      setTimeout(() => {
        setAnimationClass("translate-y-0");
      }, 10);
    } else {
      setAnimationClass("translate-y-[-100%]");
    }
  }, [isOpen]);
  
  return (
    <header className="bg-transparent px-4 w-full flex flex-col justify-between items-center relative z-20">
      <nav className="flex w-full screen-max-width items-center py-3 bg-transparent justify-between">
        <Link to="/">
          <img src={appleImg} alt="Apple" width={16} height={16} />
        </Link>
        
        {/* Change to hide on medium screens too */}
        <div className="flex justify-center max-md:hidden">
          {navLists.map((nav) => (
            <Link to={`/${nav}`} key={nav}>
              <div className="px-6 text-sm cursor-pointer text-gray-200 hover:text-white transition-all">
                {nav}
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-6 max-md:ml-auto">
          <img
            src={searchImg}
            alt="Search"
            width={18}
            height={18}
            className="cursor-pointer"
          />
          <img
            src={bagImg}
            alt="Bag"
            width={18}
            height={18}
            className="cursor-pointer"
          />
          {/* Change to show on medium screens too */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <div className="w-6 h-[2px] bg-white mb-1"></div>
              <div className="w-6 h-[2px] bg-white mb-1"></div>
              <div className="w-6 h-[2px] bg-white"></div>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Change to show on medium screens too */}
      {(isOpen || animationClass !== "translate-y-[-100%]") && (
        <div
          className={`fixed inset-0 bg-black z-50 flex flex-col text-white md:hidden overflow-y-auto transition-transform duration-300 ease-in-out ${animationClass}`}
          onTransitionEnd={() => {
            if (animationClass === "translate-y-[-100%]" && !isOpen) {
              // This will completely remove the element from DOM after the animation completes
              setAnimationClass("hidden translate-y-[-100%] ");
            }
          }}
        >
          <div className="flex justify-end p-5">
            <button onClick={() => setIsOpen(false)} className="text-2xl text-white">
              ✕
            </button>
          </div>
          
          <div className="px-8 py-4 flex flex-col space-y-6">
            {navLists.map((nav) => (
              <Link
                to={`/${nav}`}
                key={nav}
                className="text-2xl font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {nav}
              </Link>
            ))}
          </div>
          
        </div>
      )}
    </header>
  );
};

export default Navbar;