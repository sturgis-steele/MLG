import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import './css/vault.css';
import { pauseMusic, resumeMusic, audio } from './musicPlayer.js';

export function loadVaultContent(model) {
  const tvs = []; // Array to store references to all TVs and their videos
  let currentPlayingVideo = null; // Track the currently playing video
  let isVaultPlaying = false; // Track if any vault video is playing
  
  // Pause music when entering the vault
  console.log('Entering Vault: Pausing Music...');
  
  // Helper function to initialize a TV
  function initializeTV(tv, videoSrc, position, rotation = { x: 0, y: 0, z: 0 }, tvClass) {
    if (!tv) {
      console.error(`TV not found for ${tvClass}`);
      return;
    }
  
    console.log(`Initializing TV: ${tvClass}`, tv);
  
    const videoElement = document.createElement('video');
    videoElement.setAttribute('autoplay', '');
    videoElement.setAttribute('loop', '');
    videoElement.setAttribute('muted', ''); // Start muted
    videoElement.setAttribute('playsinline', ''); // Required for iOS
    videoElement.setAttribute('disablePictureInPicture', ''); // Disable PiP mode
    videoElement.className = tvClass; // Apply specific class to the video element
    videoElement.innerHTML = `
      <source src="${videoSrc}" type="video/mp4">
      Your browser does not support the video tag.
    `;
  
    const vaultDiv = document.createElement('div');
    vaultDiv.className = 'vault-content'; // General styles
    vaultDiv.appendChild(videoElement);
  
    const tvObject = new CSS3DObject(vaultDiv);
    tvObject.position.set(...position); // Set position
    tvObject.rotation.set(rotation.x, rotation.y, rotation.z); // Set rotation
    tv.add(tvObject);
  
    // Add click event listener to play audio for this TV
    videoElement.addEventListener('click', () => {
      console.log('Click event triggered for:', videoElement);
      playAudioForTV(videoElement);
    });
  
    // Test video playback
    videoElement.play().then(() => {
      console.log('Video is playing:', videoElement);
    }).catch((error) => {
      console.error('Error playing video:', error);
    });
  
    // Store TV and video reference
    tvs.push({ tvObject, videoElement });
  }
  

  // Initialize TVs with content and specific CSS classes
  initializeTV(
    findChildByName(model, 'TV6'),
    '/MLG/IMG_0747.MP4',
    [2500, 500, -1750], // Position
    { x: 0, y: -1.2, z: 0 }, // Rotation
    'vault-tv6-1' // Specific CSS class
  );

  initializeTV(
    findChildByName(model, 'TV6'),
    '/MLG/IMG_0749.MP4',
    [2500, -415, -1750], // Position
    { x: 0, y: -1.2, z: 0 }, // Rotation
    'vault-tv6-2' // Specific CSS class
  );

  initializeTV(
    findChildByName(model, 'TV7'),
    '/MLG/IMG_0746.MP4',
    [1195, 450, -2050], // Position
    { x: 0, y: -0.9, z: 0 }, // Rotation
    'vault-tv7-1' // Specific CSS class
  );

  initializeTV(
    findChildByName(model, 'TV7'),
    '/MLG/IMG_0743.MP4',
    [1195, -380, -2050], // Position
    { x: 0, y: -0.9, z: 0 }, // Rotation
    'vault-tv7-2' // Specific CSS class
  );

  initializeTV(
    findChildByName(model, 'TV8'),
    '/MLG/Fazemontage4.mp4',
    [807, 970, 3100], // Position
    { x: 0, y: 0, z: 0 }, // Rotation
    'vault-tv8' // Specific CSS class
  );

  initializeTV(
    findChildByName(model, 'TV8'),
    '/MLG/Fazesmontage2.mp4',
    [807, -140, 3100], // Position
    { x: 0, y: 0, z: 0 }, // Rotation
    'vault-tv8' // Specific CSS class
  );

  // Function to mute all TVs except the clicked one and pause the current video if clicked again
  function playAudioForTV(selectedVideo) {
    if (currentPlayingVideo === selectedVideo) {
      // If the selected TV is already playing, pause it
      selectedVideo.muted = true;
      selectedVideo.pause();
      currentPlayingVideo = null; // Reset the current playing video

      if (!tvs.some(({ videoElement }) => !videoElement.paused)) {
        // If no other videos are playing, resume music
        console.log('All videos paused. Resuming music...');
        resumeMusic();
      }

    } else {
      // Otherwise, play the selected video and pause all others
      tvs.forEach(({ videoElement }) => {
        if (videoElement === selectedVideo) {
          videoElement.muted = false; // Unmute the selected video
          videoElement.play(); // Ensure it plays
          currentPlayingVideo = selectedVideo; // Update the current playing video
          pauseMusic(); // Pause music when a video is playing
        } else {
          videoElement.muted = true; // Mute all others
          videoElement.pause(); // Pause muted videos
        }
      });
    }
  }
}

// Function to clear vault TVs
export function clearVaultTVs() {
  console.log('Clearing specific vault TVs...');

  // List of video sources to clear
  const videoSourcesToClear = [
    '/MLG/Fazemontage4.mp4', // Replace with the actual path to the video
    '/MLG/Fazesmontage2.mp4'  // Add more video sources as needed
  ];

  // Select all video elements in the DOM
  const videoElements = document.querySelectorAll('video');

  videoElements.forEach((videoElement) => {
    if (videoSourcesToClear.includes(videoElement.src)) {
      console.log(`Clearing video: ${videoElement.src}`);
      videoElement.pause(); // Stop the video
      videoElement.currentTime = 0; // Reset video to the beginning
      videoElement.parentElement.style.display = 'none'; // Hide the parent element
    }
  });
}

// Helper function to find child by name
function findChildByName(model, name) {
  let result = null;
  model.traverse((child) => {
    if (child.name === name) {
      result = child;
    }
  });
  return result;
}
