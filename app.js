function crearViaje() {
  let nombre = prompt("Nombre del viaje:");

  let lista = document.getElementById("listaViajes");

  let nuevo = document.createElement("li");
  nuevo.textContent = nombre;

  lista.appendChild(nuevo);
}