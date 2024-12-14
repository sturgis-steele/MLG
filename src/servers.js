import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export function loadServersContent(model) {
  const tvs = []; // Array to store references to all TVs and their videos
  let currentPlayingVideo = null; // Track the currently playing video

  // Helper function to initialize a TV
  function initializeTV(tv, videoSrc, position, title) {
    if (!tv) return;

    const videoElement = document.createElement('video');
    videoElement.setAttribute('autoplay', '');
    videoElement.setAttribute('loop', '');
    videoElement.setAttribute('muted', ''); // Start muted
    videoElement.innerHTML = `
      <source src="${videoSrc}" type="video/mp4">
      Your browser does not support the video tag.
    `;

    // Create a container for the video and title
    const serverDiv = document.createElement('div');
    serverDiv.className = 'servers-content';

    // Add the video to the container
    serverDiv.appendChild(videoElement);

    // Add the title as an overlay
    const titleElement = document.createElement('div');
    titleElement.className = 'server-title';
    titleElement.style.position = 'absolute';
    titleElement.style.bottom = '10px';
    titleElement.style.left = '50%';
    titleElement.style.width = '600px';
    titleElement.style.height = '40px';
    titleElement.style.transform = 'translateX(-50%)';
    titleElement.style.color = 'white';
    titleElement.style.fontSize = '24px';
    titleElement.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.7)';
    titleElement.style.background = 'rgba(0, 0, 0, 0.5)';
    titleElement.style.padding = '5px 10px';
    titleElement.innerText = title; // Set the title text

    serverDiv.appendChild(titleElement);

    const tvObject = new CSS3DObject(serverDiv);
    tvObject.position.set(...position); // Spread the position array into individual arguments
    tv.add(tvObject);

    // Add click event listener to play audio for this TV
    serverDiv.addEventListener('click', () => {
      playAudioForTV(videoElement);
    });

    // Store TV and video reference
    tvs.push({ tv, videoElement });
  }

  // Initialize TVs with content
  initializeTV(
    findChildByName(model, 'p_int_monitor_c_extracam_LOD0_3'),
    '/MLG/minecraftscreen.mp4',
    [-1270, 530, -3400],
    'Minecraft Server'
  );

  initializeTV(
    findChildByName(model, 'p_int_monitor_c_extracam_LOD0_1'),
    '/MLG/gtascreen.mp4',
    [-1270, -425, -3400],
    'GTA Server'
  );

  initializeTV(
    findChildByName(model, 'p_int_monitor_c_extracam_LOD0'),
    '/MLG/ServerTBD.mp4',
    [-1300, -425, -3900],
    'TBD Server'
  );

  initializeTV(
    findChildByName(model, 'p_int_monitor_c_extracam_LOD0_2'),
    '/MLG/CODServer.mp4',
    [-1300, 530, -3900],
    'Call of Duty Server'
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
