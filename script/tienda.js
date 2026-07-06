 
// 1. Array con la información de los productos
/*
const productos = [
    {
        id: 1,
        nombre: 'EL ASESINATO DE ROGER ACKROYD',
        categoria: 'Celulares',
        precio: 22000,
        imagen: "../img/ases-roger.jpg",
        descripcion: 'Misterio.'
    },
    Seguir cargando demás cards..... 
];
*/
// Tomar el elemento e insertar el array
const contenedor = document.querySelector('.productos');

fetch("https://openlibrary.org/search.json?author=Agatha+Christie")
    .then(response => response.json())
    .then(productos => {
        console.log(productos)

// Crear el html de cada card
// usar map para recorrer el array y generar el HTML

// id="btn-agregar-${id}" CADA botón tiene ID diferente -> se puede identificar 
// qué producto se pulsó
        const cardsHTML = productos.docs.map((book, index) => {

            // La API de OpenLibrary no te da un ID numérico simple, sino una ruta única  
            // que identifica al libro dentro de su base de datos. Hay que sacar /
            const id = book.key.replace(/\//g, "-");
            const title = book.title;

            const image = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                : "https://via.placeholder.com/150";

            // 🌟 CREAR PRECIO FICTICIO ALEATORIO 
            const precioFicticio = 100 + (title.length);
            
          return `
            <div class="card-producto">
                <img src="${image}" alt="${title}">
                <div class="producto-descripcion">
                    <h5>${title}</h5>
                    <h4>$${precioFicticio.toFixed(2)}</h4>
                </div>
                <button id="btn-ver-${id}" class="ver-descripcion">
                    Ver descripción
                </button>
                <a id="btn-agregar-${id}" class="agregar" data-precio="${precioFicticio}">
                    <i class="fa-solid fa-cart-shopping"></i> Agregar
                </a>
            </div>
        `;

            });
        
        // Método JOIN no le paso ningun caracter ni cadena para separar
        contenedor.innerHTML = cardsHTML.join('');
        adjuntarEventos(productos.docs);              // adjuntar evento a botones
    })


// ----------------------------------------------- //
// Paso 1 — Función para agregar al carrito

function agregarAlCarrito(producto) {
    // Recuperar el carrito actual o empezar con uno vacío
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

    // Buscar si el producto ya existe en el carrito
    const indiceExistente = carrito.findIndex(item => item.id === producto.id);

    if (indiceExistente !== -1) {
        // El producto ya está: aumentar cantidad en 1
        carrito[indiceExistente].cantidad++;
    } else {
        // El producto no está: agregarlo con cantidad 1
        carrito.push({
            id: producto.id,
            title: producto.title,   // guardamos en inglés para compatibilidad con la API
            //price: producto.price,
            price: producto.price,
            image: producto.image,
            cantidad: 1
        });
    }

    // Guardar el carrito actualizado
    localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
    // función que está en otro archivo de igual raíz
    mostrarToast(`${producto.title} agregado al carrito!`);
}


// Paso 2 — Adjuntar eventos LUEGO DE QUE SE CARGUE LAS CARDS EN EL DOM.
function adjuntarEventos(productos) {
    productos.forEach(producto => {
        const idHTML = producto.key.replace(/\//g, "-");

        const boton = document.getElementById(`btn-agregar-${idHTML}`);
        if (boton) {
            boton.addEventListener('click', () => {
                // 🌟 LEER EL PRECIO DESDE EL BOTÓN HTML
                const precioDelLibro = parseFloat(boton.dataset.precio);

                agregarAlCarrito({
                    id: idHTML,
                    title: producto.title,
                    price: precioDelLibro,
                    image: producto.cover_i
                        ? `https://covers.openlibrary.org/b/id/${producto.cover_i}-L.jpg`
                        : "https://via.placeholder.com/150"

                    });
            });
        }

        const btnVer = document.getElementById(`btn-ver-${idHTML}`);
        if (btnVer) {
            btnVer.addEventListener('click', () => {
                abrirModal(producto);
            })
        }

    });
}

function abrirModal(producto) {
    const anio = producto.first_publish_year || "Desconocido";

    document.getElementById('modalTitulo').textContent = producto.title;
    document.getElementById('modalAnioPublicación').textContent = anio;
    document.getElementById('modalTemática').textContent = producto.edition_count;
    document.getElementById('overlayModal').classList.add('visible');
}

function cerrarModal() {
    document.getElementById('overlayModal').classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnCerrarModal').addEventListener('click', cerrarModal);
    /* Pueda cerrar también haciendo clic afuera del recuadro     */
    document.getElementById('overlayModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('overlayModal')) {
            cerrarModal();
        }
    })
})
