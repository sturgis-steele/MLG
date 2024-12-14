import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import './css/clan.css';

export function loadClanContent(model) {
  
    // Locate TVs for Clan content
  const tv1 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_3');
  const tv2 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_1');
  const tv3 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0');
  const tv4 = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_2');

  // Define content for each TV
  if (tv1) {
    const telegramDiv = document.createElement('div');
    telegramDiv.className = 'clan-content telegram';
    telegramDiv.innerHTML = `
      <a href="https://t.me/MLGCTOPORTAL" target="_blank">
        <img src="/MLG/telegram.png" alt="Telegram" />
      </a>`;
    const telegramObject = new CSS3DObject(telegramDiv);
    telegramObject.position.set(-50, 57, -138); // Adjust position as needed
    tv1.add(telegramObject);
  }

  if (tv2) {
    const youtubeDiv = document.createElement('div');
    youtubeDiv.className = 'clan-content youtube';
    youtubeDiv.innerHTML = `
      <a href="https://www.youtube.com/@MLGsolana420/videos" target="_blank">
        <img src="/MLG/youtube.png" alt="YouTube" />
      </a>`;
    const youtubeObject = new CSS3DObject(youtubeDiv);
    youtubeObject.position.set(-50, 15, -141); // Adjust position as needed
    tv2.add(youtubeObject);
  }

  if (tv3) {
    const discordDiv = document.createElement('div');
    discordDiv.className = 'clan-content discord';
    discordDiv.innerHTML = `
      <a href="https://discord.gg/munnopoly" target="_blank">
        <img src="/MLG/discord.png" alt="Discord" />
      </a>`;
    const discordObject = new CSS3DObject(discordDiv);
    discordObject.position.set(-50, 15, -150); // Adjust position as needed
    tv3.add(discordObject);
  }

  if (tv4) {
    const twitterDiv = document.createElement('div');
    twitterDiv.className = 'clan-content twitter';
    twitterDiv.innerHTML = `
      <a href="https://x.com/MLGsolana420" target="_blank">
        <img src="/MLG/x.jpg" alt="Twitter" />
      </a>`;
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
