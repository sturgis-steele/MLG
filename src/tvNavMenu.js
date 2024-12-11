import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { loadLobbyContent } from './lobby.js';
import { loadVaultContent } from './vault.js';
import { loadServersContent } from './servers.js';
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
        <div class="menu-item" data-target="servers">Servers</div>
        <div class="menu-item" data-target="vault">Vault</div>
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
}


// Helper function to clear previous content from TVs
export function clearTVs(model) {
    const tvNames = [
      'p_int_monitor_c_extracam_LOD0_3',
      'p_int_monitor_c_extracam_LOD0_1',
      'p_int_monitor_c_extracam_LOD0',
      'p_int_monitor_c_extracam_LOD0_2'
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