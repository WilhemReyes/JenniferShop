document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { nombre: 'Cuadro 1', precio: 10, descripcion: 'Descripción del producto 1', url: '#', imagen: 'images/1.jpg', categoria: 'ropa' },
        { nombre: 'Cuadro 2', precio: 20, descripcion: 'Descripción del producto 2', url: '#', imagen: 'images/2.jpg', categoria: 'accesorios' },
        { nombre: 'Cuadro 3', precio: 30, descripcion: 'Descripción del producto 3', url: '#', imagen: 'images/3.jpg', categoria: 'artesanales' }
    ];

    const productosLista = document.querySelector('.productos-lista');
    const filtros = document.querySelector('#filtro-productos');
    const searchBar = document.getElementById('search-bar');
    const themeToggle = document.getElementById('theme-toggle');
    const cartToggle = document.getElementById('cart-toggle');
    const cartContainer = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const reviews = {};
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu ul');

    let cart = [];

    // Función para mostrar los productos filtrados
    const mostrarProductos = (categoria) => {
        productosLista.innerHTML = '';
        const productosFiltrados = categoria === 'todos' ? productos : productos.filter(producto => producto.categoria === categoria);
        productosFiltrados.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.classList.add('producto', 'animated-section');
            divProducto.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>$${producto.precio}</p>
                <button onclick="agregarAlCarrito('${producto.nombre}')">Compra ya</button>
                <div class="reviews">
                    <h4>Reseñas</h4>
                    <ul id="reviews-${producto.nombre.toLowerCase().replace(/\s+/g, '-')}"></ul>
                    <form onsubmit="agregarResena(event, '${producto.nombre}')">
                        <input type="text" id="review-${producto.nombre.toLowerCase().replace(/\s+/g, '-')}" placeholder="Escribe una reseña..." required>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            `;
            productosLista.appendChild(divProducto);
        });
    };

    // Event listener para cambiar los filtros
    filtros.addEventListener('change', (event) => {
        const categoria = event.target.value;
        mostrarProductos(categoria);
    });

    // Función para mostrar productos según la búsqueda
    searchBar.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(query));
        productosLista.innerHTML = '';
        productosFiltrados.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.classList.add('producto', 'animated-section');
            divProducto.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>$${producto.precio}</p>
                <button onclick="agregarAlCarrito('${producto.nombre}')">Compra ya</button>
                <div class="reviews">
                    <h4>Reseñas</h4>
                    <ul id="reviews-${producto.nombre.toLowerCase().replace(/\s+/g, '-')}"></ul>
                    <form onsubmit="agregarResena(event, '${producto.nombre}')">
                        <input type="text" id="review-${producto.nombre.toLowerCase().replace(/\s+/g, '-')}" placeholder="Escribe una reseña..." required>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            `;
            productosLista.appendChild(divProducto);
        });
    });

    // Función para agregar reseñas
    const agregarResena = (event, producto) => {
        event.preventDefault();
        const reviewInput = document.getElementById(`review-${producto.toLowerCase().replace(/\s+/g, '-')}`);
        const reviewText = reviewInput.value;
        const reviewsList = document.getElementById(`reviews-${producto.toLowerCase().replace(/\s+/g, '-')}`);
        
        const reviewItem = document.createElement('li');
        reviewItem.textContent = reviewText;
        reviewsList.appendChild(reviewItem);

        reviewInput.value = '';
    };

    // Función para cambiar el tema
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.navbar').classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
    });

    // Función para agregar productos al carrito
    const agregarAlCarrito = (producto) => {
        const productoEncontrado = productos.find(p => p.nombre === producto);
        cart.push(productoEncontrado);
        actualizarCarrito();
    };

    // Función para actualizar el carrito
    const actualizarCarrito = () => {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(producto => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${producto.nombre} - $${producto.precio}`;
            cartItems.appendChild(cartItem);
            total += producto.precio;
        });
        cartTotal.textContent = total.toFixed(2);
        cartToggle.textContent = `Carrito (${cart.length})`;
    };

    // Función para mostrar/ocultar el carrito
    cartToggle.addEventListener('click', () => {
        cartContainer.classList.toggle('visible');
    });

    // Event listener para finalizar la compra
    document.getElementById('checkout').addEventListener('click', () => {
        alert('Compra finalizada. ¡Gracias por tu compra!');
        cart = [];
        actualizarCarrito();
    });

    // Función para mostrar/ocultar el menú en móviles
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('visible');
    });

    // Mostrar todos los productos al cargar la página
    mostrarProductos('todos');

    // Suscripción
    const subscriptionForm = document.getElementById('subscription-form');
    subscriptionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const messageElement = document.getElementById('subscription-message');

        fetch('/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.text())
        .then(data => {
            messageElement.textContent = data;
        })
        .catch(error => {
            console.error('Error:', error);
            messageElement.textContent = 'Error al suscribirse';
        });
    });
});

function verProductos() {
    document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
}
