document.addEventListener('DOMContentLoaded', () =>{
    const botonesAgregar = document.querySelectorAll('.agregar');

    botonesAgregar.forEach((boton,indice)=>{
        boton.addEventListener('click',(e)=>{
            e.preventDefault();                 // impide que recargue la página.
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            const imagen = boton.dataset.imagen;
            // Evita duplicados de ID en el HTML y rastrear desde dónde interactúa el usuario.
            const id = `home-${indice}`;    

            agregarAlCarrito({id,nombre,precio,imagen});

        })
    })
} )
 
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];

    const indiceExistente = carrito.findIndex(item => item.id === producto.id);

    if (indiceExistente !== -1) {
        carrito[indiceExistente].cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            title: producto.nombre,
            price: producto.precio,
            image: producto.imagen,
            cantidad: 1
        });
    }

    localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
    // función que está en otro archivo de igual raíz
    mostrarToast(`${producto.nombre} agregado al carrito!`);
}
