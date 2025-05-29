document.addEventListener("DOMContentLoaded", () => { 
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaProductos = document.querySelector('#lista-1');
    const contenedorCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
    const totalCarrito = document.querySelector('#total-carrito');
    const iconoCarrito = document.querySelector('#img-carrito');

    cargarCarritoHTML();

    // Delegación para agregar productos
    listaProductos.addEventListener('click', e => {
        if (e.target.classList.contains('agregar-carrito')) {
            const producto = e.target.closest('.product');
            leerDatosProducto(producto);
        }
    });

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carrito.length = 0;
        sincronizarStorage();
        cargarCarritoHTML();
    });

    // Eliminar un producto
    contenedorCarrito.addEventListener('click', e => {
        if (e.target.classList.contains('borrar-producto')) {
            const id = e.target.getAttribute('data-id');
            const index = carrito.findIndex(item => item.id === id);
            if (index !== -1) {
                carrito.splice(index, 1);
                sincronizarStorage();
                cargarCarritoHTML();
            }
        }
    });

    function leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h3').textContent,
            precio: producto.querySelectorAll('p')[1].textContent,
            id: producto.querySelector('a').getAttribute('data-id')
        };

        const existe = carrito.some(p => p.id === infoProducto.id);
        if (!existe) {
            carrito.push(infoProducto);
            sincronizarStorage();
            cargarCarritoHTML();
        } else {
            alert('Este producto ya está en el carrito.');
        }
    }

    function sincronizarStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoHTML() {
        // Limpiar HTML
        contenedorCarrito.innerHTML = '';

        let total = 0;

        carrito.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${producto.imagen}" width="50"></td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td><a href="#" class="borrar-producto" data-id="${producto.id}">❌</a></td>
            `;
            contenedorCarrito.appendChild(row);

            total += parseFloat(producto.precio.replace('$', '').replace('.', ''));
        });

        totalCarrito.textContent = `Total: $${total.toLocaleString('es-CO')}`;
        iconoCarrito.setAttribute('title', `Carrito (${carrito.length})`);
    }
});
