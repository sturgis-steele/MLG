import "./css/loadingScreen.css";
import { enableCamera, disableCamera } from "./cameraControls.js";

// Start screen
export function initializeStartScreen(onStartCallback) {
  const startScreen = document.createElement("div");
  startScreen.id = "start-screen"; // Style this in your CSS
  // Add the main content for the start screen
  startScreen.innerHTML = `
    <a class="button" href="#">START MATCH</a>
    <div class="disclaimer">
      <p>This website is entirely fan made and has no association with the deployer of $MLG cryptocurrency on the solana blockchain or any game studio. $MLG is a crypto asset with no intrinsic value or expectation of financial return. These 360noscope420blazeit coins are to be used for entertainment purposes only.</p>
    </div>
  `;

  document.body.appendChild(startScreen);

  // Attach event listener to the button
  const startButton = startScreen.querySelector(".button");
  startButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior

    // Add the 'pressed' class to simulate button press
    startButton.classList.add("pressed");

    // Delay hiding the start screen and showing the loading screen
    setTimeout(() => {
      hideStartScreen(startScreen); // Hide the start screen

      // Initialize and show the loading screen
      const loadingScreen = initializeLoadingScreen();
      showLoadingScreen(loadingScreen);

      // Call the callback to load the Blender scene
      if (onStartCallback) {
        onStartCallback(loadingScreen);
      }
    }, 400); // Allow button press animation to play
  });

  return startScreen; // Return the start screen for further manipulation
}

export function showStartScreen(startScreen) {
  startScreen.style.display = "flex"; // Show the start screen
  disableCamera(); // Disable camera movement
}

export function hideStartScreen(startScreen) {
  startScreen.style.display = "none"; // Hide the start screen
  enableCamera(); // Enable camera movement
}

// Load screen
export function initializeLoadingScreen() {
  const loadingScreen = document.createElement("div");
  loadingScreen.id = "loading-screen";

  // Detect device type
  const isPhone = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Choose the video source based on the device
  const videoSrc = isPhone
    ? "/MLG/dankloadscreen_phone.mp4" // Video for phones
    : "/MLG/dankloadscreen2.mp4"; // Video for desktops and tablets

  // Set up the video element
  loadingScreen.innerHTML = `
    <video playsinline autoplay muted loop>
      <source src="${videoSrc}" type="video/mp4">
    </video>
  `;

  document.body.appendChild(loadingScreen);

  return loadingScreen; // Return the loading screen for further manipulation
}

export function showLoadingScreen(loadingScreen) {
  loadingScreen.style.display = "flex";
  disableCamera(); // Ensure camera movement is disabled
}

export function hideLoadingScreen(loadingScreen) {
  loadingScreen.style.display = "none";
  enableCamera(); // Re-enable camera movement
}
