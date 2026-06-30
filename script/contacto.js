// Paso 1 — Recuperar los campos del DOM, referenciamos campos del formulario
// Busca en el HTML los elementos mediante su atributo id. NO se está modificando el texto, 
// solo se apunta al elemento.

const campoNombre  = document.getElementById('nombre');
const campoCorreo  = document.getElementById('email');
const campoMensaje = document.getElementById('mensaje');
const formulario   = document.getElementById('formularioContacto');


// Paso 2 — Cargar datos guardados al abrir la página
// Espera a que todo el HTML termine de cargarse. Recién cuando la página está lista 
// ejecuta el código que está dentro.

document.addEventListener('DOMContentLoaded', () => {

    // localStorage: nombre y correo persisten entre visitas
    // Se modifica la propiedad .value, lo que está escrito adentro.
    campoNombre.value = localStorage.getItem('contacto_nombre') || '';
    campoCorreo.value = localStorage.getItem('contacto_correo') || '';

    // sessionStorage: mensaje solo dura esta sesión
    campoMensaje.value = sessionStorage.getItem('contacto_mensaje') || '';
});


// Paso 3 — Guardar mientras el usuario escribe

// localStorage: guardamos nombre y correo en cada tecla que usuario presiona
// El evento input ocurre cada vez que cambia el contenido del campo.
// Guarda el contenido actual del input.

campoNombre.addEventListener('input', () => {
    localStorage.setItem('contacto_nombre', campoNombre.value);
});

campoCorreo.addEventListener('input', () => {
    localStorage.setItem('contacto_correo', campoCorreo.value);
});

campoMensaje.addEventListener('input', () => {
    sessionStorage.setItem('contacto_mensaje', campoMensaje.value);
});

 
// Paso 4 — Limpiar datos al enviar el formulario
// El evento submit ocurre cuando el usuario presiona el botón Enviar.

formulario.addEventListener('submit', () => {

    // Limpiar sessionStorage: mensaje ya fue enviado
    // Borra únicamente el mensaje almacenado.
    // Vacía el <textarea> en la página.
    
    sessionStorage.removeItem('contacto_mensaje');
    campoMensaje.value = '';
    
    // No limpiamos localStorage: nombre y correo se mantienen
    // para que el usuario no los tenga que escribir de nuevo
});


