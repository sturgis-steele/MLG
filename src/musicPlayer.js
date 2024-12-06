export function initializeMusicPlayer() {
    // Create audio element
    const audio = document.createElement('audio');
    audio.src = '/MLG/custom-music.mp3'; // Replace with the path to your audio file
    audio.loop = true; // Enable looping
    audio.volume = 0.5; // Set initial volume (50%)
    audio.autoplay = true; // Automatically start playback
  
    // Add the audio element to the document
    document.body.appendChild(audio);
  }
  