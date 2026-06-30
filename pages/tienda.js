 
// 1. Array con la información de los productos
/*
const productos = [
    {
        id: 1,
        nombre: 'EL ASESINATO DE ROGER ACKROYD',
        categoria: 'Celulares',
        precio: 22000,
        imagen: "../img/ases-roger.jpg",
        descripcion: 'Pantalla AMOLED, cámara de 108MP y batería de larga duración.'
    },
    {
        id: 2,
        nombre: 'ASESINATO EN EL ORIENT EXPRESS',
        categoria: 'Audio',
        precio: 28000,
        imagen: '../img/ases-orient.jpg',
        descripcion: 'Cancelación de ruido activa y hasta 30hs de autonomía.'
    },
    {
        id: 3,
        nombre: 'MISTERIO EN EL CARIBE',
        categoria: 'Moda',
        precio: 29000,
        imagen: '../img/misterio-caribe.jpg',
        descripcion: 'Tela 100% algodón con estampado de alta definición.'
    },
    {
        id: 4,
        nombre: 'MUERTE EN EL NILO',
        categoria: 'Moda',
        precio: 25000,
        imagen: '../img/muerte-nilo.jpg',
        descripcion: 'Resistente al agua, ideal para actividades al aire libre.'
    },
    {
        id: 5,
        nombre: 'NÉMESIS',
        categoria: 'Tablets',
        precio: 33000,
        imagen: '../img/nemesis.jpg',
        descripcion: 'Pantalla Full HD, 4GB RAM y 64GB de almacenamiento.'
    },
    {
        id: 6,
        nombre: 'EL TRUCO DE LOS ESPEJOS',
        categoria: 'Accesorios',
        precio: 23000,
        imagen: '../img/truco-espejos.jpg',
        descripcion: 'Mouse, teclado y auriculares gaming en un solo kit.'
    },
];
*/


fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(productos => {
        console.log(productos)

// paso 2 Crear el html de cada card
// usar map para recorrer el array y generar el HTML

// id="btn-agregar-${id}" CADA botón tiene ID diferente -> se puede identificar 
// qué producto se pulsó
        const cardsHTML = productos.map(
            ({ id, title, category, price, image }) => {

          return `
            <div class="card-producto">
                <img src="${image}" alt="${title}">
                <div class="producto-descripcion">
                    <span>${category}</span>
                    <h5>${title}</h5>
                    <h4>$${price.toFixed(2)}</h4>
                </div>
                <button class="btn-descripcion">
                    Ver descripción
                </button>
                <a id="btn-agregar-${id}" class="agregar">
                    <i class="fa-solid fa-cart-shopping"></i> Agregar
                </a>
            </div>
        `;

            });

        // Método JOIN no le paso ningun caracter ni cadena para separar
        contenedor.innerHTML = cardsHTML.join('');
        adjuntarEventos(productos);              // adjuntar evento a botones

    })

// paso 3 tomar el elemento e insertar el array
const contenedor = document.querySelector('.productos');

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
            price: producto.price,
            image: producto.image,
            cantidad: 1
        });
    }

    // Guardar el carrito actualizado
    localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
    alert(`${producto.title} agregado al carrito!`);
}


// Paso 2 — Adjuntar eventos LUEGO DE QUE SE CARGUE LAS CARDS EN EL DOM.
function adjuntarEventos(productos) {
    productos.forEach(producto => {
        const boton = document.getElementById(`btn-agregar-${producto.id}`);
        if (boton) {
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto);
            });
        }
    });
}

