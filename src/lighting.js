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
  sphere.position.set(18, 180, 4.2);
  scene.add(sphere);

  // Add light above the chair
  const pointLight = new THREE.PointLight(0xffffff, 120000, 1000, 2.1);
  pointLight.position.set(18, 180, 4.2);
  pointLight.castShadow = true;
  scene.add(pointLight);

  //const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
  //scene.add(pointLightHelper);


  
  // Add a turquoise light for the ray gun
  const rayGunLight = new THREE.PointLight(0x00ffff, 1000, 30, 3);
  rayGunLight.position.set(135, 93, 76); // Adjust position as needed
  rayGunLight.castShadow = true;
  scene.add(rayGunLight);

  //const rayGunLightHelper = new THREE.PointLightHelper(rayGunLight, 5);
  //scene.add(rayGunLightHelper);

  // Add another turquoise light for the ray gun
  const rayGunLight2 = new THREE.PointLight(0x00ffff, 600, 20, 3);
  rayGunLight2.position.set(130, 102, 90); // Adjust position as needed
  rayGunLight2.castShadow = true;
  scene.add(rayGunLight2);

  //const rayGunLightHelper2 = new THREE.PointLightHelper(rayGunLight2, 5);
  //scene.add(rayGunLightHelper2);



  // Add a glowing magenta sphere for grow light
  const materialMagenta = new THREE.MeshPhysicalMaterial({
    color: 0xff00ff, // Base color
    emissive: 0xff00ff, // Glow effect
    emissiveIntensity: 1.5, // Intensity of the emissive effect
    roughness: 0.2, // Low roughness for a smooth surface
    metalness: 0.8, // High metalness for a shiny appearance
    reflectivity: 1, // Fully reflective
  });

  const sphereMagenta = new THREE.Mesh(geometry, materialMagenta);
  sphere.position.set(400, 230, 0);
  scene.add(sphereMagenta);

  // Add grow light behind MLG sign
  const growLight = new THREE.PointLight(0xff00ff, 500, 1000, 1.2);
  growLight.position.set(400, 230, 0); // Adjust position as needed
  growLight.castShadow = true;
  scene.add(growLight);

  //const growLightHelper = new THREE.PointLightHelper(growLight, 5);
  //scene.add(growLightHelper);

  // Add lights for the MLG sign
  const signLight = new THREE.PointLight(0xffffff, 500, 1000, 1.8);
  signLight.position.set(330, 250, 90); // Adjust position as needed
  signLight.castShadow = true;
  scene.add(signLight);

  //const signLightHelper = new THREE.PointLightHelper(signLight, 5);
  //scene.add(signLightHelper);

  const signLight1 = new THREE.PointLight(0xffffff, 500, 1000, 1.8);
  signLight1.position.set(330, 230, 0); // Adjust position as needed
  signLight1.castShadow = true;
  scene.add(signLight1);

  //const signLightHelper1 = new THREE.PointLightHelper(signLight1, 5);
  //scene.add(signLightHelper1);

  const signLight2 = new THREE.PointLight(0xffffff, 1000, 1000, 1.8);
  signLight2.position.set(330, 256, -105); // Adjust position as needed
  signLight2.castShadow = true;
  scene.add(signLight2);

  //const signLightHelper2 = new THREE.PointLightHelper(signLight2, 5);
  //scene.add(signLightHelper2);
  
  const signLight3 = new THREE.PointLight(0xffffff, 1000, 1000, 1.8);
  signLight3.position.set(330, 270, -15); // Adjust position as needed
  signLight3.castShadow = true;
  scene.add(signLight3);

  //const signLightHelper3 = new THREE.PointLightHelper(signLight3, 5);
  //scene.add(signLightHelper3);

  const signLight4 = new THREE.PointLight(0xffffff, 1000, 1000, 1.8);
  signLight4.position.set(330, 245, 36); // Adjust position as needed
  signLight4.castShadow = true;
  scene.add(signLight4);

  //const signLightHelper4 = new THREE.PointLightHelper(signLight4, 5);
  //scene.add(signLightHelper4);

  const signLight5 = new THREE.PointLight(0xffffff, 1000, 1000, 1.8);
  signLight5.position.set(330, 290, 40); // Adjust position as needed
  signLight5.castShadow = true;
  scene.add(signLight5);

  //const signLightHelper5 = new THREE.PointLightHelper(signLight5, 5);
  //scene.add(signLightHelper5);

  const signLight6 = new THREE.PointLight(0xffffff, 1000, 1000, 1.8);
  signLight6.position.set(330, 236, -135); // Adjust position as needed
  signLight6.castShadow = true;
  scene.add(signLight6);

  //const signLightHelper6 = new THREE.PointLightHelper(signLight6, 5);
  //scene.add(signLightHelper6);

  const signLight7 = new THREE.PointLight(0xffffff, 1000, 1000, 1.8);
  signLight7.position.set(330, 225, -50); // Adjust position as needed
  signLight7.castShadow = true;
  scene.add(signLight7);

  
}
