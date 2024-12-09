import * as THREE from 'three';

export function setupLighting(scene) {
  // Existing lights...

  // Add light above the chair
  const pointLight = new THREE.PointLight(0xffffff, 120000, 1000, 2.1);
  pointLight.position.set(18, 180, 4.2);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // Add a turquoise light for the ray gun
  const rayGunLight = new THREE.PointLight(0x00ffff, 1000, 30, 3);
  rayGunLight.position.set(135, 93, 76);
  rayGunLight.castShadow = true;
  scene.add(rayGunLight);

  const rayGunLight2 = new THREE.PointLight(0x00ffff, 600, 20, 3);
  rayGunLight2.position.set(130, 102, 90);
  rayGunLight2.castShadow = true;
  scene.add(rayGunLight2);

  // Add grow light behind MLG sign
  const growLight = new THREE.PointLight(0xff00ff, 500, 1000, 1.2);
  growLight.position.set(400, 230, 0);
  growLight.castShadow = true;
  scene.add(growLight);

  // Add lights for the MLG sign
  // const signLight = new THREE.PointLight(0xffffff, 500, 1000, 1.7);
  // signLight.position.set(400, 260, 90);
  // signLight.castShadow = true;
  // scene.add(signLight);

  // const signLight1 = new THREE.PointLight(0xffffff, 500, 1000, 1.7);
  // signLight1.position.set(400, 250, 0);
  // signLight1.castShadow = true;
  // scene.add(signLight1);

  // const signLight2 = new THREE.PointLight(0xffffff, 1000, 1000, 1.7);
  // signLight2.position.set(400, 250, -60);
  // signLight2.castShadow = true;
  // scene.add(signLight2);

  // const signLight3 = new THREE.PointLight(0xffffff, 1000, 1000, 1.7);
  // signLight3.position.set(400, 275, -80);
  // signLight3.castShadow = true;
  // scene.add(signLight3);

  // const signLight4 = new THREE.PointLight(0xffffff, 1000, 1000, 1.7);
  // signLight4.position.set(400, 250, 36);
  // signLight4.castShadow = true;
  // scene.add(signLight4);

  // const signLight5 = new THREE.PointLight(0xffffff, 1000, 1000, 1.7);
  // signLight5.position.set(400, 275, 40);
  // signLight5.castShadow = true;
  // scene.add(signLight5);

  // const signLight6 = new THREE.PointLight(0xffffff, 1000, 1000, 1.7);
  // signLight6.position.set(400, 300, 0);
  // signLight6.castShadow = true;
  // scene.add(signLight6);

  // Spotlight targeting Nuketown sign
  const targetPosition = new THREE.Vector3(500, 300 , 0);

  const spotlight = new THREE.SpotLight(0xffffff, 1); // Color: white, Intensity: 1
  spotlight.position.set(150, 180, 0); // Spotlight's position in the scene
  spotlight.angle = Math.PI / 7; // Controls the cone angle (wider if increased, narrower if decreased)
  spotlight.penumbra = 1; // Soft edges for the spotlight cone (0 = hard edge, 1 = softest)
  spotlight.decay = 0; // How light intensity decreases over distance (higher values reduce intensity faster)
  spotlight.distance = 1000; // Maximum distance the spotlight reaches (set to a large value for testing)
  spotlight.castShadow = true; // Enable shadows for the spotlight
  spotlight.intensity = 4; // Increase the intensity to 2 (adjust as needed)

  const spotlightTarget = new THREE.Object3D();
  spotlightTarget.position.copy(targetPosition);
  scene.add(spotlightTarget);
  spotlight.target = spotlightTarget;

  scene.add(spotlight);
}
