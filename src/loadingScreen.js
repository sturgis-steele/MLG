import './css/loadingScreen.css';
import { enableCamera, disableCamera } from './cameraControls.js';

export function initializeLoadingScreen() {
  // Create the loading screen element dynamically
  const loadingScreen = document.createElement('div');
  loadingScreen.id = 'loading-screen';
  loadingScreen.innerHTML = `
    <video autoplay muted loop>
      <source src="/MLG/dankloadscreen2.mp4" type="video/mp4">
    </video>
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
  enableCamera(); // Ensure camera movement is disabled
}

  