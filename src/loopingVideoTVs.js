import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import './css/loopingVideoTVs.css'; // Import the new CSS file

// Function to initialize looping video TVs
export function initializeLoopingVideoTVs(model) {

  const tvVideoMappings = [
    {
      tvName: 'TV4', // Replace with the Blender object name for the TV
      videoSrc: '/MLG/tv_content/videos/Illuminatistockchart.webm', // Path to the video file
      position: { x: 3650, y: 720, z: -4425 }, // Adjust the position of the video
      rotation: { x: 0, y: -.6, z: 0 }, // Adjust rotation for this TV (in radians)
      cssClass: 'stock-chart', // Add a CSS class for styling
    },
    {
      tvName: 'TV8', // Replace with the Blender object name for the TV
      videoSrc: '/MLG/tv_content/videos/slideShow1.webm', // Path to the video file
      position: { x: 807, y: 970, z: 3100 }, // Adjust the position of the video
      rotation: { x: 0, y: 0, z: 0 }, // Adjust rotation for this TV (in radians)
      cssClass: 'looping-video', // Add a CSS class for styling
    },
    {
      tvName: 'TV8', // Replace with the Blender object name for the TV
      videoSrc: '/MLG/tv_content/videos/slideShow.webm', // Path to the video file
      position: { x: 807, y: -140, z: 3100 }, // Adjust the position of the video
      rotation: { x: 0, y: 0, z: 0 }, // Adjust rotation for this TV (in radians)
      cssClass: 'looping-video', // Add a CSS class for styling
    },
    // Add more TVs with their respective video sources, positions, and rotations if needed
  ];

  tvVideoMappings.forEach(({ tvName, videoSrc, position, rotation, cssClass }) => {
    const tv = findChildByName(model, tvName);
    if (tv) {
      // Create a container div for the video
      const videoDiv = document.createElement('div');
      videoDiv.innerHTML = `
        <div class="${cssClass}">
          <video playsinline autoplay loop muted loading="lazy">
            <source src="${videoSrc}" type="video/webm">
            Your browser does not support the video tag.
          </video>
        </div>
      `;

      // Wrap the div in a CSS3DObject for placement
      const videoObject = new CSS3DObject(videoDiv);
      videoObject.position.set(position.x, position.y, position.z);
      videoObject.rotation.set(rotation.x, rotation.y, rotation.z); // Apply rotation
      tv.add(videoObject);
    }
  });
}

// Helper function to find a child by name
function findChildByName(model, name) {
  let result = null;
  model.traverse((child) => {
    if (child.name === name) {
      result = child;
    }
  });
  return result;
}
