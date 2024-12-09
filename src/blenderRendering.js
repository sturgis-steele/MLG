import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { initializeAnimationMixer } from './animationManager.js';
import { initializeMusicPlayerWithInteraction } from './musicPlayer.js';
import { loadLiveData } from './livePriceTV.js';
import { initializeTVNavMenu, clearTVs, findChildByName } from './tvNavMenu.js'; // Import functions
import { initializeRollingPaperWithInteraction } from './rollingPaper.js';
import { initializeCameraControls, enableCamera, disableCamera } from './cameraControls.js';
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
  
      initializeAnimationMixer(model, gltf.animations);
      hideLoadingScreen(loadingScreen);
      initializeMusicPlayerWithInteraction(model, scene, camera, renderer);
      loadLiveData(model);
      initializeTVNavMenu(model, clearTVs);
      initializeLoopingVideoTVs(model);
  
      const cameraControls = initializeCameraControls(camera);
      const { unlockCamera } = initializeRollingPaperWithInteraction(model, scene, camera, renderer);
  
      // Ensure unlock button is added or exists in the DOM
      let unlockButton = document.getElementById('unlock-button');
      if (!unlockButton) {
        unlockButton = document.createElement('button');
        unlockButton.id = 'unlock-button';
        unlockButton.textContent = 'Unlock Camera';
        document.body.appendChild(unlockButton);
      }
  
      unlockButton.addEventListener('click', () => {
        unlockCamera();
      });
    }
  );
}  