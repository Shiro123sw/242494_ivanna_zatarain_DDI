/*llamar a los elementos*/
const background = document.querySelector("#background");
const tree = document.querySelector("#tree");
const horse = document.querySelector("#horse");
const title = document.querySelector("#title");

/*activar el fecto con scroll, establecer la direccion y velocidad*/
window.addEventListener('scroll', function() {
    var value = window.scrollY;
    
    background.style.top = value * 0.5 + 'px';
    
    tree.style.bottom = value * 0.3 + 'px';
    
    horse.style.transform = 'translateX(' + (500 - value * 1.5) + 'px)';
    
    title.style.transform = 'translateZ(' + (value * 1) + 'px)';
});