import * as THREE from 'three';

export function setupLighting(scene) {
  // Add a glowing white sphere
  const geometry = new THREE.SphereGeometry(5, 32, 32);
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
}
