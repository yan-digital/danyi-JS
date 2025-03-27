const saludo = 'Bienvenidos a Danyi Eventos - Fotografía Profesional';
alert(saludo);

function solicitarContraseña() {
    const password = prompt("Ingresa tu contraseña:");
    
    if (password === "eventos") { 
        alert("Acceso concedido.");
        return true;
    } else {
        alert("Acceso denegado. Por favor, intentalo nuevamente.");
        return false;
    }
}

const accesoPermitido = solicitarContraseña(); // Guarda el resultado

if (accesoPermitido) {
    function opcionCarpeta() { 
        let opcion1 = "1- Carpeta Completa";
        let opcion2 = "2- Carpeta Individual";

        const opcionUsuario = prompt(`Por favor, tipea el número de la opción que quieras elegir:\n ${opcion1}\n ${opcion2}`);
        
        if (parseFloat(opcionUsuario) === 2) {
            confirm("Carpeta Completa fue seleccionada exitosamente ¡Muchas gracias!");
        } else if (parseFloat(opcionUsuario) === 1) {
            confirm("Carpeta Individual fue seleccionada exitosamente ¡Muchas gracias!");
        } else {
            alert("Por favor, selecciona una de las opciones indicadas ¡Muchas gracias!");
        }
    }
    
    opcionCarpeta();
}

let opcionesDeProductos = ["carpeta completa", "carpeta individual", "pack principal", "fotos sin pack"];


