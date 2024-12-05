import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { initializeLoadingScreen, showLoadingScreen, hideLoadingScreen } from './loadingScreen.js';
import { setupLighting } from './lighting.js';
import { initializeHitmarker } from './hitmarker.js';
import { initializeCameraControls } from './cameraControls.js';
import { loadBlenderScene } from './blenderRendering.js';

let mixer;


// Initialize the loading screen
const loadingScreen = initializeLoadingScreen();
showLoadingScreen(loadingScreen);

// Initialize hitmarker functionality
initializeHitmarker();

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Call Blender rendering function
loadBlenderScene(scene, hideLoadingScreen, loadingScreen);

// Setup lighting
setupLighting(scene);

// Setup camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 27, 1500);
camera.position.set(10, 143.5, 0);
camera.lookAt(100, 120, 15);

// Initialize camera controls
initializeCameraControls(camera);

// Setup renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Set the cursor style to crosshair
document.body.style.cursor = 'crosshair';

// Create CSS3DRenderer for HTML menu overlay
const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
document.body.appendChild(cssRenderer.domElement);

// Handle resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// 7. Animation loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  if (mixer) {
    const delta = clock.getDelta();
    mixer.update(delta);
  }

  renderer.render(scene, camera);
  cssRenderer.render(scene, camera);
}

animate();
