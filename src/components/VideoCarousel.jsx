import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";


//refer docs for experiment

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  // Add state to track screen size
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 760);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  // Add resize event listener to update screen size state
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 760);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // pop ups
  //remove the ease option if you dont want the bouncing effect
  useGSAP(()=>{
    gsap.from("#playBar",{
      delay:0,
      duration:0.75,
      opacity:0,
      scale:0,
      ease:"bounce.inOut",
      bottom: "-130px",
      scrollTrigger:{
        trigger:"#slider",
        start:"center bottom",
        end:"70% 20%",
        toggleActions:"restart reset resume reset",
      }
    })
  })

  //used the gsap to make the transition properly for the video carousel
  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            //this is to optmize for different devices
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // laptop
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length === hightlightsSlides.length) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        if (i < hightlightsSlides.length - 1) {
          setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
        } else {
          // If last item reached
          setVideo((prev) => ({ ...prev, isLastVideo: true }));
        }
        break;

      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((prev) => ({ ...prev, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;

      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;

      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((prev) => [...prev, e]);

  // Calculate responsive dimensions for the video container
  const getVideoDimensions = () => {
    // For medium and large screens, maintain original dimensions
    if (!isSmallScreen) {
      return {
        width: "1200px",
        height: "730px",
      };
    }
    // For small screens (mobile)
    else {
      // You can adjust these values based on your requirements
      return {
        width: "100%", // Use full width on mobile
        height: "400px", // Reduced height for mobile
        // You can also use viewport units for more responsive sizing
        // width: "90vw",
        // height: "50vh",
      };
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div 
            key={list.id} 
            id="slider" 
            className={`${isSmallScreen ? 'pr-4' : 'sm:pr-40 pr-20'}`}
          >
            {/* RESPONSIVE VIDEO CAROUSEL CONTAINER */}
            <div className="video-carousel_container">
              <div
                className="flex-center rounded-3xl overflow-hidden bg-black"
                style={getVideoDimensions()}
                // Uncomment and modify the values below to experiment with different sizes
                /*
                style={{
                  // FOR LARGE SCREENS (default/original)
                  // width: "1200px",
                  // height: "730px",
                  
                  // FOR MEDIUM SCREENS (tablets)
                  // width: isSmallScreen ? "100%" : window.innerWidth < 1200 ? "800px" : "1200px",
                  // height: isSmallScreen ? "400px" : window.innerWidth < 1200 ? "500px" : "730px",
                  
                  // FOR SMALL SCREENS (mobile)
                  // Use percentage or viewport units on mobile for better responsiveness
                  // width: isSmallScreen ? "95vw" : "1200px",
                  // height: isSmallScreen ? "300px" : "730px",
                  
                  // ALTERNATIVE APPROACH: Using aspect ratio
                  // width: isSmallScreen ? "100%" : "1200px",
                  // aspectRatio: "16/9", // Maintain aspect ratio instead of fixed height
                }}
                */
              >
                <video
                  id="video"
                  playsInline={true}
                  className={`${
                    list.id === 2 && (isSmallScreen ? "translate-x-10" : "translate-x-44")
                  } pointer-events-none w-full h-full object-cover`}
                  // Experiment with different object-fit values for mobile
                  // className={`${list.id === 2 && "translate-x-44"} pointer-events-none w-full h-full ${isSmallScreen ? "object-contain" : "object-cover"}`}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() =>
                    i !== hightlightsSlides.length - 1
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((prev) => ({ ...prev, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              {/* RESPONSIVE TEXT POSITION AND SIZE */}
              <div 
                className={`absolute ${isSmallScreen ? 'top-4 left-[3%]' : 'top-12 left-[5%]'} z-10`}
                // Experiment with different positions
                /*
                className={`absolute z-10
                  ${isSmallScreen 
                    ? 'top-4 left-4' // Mobile position
                    : window.innerWidth < 1200 
                      ? 'top-8 left-[4%]' // Tablet position
                      : 'top-12 left-[5%]' // Desktop position
                  }
                `}
                */
              >
                {list.textLists.map((text, idx) => (
                  <p 
                    key={idx} 
                    className={`${isSmallScreen ? 'text-lg' : 'md:text-3xl text-xl'} font-medium`}
                    // Experiment with different text sizes
                    // className={`${isSmallScreen ? 'text-base' : window.innerWidth < 1200 ? 'text-2xl' : 'text-3xl'} font-medium`}
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RESPONSIVE PLAY BAR */}
      <div 
        id="playBar" 
        className={`fixed ${isSmallScreen ? 'bottom-5' : 'bottom-10'} left-1 right-1 z-10 flex-center mt-10 overflow-visible`}
        // Experiment with different positions and sizes
        /*
        className={`fixed z-10 flex-center mt-10 overflow-visible
          ${isSmallScreen 
            ? 'bottom-4 left-0 right-0' // Mobile position
            : 'bottom-10 left-1 right-1' // Desktop position
          }
        `}
        */
      >
        <button className={`control-btn ${isSmallScreen ? 'scale-75' : ''}`}>
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
            
        <div className={`flex-center ${isSmallScreen ? 'py-3 px-5' : 'py-5 px-7'} mx-4 bg-gray-300 backdrop-blur rounded-full`}>
          {hightlightsSlides.map((_, i) => (
            <span
              key={i}
              className={`mx-2 ${isSmallScreen ? 'w-2 h-2' : 'w-3 h-3'} bg-gray-200 rounded-full relative cursor-pointer`}
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoCarousel;