import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export function loadVaultContent(model) {
  // Locate TVs for Vault content
  const tv1 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_3');
  const tv2 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_1');
  const tv3 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0');
  const tv4 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_2');


  // Define content for each TV
  if (tv1) {
    const memeDiv1 = document.createElement('div');
    memeDiv1.innerHTML = `
      <div class="vault-content">
          <p style="font-size: 15px; color: white; text-align: center; margin: 0;">Insert Meme</p>
      </div>`;
    const meme1Object = new CSS3DObject(memeDiv1);
    meme1Object.position.set(-50, 57, -138); // Adjust position as needed
    tv1.add(meme1Object);
  }

  if (tv2) {
    const memeDiv2 = document.createElement('div');
    memeDiv2.innerHTML = `
      <div class="vault-content">
          <p style="font-size: 15px; color: white; text-align: center; margin: 0;">Insert Meme</p>
      </div>`;
    const meme2Object = new CSS3DObject(memeDiv2);
    meme2Object.position.set(-50, 15, -141); // Adjust position as needed
    tv2.add(meme2Object);
  }

  if (tv3) {
    const memeDiv3 = document.createElement('div');
    memeDiv3.innerHTML = `
      <div class="vault-content">
          <p style="font-size: 15px; color: white; text-align: center; margin: 0;">Insert Meme</p>
      </div>`;
    const meme3Object = new CSS3DObject(memeDiv3);
    meme3Object.position.set(-50, 15, -150); // Adjust position as needed
    tv3.add(meme3Object);
  }

  if (tv4) {
    const memeDiv4 = document.createElement('div');
    memeDiv4.innerHTML = `
      <div class="vault-content">
          <p style="font-size: 15px; color: white; text-align: center; margin: 0;">Insert Meme</p>
      </div>`;
    const meme4Object = new CSS3DObject(memeDiv4);
    meme4Object.position.set(-50, 57, -153); // Adjust position as needed
    tv4.add(meme4Object);
  }
}
 
// Helper function to find child by name
function findChildByName(model, name) {
    let result = null;
    model.traverse((child) => {
      if (child.name === name) {
        result = child;
      }
    });
    return result;
  }