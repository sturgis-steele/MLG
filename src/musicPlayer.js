export function initializeMusicPlayer() {
  // Create audio element
  const audio = document.createElement('audio');
  audio.src = '/MLG/custom-music.mp3'; // Replace with the path to your audio file
  audio.loop = true; // Enable looping
  audio.volume = 0.5; // Set initial volume (50%)

  // Add the audio element to the document
  document.body.appendChild(audio);

  // Attempt to autoplay the audio
  audio.play().catch(() => {
    console.log('Autoplay failed. Waiting for user interaction to start music.');
  });

  // Add event listener to start audio on user interaction if autoplay failed
  const startMusicOnInteraction = () => {
    audio.play().catch((error) => {
      console.error('Error starting music playback:', error);
    });
    // Remove the event listener after the music starts
    document.removeEventListener('click', startMusicOnInteraction);
    document.removeEventListener('keydown', startMusicOnInteraction);
  };

  // Listen for user interaction (click or key press)
  document.addEventListener('click', startMusicOnInteraction);
  document.addEventListener('keydown', startMusicOnInteraction);
}
