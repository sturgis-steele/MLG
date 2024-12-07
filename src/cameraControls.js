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

  // Define rotation limits
  const yawLimitLeft = yaw - Math.PI / 4; // 45 degrees to the left of the starting yaw
  const yawLimitRight = yaw + Math.PI / 4; // 45 degrees to the right of the starting yaw
  const pitchLimitUp = Math.PI / 2 - 0.1; // Slightly less than 90 degrees up
  const pitchLimitDown = -Math.PI / 2 + 0.1; // Slightly more than -90 degrees down

  // Add event listeners for mouse movement to control the camera
  document.addEventListener('mousemove', (event) => {
    if (!isCameraEnabled) return; // Ignore input if camera is disabled

    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;

    // Update yaw and pitch
    yaw -= movementX * 0.002; // Adjust sensitivity
    pitch -= movementY * 0.002;

    // Clamp yaw and pitch to their respective limits
    yaw = Math.max(yawLimitLeft, Math.min(yawLimitRight, yaw));
    pitch = Math.max(pitchLimitDown, Math.min(pitchLimitUp, pitch));

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
