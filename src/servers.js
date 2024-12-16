import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import './css/servers.css'; // Import the new CSS file

export function loadServersContent(model) {
  const tvs = []; // Array to store references to all TVs and their videos
  let currentPlayingVideo = null; // Track the currently playing video

  // Helper function to initialize a TV
  function initializeTV(tv, videoSrc, position, rotation = { x: 0, y: 0, z: 0 }, title, tvClass) {
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
    videoElement.innerHTML = `
      <source src="${videoSrc}" type="video/mp4">
      Your browser does not support the video tag.
    `;

    // Create a container for the video and title
    const serverDiv = document.createElement('div');
    serverDiv.className = `servers-content ${tvClass}`; // Apply general and specific class

    // Add the video to the container
    serverDiv.appendChild(videoElement);

    // Add the title as an overlay
    const titleElement = document.createElement('div');
    titleElement.className = 'server-title';
    titleElement.innerText = title; // Set the title text

    serverDiv.appendChild(titleElement);

    const tvObject = new CSS3DObject(serverDiv);
    tvObject.position.set(...position); // Set position
    tvObject.rotation.set(rotation.x, rotation.y, rotation.z); // Set rotation
    tv.add(tvObject);

    // Add click event listener to play audio for this TV
    serverDiv.addEventListener('click', () => {
      playAudioForTV(videoElement);
    });

    // Store TV and video reference
    tvs.push({ tv, videoElement });
  }

  // Initialize TVs with content and specific CSS classes for TV6 and TV7
  initializeTV(
    findChildByName(model, 'TV6'),
    '/MLG/blackopsscreen.mp4',
    [2500, 500, -1750], // Position
    { x: 0, y: -1.2, z: 0 }, // Rotation
    'Call of Duty',
    'tv6-content' // Specific CSS class for TV6
  );

  initializeTV(
    findChildByName(model, 'TV6'),
    '/MLG/minecraftscreen.mp4',
    [2500, -415, -1750], // Position
    { x: 0, y: -1.2, z: 0 }, // Rotation
    'Minecraft',
    'tv6-content' // Specific CSS class for TV6
  );

  initializeTV(
    findChildByName(model, 'TV7'),
    '/MLG/gtascreen.mp4',
    [1195, 450, -2050], // Position
    { x: 0, y: -0.9, z: 0 }, // Rotation
    'GTA V',
    'tv7-content' // Specific CSS class for TV7
  );

  initializeTV(
    findChildByName(model, 'TV7'),
    '/MLG/tbdscreen.mp4',
    [1195, -380, -2050], // Position
    { x: 0, y: -0.9, z: 0 }, // Rotation
    'TBD',
    'tv7-content' // Specific CSS class for TV7
  );

  // Function to mute all TVs except the clicked one and pause the current video if clicked again
  function playAudioForTV(selectedVideo) {
    if (currentPlayingVideo === selectedVideo) {
      // If the selected TV is already playing, pause it
      selectedVideo.muted = true;
      selectedVideo.pause();
      currentPlayingVideo = null; // Reset the current playing video
    } else {
      // Otherwise, play the selected video and pause all others
      tvs.forEach(({ videoElement }) => {
        if (videoElement === selectedVideo) {
          videoElement.muted = false; // Unmute the selected video
          videoElement.play(); // Ensure it plays
          currentPlayingVideo = selectedVideo; // Update the current playing video
        } else {
          videoElement.muted = true; // Mute all others
          videoElement.pause(); // Pause muted videos
        }
      });
    }
  }
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
