export function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
    // Enhanced regex for mobile devices
    const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|Windows Phone|webOS|BlackBerry|Opera Mini|IEMobile|Mobile Safari|UCWEB/i;
  
    // Check for touch capability
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  
    // Consider screen size as an additional filter
    const isSmallScreen = window.matchMedia("(max-width: 1024px)").matches;
  
    return mobileRegex.test(userAgent) || (isTouchDevice && isSmallScreen);
  }
  
  // Utility function to detect tablet devices
  export function isTabletDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
    // Enhanced regex for tablets
    const tabletRegex = /Tablet|iPad|PlayBook|Silk/i;
  
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  
    const isMediumScreen = window.matchMedia("(min-width: 600px) and (max-width: 1024px)").matches;
  
    return tabletRegex.test(userAgent) || (isTouchDevice && isMediumScreen);
  }
  
  // Utility function to detect desktop devices
  export function isDesktopDevice() {
    return !isMobileDevice() && !isTabletDevice();
  }
  