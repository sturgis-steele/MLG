import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export function initializeMusicPlayerWithInteraction(model, scene, camera, renderer) {
  const audio = document.createElement('audio');
  const songs = [
    '/MLG/custom-music.mp3',
    '/MLG/BLACK OPS 2 - OFFICIAL MULTIPLAYER MENU THEME SONG (HD).mp3',
    '/MLG/Call of Duty 4 Theme.mp3',
    '/MLG/Call of Duty Black Ops Menu Ambience.mp3',
    '/MLG/Call of Duty Black Ops Zombies Main Menu Theme.mp3',
    '/MLG/Call of Duty Modern Warfare 3 Multiplayer menu music.mp3',
    '/MLG/Call of Duty_ Modern Warfare 2 - OpFor Theme (Chain of Command).mp3',
    '/MLG/Call of Duty_ Modern Warfare 3 - Multiplayer Menu Theme Music.mp3',
    '/MLG/COD Black Ops 2 Main Menu Theme (In Game original).mp3',
    '/MLG/MW2 Multiplayer Menu Soundtrack.mp3',
  ];
  let currentSongIndex = 0;

  // Set initial audio properties
  audio.src = songs[currentSongIndex];
  audio.loop = true;
  audio.volume = 0.5;
  document.body.appendChild(audio);

  // Attempt to autoplay the audio
  audio.play().catch(() => {
    console.log('Autoplay failed. Waiting for user interaction to start music.');
  });

  const startMusicOnInteraction = () => {
    audio.play().catch((error) => {
      console.error('Error starting music playback:', error);
    });
    document.removeEventListener('click', startMusicOnInteraction);
    document.removeEventListener('keydown', startMusicOnInteraction);
  };
  document.addEventListener('click', startMusicOnInteraction);
  document.addEventListener('keydown', startMusicOnInteraction);

  function switchToNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audio.src = songs[currentSongIndex];
    audio.play().catch((error) => {
      console.error('Error playing next song:', error);
    });
  }

  // Locate the gramophone in the scene
  let gramophone;
  model.traverse((child) => {
    if (child.name === 'p6_zm_tm_gramophone_LOD0') {
      gramophone = child;
    }
  });

  if (!gramophone) {
    console.error('Gramophone object not found in the scene.');
    return;
  }

  // Create a div element for the text
  const gramophoneDiv = document.createElement('div');
  gramophoneDiv.innerHTML = `
    <div class="gramophone-interaction">
    </div>
  `;
  
  // Wrap the div in a CSS3DObject
  const gramophoneObject = new CSS3DObject(gramophoneDiv);
  gramophoneObject.position.set(0, 150, 0); // Adjust position as needed
  

  // Adjust rotation if needed to face the camera
  gramophoneObject.rotation.y = Math.PI; // Example: rotate 180 degrees

  // Add the CSS3DObject to the gramophone
  gramophone.add(gramophoneObject);

  // Add a click event listener to the text
  gramophoneDiv.addEventListener('click', () => {
    console.log('Gramophone clicked! Changing song...');
    switchToNextSong();

  });

  // Create the second div element for the side text
  const sideDiv = document.createElement('div');
  sideDiv.innerHTML = `
    <div class="gramophone-interaction" style="width: 81px">
    </div>
  `;

  const sideObject = new CSS3DObject(sideDiv);
  sideObject.position.set(0, 150, 90); // Position on the side of the gramophone
  sideObject.rotation.y = Math.PI / 2; // Rotate 90 degrees to face outward
  gramophone.add(sideObject);

  sideDiv.addEventListener('click', () => {
    console.log('Side of gramophone clicked! Changing song...');
    switchToNextSong();
  });
}
