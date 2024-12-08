import * as THREE from 'three';

let mixer = null; // Store the mixer globally

// Initialize animation mixer
export function initializeAnimationMixer(model, animations) {
  if (!animations || animations.length === 0) {
    console.warn('No animations found in the model.');
    return;
  }
  mixer = new THREE.AnimationMixer(model);
  animations.forEach((clip) => mixer.clipAction(clip).play());
  console.log('Animation mixer initialized.');
}

// Update animation mixer (to be called in the animation loop)
export function updateAnimationMixer(delta) {
  if (mixer) {
    mixer.update(delta);
  }
}
