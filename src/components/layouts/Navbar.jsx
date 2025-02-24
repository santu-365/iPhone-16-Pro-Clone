import { Link } from "react-router-dom";
import { navLists } from "../../constants";
import { appleImg, bagImg, searchImg } from "../../utils";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="px-4 w-full flex flex-col justify-between items-center relative z-20">
            <nav className="flex w-full screen-max-width items-center py-3 bg-transparent justify-between">
                <Link to="/">
                    <img src={appleImg} alt="Apple" width={16} height={16} />
                </Link>

                <div className="flex justify-center max-sm:hidden">
                    {navLists.map((nav) => (
                        <Link to={`/${nav}`} key={nav}>
                            <div className="px-6 text-sm cursor-pointer text-gray-200 hover:text-white transition-all">
                                {nav}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-6 max-sm:ml-auto">
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
                    <div className="sm:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                            <div className="w-6 h-[2px] bg-white mb-1"></div>
                            <div className="w-6 h-[2px] bg-white mb-1"></div>
                            <div className="w-6 h-[2px] bg-white"></div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu (Shown when hamburger is clicked) */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col items-center sm:hidden">
                    {navLists.map((nav) => (
                        <Link to={`/${nav}`} key={nav} className="py-3 text-lg border-b border-gray-700 w-full text-center">
                            {nav}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;