import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { loadLivePriceData } from './livePriceTV.js';
import { loadClanContent } from './clan.js';
import { loadMerchContent } from './merch.js';
import { loadVaultContent } from './vault.js';
import * as THREE from 'three';

export function loadBlenderScene(scene, hideLoadingScreen, loadingScreen) {
  const loader = new GLTFLoader();
  loader.load(
    '/MLG/scene.glb',
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      console.log('Blender scene loaded:', model);

      // If animations exist, initialize the mixer
      let mixer = null;
      if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      }

      // Hide the loading screen after everything is loaded
      hideLoadingScreen(loadingScreen);
      
      // Call the function to load live price data
      loadLivePriceData(model);

      // Locate the tv screen
      let tvNavMenu;
      model.traverse((child) => {
        if (child.name === 'p_int_monitor_c_bink_LOD0') {
          tvNavMenu = child;
        }
      });

      if (tvNavMenu) {
        // Add the HTML menu to the TV screen
        const menuDiv = document.createElement('div');
        menuDiv.innerHTML = `
          <div class="nav-tv">
            <div class="menu-item" data-target="lobby">Lobby</div>
            <div class="menu-item" data-target="vault">Vault</div>
            <div class="menu-item" data-target="merch">Merch</div>
            <div class="menu-item" data-target="clan">Clan</div>
          </div>
        `;

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
            
            if (target === 'clan') {
              loadClanContent(model); // Call the clan content loader
            }
            if (target === 'merch') {
              loadMerchContent(model); // Call the merch content loader
            }
            if (target === 'vault') {
              loadVaultContent(model); // Call the merch content loader
            }
            if (target === 'lobby') {
              loadLobbyContent(model); // Call the merch content loader
            }
            // Handle other menu items if needed...
          });
        });
      }

      
        // Locate the TV screen
        let tvStockChart;
        model.traverse((child) => {
          if (child.name === 'p_int_monitor_b_ui3d_LOD0') {
            tvStockChart = child;
          }
        });

        if (tvStockChart) {
        // Create a container div for the video
            const videoDiv = document.createElement('div');
            videoDiv.innerHTML = `
                <div class="stock-chart">
                <video autoplay loop muted>
                    <source src="/MLG/IlluminatiStockChart.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                </div>
            `;

            // Wrap the div in a CSS3DObject for placement
            const videoObject = new CSS3DObject(videoDiv);
            videoObject.position.set(-3.9, 0, 0); // Adjust as needed based on TV's position
            tvStockChart.add(videoObject);
      }
        
    }
  );
}

// Helper function to clear previous content
function clearTVs(model) {
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