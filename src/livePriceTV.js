import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// Load live price and market cap data onto a TV
export async function loadLivePriceData(model) {
  const tvLivePrice = findChildByName(model, 'p_int_monitor_c_extracam_LOD0_1');

  if (tvLivePrice) {
    const priceDiv = document.createElement('div');
    priceDiv.innerHTML = `
      <div class="price-content">
        <p style="font-size: 15px; color: white; text-align: center; margin: 0;">Loading data...</p>
      </div>`;
    const priceObject = new CSS3DObject(priceDiv);
    priceObject.position.set(-50, 15, -141);
    tvLivePrice.add(priceObject);

    // Fetch and display the price and market cap data
    await fetchLivePriceAndMarketCap(priceDiv.querySelector('.price-content'));
    setInterval(() => {
      fetchLivePriceAndMarketCap(priceDiv.querySelector('.price-content'));
    }, 60000); // Update every 60 seconds
  }
}

// Function to fetch live price and market cap data using the public API
async function fetchLivePriceAndMarketCap(priceElement) {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=360noscope420blazeit&vs_currencies=usd&include_market_cap=true',
      {
        headers: {
          accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const price = data['360noscope420blazeit'].usd.toFixed(4); // Fetch price in USD
    const marketCap = Math.round(data['360noscope420blazeit'].usd_market_cap); // Fetch market cap in USD

    priceElement.innerHTML = `
      <p style="font-size: 12px; color: white; text-align: left; margin: 0;">
        MLG Price: $${price.toLocaleString()}
      </p>
      <p style="font-size: 12px; color: white; text-align: left; margin: 0;">
        Market Cap: $${marketCap.toLocaleString()}
      </p>`;
  } catch (error) {
    console.error('Error fetching live price and market cap data:', error);

    // Display an error message
    priceElement.innerHTML = `
      <p style="font-size: 15px; color: red; text-align: center; margin: 0;">
        Failed to fetch data. Please try again later.
      </p>`;
  }
}

// Helper function to find a child by name
function findChildByName(model, name) {
  let result = null;
  model.traverse((child) => {
    if (child.name === name) {
      result = child;
    }
  });
  return result;
}
