import * as THREE from 'three';
import { isMobileDevice } from './deviceDetection';

let isCameraEnabled = false; // Flag to track camera control state

export function initializeCameraControls(camera) {
  if (isMobileDevice()) {
    initializePhoneControls(camera); // Use touch-based controls for mobile
  } else {
    initializePCControls(camera); // Use mouse-based controls for desktop
  }
}

function initializePCControls(camera) {
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

  document.addEventListener('mousemove', (event) => {
    if (!isCameraEnabled) return;

    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;

    yaw -= movementX * 0.002; // Adjust sensitivity
    pitch -= movementY * 0.002;

    // Clamp yaw and pitch to their respective limits
    yaw = Math.max(yawLimitLeft, Math.min(yawLimitRight, yaw));
    pitch = Math.max(pitchLimitDown, Math.min(pitchLimitUp, pitch));

    // Update the camera rotation using yaw and pitch
    camera.rotation.set(pitch, yaw, 0, 'YXZ'); // YXZ order for correct pitch and yaw
  });
}

function initializePhoneControls(camera) {
  let yaw = 0; // Horizontal rotation (left/right)
  let pitch = 0; // Vertical rotation (up/down)
  let previousTouchPosition = null; // Track the last touch position

  let lastUpdateTime = Date.now(); // Timestamp of the last camera update
  const updateInterval = 32; // Limit updates to ~60 FPS (16ms per update)

  // Extract the camera's initial yaw and pitch
  const initialEuler = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
  yaw = initialEuler.y; // Initial horizontal rotation (yaw)
  pitch = initialEuler.x; // Initial vertical rotation (pitch)

  // Define rotation limits
  const yawLimitLeft = yaw - Math.PI / 2; // 90 degrees to the left of the starting yaw
  const yawLimitRight = yaw + Math.PI / 2; // 90 degrees to the right of the starting yaw
  const pitchLimitUp = Math.PI / 2 - 0.1; // Slightly less than 90 degrees up
  const pitchLimitDown = -Math.PI / 2 + 0.1; // Slightly more than -90 degrees down

  document.addEventListener('touchmove', (event) => {
    if (!isCameraEnabled || event.touches.length !== 1) return;

    const now = Date.now();
    if (now - lastUpdateTime < updateInterval) {
      // Skip this update if the interval hasn't passed
      return;
    }
    lastUpdateTime = now; // Update the timestamp for the next allowed update

    const touch = event.touches[0];
    const touchX = touch.clientX;
    const touchY = touch.clientY;

    if (previousTouchPosition) {
      const deltaX = touchX - previousTouchPosition.x;
      const deltaY = touchY - previousTouchPosition.y;

      yaw -= deltaX * 0.006; // Adjust sensitivity
      pitch -= deltaY * 0.006;

      // Clamp yaw and pitch to their respective limits
      yaw = Math.max(yawLimitLeft, Math.min(yawLimitRight, yaw));
      pitch = Math.max(pitchLimitDown, Math.min(pitchLimitUp, pitch));

      // Update the camera rotation using yaw and pitch
      camera.rotation.set(pitch, yaw, 0, 'YXZ'); // YXZ order for correct pitch and yaw
    }

    previousTouchPosition = { x: touchX, y: touchY }; // Update last touch position
  });

  document.addEventListener('touchend', () => {
    previousTouchPosition = null; // Clear touch position
  });
}

// Functions to enable/disable camera controls
export function enableCamera() {
  isCameraEnabled = true;
}

export function disableCamera() {
  isCameraEnabled = false;
}
