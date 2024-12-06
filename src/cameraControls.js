import * as THREE from 'three';

let isCameraEnabled = false; // Flag to track camera control state

export function initializeCameraControls(camera) {
  // Variables to track yaw and pitch
  let yaw = 0; // Horizontal rotation (left/right)
  let pitch = 0; // Vertical rotation (up/down)

  // Extract the camera's initial yaw and pitch
  const initialEuler = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
  yaw = initialEuler.y; // Initial horizontal rotation (yaw)
  pitch = initialEuler.x; // Initial vertical rotation (pitch)

  // Add event listeners for mouse movement to control the camera
  document.addEventListener('mousemove', (event) => {
    if (!isCameraEnabled) return; // Ignore input if camera is disabled

    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;

    // Update yaw (left/right) and pitch (up/down)
    yaw -= movementX * 0.002; // Adjust sensitivity
    pitch -= movementY * 0.002;

    // Constrain pitch to prevent flipping the camera upside down
    const maxPitch = Math.PI / 2 - 0.1; // Slightly less than 90 degrees
    const minPitch = -Math.PI / 2 + 0.1; // Slightly more than -90 degrees
    pitch = Math.max(minPitch, Math.min(maxPitch, pitch));

    // Update the camera rotation using yaw and pitch
    camera.rotation.set(pitch, yaw, 0, 'YXZ'); // YXZ order for correct pitch and yaw
  });
}

// Functions to enable/disable camera controls
export function enableCamera() {
  isCameraEnabled = true;
}

export function disableCamera() {
  isCameraEnabled = false;
}
