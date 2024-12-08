import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { initializeAnimationMixer } from './animationManager.js';
import { initializeMusicPlayerWithInteraction } from './musicPlayer.js';
import { loadLiveData } from './livePriceTV.js';
import { initializeTVNavMenu, clearTVs, findChildByName } from './tvNavMenu.js'; // Import functions
import { initializeLoopingVideoTVs } from './loopingVideoTVs.js';
import * as THREE from 'three';

export function loadBlenderScene(scene, hideLoadingScreen, loadingScreen, camera, renderer) {
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
      
      // Initialize music player with the loaded model for the gramophone click interaction
      initializeMusicPlayerWithInteraction(model, scene, camera, renderer);

      // Call the function to load live price data
      loadLiveData(model);

      // Initialize TV navigation menu
      initializeTVNavMenu(model, clearTVs);

      // Initialize looping video TVs
      initializeLoopingVideoTVs(model);

    }
  );
}
