import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export function loadLobbyContent(model) {
  // Helper function to initialize a TV
  function initializeTV(tv, contentElement, position) {
    if (!tv) return;

    const tvObject = new CSS3DObject(contentElement);
    tvObject.position.set(...position); // Spread the position array into individual arguments
    tvObject.scale.set(1, 1, 1); // Adjust scale if needed
    tv.add(tvObject);
  }

  // Function to initialize an overlay for a TV
  function initializeTVOverlay(tv, position, link) {
    if (!tv) return;

    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '105%';
    overlay.style.height = '105%';
    overlay.style.cursor = 'pointer';
    overlay.style.background = 'rgba(0, 0, 0, 0)'; // Fully transparent

    // Add click event to redirect to the website
    overlay.addEventListener('click', () => {
      window.open(link, '_blank'); // Open the link in a new tab
    });

    const overlayObject = new CSS3DObject(overlay);
    overlayObject.position.set(...position);
    overlayObject.scale.set(1, 1, 1); // Adjust scale if needed
    tv.add(overlayObject);
  }

  // Initialize TVs with static content or website portals
  initializeTV(
    findChildByName(model, 'p_int_monitor_c_extracam_LOD0_2'),
    (() => {
      const staticDiv = document.createElement('div');
      staticDiv.className = 'lobby-content';
      staticDiv.innerHTML = '<img style="width: 1020px; border:0px; border-radius: 180px;" src="/MLG/screen1.webp" alt="Lobby Image"></img>';
      return staticDiv;
    })(),
    [-1100, 450, -3300]
  );

  initializeTV(
    findChildByName(model, 'p_int_monitor_c_extracam_LOD0'),
    (() => {
      const staticDiv = document.createElement('div');
      staticDiv.className = 'lobby-content';
      staticDiv.innerHTML = '<img style="width: 1020px; border:0px; border-radius: 180px;" src="/MLG/screen2.png" alt="Lobby Image"></img>';
      return staticDiv;
    })(),
    [-1100, -345, -3300]
  );

  initializeTV(
    findChildByName(model, 'p_int_monitor_c_extracam_LOD0_3'),
    (() => {
      const staticDiv = document.createElement('div');
      staticDiv.className = 'lobby-content';
      return staticDiv;
    })(),
    [0, 0, 0]
  );

  // Initialize a TV with a website portal and add an overlay for redirection
  const websiteTV = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_1');
  initializeTV(
    websiteTV,
    (() => {
      const iframeElement = document.createElement('iframe');
      iframeElement.src = 'https://mlgedit.com/';
      iframeElement.style.width = '100%';
      iframeElement.style.height = '100%';
      iframeElement.style.border = 'none';
      iframeElement.style.borderRadius = '170px'; // Adjust styling as needed

      const websiteDiv = document.createElement('div');
      websiteDiv.className = 'lobby-content';
      websiteDiv.style.width = '1050px'; // Adjust the width for the TV screen
      websiteDiv.style.height = '870px'; // Adjust the height for the TV screen
      websiteDiv.style.overflow = 'hidden'; // Ensure no scrollbars
      websiteDiv.appendChild(iframeElement);

      return websiteDiv;
    })(),
    [-1250, -425, -3400] // Position as needed
  );

  // Add an overlay for the clickable website TV
  initializeTVOverlay(websiteTV, [-1250, -425, -3300], 'https://mlgedit.com/');
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
