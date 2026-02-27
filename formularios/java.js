let usuarios = [];

const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const mensajeExito = document.getElementById('mensaje-exito');
const loginForm = document.getElementById('login-form');
const btnIrRegistro = document.getElementById('btn-ir-registro');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');

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