import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import './css/musicPlayer.css';

let audio = null; // Declare audio at the module level
let currentSongIndex = 0;

export function initializeMusicPlayerWithInteraction(model, scene, camera, renderer) {
  if (!audio) {
    audio = document.createElement('audio');
    const songs = [
      '/MLG/music/Dr. Dre - The Next Episode (San Holo Remix).mp3',
      '/MLG/music/Alan Walker - Fade.m4a',
      '/MLG/music/Blackbear - Idfc (Tarro Remix).mp3',
      '/MLG/music/C418 - Wet Hands (Trap Remix).mp3',
      '/MLG/music/Calvin Harris - Outside ft. Ellie Goulding (Savagez Remix).mp3',
      '/MLG/music/Cartoon, Jéja - Why We Lose (feat. Coleman Trapp) _ DnB _ NCS - Copyright Free Music.mp3',
      '/MLG/music/Deaf Kev - Invincible.mp3',
      '/MLG/music/Different Heaven & EH!DE - My Heart [NCS].mp3',
      '/MLG/music/Different Heaven & EH!DE - My Heart _ Drumstep _ NCS - Copyright Free Music.mp3',
      '/MLG/music/Dr - I Keep Holding On (My Hope Will Never Die).mp3',
      '/MLG/music/Galantis - Runaway (U & I) (Gioni Remix).mp3',
      '/MLG/music/Itro & Tobu - Cloud 9.mp3',
      '/MLG/music/Jetta - I\'d Love to Change the World (Matstubs Remix).mp3',
      '/MLG/music/Jo Cohen & Sex Whales - We Are _ Future Bass _ NCS - Copyright Free Music.mp3',
      '/MLG/music/Kevin MacLeod ~ Fluffing a Duck.mp3',
      '/MLG/music/Kevin MacLeod ~ Investigations.mp3',
      '/MLG/music/Kevin MacLeod ~ Monkeys Spinning Monkeys.mp3',
      '/MLG/music/Kevin MacLeod ~ Run Amok.mp3',
      '/MLG/music/Kevin MacLeod ~ Scheming Weasel (faster version).mp3',
      '/MLG/music/Lenka - Blue Skies (REVOKE Remix).mp3',
      '/MLG/music/Lost Sky - Fearless pt.II (feat. Chris Linton) _ Trap _ NCS - Copyright Free Music.mp3',
      '/MLG/music/OMFG - Hello.mp3',
      '/MLG/music/OMFG - Hello_part1_2.mp3',
      '/MLG/music/San Holo - We Rise.mp3',
      '/MLG/music/Ship Wrek & Zookeepers - Ark (FaZe Banks Intro Song 2017).mp3',
      '/MLG/music/Syn Cole - Feel Good _ Future House _ NCS - Copyright Free Music.mp3',
      '/MLG/music/THATS RIGHT GET NOSCOPED - Sound Effect (HD).mp3',
      '/MLG/music/The Chainsmokers - Don\'t Let Me Down (Illenium Remix).mp3',
      '/MLG/music/The Happy Troll  (song) - by D1ofAquavibe.mp3',
      '/MLG/music/The Party Troll (song) by D1ofAquavibe.mp3',
      '/MLG/music/TheFatRat - Unity.mp3',
      '/MLG/music/TheFatRat - Xenogenesis (Outro Song).mp3',
      '/MLG/music/Tobu - Infectious (Original Mix).mp3',
      '/MLG/music/Undertale - Megalovania.mp3',
      '/MLG/music/Vicetone - Nevada (feat. Cozi Zuehlsdorff) [Monstercat Official Music Video].mp3',
      '/MLG/music/-Yakety Sax- Music.mp3'
    ];
    
    shuffleSongs();
    
    // Set initial audio properties
    audio.src = songs[currentSongIndex];
    audio.loop = false;
    audio.volume = 0.33;
    document.body.appendChild(audio);
    
    // Attach event listener to switch to the next song when the current one ends
    audio.addEventListener('ended', switchToNextSong);

    // Shuffle function
    function shuffleSongs() {
      // Fisher-Yates shuffle algorithm
      for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]]; // Swap elements
      }
      currentSongIndex = 0; // Reset index to the first shuffled song
      console.log('Playlist shuffled:', songs);
    }


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
    

    // switch to next song
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
      if (child.name === 'HD2L_MOD_Gramophone_pips') {
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
      <div class= "gramophone-interaction">
      </div>
    `;
    
    // Wrap the div in a CSS3DObject
    const gramophoneObject = new CSS3DObject(gramophoneDiv);
    gramophoneObject.position.set(30, 0, 30); // Adjust position as needed
    gramophoneObject.rotation.set(Math.PI / 2, Math.PI / 2, 0); // Rotate as needed
    
    gramophone.add(gramophoneObject);

    
    // Add a click event listener to the text
    gramophoneDiv.addEventListener('click', () => {
      console.log('Gramophone clicked! Changing song...');
      switchToNextSong();
    });
  }
}

// Pause music
export function pauseMusic() {
  if (audio && !audio.paused) {
    audio.pause();
    console.log('Music paused.');
  } else {
    console.log('Music is already paused or audio is not defined.');
  }
}

// Resume music
export function resumeMusic() {
  if (audio && audio.paused) {
    audio.play().catch((error) => {
      console.error('Error resuming music:', error);
    });
    console.log('Music resumed.');
  } else {
    console.log('Music is already playing or audio is not defined.');
  }
}

// Export audio for direct access in other scripts
export { audio };