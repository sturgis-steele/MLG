import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { loadClanContent } from './clan.js';
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

            if (target === 'clan') {
              loadClanContent(model); // Call the clan content loader
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
