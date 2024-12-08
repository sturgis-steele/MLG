import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// Function to initialize looping video TVs
export function initializeLoopingVideoTVs(model) {
  const tvVideoMappings = [
    {
      tvName: 'p_int_monitor_b_ui3d_LOD0', // Replace with the Blender object name for the TV
      videoSrc: '/MLG/IlluminatiStockChart.mp4', // Path to the video file
      position: { x: -3.9, y: 0, z: 0 }, // Adjust the position of the video
      cssClass: 'stock-chart', // Add a CSS class for styling
    },
    // Add more TVs with their respective video sources and positions if needed
    // Example:
    // {
    //   tvName: 'p_int_monitor_c_ui3d_LOD0',
    //   videoSrc: '/MLG/AnotherVideo.mp4',
    //   position: { x: 1.5, y: 0, z: 0 },
    // },
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
