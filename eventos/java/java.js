window.addEventListener('load', () => {
    const loadText = document.getElementById('load-text');
    loadText.textContent = '¡Página cargada!';
    loadText.style.color = 'green';
    loadText.style.fontWeight = 'bold';
});

let clickCount = 0;
const boxClick = document.getElementById('box-click');
const clickCountElement = document.getElementById('click-count');

boxClick.addEventListener('click', () => {
    clickCount++;
    clickCountElement.textContent = `Clics: ${clickCount}`;
    
    boxClick.style.background = `hsl(${clickCount * 30}, 70%, 90%)`;
});

const boxMove = document.getElementById('box-move');
const coordsElement = document.getElementById('coords');

boxMove.addEventListener('mousemove', (event) => {
    const rect = boxMove.getBoundingClientRect();
    const x = Math.round(event.clientX - rect.left);
    const y = Math.round(event.clientY - rect.top);
    
    coordsElement.textContent = `X: ${x}, Y: ${y}`;
});

const scrollPosition = document.getElementById('scroll-position');

window.addEventListener('scroll', () => {
    const scrollY = Math.round(window.pageYOffset);
    scrollPosition.textContent = `Scroll: ${scrollY}px`;
    
    const scrollPercent = (scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollPosition.style.color = `hsl(${scrollPercent * 3.6}, 70%, 50%)`;
});

const parallaxBg = document.getElementById('parallax-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    parallaxBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
});