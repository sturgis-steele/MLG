import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export function loadServersContent(model) {
  // Locate TVs for Servers content
  const tv1 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_3');
  const tv2 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_1');
  const tv3 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0');
  const tv4 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_2');

  const underConstructionHTML = `
    <div class="servers-content">
      <p style="font-size: 15px; color: white; text-align: center; margin: 0;">
        Under Construction
      </p>
    </div>
  `;

  const serverIframeHTML = `
    <div class="">
    </div>
  `;

  // Define content for each TV
  if (tv1) {
    const tv1Div = document.createElement('div');
    tv1Div.innerHTML = serverIframeHTML; // Embed server info in the first TV
    const tv1Object = new CSS3DObject(tv1Div);
    tv1Object.position.set(0, 0, 0); // Adjust position as needed
    tv1.add(tv1Object);
  }

  if (tv2) {
    const tv2Div = document.createElement('div');
    tv2Div.innerHTML = underConstructionHTML;
    const tv2Object = new CSS3DObject(tv2Div);
    tv2Object.position.set(-60, 21, -150); // Adjust position as needed
    tv2.add(tv2Object);
  }

  if (tv3) {
    const tv3Div = document.createElement('div');
    tv3Div.innerHTML = underConstructionHTML;
    const tv3Object = new CSS3DObject(tv3Div);
    tv3Object.position.set(-54, 21, -150); // Adjust position as needed
    tv3.add(tv3Object);
  }

  if (tv4) {
    const tv4Div = document.createElement('div');
    tv4Div.innerHTML = underConstructionHTML;
    const tv4Object = new CSS3DObject(tv4Div);
    tv4Object.position.set(-54, 63, -150); // Adjust position as needed
    tv4.add(tv4Object);
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
