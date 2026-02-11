const titulo = document.querySelector("#titulo");
const pompom = document.querySelector("#pompom");
const piano = document.querySelector("#piano");


window.addEventListener("scroll", (event) => {
   titulo.style.right = window.scrollY * 3 + "px"; 
   pompom.style.bottom = window.scrollY * 3 + "px";
   piano.style.left = window.scrollY * 2 + "px";
})