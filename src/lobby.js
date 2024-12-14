import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import './css/lobby.css'; // Import the new CSS file

export function loadLobbyContent(model) {
  // Helper function to initialize a TV
  function initializeTV(tv, contentElement, position, rotation = { x: 0, y: 0, z: 0 }) {
    if (!tv) return;

    const tvObject = new CSS3DObject(contentElement);
    tvObject.position.set(...position); // Set position
    tvObject.rotation.set(rotation.x, rotation.y, rotation.z); // Set rotation
    tvObject.scale.set(1, 1, 1); // Adjust scale if needed
    tv.add(tvObject);
  }

  // Function to initialize an overlay for a TV
  function initializeTVOverlay(tv, position, link, rotation = { x: 0, y: 0, z: 0 }) {
    if (!tv) return;

    const overlay = document.createElement('div');
    overlay.className = 'lobby-overlay';

    // Add click event to redirect to the website
    overlay.addEventListener('click', () => {
      window.open(link, '_blank'); // Open the link in a new tab
    });

    const overlayObject = new CSS3DObject(overlay);
    overlayObject.position.set(...position);
    overlayObject.rotation.set(rotation.x, rotation.y, rotation.z); // Set rotation
    tv.add(overlayObject);
  }

  // Initialize TVs with static content or website portals
  initializeTV(
    findChildByName(model, 'TV5'),
    (() => {
      const staticDiv = document.createElement('div');
      staticDiv.className = 'lobby-content';
      staticDiv.innerHTML = '<img src="/MLG/screen1.png" alt="Lobby Image">';
      return staticDiv;
    })(),
    [960, 525, -3900],
    { x: 0, y: -.6, z: 0 }
  );

  initializeTV(
    findChildByName(model, 'TV6'),
    (() => {
      const staticDiv = document.createElement('div');
      staticDiv.className = 'lobby-content2';
      staticDiv.innerHTML = '<img src="/MLG/screen2.png" alt="Lobby Image">';
      return staticDiv;
    })(),
    [723, -500, -3600],
    { x: 0, y: -.6, z: 0 }
  );

  initializeTV(
    findChildByName(model, 'TV7'),
    (() => {
      const staticDiv = document.createElement('div');
      staticDiv.className = 'lobby-content';
      return staticDiv;
    })(),
    [0, 0, 0]
  );

  // Initialize a TV with a website portal and add an overlay for redirection
  const websiteTV = findChildByName(model, 'TV8');
  initializeTV(
    websiteTV,
    (() => {
      const iframeElement = document.createElement('iframe');
      iframeElement.src = 'https://mlgedit.com/';

      const websiteDiv = document.createElement('div');
      websiteDiv.className = 'lobby-content website';
      websiteDiv.appendChild(iframeElement);

      return websiteDiv;
    })(),
    [420, -425, -2700],
    { x: 0, y: -.5, z: 0 }
  );

  // Add an overlay for the clickable website TV
  initializeTVOverlay(websiteTV, [600, -425, -2700], 'https://mlgedit.com/');
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
