import * as THREE from 'three';

export function initializeCameraControls(camera) {
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
}
