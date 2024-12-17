import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import './css/clan.css';

// Load Clan content with optimizations
export function loadClanContent(model) {
  const tvConfigs = [
    {
      tvName: 'TV6',
      position: [2500, 500, -1750],
      rotation: { x: 0, y: -1.2, z: 0 },
      className: 'telegram',
      link: 'https://t.me/MLGCTOPORTAL',
      imageSrc: getOptimizedImage('/MLG/telegram.webp', '/MLG/telegram.png'),
      alt: 'Telegram',
    },
    {
      tvName: 'TV6',
      position: [2500, -415, -1750],
      rotation: { x: 0, y: -1.2, z: 0 },
      className: 'youtube',
      link: 'https://www.youtube.com/@MLGsolana420/videos',
      imageSrc: getOptimizedImage('/MLG/youtube.webp', '/MLG/youtube.png'),
      alt: 'YouTube',
    },
    {
      tvName: 'TV7',
      position: [1195, 450, -2050],
      rotation: { x: 0, y: -0.9, z: 0 },
      className: 'discord',
      link: 'https://discord.gg/munnopoly',
      imageSrc: getOptimizedImage('/MLG/discord.webp', '/MLG/discord.png'),
      alt: 'Discord',
    },
    {
      tvName: 'TV7',
      position: [1195, -380, -2050],
      rotation: { x: 0, y: -0.9, z: 0 },
      className: 'twitter',
      link: 'https://x.com/MLGsolana420',
      imageSrc: getOptimizedImage('/MLG/x.webp', '/MLG/x.jpg'),
      alt: 'Twitter',
    },
  ];

  tvConfigs.forEach((config) => {
    const tv = findChildByName(model, config.tvName);
    if (tv) {
      const contentDiv = document.createElement('div');
      contentDiv.className = `clan-content ${config.className}`;
      contentDiv.innerHTML = `
        <a href="${config.link}" target="_blank">
          <img src="${config.imageSrc}" alt="${config.alt}" loading="lazy" />
        </a>
      `;

      const contentObject = new CSS3DObject(contentDiv);
      contentObject.position.set(...config.position);
      contentObject.rotation.set(config.rotation.x, config.rotation.y, config.rotation.z);
      tv.add(contentObject);

      console.log(`Loaded ${config.className} content for ${config.tvName}`);
    }
  });
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

// Helper function to provide optimized images
function getOptimizedImage(mobileSrc, defaultSrc) {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  return isMobile ? mobileSrc : defaultSrc;
}

// Cleanup function to remove clan content
export function clearClanContent(model) {
  const tvNames = ['TV6', 'TV7'];
  tvNames.forEach((tvName) => {
    const tv = findChildByName(model, tvName);
    if (tv) {
      for (let i = tv.children.length - 1; i >= 0; i--) {
        const child = tv.children[i];
        if (child.isCSS3DObject && child.element.classList.contains('clan-content')) {
          console.log(`Clearing clan content from ${tvName}`);
          tv.remove(child);
        }
      }
    }
  });
}
