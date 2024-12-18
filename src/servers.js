import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import './css/servers.css'; // Import the CSS file

export function loadServersContent(model) {
  // Helper function to initialize a TV
  function initializeTV(tv, imageSrc, position, rotation = { x: 0, y: 0, z: 0 }, title, tvClass) {
    if (!tv) {
      console.error(`TV not found for ${tvClass}`);
      return;
    }

    console.log(`Initializing TV: ${tvClass}`, tv);

    // Create an image element
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.alt = title;
    imageElement.className = 'server-image';
    imageElement.style.width = '100%';
    imageElement.style.height = '100%';

    // Create a container for the image and title
    const serverDiv = document.createElement('div');
    serverDiv.className = `servers-content ${tvClass}`;

    // Add the image to the container
    serverDiv.appendChild(imageElement);

    // Add the title as an overlay
    const titleElement = document.createElement('div');
    titleElement.className = 'server-title';
    titleElement.innerText = title;

    serverDiv.appendChild(titleElement);

    const tvObject = new CSS3DObject(serverDiv);
    tvObject.position.set(...position); // Set position
    tvObject.rotation.set(rotation.x, rotation.y, rotation.z); // Set rotation
    tv.add(tvObject);
  }

  // Initialize TVs with content and specific CSS classes for TV6 and TV7
  initializeTV(
    findChildByName(model, 'TV6'),
    '/MLG/tv_content/images/codscreen1.webp',
    [2500, 500, -1750],
    { x: 0, y: -1.2, z: 0 },
    'Call of Duty',
    'tv6-content'
  );

  initializeTV(
    findChildByName(model, 'TV6'),
    '/MLG/tv_content/images/Minecraftscreen.webp',
    [2500, -415, -1750],
    { x: 0, y: -1.2, z: 0 },
    'Minecraft',
    'tv6-content'
  );

  initializeTV(
    findChildByName(model, 'TV7'),
    '/MLG/tv_content/images/GTA5screen.webp',
    [1195, 450, -2050],
    { x: 0, y: -0.9, z: 0 },
    'GTA V',
    'tv7-content'
  );

  initializeTV(
    findChildByName(model, 'TV7'),
    '/MLG/tv_content/images/TBDscreen.webp',
    [1195, -380, -2050],
    { x: 0, y: -0.9, z: 0 },
    'TBD',
    'tv7-content'
  );
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
