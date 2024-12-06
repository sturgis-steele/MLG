import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export function loadLobbyContent(model) {
  // Locate TVs for Vault content
  const tv1 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_3');
  const tv2 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_1');
  const tv3 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0');
  const tv4 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_2');


  // Define content for each TV

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