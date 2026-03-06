const url = 'https://pokeapi.co/api/v2/pokemon';
const container = document.getElementById('pokemon-container');

function crearTarjetaPokemon(datos) {
    const tarjeta = document.createElement('div');
    tarjeta.setAttribute('border', '1');
    
    const nombre = document.createElement('h2');
    nombre.textContent = datos.name.toUpperCase();
    
    const imagen = document.createElement('img');
    imagen.src = datos.sprites.front_default;
    imagen.alt = datos.name;
    imagen.width = 150;
    imagen.height = 150;
    
    
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(imagen);
    
    
    container.appendChild(tarjeta);
}

fetch(url).then(
    respuesta => {
        if(respuesta.ok){
            return respuesta.json();
        }
    }
).then(
    datos => {
        for(let i = 0; i < datos.results.length; i++){
            fetch(datos.results[i].url).then(
                respuesta => {
                    if(respuesta.ok){
                        return respuesta.json();
                    }
                }
            ).then(
                datosPokemon => {
                    crearTarjetaPokemon(datosPokemon);
                }
            ).catch(error => {
                console.log('Error al obtener Pokémon:', error.message);
            })
        }
    }
).catch(error => {
    console.log('Error al obtener lista:', error.message);
})