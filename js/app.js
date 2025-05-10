class Producto {
    constructor(nombre, incluye, precio) {
        this.nombre = nombre;
        this.incluye = incluye;
        this.precio = parseFloat(precio);
    }
}

const productos = [
    new Producto("Opción 1", "Una foto grupal tamaño 15x21cm", 6000),
    new Producto(
        "Opción 2",
        "Una foto grupal tamaño 15x21cm, una tira de 4 fotos individuales del alumno tamaño 4x6cm, una foto individual del alumno tamaño 15x21cm",
        9000
    ),
    new Producto(
        "Opción 3",
        "Una foto grupal tamaño 15x21cm, una tira de 4 fotos individuales del alumno tamaño 4x6cm, una foto individual del alumno tamaño 20x30cm",
        13000
    ),
    new Producto(
        "Opción 4",
        "Una foto grupal tamaño 15x21cm, una foto individual del alumno tamaño 20x30cm, una foto con la maestra tamaño 15x21cm y una tira de 4 fotos individuales del alumno tamaño 4x6cm",
        16000
    ),
];

const contenedor = document.getElementById("contenedorProductos");
const listaCarrito = document.getElementById("listaCarrito");
const totalDisplay = document.getElementById("total");
const botonVaciar = document.getElementById("vaciar");

let carrito = [];

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

contenedor.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const index = e.target.getAttribute("data-index");
        const producto = productos[index];
        carrito.push(producto);
        actualizarStorage();
        renderizarCarrito();

        const card = e.target.closest(".producto");
        card.classList.add("agregado");
        setTimeout(() => card.classList.remove("agregado"), 600);
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

    carrito.forEach((prod, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${prod.nombre} - $${prod.precio.toLocaleString("es-AR")}
            <button class="eliminar" data-index="${index}">❌</button>
        `;
        listaCarrito.appendChild(li);
        total += prod.precio;
    });

    totalDisplay.textContent = `Total: $${total.toLocaleString("es-AR")}`;
}

listaCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
        const index = e.target.dataset.index;
        eliminarDelCarrito(index);
    }
});

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarStorage();
    renderizarCarrito();
}

function actualizarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

async function enviarCarritoAlServidor() {
    try {
        Swal.fire({
            title: "Enviando carrito...",
            text: "Por favor espera",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                carrito: carrito,
                fecha: new Date().toISOString(),
            }),
        });
        if (!response.ok) throw new Error("Error al enviar carrito");

        const data = await response.json();
        Swal.fire({
            icon: "success",
            title: "¡Compra realizada!",
            text: "Gracias por tu pedido 🎉",
            timer: 2000,
            showConfirmButton: false
        });
        carrito = [];
        actualizarStorage();
        renderizarCarrito();
        console.log("✅ Carrito enviado al servidor:", data);

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Ups, algo salió mal",
            text: "No se pudo enviar el carrito. Intentalo de nuevo."
        });
        console.error("❌ No se pudo enviar el carrito:", error);
    }
}

document.getElementById("finalizarCompra").addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Tu carrito está vacío",
            text: "Agregá productos antes de finalizar la compra"
        });
    } else {
        enviarCarritoAlServidor();
    }
});