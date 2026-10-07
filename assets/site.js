const menu = document.querySelector('.mobile-menu');
menu?.addEventListener('click', (event) => {
  if (event.target.closest('a')) menu.open = false;
});
menu?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.open) {
    menu.open = false;
    menu.querySelector('summary').focus();
  }
});

// Native autoplay is muted and inline. Visitors can pause with native controls
// or the homepage button. Reduced motion disables automatic playback.
const videos = document.querySelectorAll('video[autoplay]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const tryPlay = (video) => video.play().catch(() => {});
const applyMotionPreference = () => {
  for (const video of videos) {
    video.autoplay = !reducedMotion.matches;
    if (reducedMotion.matches) video.pause();
    else tryPlay(video);
  }
};
reducedMotion.addEventListener('change', applyMotionPreference);
applyMotionPreference();

const heroVideo = document.querySelector('.hero-video');
const motionButton = document.querySelector('.motion-button');
if (heroVideo && motionButton) {
  const updateLabel = () => {
    motionButton.textContent = heroVideo.paused ? 'Play animation' : 'Pause animation';
  };
  motionButton.hidden = false;
  motionButton.addEventListener('click', () => {
    if (heroVideo.paused) tryPlay(heroVideo);
    else heroVideo.pause();
  });
  heroVideo.addEventListener('play', updateLabel);
  heroVideo.addEventListener('pause', updateLabel);
  heroVideo.addEventListener('error', () => { motionButton.hidden = true; });
  updateLabel();
}
