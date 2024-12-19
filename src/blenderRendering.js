import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { initializeAnimationMixer } from './animationManager.js';
import { initializeMusicPlayerWithInteraction } from './musicPlayer.js';
import { initializeGrenade } from './grenade.js';
import { loadLiveData } from './livePriceTV.js';
import { initializeStartScreen, hideLoadingScreen } from './loadingScreen.js';
import { initializeTVNavMenu, clearTVs } from './tvNavMenu.js';
import { initializeRollingPaperWithInteraction } from './rollingPaper.js';
import { initializeLoopingVideoTVs } from './loopingVideoTVs.js';
import { initializeMountainJew } from './mountainJew.js';

export function loadBlenderScene(scene, camera, renderer) {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/'); // Hosted by Google
  loader.setDRACOLoader(dracoLoader);

  // Initialize the start screen with a callback to load the scene
  initializeStartScreen((loadingScreen) => {
    loader.load(
      '/MLG/scene.glb',
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        console.log('Blender scene loaded:', model);

        // Hide the loading screen after the model is loaded\
        setTimeout(() => {
          hideLoadingScreen(loadingScreen);
        }, 3000);

        // Initialize various components and interactions
        initializeAnimationMixer(model, gltf.animations);
        initializeMusicPlayerWithInteraction(model, scene, camera, renderer);
        initializeGrenade(scene);
        initializeMountainJew(scene);
        loadLiveData(model);
        initializeTVNavMenu(model, clearTVs);
        initializeLoopingVideoTVs(model);
        initializeRollingPaperWithInteraction(model, scene, camera, renderer);
      },
      undefined,
      (error) => {
        console.error('Error loading Blender scene:', error);
      }
    );
  });
}
