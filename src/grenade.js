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
  grenadeDiv.className = 'grenade-overlay'; // Add your custom styles in grenade.css
  grenadeDiv.innerHTML = `<div class="grenade-hitbox"></div>`; // Hitbox for interaction

  // Attach the CSS object to the grenade's position
  const cssObject = new CSS3DObject(grenadeDiv);
  cssObject.position.set(440, -400, 275); // Position relative to the grenade
  cssObject.rotation.set(0, .9, 0); // Rotation to face the camera
  grenade.add(cssObject);

  // Attach event listener to the hitbox for interaction
  const grenadeHitbox = grenadeDiv.querySelector('.grenade-hitbox');
  grenadeHitbox.addEventListener('click', () => {
    console.log('Grenade clicked! Playing video...');
    playGrenadeVideo();
  });

  // Create the video element dynamically
  const grenadeVideo = document.createElement('video');
  grenadeVideo.id = 'grenade-video';
  grenadeVideo.src = '/MLG/grenade.mp4'; // Path to the Easter egg video
  grenadeVideo.autoplay = false;
  grenadeVideo.loop = false;
  grenadeVideo.controls = false;
  grenadeVideo.style.display = 'none'; // Initially hidden
  document.body.appendChild(grenadeVideo);

  // Function to play the video
  function playGrenadeVideo() {
    grenadeVideo.style.display = 'block'; // Make the video visible
    grenadeVideo.play().catch((error) => {
      console.error('Error playing grenade video:', error);
    });

    // Add an event listener to hide the video when playback ends
    grenadeVideo.addEventListener('ended', () => {
      grenadeVideo.style.display = 'none'; // Hide the video after playback
    });
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
