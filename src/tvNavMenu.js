import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { loadLobbyContent } from './lobby.js';
import { loadVaultContent } from './vault.js';
import { loadMerchContent } from './merch.js';
import { loadClanContent } from './clan.js';

// Function to create and attach the TV navigation menu
export function initializeTVNavMenu(model, clearTVs) {
  let tvNavMenu;

  // Locate the TV for the navigation menu
  model.traverse((child) => {
    if (child.name === 'p_int_monitor_c_bink_LOD0') {
      tvNavMenu = child;
    }
  });

  if (tvNavMenu) {
    // Create the navigation menu as a div
    const menuDiv = document.createElement('div');
    menuDiv.innerHTML = `
      <div class="nav-tv">
        <div class="menu-item" data-target="lobby">Lobby</div>
        <div class="menu-item" data-target="vault">Vault</div>
        <div class="menu-item" data-target="merch">Merch</div>
        <div class="menu-item" data-target="clan">Clan</div>
      </div>
    `;

    // Wrap the menu in a CSS3DObject
    const menuObject = new CSS3DObject(menuDiv);
    menuObject.position.set(-1, 38.7, 0); // Adjust based on the TV's position in the Blender model
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
        if (target === 'vault') {
          loadVaultContent(model);
        }
        if (target === 'merch') {
          loadMerchContent(model);
        }
        if (target === 'clan') {
          loadClanContent(model);
        }
      });
    });
  }
}
