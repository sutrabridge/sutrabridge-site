const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

// A gentle spring-like pointer response for the connected system illustration.
const gravityScene = document.querySelector('.hero-art');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (gravityScene && !reducedMotion.matches && window.matchMedia('(pointer: fine)').matches) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let frame = 0;

  const animateGravity = () => {
    currentX += (targetX - currentX) * 0.075;
    currentY += (targetY - currentY) * 0.075;
    gravityScene.style.setProperty('--pointer-x', currentX.toFixed(3));
    gravityScene.style.setProperty('--pointer-y', currentY.toFixed(3));

    if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.002) {
      frame = requestAnimationFrame(animateGravity);
    } else {
      frame = 0;
    }
  };

  gravityScene.addEventListener('pointermove', (event) => {
    const bounds = gravityScene.getBoundingClientRect();
    targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    if (!frame) frame = requestAnimationFrame(animateGravity);
  });

  gravityScene.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
    if (!frame) frame = requestAnimationFrame(animateGravity);
  });
}
