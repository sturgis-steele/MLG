import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import './css/loopingVideoTVs.css'; // Import the new CSS file

// Function to initialize looping video TVs
export function initializeLoopingVideoTVs(model) {
  const tvVideoMappings = [
    {
      tvName: 'TV4', // Replace with the Blender object name for the TV
      videoSrc: '/MLG/IlluminatiStockChart.mp4', // Path to the video file
      position: { x: -380, y: 720, z: -5500 }, // Adjust the position of the video
      cssClass: 'stock-chart', // Add a CSS class for styling
    },
    {
      tvName: 'TV10', // Replace with the Blender object name for the TV
      videoSrc: '/MLG/IMG_0740.MP4', // Path to the video file
      position: { x: -1060, y: -170, z: -3150 }, // Adjust the position of the video
      cssClass: 'looping-video', // Add a CSS class for styling
    },
    {
      tvName: 'TV11', // Replace with the Blender object name for the TV
      videoSrc: '/MLG/IMG_0763.MP4', // Path to the video file
      position: { x: -1050, y: 930, z: -3150 }, // Adjust the position of the video
      cssClass: 'looping-video', // Add a CSS class for styling
    },
    // Add more TVs with their respective video sources and positions if needed
  ];

  tvVideoMappings.forEach(({ tvName, videoSrc, position, cssClass }) => {
    const tv = findChildByName(model, tvName);
    if (tv) {
      // Create a container div for the video
      const videoDiv = document.createElement('div');
      videoDiv.innerHTML = `
        <div class="${cssClass}">
          <video autoplay loop muted>
            <source src="${videoSrc}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      `;

      // Wrap the div in a CSS3DObject for placement
      const videoObject = new CSS3DObject(videoDiv);
      videoObject.position.set(position.x, position.y, position.z);
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
