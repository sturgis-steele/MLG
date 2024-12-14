import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { loadLobbyContent } from './lobby.js';
import { loadVaultContent } from './vault.js';
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
        <div class="menu-item" data-target="lobby">Lobby</div>
        <div class="menu-item" data-target="servers">Servers</div>
        <div class="menu-item" data-target="vault">Vault</div>
        <div class="menu-item" data-target="clan">Clan</div>
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
        }
        if (target === 'servers') {
          loadServersContent(model);
        }
        if (target === 'vault') {
          loadVaultContent(model);
        }
        if (target === 'clan') {
          loadClanContent(model);
        }
      });
    });
  }

  // Initialize static TV screens with default video
  initializeStaticTVs(model);
}

// Initialize TVs with static videos before navigation
function initializeStaticTVs(model) {
  const staticVideoSrc = '/MLG/TV_static1.mp4'; // Default video path
  const tvNames = [
    'TV5',
    'TV6',
    'TV7',
    'TV8',
  ];
  const positions = [
    [-1270, 530, -3400],
    [-1270, -425, -3400],
    [-1300, -425, -3900],
    [-1300, 530, -3900],
  ];

  tvNames.forEach((tvName, index) => {
    const tv = findChildByName(model, tvName);
    if (tv) {
      const videoElement = document.createElement('video');
      videoElement.src = staticVideoSrc;
      videoElement.setAttribute('autoplay', '');
      videoElement.setAttribute('loop', '');
      videoElement.muted = true; // Start muted
      videoElement.style.width = '1020px';
      videoElement.style.overflow = 'hidden';
      videoElement.style.borderRadius = '180px'; // Adjust border radius for TV screen

      const videoDiv = document.createElement('div');
      videoDiv.className = 'tv-static-content';
      videoDiv.appendChild(videoElement);

      const videoObject = new CSS3DObject(videoDiv);
      videoObject.position.set(...positions[index]);
      tv.add(videoObject);
    }
  });
}

// Helper function to clear previous content from TVs
export function clearTVs(model) {
  const tvNames = [
    'TV5',
    'TV6',
    'TV7',
    'TV8',
  ];

  tvNames.forEach((tvName) => {
    const tv = findChildByName(model, tvName);
    if (tv) {
      // Remove all children that are dynamically added (CSS3DObject)
      for (let i = tv.children.length - 1; i >= 0; i--) {
        const child = tv.children[i];
        if (child.isCSS3DObject) {
          tv.remove(child);
        }
      }
    }
  });
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
