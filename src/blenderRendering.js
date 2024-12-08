import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { initializeAnimationMixer } from './animationManager.js';
import { loadLiveData } from './livePriceTV.js';
import { initializeTVNavMenu } from './tvNavMenu.js';
import { initializeLoopingVideoTVs } from './loopingVideoTVs.js';
import * as THREE from 'three';

export function loadBlenderScene(scene, hideLoadingScreen, loadingScreen) {
  const loader = new GLTFLoader();
  loader.load(
    '/MLG/scene.glb',
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      console.log('Blender scene loaded:', model);

      // Initialize the animation mixer
      initializeAnimationMixer(model, gltf.animations);

      // Hide the loading screen after everything is loaded
      hideLoadingScreen(loadingScreen);

      // Call the function to load live price data
      loadLiveData(model);

      // Initialize TV navigation menu
      initializeTVNavMenu(model, clearTVs);

      // Initialize looping video TVs
      initializeLoopingVideoTVs(model);
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
