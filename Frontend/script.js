// Navar Responsive

const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// Supongamos que tienes una función de autenticación llamada loginUser() que se llama cuando un usuario inicia sesión con éxito.
function loginUser() {
    // Lógica de inicio de sesión aquí...

    // Mostrar "Mi Cuenta" y "Cerrar Sesión" una vez que el usuario haya iniciado sesión.
    document.getElementById('my-account').style.display = 'block';
    document.getElementById('logout').style.display = 'block';

    // Ocultar "Registrarse" e "Iniciar Sesión".
    document.getElementById('registrarse').style.display = 'none';
    document.getElementById('iniciar-sesion').style.display = 'none';
}
