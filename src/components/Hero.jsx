import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { heroVideo } from "../utils";
import { smallHero } from "../utils";
import appleIntelligenceImage from "./1.png";
import FloatingNavbar from "./FloatingNavbar";

const HeroWithNavbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 760);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 760);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isSmallScreen) {
      gsap.to("#hero", { opacity: 1, delay: 4.7 });
      gsap.fromTo(
        "#image",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 4.8 }
      );
      gsap.fromTo(
        "#cta",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 4.8 }
      );
    } else {
      gsap.set("#hero", { opacity: 1 });
      gsap.set("#image", { opacity: 1, scale: 1 });
      gsap.set("#cta", { opacity: 1, scale: 1 });
    }
  }, [isSmallScreen]);

  return (
    <>
      {/* Changed from h-screen to flex flex-col */}
      <section className="w-full flex flex-col relative">
        {/* Added a specific height container for the video/image */}
        <div className="w-full h-screen relative">
          <div className="absolute inset-0 z-0">
            {isSmallScreen ? (
              <div className="flex justify-center items-center h-full pt-16">
                <img
                  src={smallHero}
                  alt="Small Device Background"
                  className="w-full max-w-sm h-auto object-contain"
                />
              </div>
            ) : (
              <video
                className="w-full h-95 object-cover"
                autoPlay
                muted
                playsInline
                key={heroVideo}
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
            )}
          </div>

          <div className={`bg-gray-300 ${isSmallScreen ? 'text-white' : 'text-white'} py-5 px-4 text-center w-full relative z-20`}>
            <p className="text-[0.9rem] px-3">
              Get iPhone 16 Pro from just ₹4912.00/mo. for up to 24 mo.* with No
              Cost EMI and instant cashback.
              <br className="block sm:hidden" />
              <a href="#" className="text-blue ml-2 hover:underline">
                Buy &gt;
              </a>
            </p>
          </div>

          <div className="relative h-full w-full flex-center flex-col z-10">
            <div
              className="flex flex-col items-center"
              style={{
                marginTop: isSmallScreen ? "-80px" : "0",
              }}
            >
              <p
                id="hero"
                className="hero-title md:text-3xl font-semibold mb-4"
                style={{ color: "white", opacity: isSmallScreen ? 1 : 0 }}
              >
                iPhone 16 Pro
              </p>
              <img
                id="image"
                src={appleIntelligenceImage}
                alt="Built for Apple Intelligence"
                className="w-full max-w-sm md:max-w-4xl -mt-24 md:-mt-48"
                style={{ opacity: isSmallScreen ? 1 : 0 }}
              />
            </div>
          </div>
        </div>

        {/* Move CTA outside of the video container */}
        <div
          id="cta"
          className="flex flex-col items-center py-8 bg-transparent"
          style={{
            opacity: isSmallScreen ? 1 : 0,
          }}
        >
          <a
            href="#highlights"
            className="btn bg-white text-black buy-btn rounded-full px-6 py-2 text-md font-medium z-5"
          >
            Buy
          </a>
          <p className="text-gray-200 text-lg md:text-xl mt-4">From ₹119900.00*</p>
          <p className="text-gray-200 text-lg md:text-xl text-center px-4 mt-2">
            Apple Intelligence starting in US English later this year
          </p>
        </div>
      </section>

      <FloatingNavbar />
    </>
  );
};

export default HeroWithNavbar;