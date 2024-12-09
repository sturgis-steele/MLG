import * as THREE from 'three';

export function initializeCSS3DStabilizer(cssRenderer, model, camera) {
  const trackedCSSObjects = [];

  // Traverse the model to find all CSS3DObjects
  model.traverse((child) => {
    if (child.isCSS3DObject) {
      // Store the initial position and quaternion for stabilization
      const initialPosition = new THREE.Vector3().copy(child.position);
      const initialQuaternion = new THREE.Quaternion().copy(child.quaternion);

      trackedCSSObjects.push({
        object: child,
        initialPosition,
        initialQuaternion,
      });
    }
  });

  if (trackedCSSObjects.length === 0) {
    console.warn('No CSS3DObjects found in the model for stabilization.');
  }

  // Update loop to maintain positions and orientations
  function updateCSS3DObjects() {
    trackedCSSObjects.forEach(({ object, initialPosition, initialQuaternion }) => {
      object.position.copy(initialPosition); // Keep the object at its original position
      object.quaternion.copy(initialQuaternion); // Maintain its original orientation
    });

    // Render the CSS3D scene
    cssRenderer.render(model, camera);

    requestAnimationFrame(updateCSS3DObjects); // Continue the update loop
  }

  updateCSS3DObjects(); // Start the stabilization loop
}
