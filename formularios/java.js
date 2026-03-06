let usuarios = [];

const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const mensajeExito = document.getElementById('mensaje-exito');
const loginForm = document.getElementById('login-form');
const btnIrRegistro = document.getElementById('btn-ir-registro');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
const catsContainer = document.getElementById('cats-container');

function cargarUsuariosDesdeLocalStorage() {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
        usuarios = JSON.parse(usuariosGuardados);
        console.log('Usuarios cargados desde LocalStorage:', usuarios);
    }
}

function guardarUsuariosEnLocalStorage() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('Usuarios guardados en LocalStorage:', usuarios);
}

function guardarSesionActiva(usuario) {
    localStorage.setItem('sesionActiva', JSON.stringify(usuario));
    console.log('Sesión activa guardada:', usuario);
}

function obtenerSesionActiva() {
    const sesion = localStorage.getItem('sesionActiva');
    return sesion ? JSON.parse(sesion) : null;
}

function cerrarSesionActiva() {
    localStorage.removeItem('sesionActiva');
    console.log('Sesión cerrada');
}

function verificarSesionAlCargar() {
    const sesionActiva = obtenerSesionActiva();
    if (sesionActiva) {
        mostrarMensajeExito(
            '¡Bienvenido de Nuevo!',
            `Sesión activa de ${sesionActiva.nombre}`
        );
    }
}

function obtenerGatos() {
    const url = 'https://api.thecatapi.com/v1/images/search?limit=10';
    
    fetch(url)
        .then(respuesta => {
            if (respuesta.ok) {
                return respuesta.json();
            }
            throw new Error('Error al obtener gatos');
        })
        .then(datos => {
            catsContainer.innerHTML = '<h3>Tus gatitos del dia:</h3>';
            
            datos.forEach((gato, index) => {
                crearTarjetaGato(gato, index + 1);
            });
        })
        .catch(error => {
            console.log('Error:', error.message);
            catsContainer.innerHTML = '<p>Error al cargar los gatitos</p>';
        });
}

function crearTarjetaGato(gato, numero) {
    const tarjeta = document.createElement('div');
    tarjeta.style.border = '2px solid black';
    tarjeta.style.margin = '10px';
    tarjeta.style.padding = '10px';
    tarjeta.style.display = 'inline-block';
    tarjeta.style.textAlign = 'center';
    
    const titulo = document.createElement('h4');
    titulo.textContent = `Gato #${numero}`;
    
    const imagen = document.createElement('img');
    imagen.src = gato.url;
    imagen.alt = `Gato ${numero}`;
    imagen.width = 200;
    imagen.height = 180;
    imagen.style.objectFit = 'cover';
    
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(imagen);
    
    catsContainer.appendChild(tarjeta);
}

function crearFormularioRegistro() {
    const form = document.createElement('form');
    form.id = 'register-form';

    form.innerHTML = `
        <h2>Registro</h2>
        
        <label>Nombre:</label><br>
        <input type="text" name="nombre" required><br><br>
        
        <label>Email:</label><br>
        <input type="email" name="email" required><br><br>
        
        <label>Contraseña:</label><br>
        <input type="password" name="password" required><br><br>
        
        <label>Confirmar Contraseña:</label><br>
        <input type="password" name="confirmPassword" required><br><br>
        
        <button type="submit">Registrarse</button>
        <br><br>
        <button type="button" id="btn-ir-login">Iniciar Sesión</button>
    `;

    registerContainer.appendChild(form);
    form.addEventListener('submit', manejarRegistro);
    document.getElementById('btn-ir-login').addEventListener('click', mostrarLogin);
}

function mostrarLogin() {
    loginContainer.style.display = 'block';
    registerContainer.style.display = 'none';
    mensajeExito.style.display = 'none';
    cerrarSesionActiva();
}

function mostrarRegistro() {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
    mensajeExito.style.display = 'none';
}

function mostrarMensajeExito(titulo, mensaje) {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'none';
    mensajeExito.style.display = 'block';
    
    document.getElementById('titulo-mensaje').textContent = titulo;
    document.getElementById('texto-mensaje').textContent = mensaje;
    
    obtenerGatos();
}

function validarFormulario(formData, esRegistro) {
    const valores = {};
    for (let [key, value] of formData.entries()) {
        valores[key] = value.trim();
    }

    for (let [key, value] of Object.entries(valores)) {
        if (value === '') {
            alert(`El campo ${key} no puede estar vacío`);
            return false;
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(valores.email)) {
        alert('El email no es válido');
        return false;
    }

    if (esRegistro) {
        if (valores.password !== valores.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return false;
        }
        
        const emailExiste = usuarios.some(user => user.email === valores.email);
        if (emailExiste) {
            alert('Este email ya está registrado');
            return false;
        }
    }

    return valores;
}

function manejarRegistro(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const datos = validarFormulario(formData, true);
    if (!datos) return;

    const nuevoUsuario = {
        nombre: datos.nombre,
        email: datos.email,
        password: datos.password
    };

    usuarios.push(nuevoUsuario);
    
    guardarUsuariosEnLocalStorage();
    
    guardarSesionActiva(nuevoUsuario);
    
    console.log('Usuarios registrados:', usuarios);
    e.target.reset();

    mostrarMensajeExito(
        '¡Registro Exitoso!',
        `Se registró correctamente. Bienvenido ${nuevoUsuario.nombre}!`
    );
}

function manejarLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const datos = validarFormulario(formData, false);
    if (!datos) return;

    const usuario = usuarios.find(
        user => user.email === datos.email && user.password === datos.password
    );

    if (!usuario) {
        alert('Email o contraseña incorrectos');
        return;
    }

    guardarSesionActiva(usuario);

    e.target.reset();

    mostrarMensajeExito(
        '¡Sesión Iniciada!',
        `Sesión iniciada correctamente. Bienvenido ${usuario.nombre}!`
    );
}

btnIrRegistro.addEventListener('click', mostrarRegistro);
loginForm.addEventListener('submit', manejarLogin);
btnCerrarSesion.addEventListener('click', mostrarLogin);

crearFormularioRegistro();

cargarUsuariosDesdeLocalStorage();

verificarSesionAlCargar();