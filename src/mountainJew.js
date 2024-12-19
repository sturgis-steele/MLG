import './css/mountainJew.css'; // Updated CSS file for MountainJew
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { isMobileDevice } from './deviceDetection.js'; // Import the shared device detection function

export function initializeMountainJew(scene) {
  const mountainJew = findMountainJewInScene(scene); // Find the MountainJew box in the 3D scene
  if (!mountainJew) {
    console.error('MountainJew object not found in the scene.');
    return;
  }

  mountainJew.userData.clickable = true; // Mark the MountainJew box as interactive

  // Create the CSS overlay element
  const mountainJewDiv = document.createElement('div');
  mountainJewDiv.className = 'mountainJew-overlay';
  mountainJewDiv.innerHTML = `<div class="mountainJew-hitbox"></div>`;

  // Attach the CSS object to the MountainJew's position
  const cssObject = new CSS3DObject(mountainJewDiv);
  cssObject.position.set(42, 300, -18); // Position relative to the MountainJew box
  cssObject.rotation.set(1, 0, 0);
  mountainJew.add(cssObject);

  let mountainJewVideo = null; // Video will only be created on demand
  const mountainJewHitbox = mountainJewDiv.querySelector('.mountainJew-hitbox');

  // Event listener for click
  mountainJewHitbox.addEventListener('click', () => {
    console.log('MountainJew clicked! Playing video...');
    playMountainJewVideo();
  });

  // Function to dynamically play video
  function playMountainJewVideo() {
    // If the video already exists, prevent re-creation
    if (!mountainJewVideo) {
      mountainJewVideo = createMountainJewVideo();
      document.body.appendChild(mountainJewVideo);

      // Cleanup video when it ends
      mountainJewVideo.addEventListener('ended', () => {
        console.log('MountainJew video ended. Cleaning up...');
        mountainJewVideo.style.display = 'none';
        mountainJewVideo.pause();
        mountainJewVideo.currentTime = 0;
        mountainJewVideo.remove(); // Remove from DOM
        mountainJewVideo = null; // Reset video reference
      });
    }

    mountainJewVideo.style.display = 'block';
    mountainJewVideo.play().catch((error) => console.error('Error playing video:', error));
  }

  // Function to create and return video element
  function createMountainJewVideo() {
    const videoElement = document.createElement('video');
    videoElement.id = 'mountainJew-video';
    videoElement.src = '/MLG/mountainJew.webm'; // Use the same video source
    videoElement.autoplay = false;
    videoElement.loop = false;
    videoElement.controls = false;
    videoElement.setAttribute('muted', 'false'); // Mute by default
    videoElement.style.display = 'none';
    videoElement.setAttribute('disablePictureInPicture', '');
    videoElement.setAttribute('playsinline', '');
    return videoElement;
  }
}

// Helper function to find the MountainJew box in the scene
function findMountainJewInScene(scene) {
  let mountainJew = null;
  scene.traverse((child) => {
    if (child.name === 'Object_2') {
      mountainJew = child;
    }
  });
  return mountainJew;
}
