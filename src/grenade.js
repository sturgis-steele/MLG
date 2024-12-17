import './css/grenade.css';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export function initializeGrenade(scene) {
  const grenade = findGrenadeInScene(scene); // Find the grenade in the 3D scene
  if (!grenade) {
    console.error('Grenade object not found in the scene.');
    return;
  }

  grenade.userData.clickable = true; // Mark the grenade as interactive

  // Create the CSS overlay element
  const grenadeDiv = document.createElement('div');
  grenadeDiv.className = 'grenade-overlay';
  grenadeDiv.innerHTML = `<div class="grenade-hitbox"></div>`;

  // Attach the CSS object to the grenade's position
  const cssObject = new CSS3DObject(grenadeDiv);
  cssObject.position.set(440, -400, 275); // Position relative to the grenade
  cssObject.rotation.set(0, 0.9, 0);
  grenade.add(cssObject);

  let grenadeVideo = null; // Video will only be created on demand
  const grenadeHitbox = grenadeDiv.querySelector('.grenade-hitbox');

  // Event listener for click
  grenadeHitbox.addEventListener('click', () => {
    console.log('Grenade clicked! Playing video...');
    playGrenadeVideo();
  });

  // Function to dynamically play video
  function playGrenadeVideo() {
    // If the video already exists, prevent re-creation
    if (!grenadeVideo) {
      grenadeVideo = createGrenadeVideo();
      document.body.appendChild(grenadeVideo);

      // Cleanup video when it ends
      grenadeVideo.addEventListener('ended', () => {
        console.log('Grenade video ended. Cleaning up...');
        grenadeVideo.style.display = 'none';
        grenadeVideo.pause();
        grenadeVideo.currentTime = 0;
        grenadeVideo.remove(); // Remove from DOM
        grenadeVideo = null; // Reset video reference
      });
    }

    grenadeVideo.style.display = 'block';
    grenadeVideo.play().catch((error) => console.error('Error playing video:', error));
  }

  // Function to create and return video element
  function createGrenadeVideo() {
    const videoElement = document.createElement('video');
    videoElement.id = 'grenade-video';
    videoElement.src = getVideoSource();
    videoElement.autoplay = false;
    videoElement.loop = false;
    videoElement.controls = false;
    videoElement.style.display = 'none';
    videoElement.setAttribute('disablePictureInPicture', '');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('preload', 'auto'); // Lazy load optimization
    return videoElement;
  }

  // Function to determine the appropriate video source
  function getVideoSource() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile ? '/MLG/grenadeMobile.mp4' : '/MLG/grenade.mp4';
  }
}

// Helper function to find the grenade in the scene
function findGrenadeInScene(scene) {
  let grenade = null;
  scene.traverse((child) => {
    if (child.name === 'GrenadeBody_low') {
      grenade = child;
    }
  });
  return grenade;
}
