import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// Add a hitmarker on click
document.addEventListener('click', (e) => {
  const hitmarker = document.createElement('div');
  hitmarker.className = 'hitmarker';

  let x, y;
  if (document.pointerLockElement) {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
  } else {
    x = e.pageX;
    y = e.pageY;
  }

  hitmarker.style.left = `${x - 20}px`;
  hitmarker.style.top = `${y - 20}px`;

  document.body.appendChild(hitmarker);

  setTimeout(() => {
    hitmarker.remove();
  }, 600);
});

let mixer;

// 1. Set up the scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 27, 1500);
camera.position.set(10, 143.5, 0);
camera.lookAt(100, 120, 15);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Set the cursor style to crosshair
document.body.style.cursor = 'crosshair';

// Variables to track yaw and pitch
let yaw = 0; // Horizontal rotation (left/right)
let pitch = 0; // Vertical rotation (up/down)

// Add event listeners for mouse movement to control the camera
document.addEventListener('mousemove', (event) => {
  const movementX = event.movementX || 0;
  const movementY = event.movementY || 0;

  // Update yaw (left/right) and pitch (up/down)
  yaw -= movementX * 0.002; // Adjust sensitivity
  pitch -= movementY * 0.002;

  // Constrain pitch to prevent flipping the camera upside down
  const maxPitch = Math.PI / 2 - 0.1; // Slightly less than 90 degrees
  const minPitch = -Math.PI / 2 + 0.1; // Slightly more than -90 degrees
  pitch = Math.max(minPitch, Math.min(maxPitch, pitch));

  // Create a quaternion for the camera's rotation
  const quaternion = new THREE.Quaternion();

  // Apply yaw (horizontal rotation around Y-axis)
  const yawQuaternion = new THREE.Quaternion();
  yawQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);

  // Apply pitch (vertical rotation around X-axis)
  const pitchQuaternion = new THREE.Quaternion();
  pitchQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), pitch);

  // Combine the yaw and pitch rotations
  quaternion.multiply(yawQuaternion).multiply(pitchQuaternion);

  // Set the camera's rotation using the quaternion
  camera.quaternion.copy(quaternion);
});


// 3. Add lighting
// Add a glowing white sphere
const geometry = new THREE.SphereGeometry(5, 32, 32);

// Use MeshPhysicalMaterial for reflective and emissive effects
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff, // Base color
  emissive: 0xffffff, // Glow effect
  emissiveIntensity: 1.5, // Intensity of the emissive effect
  roughness: 0.2, // Low roughness for a smooth surface
  metalness: 0.8, // High metalness for a shiny appearance
  reflectivity: 1, // Fully reflective
});

const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(32, 180, 5);
scene.add(sphere);

// Add light above the chair
const pointLight = new THREE.PointLight(0xffffff, 120000, 1000, 2.1);
pointLight.position.set(32, 180, 5);
pointLight.castShadow = true;
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
scene.add(pointLightHelper);

// Add a turquoise light for the ray gun
const rayGunLight = new THREE.PointLight(0x00ffff, 1000, 30, 3);
rayGunLight.position.set(135, 93, 76); // Adjust position as needed
rayGunLight.castShadow = true;
scene.add(rayGunLight);

const rayGunLightHelper = new THREE.PointLightHelper(rayGunLight, 5);
scene.add(rayGunLightHelper);
// Add another turquoise light for the ray gun
const rayGunLight2 = new THREE.PointLight(0x00ffff, 1000, 30, 3);
rayGunLight2.position.set(130, 102, 90); // Adjust position as needed
rayGunLight2.castShadow = true;
scene.add(rayGunLight2);

const rayGunLightHelper2 = new THREE.PointLightHelper(rayGunLight2, 5);
scene.add(rayGunLightHelper2);


// 4. Create CSS3DRenderer for HTML menu overlay
const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
document.body.appendChild(cssRenderer.domElement);


// 5. Load the Blender scene and attach the menu to the TV screen
const loader = new GLTFLoader();
loader.load(
  '/MLG/scene.glb',
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    console.log('Blender scene loaded:', model);

    // If animations exist, initialize the mixer
    if (gltf.animations.length) {
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
    }

    // Locate the TV screen
    let tvScreen;
    model.traverse((child) => {
      if (child.name === 'p_int_monitor_c_bink_LOD0') { // Use the exact name of the TV screen object
        tvScreen = child;
      }
    });
    
    if (tvScreen) {
      // Add the HTML menu to the TV screen
      const menuDiv = document.createElement('div');
      menuDiv.innerHTML = `
        <div class="nav-tv">
            <div class="menu-item">Lobby</div>
            <div class="menu-item">About</div>
            <div class="menu-item">Merch</div>
            <div class="menu-item">Clan</div>
        </div>
      `;
      
    
      const menuObject = new CSS3DObject(menuDiv);
      menuObject.position.set(-1.2, 39.6, 0); // Adjust based on the TV's position in the Blender model
      tvScreen.add(menuObject);
    
    }
  },
  undefined,
  (error) => {
    console.error('Error loading Blender scene:', error);
  }
);

// 6. Handle resizing
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
