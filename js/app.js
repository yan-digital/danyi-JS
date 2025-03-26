
const opcionUsuario = prompt("Por favor, tipea el número de la opción que quieras elegir: 1- Carpetita Individual, 2- Carpetita Grupal")

function opcionCarpeta() { 
if (parseFloat(opcionUsuario) === 2){
    confirm("Carpetita Completa fue seleccionada exitosamente ¡Muchas gracias!")
} else if (parseFloat(opcionUsuario) === 1){
    confirm("Carpetita Individual fue seleccionada exitosamente ¡Muchas gracias!")
}else{
    alert("Por favor, selecciona una de las opciones indicadas ¡Muchas gracias!")
}
}

opcionCarpeta();

let ArrayPrecios = [];
// const cantidad = prompt("¿Cuántas fotos vas a querer?")
// const packActoPrincipal = 15;
// let fotosSinPack = [];


