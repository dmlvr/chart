import { useState, useEffect } from "react";

const DEFAULT_DELAY = 200;

export const useDebounseWindowSize = () => {
  const [windowSize, setwindowSize] = useState({
    width: 1920,
    height: 1080,
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setwindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, DEFAULT_DELAY);
    };

    if (typeof window !== "undefined") {
      setwindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return windowSize;
};
