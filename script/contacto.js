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
    
    // No limpiamos localStorage: nombre y correo se mantienen
    // para que el usuario no los tenga que escribir de nuevo
});




// =========================================================================
// Paso 5 — Funcionalidad de Modo Oscuro (Adicional)
// =========================================================================

// Como necesitamos interactuar con el botón apenas la página esté lista,
// agrupamos la lógica dentro de un evento de carga o la sumamos al DOMContentLoaded.

document.addEventListener('DOMContentLoaded', () => {
    const btnDarkMode = document.getElementById("toggle-darkmode");
    const iconoModo = document.getElementById("icono-modo");

    // Validamos que el botón exista en la página antes de agregar los eventos
    if (btnDarkMode && iconoModo) {
        
        // 1. Verificar si ya estaba activado en este navegador (Persistencia)
        if (localStorage.getItem("contacto-oscuro") === "activado") {
            document.body.classList.add("dark-mode");
            iconoModo.classList.replace("fa-moon", "fa-sun");
        }

        // 2. Escuchar el click del usuario para alternar el modo
        btnDarkMode.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            
            if (document.body.classList.contains("dark-mode")) {
                iconoModo.classList.replace("fa-moon", "fa-sun");
                localStorage.setItem("contacto-oscuro", "activado");
            } else {
                iconoModo.classList.replace("fa-sun", "fa-moon");
                localStorage.setItem("contacto-oscuro", "desactivado");
            }
        });
    }
});