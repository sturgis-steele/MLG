import './style.css';
import { enableCamera, disableCamera } from './cameraControls.js';

export function initializeLoadingScreen() {
  // Create the loading screen element dynamically
  const loadingScreen = document.createElement('div');
  loadingScreen.id = 'loading-screen';
  loadingScreen.innerHTML = `
    <div id="loading-container">
      <div id="loading-bar"></div>
      <p>Loading...</p>
    </div>
  `;
  document.body.appendChild(loadingScreen);

  return loadingScreen; // Return the loading screen for further manipulation
}

export function showLoadingScreen(loadingScreen) {
  loadingScreen.style.display = 'flex';
  disableCamera(); // Ensure camera movement is disabled
}

export function hideLoadingScreen(loadingScreen) {
  loadingScreen.style.display = 'none';
  enableCamera(); // Enable camera movement when loading is complete
}

export function updateLoadingBar(progress) {
  const loadingBar = document.getElementById('loading-bar');
  if (loadingBar) {
    loadingBar.style.width = `${progress}%`; // Update the width of the loading bar
  }
}
