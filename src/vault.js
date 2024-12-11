import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export function loadVaultContent(model) {
  const tvs = []; // Array to store references to all TVs and their videos
  let currentPlayingVideo = null; // Track the currently playing video

  // Helper function to initialize a TV
  function initializeTV(tv, videoSrc, position) {
    if (!tv) return;

    const videoElement = document.createElement('video');
    videoElement.setAttribute('autoplay', '');
    videoElement.setAttribute('loop', '');
    videoElement.setAttribute('muted', ''); // Start muted
    videoElement.innerHTML = `
      <source src="${videoSrc}" type="video/mp4">
      Your browser does not support the video tag.
    `;

    const vaultDiv = document.createElement('div');
    vaultDiv.className = 'vault-content';
    vaultDiv.appendChild(videoElement);

    const tvObject = new CSS3DObject(vaultDiv);
    tvObject.position.set(...position); // Spread the position array into individual arguments
    tv.add(tvObject);

    // Add click event listener to play audio for this TV
    vaultDiv.addEventListener('click', () => {
      playAudioForTV(videoElement);
    });

    // Store TV and video reference
    tvs.push({ tv, videoElement });
  }

  // Initialize TVs with content
  initializeTV(
    findChildByName(model, 'p_int_monitor_c_extracam_LOD0_3'),
    '/MLG/IMG_0747.MP4',
    [-1270, 530, -3400]
  );

  initializeTV(
    findChildByName(model, 'p_int_monitor_c_extracam_LOD0_1'),
    '/MLG/IMG_0749.MP4',
    [-1270, -425, -3400]
  );

  initializeTV(
    findChildByName(model, 'p_int_monitor_c_extracam_LOD0'),
    '/MLG/IMG_0746.MP4',
    [-1300, -425, -3900]
  );

  initializeTV(
    findChildByName(model, 'p_int_monitor_c_extracam_LOD0_2'),
    '/MLG/IMG_0743.MP4',
    [-1300, 530, -3900]
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
