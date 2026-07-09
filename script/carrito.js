// Paso 1 — Cargar y renderizar los productos

// Espera a que todo el HTML esté cargado.
// A todo el documento le agrego un evento: DOMContentLoaded

document.addEventListener('DOMContentLoaded', () => {
    cargarProductosCarrito();
});


function cargarProductosCarrito() {

    // Leer el carrito guardado
    const carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    // Buscar la tabla
    const tabla = document.querySelector('#tabla_carrito');
    // Limpiar la tabla
    tabla.innerHTML = '';

    let subtotal = 0;

    if (carrito.length === 0) {
        // Carrito vacío
        tabla.innerHTML = `
            <tr>
                <td colspan="6" class="carrito-vacio">
                    Tu carrito está vacío. Agregá productos desde la 
                    <a href="tienda.html">Tienda</a>.
                </td>
            </tr>`;
    } else {
        // Si tiene prod, fabrico una fila y la agrego a la tabla
        carrito.forEach(producto => {
            tabla.innerHTML += crearFilaProducto(producto);
            subtotal += producto.price * producto.cantidad;
        });
    }

    actualizarTotal(subtotal);
    adjuntarEventosFila();              // Agrega los eventos a los botones.
}

// Paso 2 — Crea el HTML de una fila
function crearFilaProducto(producto) {
    const subtotalProducto = (producto.price * producto.cantidad).toFixed(2); // 2 decimales
    const titulo = producto.title.substring(0, 20) + '...';   // límite de caracteres
    return `
        <tr>
            <td>
                <button class="remove-btn" data-id="${producto.id}">
                    <i class="far fa-times-circle"></i>
                </button>
            </td>
            <td>
                <img src="${producto.image}" alt="${producto.title}" 
                     style="height:80px; width:auto; object-fit:contain;">
            </td>
            <td>${titulo}</td>
            <td>$${producto.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${producto.cantidad}" min="1" 
                       class="cantidad-producto" data-id="${producto.id}">
            </td>
            <td>$${subtotalProducto}</td>
        </tr>
    `;
}

// Paso 3 — Actualizar el total
function actualizarTotal(subtotal) {
    document.querySelectorAll('#total').forEach(el => {
        el.textContent = `$${subtotal.toFixed(2)}`;
    });
}

// Paso 4 — Eventos: eliminar y cambiar cantidad
function adjuntarEventosFila() {

    // Eliminar producto
    document.querySelectorAll('.remove-btn').forEach(boton => {
        boton.addEventListener('click', () => {
            let carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
            const id = boton.dataset.id;
            // filter() crea un nuevo arreglo sin ese elemento.
            carrito = carrito.filter(item => String(item.id) !== String(id));
            localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
            cargarProductosCarrito();
        });
    });

    // Cambiar cantidad
    document.querySelectorAll('.cantidad-producto').forEach(input => {
        input.addEventListener('change', () => {
            const carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
            const id = input.dataset.id;
            const nuevaCantidad = parseInt(input.value);

            if (nuevaCantidad < 1) {
                input.value = 1;
                return;
            }

            const producto = carrito.find(item => String(item.id) === String(id));
            if (producto) {
                producto.cantidad = nuevaCantidad;
                localStorage.setItem('carritoDeCompras', JSON.stringify(carrito));
                recalcularTotales();
            }
        });
    });
}

// Paso 5 — Recalcular totales sin redibujar la tabla

function recalcularTotales() {
    const carrito = JSON.parse(localStorage.getItem('carritoDeCompras')) || [];
    let subtotal = 0;

    document.querySelectorAll('#tabla_carrito tr').forEach(fila => {
        const input = fila.querySelector('.cantidad-producto');
        if (input) {
            const id = input.dataset.id;
            const producto = carrito.find(item => String(item.id) === String(id));
            if (producto) {
                const subtotalFila = (producto.price * producto.cantidad).toFixed(2);
                fila.cells[5].textContent = `$${subtotalFila}`;
                subtotal += producto.price * producto.cantidad;
            }
        }
    });

    actualizarTotal(subtotal);
}

document.getElementById("btn-pagar").addEventListener("click", procederPago);

function procederPago() {
    const carrito = JSON.parse(localStorage.getItem("carritoDeCompras")) || [];

    if (carrito.length === 0) {
        mostrarToast("Tu carrito está vacío.");
        return;
    }

    if (confirm("¿Desea confirmar la compra?")) {
        mostrarToast("¡Compra realizada con éxito!");

        localStorage.removeItem("carritoDeCompras");
        cargarProductosCarrito();
    }
}