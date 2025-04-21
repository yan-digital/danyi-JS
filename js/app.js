class Producto {
    constructor(nombre, incluye, precio) {
        this.nombre = nombre;
        this.incluye = incluye;
        this.precio = parseFloat(precio);
    }
}

const productos = [
    new Producto("Opción 1", "Una foto grupal tamaño 15x21cm", 6000),
    new Producto("Opción 2", "Una foto grupal tamaño 15x21cm, una tira de 4 fotos individuales del alumno tamaño 4x6cm, una foto individual del alumno tamaño 15x21cm", 9000),
    new Producto("Opción 3", "Una foto grupal tamaño 15x21cm, una tira de 4 fotos individuales del alumno tamaño 4x6cm, una foto individual del alumno tamaño 20x30cm", 13000),
    new Producto("Opción 4", "Una foto grupal tamaño 15x21cm, una foto individual del alumno tamaño 20x30cm, una foto con la maestra tamaño 15x21cm y una tira de 4 fotos individuales del alumno tamaño 4x6cm", 16000)
];

const contenedor = document.getElementById("contenedorProductos");
const listaCarrito = document.getElementById("listaCarrito");
const totalDisplay = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar");

let carrito = [];

// Recuperar del localStorage
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    renderizarCarrito();
}

productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.classList.add("producto");
    card.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p><em>Incluye:</em> ${producto.incluye}</p>
        <p><strong>$${producto.precio.toLocaleString("es-AR")}</strong></p>
        <button data-index="${index}">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
});

contenedor.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        const index = e.target.getAttribute("data-index");
        const producto = productos[index];
        carrito.push(producto);
        actualizarStorage();
        renderizarCarrito();
    }
});

botonVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarStorage();
    renderizarCarrito();
});

function renderizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach(prod => {
        const li = document.createElement("li");
        li.textContent = `${prod.nombre} - $${prod.precio.toLocaleString("es-AR")}`;
        listaCarrito.appendChild(li);
        total += prod.precio;
    });

    totalDisplay.textContent = `Total: $${total.toLocaleString("es-AR")}`;
}

function actualizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

contenedor.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        const index = e.target.getAttribute("data-index");
        const producto = productos[index];
        carrito.push(producto);
        actualizarStorage();
        renderizarCarrito();

        // Efecto visual en la card
        const card = e.target.closest(".producto");
        card.classList.add("agregado");
        setTimeout(() => card.classList.remove("agregado"), 600);
    }
});

