import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { pauseMusic, resumeMusic } from './musicPlayer.js';
import { loadLobbyContent } from './lobby.js';
import { loadVaultContent, clearVaultTVs } from './vault.js';
import { loadServersContent } from './servers.js';
import { loadClanContent } from './clan.js';
import './css/tvNavMenu.css';

// Function to create and attach the TV navigation menu
export function initializeTVNavMenu(model, clearTVs) {
  let tvNavMenu;

  // Locate the TV for the navigation menu
  model.traverse((child) => {
    if (child.name === 'TV1') {
      tvNavMenu = child;
    }
  });

  if (tvNavMenu) {
    // Create the navigation menu as a div
    const menuDiv = document.createElement('div');
    menuDiv.innerHTML = `
      <div class="nav-tv">
        <div class="menu-item" data-target="lobby">LOBBY</div>
        <div class="menu-item" data-target="clan">CLAN</div>
        <div class="menu-item" data-target="servers">SERVERS</div>
        <div class="menu-item" data-target="vault">VAULT</div>
      </div>
    `;

    // Wrap the menu in a CSS3DObject
    const menuObject = new CSS3DObject(menuDiv);
    menuObject.position.set(-20.1, 21, -269); // Adjust based on the TV's position in the Blender model
    tvNavMenu.add(menuObject);

    // Add click event listener to menu items
    menuDiv.querySelectorAll('.menu-item').forEach((item) => {
      item.addEventListener('click', (event) => {
        const target = event.target.dataset.target;
        console.log(`Menu item clicked: ${target}`);

        // Clear previous content
        clearTVs(model);
        
        // Load the corresponding content
        if (target === 'lobby') {
          loadLobbyContent(model);
          clearVaultTVs(model);
        }
        if (target === 'servers') {
          loadServersContent(model);
          clearVaultTVs(model);
        }
        if (target === 'vault') {
          loadVaultContent(model);
          pauseMusic(); 
        }
        if (target === 'clan') {
          loadClanContent(model);
          clearVaultTVs(model);
        }
      });
    });
  }

  // Initialize static TV screens with default video
  initializeStaticTVs(model);
}

// Initialize TVs with static videos before navigation
function initializeStaticTVs(model) {
  // Define video paths
  const staticVideoSrc1 = '/MLG/tv_content/videos/TV_static1.mp4'; // Default static video
  const staticVideoSrc2 = '/MLG/tv_content/videos/TV_static.mp4'; // New static video
  
  // Define TV names, positions, and rotations
  const tvNames = ['TV6', 'TV6','TV7', 'TV7'];
  const positions = [
    [2500, 500, -1750],  // Position for TV6 (top left)
    [2500, -415, -1750], // Position for TV6 (bottom left)
    [1195, 450, -2050],  // Position for TV7 (top right)
    [1195, -380, -2050], // Position for TV7 (bottom right)
  ];
  const rotations = [
    { x: 0, y: -1.2, z: 0 }, // Rotation for TV6 (top left)
    { x: 0, y: -1.2, z: 0 }, // Rotation for TV6 (bottom left)
    { x: 0, y: -0.9, z: 0 }, // Rotation for TV7 (top right)
    { x: 0, y: -0.9, z: 0 }, // Rotation for TV7 (bottom right)
  ];

  tvNames.forEach((tvName, index) => {
    const tv = findChildByName(model, tvName);
    if (tv) {
      const videoElement = document.createElement('video');
      // Assign static video based on index
      videoElement.src = index === 0 || index === 3 ? staticVideoSrc2 : staticVideoSrc1;
      videoElement.setAttribute('autoplay', '');
      videoElement.setAttribute('loop', '');
      videoElement.setAttribute('disablePictureInPicture', '');
      videoElement.setAttribute('playsinline', '');
      videoElement.muted = true; // Start muted
      
      // Assign specific CSS class based on TV name
      const cssClass = tvName === 'TV6' ? 'tv6-content' : tvName === 'TV7' ? 'tv7-content' : '';
      
      const videoDiv = document.createElement('div');
      videoDiv.className = `tv-static-content ${cssClass}`; // Apply class dynamically
      videoDiv.appendChild(videoElement);
      
      const videoObject = new CSS3DObject(videoDiv);
      videoObject.position.set(...positions[index]); // Set position
      videoObject.rotation.set(rotations[index].x, rotations[index].y, rotations[index].z); // Set rotation
      tv.add(videoObject);
    }
  });
}


// Helper function to clear previous content from TVs
export function clearTVs(model) {
  const tvNames = ['TV6', 'TV7']; // Target TVs dynamically if needed

  tvNames.forEach((tvName) => {
    const tv = findChildByName(model, tvName);
    if (tv && tv.children) {
      // Filter and remove all CSS3DObjects
      const childrenToRemove = tv.children.filter((child) => child.isCSS3DObject);
      childrenToRemove.forEach((child) => {
        tv.remove(child);
        console.log(`Removed CSS3DObject: ${child}`);
      });
    } else {
      console.warn(`TV ${tvName} not found or has no children.`);
    }
  });

  // Resume music after all clearing
  resumeMusic();
  console.log('Cleared all specified TVs and resumed music.');
}


// Helper function to find a child by name
export function findChildByName(model, name) {
  let result = null;
  model.traverse((child) => {
    if (child.name === name) {
      result = child;
    }
  });
  return result;
}
