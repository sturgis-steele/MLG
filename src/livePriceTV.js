import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import './css/livePriceTV.css';

// Load live price, market cap, and volume data onto TVs
export async function loadLiveData(model) {
  // TV for market cap and 24-hour volume
  const tvMarketCapVolume = findChildByName(model, 'TV5');
  if (tvMarketCapVolume) {
    console.log('Found TV5:', tvMarketCapVolume); // Debug log
    console.log('TV5 Position:', tvMarketCapVolume.position);
    console.log('TV5 Rotation:', tvMarketCapVolume.rotation);

    const marketCapVolumeDiv = document.createElement('div');
    marketCapVolumeDiv.innerHTML = `
      <div class="marketcap-volume-content">
        <p class="loading-text">Loading data...</p>
      </div>`;
    const marketCapVolumeObject = new CSS3DObject(marketCapVolumeDiv);

    // Match the position and rotation of TV5
    marketCapVolumeObject.position.copy(tvMarketCapVolume.position);
    marketCapVolumeObject.rotation.copy(tvMarketCapVolume.rotation);

    tvMarketCapVolume.add(marketCapVolumeObject);

    // Fetch and display the market cap and 24-hour volume data
    await fetchLiveMarketCapAndVolume(marketCapVolumeDiv.querySelector('.marketcap-volume-content'));
    setInterval(() => {
      fetchLiveMarketCapAndVolume(marketCapVolumeDiv.querySelector('.marketcap-volume-content'));
    }, 60000); // Update every 60 seconds
  }

  // TV for price
  const tvPrice = findChildByName(model, 'TV3');
  if (tvPrice) {
    console.log('Found TV3:', tvPrice); // Debug log
    console.log('TV3 Position:', tvPrice.position);
    console.log('TV3 Rotation:', tvPrice.rotation);

    const priceDiv = document.createElement('div');
    priceDiv.innerHTML = `
      <div class="price-content">
        <p class="loading-text">Loading price data...</p>
      </div>`;
    const priceObject = new CSS3DObject(priceDiv);

    // Match the position and rotation of TV3
    priceObject.position.copy(tvPrice.position);
    priceObject.rotation.copy(tvPrice.rotation);

    tvPrice.add(priceObject);

    // Fetch and display the price data
    await fetchLivePrice(priceDiv.querySelector('.price-content'));
    setInterval(() => {
      fetchLivePrice(priceDiv.querySelector('.price-content'));
    }, 60000); // Update every 60 seconds
  }
}
