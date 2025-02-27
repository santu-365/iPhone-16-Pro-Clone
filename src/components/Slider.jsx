import React, { useRef, useState, useEffect } from "react";
import { ic1Img, ic2Img, ic3Img, ic4Img } from "../utils/index";

const Slider = () => {
  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -532 : 532; // Adjust based on image width
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Initial check
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  return (
    <div className="relative py-4 sm:py-6 lg:py-8">
      <div
        ref={scrollRef}
        className="overflow-x-auto w-full mx-auto flex scrollbar-hide"
        style={{
          overflowY: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          borderRadius: "12px",
          margin: "0 auto",
          background: "transparent",
          width: "100vw",
          paddingLeft: "15%",
        }}
      >

        <div className="flex flex-nowrap w-full">
          {[ic1Img, ic2Img, ic3Img, ic4Img].map((image, index) => (

            <div
              key={index}
              className="flex-shrink-0 mx-0"
              style={{
                marginLeft: index === 0 ? "0px" : "16px",
              }}
            >

              <div className="h-[295px] md:h-[400px] lg:h-[532px] w-[295px] md:w-[295px] lg:w-[532px] rounded-2xl overflow-hidden">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-left text-[#fafafa] ml-12 mt-4 text-lg font-normal leading-tight max-w-[532px]">
                {index === 0 && (
                  <>
                    iPhone 16 Pro Max has our largest iPhone <br /> display ever
                  </>
                )}
                {index === 1 && "The thinnest borders on any Apple product"}
                {index === 2 &&
                  "Premium Grade 5 titanium is exceptionally durable"}
                {index === 3 && (
                  <>
                    Four striking colours, from Black Titanium to new <br />{" "}
                    Desert Titanium
                  </>
                )}
              </p>

            </div>
          ))}
          <div className="flex-shrink-0" style={{ width: "780px" }}></div>
        </div>
      </div>

      {/* Responsive arrow navigation positioning */}
      <div className="absolute right-0 flex space-x-4 mt-2 mr-6
                     sm:mt-4 
                     md:mt-6
                     lg:top-0 lg:mt-[700px]">
        <button
          onClick={() => scroll("left")}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#1c1c1e] text-white ${isAtStart ? "opacity-50" : "opacity-100"
            }`}
          disabled={isAtStart}
          aria-label="Previous slide"
        >
          <svg
            width="30"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-6 sm:h-6"
          >
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#1c1c1e] text-white ${isAtEnd ? "opacity-50" : "opacity-100"
            }`}
          disabled={isAtEnd}
          aria-label="Next slide"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sm:w-6 sm:h-6"
          >
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;