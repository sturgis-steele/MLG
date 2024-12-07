import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// Load live price, market cap, and volume data onto TVs
export async function loadLiveData(model) {
  // TV for market cap and 24-hour volume
  const tvMarketCapVolume = findChildByName(model, 'p_int_monitor_a_bink_LOD0');
  if (tvMarketCapVolume) {
    const marketCapVolumeDiv = document.createElement('div');
    marketCapVolumeDiv.innerHTML = `
      <div class="marketcap-volume-content">
        <p style="font-size: 9px; color: white; text-align: center; margin: 0;">Loading data...</p>
      </div>`;
    const marketCapVolumeObject = new CSS3DObject(marketCapVolumeDiv);
    marketCapVolumeObject.position.set(0, 0, 0);
    tvMarketCapVolume.add(marketCapVolumeObject);

    // Fetch and display the market cap and 24-hour volume data
    await fetchLiveMarketCapAndVolume(marketCapVolumeDiv.querySelector('.marketcap-volume-content'));
    setInterval(() => {
      fetchLiveMarketCapAndVolume(marketCapVolumeDiv.querySelector('.marketcap-volume-content'));
    }, 60000); // Update every 60 seconds
  }

  // TV for price
  const tvPrice = findChildByName(model, 'p_int_monitor_b_bink_LOD0');
  if (tvPrice) {
    const priceDiv = document.createElement('div');
    priceDiv.innerHTML = `
      <div class="price-content" style="transform: rotateX(180deg);">
        <p style="font-size: 9px; color: white; text-align: center; margin: 0;">Loading price data...</p>
      </div>`;
    const priceObject = new CSS3DObject(priceDiv);
    priceObject.scale.x *= -1; // Flip the TV screen
    priceObject.position.set(-3, 22, 0);
    tvPrice.add(priceObject);

    // Fetch and display the price data
    await fetchLivePrice(priceDiv.querySelector('.price-content'));
    setInterval(() => {
      fetchLivePrice(priceDiv.querySelector('.price-content'));
    }, 60000); // Update every 60 seconds
  }
}

// Function to fetch live market cap and 24-hour volume data
async function fetchLiveMarketCapAndVolume(element) {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=360noscope420blazeit&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true',
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
    const marketCap = Math.round(data['360noscope420blazeit'].usd_market_cap); // Fetch market cap in USD
    const volume = Math.round(data['360noscope420blazeit'].usd_24h_vol); // Fetch 24-hour volume in USD

    element.innerHTML = `
      <p style="font-size: 9px; color: white; text-align: left; margin: 0;">
        Market Cap: <br>$${marketCap.toLocaleString()}<br>
      </p>
      <p style="font-size: 9px; color: white; text-align: left; margin: 0;">
        24h Volume: <br>$${volume.toLocaleString()}<br>
      </p>`;
  } catch (error) {
    console.error('Error fetching market cap and volume data:', error);

    element.innerHTML = `
      <p style="font-size: 6px; color: red; text-align: center; margin: 0;">
        Failed to fetch data.<br>Please wait a moment.</br>
      </p>`;
  }
}

// Function to fetch live price data
async function fetchLivePrice(element) {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=360noscope420blazeit&vs_currencies=usd',
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

    element.innerHTML = `
      <p style="font-size: 6px; color: white; text-align: left; margin: 0;">
        MLG Price: <br>$${price.toLocaleString()}</br>
      </p>`;
  } catch (error) {
    console.error('Error fetching price data:', error);

    element.innerHTML = `
      <p style="font-size: 3px; color: red; text-align: center; margin: 0;">
        Failed to fetch price data.<br>Please try again later.</br>
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
