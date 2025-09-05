import { useState, useEffect } from "react";

interface MediaQuery {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
}

const useMediaQuery = (): MediaQuery => {
  const [screenSize, setScreenSize] = useState<MediaQuery>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setScreenSize({
        isMobile: width < 640, // sm
        isTablet: width >= 640 && width < 1024, // sm to lg
        isDesktop: width >= 1024 && width < 1280, // lg to xl
        isLargeDesktop: width >= 1280, // xl
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

export default useMediaQuery;
