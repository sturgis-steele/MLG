import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export function loadClanContent(model) {
  
    // Locate TVs for Clan content
  const tv1 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_3');
  const tv2 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_1');
  const tv3 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0');
  const tv4 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_2');

  // Define content for each TV
  if (tv1) {
    const telegramDiv = document.createElement('div');
    telegramDiv.innerHTML = `
      <div class="clan-content">
        <a href="https://t.me/MLGCTOPORTAL" target="_blank">
          <img src="/MLG/telegram.png" alt="Telegram" style="width: 93px; height: auto;" />
        </a>
      </div>`;
    const telegramObject = new CSS3DObject(telegramDiv);
    telegramObject.position.set(-50, 57, -138); // Adjust position as needed
    tv1.add(telegramObject);
  }

  if (tv2) {
    const youtubeDiv = document.createElement('div');
    youtubeDiv.innerHTML = `
      <div class="clan-content">
        <a href="https://www.youtube.com/@MLGsolana420/videos" target="_blank">
          <img src="/MLG/youtube.png" alt="YouTube" style="width: 100px; height: auto;" />
        </a>
      </div>`;
    const youtubeObject = new CSS3DObject(youtubeDiv);
    youtubeObject.position.set(-50, 15, -141); // Adjust position as needed
    tv2.add(youtubeObject);
  }

  if (tv3) {
    const discordDiv = document.createElement('div');
    discordDiv.innerHTML = `
      <div class="clan-content">
        <a href="https://discord.gg/fstwSu6S77" target="_blank">
          <img src="/MLG/discord.png" alt="Discord" style="width: 100px; height: auto;" />
        </a>
      </div>`;
    const discordObject = new CSS3DObject(discordDiv);
    discordObject.position.set(-50, 15, -150); // Adjust position as needed
    tv3.add(discordObject);
  }

  if (tv4) {
    const twitterDiv = document.createElement('div');
    twitterDiv.innerHTML = `
      <div class="clan-content">
        <a href="https://x.com/MLGsolana420" target="_blank">
          <img src="/MLG/x.png" alt="Twitter" style="width: 100px; height: auto;" />
        </a>
      </div>`;
    const twitterObject = new CSS3DObject(twitterDiv);
    twitterObject.position.set(-50, 57, -153); // Adjust position as needed
    tv4.add(twitterObject);
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
