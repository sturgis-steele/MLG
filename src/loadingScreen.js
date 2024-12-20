import "./css/loadingScreen.css";
import { enableCamera, disableCamera } from "./cameraControls.js";
import { isMobileDevice } from "./deviceDetection.js";

// Start screen
export function initializeStartScreen(onStartCallback) {
  const startScreen = document.createElement("div");
  startScreen.id = "start-screen"; // Style this in your CSS
  startScreen.innerHTML = `
    <a class="button" href="#">START MATCH</a>
    <div class="disclaimer">
      <p>This website is entirely fan made and has no association with the deployer of $MLG cryptocurrency on the solana blockchain. $MLG has no affiliation with "Major League Gaming" or any brands parodied in this website. $MLG is a crypto asset with no intrinsic value or expectation of financial return. These 360noscope420blazeit coins are to be used for entertainment purposes only.</p>
    </div>
      `;

  document.body.appendChild(startScreen);

  // Attach event listener to the button
  const startButton = startScreen.querySelector(".button");
  startButton.addEventListener("click", (event) => {
    event.preventDefault();
    startButton.classList.add("pressed");

    // Add slight delay for button press animation
    setTimeout(() => {
      hideStartScreen(startScreen);

      // Initialize and show the loading screen
      const loadingScreen = initializeLoadingScreen();
      showLoadingScreen(loadingScreen);

      // Callback to load the Blender scene
      if (onStartCallback) {
        onStartCallback(loadingScreen);
      }
    }, 400);
  });

  return startScreen;
}

export function showStartScreen(startScreen) {
  startScreen.style.display = "flex";
  disableCamera();
}

export function hideStartScreen(startScreen) {
  startScreen.style.display = "none";
  enableCamera();
}

// Load screen
export function initializeLoadingScreen() {
  const loadingScreen = document.createElement("div");
  loadingScreen.id = "loading-screen";

  // Use isMobileDevice() for device detection
  const videoSrc = isMobileDevice()
    ? "/MLG/dankloadscreen_phone.mp4" // Optimized for phones
    : "/MLG/dankloadscreen2.mp4"; // Desktop/tablet version

  // Create video element with lazy loading
  const videoElement = document.createElement("video");
  videoElement.setAttribute("playsinline", ""); // Mobile compatibility
  videoElement.setAttribute("autoplay", "");
  videoElement.setAttribute("muted", "true");
  videoElement.muted = true; // For Safari
  videoElement.setAttribute("loop", "");
  videoElement.setAttribute("preload", "none"); // Lazy load
  videoElement.style.display = "block";
  videoElement.innerHTML = `<source src="${videoSrc}" type="video/mp4">`;

  loadingScreen.appendChild(videoElement);
  document.body.appendChild(loadingScreen);

  // Cleanup DOM when the video ends
  videoElement.addEventListener("ended", () => {
    console.log("Loading video ended, cleaning up...");
    hideLoadingScreen(loadingScreen);
    videoElement.remove(); // Remove video element
  });

  return loadingScreen;
}

export function showLoadingScreen(loadingScreen) {
  loadingScreen.style.display = "flex";
  disableCamera();
}

export function hideLoadingScreen(loadingScreen) {
  loadingScreen.style.display = "none";
  enableCamera();

  // Cleanup: Remove the loading screen from DOM
  setTimeout(() => {
    if (loadingScreen && loadingScreen.parentElement) {
      console.log("Removing loading screen from DOM...");
      loadingScreen.remove();
    }
  }, 500); // Allow smooth fade-out transition
}
