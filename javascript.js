// Ejercicio 1

// Definir una función en JavaScript que reciba como parámetro la fecha del vuelo ingresada
// por el usuario. La función debe verificar que la fecha de vuelo no sea anterior a la fecha actual. Si
// la fecha ingresada es anterior, la función debe retornar el mensaje de error: " Fecha de Vuelo
// debe ser Mayor a la Fecha Actual ". Si la fecha es válida, la función debe retornar true.

function validarFecha() {
  const fechaIngresada = document.getElementById("fechaVuelo").value;
  const fechaActual = new Date().toISOString().split("T")[0];

  if (fechaIngresada > fechaActual) {
    alert("La fecha ingresada es válida.");
    return true;
  } else {
    alert(
      "La fecha ingresada es invalida. La fecha seleccionada no puede ser menor que la fecha actual."
    );
    return false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("enviarDatos")
    .addEventListener("click", validarFecha);
});

// Ejercicio 2
// Requisitos: en el archivo de JavaScript, definir una función constructora llamada Reserva que permita crear objetos de tipo reserva. Cada objeto debe almacenar la siguiente información:
// Información del vuelo: destino, origen, fecha y hora.
// Datos del pasajero: nombre completo, DNI, fecha de nacimiento, sexo.
// Preferencias de asiento: clase (Ejecutiva/Económica)
// y ubicación (ventana, pasillo, centro).

function datosReserva(
  origen,
  destino,
  fecha,
  hora,
  nombre,
  apellido,
  dni,
  fec_nac,
  sexo,
  asiento,
  ubicacion
) {
  this.origen = origen;
  this.destino = destino;
  this.fecha = fecha;
  this.hora = hora;
  this.nombre = nombre;
  this.apellido = apellido;
  this.dni = dni;
  this.fec_nac = fec_nac;
  this.sexo = sexo;
  this.asiento = asiento;
  this.ubicacion = ubicacion;
}

class sistemaReserva {
  constructor(reserva) {
    this.reservas = [];
  }
  agregarReserva(persona) {
    this.reservas.push(persona);
  }
}

const sistema = new sistemaReserva();

function guardarReserva() {
  event.preventDefault();
  const origen = document.getElementById("origen").value;
  const destino = document.getElementById("destino").value;
  const fecha = document.getElementById("fechaVuelo").value;
  const hora = document.getElementById("horaVuelo").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const dni = document.getElementById("dni").value;
  const fec_nac = document.getElementById("nacimiento").value;
  //   const sexo = document.getElementById("sexo").value;
  const asiento = document.getElementById("clase").value;
  const ubicacion = document.getElementById("ubicacion").value;

  const persona = new datosReserva(
    origen,
    destino,
    fecha,
    hora,
    nombre,
    apellido,
    dni,
    fec_nac,
    asiento,
    ubicacion
  );

  sistema.agregarReserva(persona);
  console.log(sistema.reservas);
  alert("Reserva realizada con éxito");
  renderReservas();
  alert("Tabla actualizada");
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  sistema.agregarReserva(
    new datosReserva(
      "Cordoba",
      "Mendoza",
      "2025-08-20",
      "10:30",
      "Fran",
      "Aibar",
      "12345678",
      "1990-05-10",
      "Ejecutiva",
      "Ventana"
    )
  );
  sistema.agregarReserva(
    new datosReserva(
      "Cordoba",
      "Salta",
      "2025-09-10",
      "12:00",
      "Medina",
      "Mariano",
      "23456789",
      "1985-03-22",
      "Economica",
      "Pasillo"
    )
  );
  sistema.agregarReserva(
    new datosReserva(
      "Cordoba",
      "Buenos Aires",
      "2025-10-05",
      "18:45",
      "Mateovich",
      "Bustamante",
      "34567890",
      "1992-11-30",
      "Ejecutiva",
      "Centro"
    )
  );

  renderReservas();
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    guardarReserva();
  });
});

function renderReservas() {
  const tabla = document.getElementById("tablaReservas").querySelector("tbody");
  tabla.innerHTML = "";
  sistema.reservas.forEach((reserva) => {
    const fila = document.createElement("tr");
    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = `${reserva.nombre} ${reserva.apellido}`;
    const celdaDestino = document.createElement("td");
    celdaDestino.textContent = reserva.destino;
    const celdaClase = document.createElement("td");
    celdaClase.textContent = reserva.asiento;
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaDestino);
    fila.appendChild(celdaClase);
    tabla.appendChild(fila);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const inputCantidad = document.getElementById("cantidad");
  const selectClase = document.getElementById("clase");
  const contenedor = document.getElementById("contenedorPasajeros");

  function generarFormularios() {
    contenedor.innerHTML = "";
    const cantidad = parseInt(inputCantidad.value) || 0;
    const clase = selectClase.value;

    for (let i = 1; i <= cantidad; i++) {
      const div = document.createElement("div");
      div.classList.add("border", "p-3", "mb-3");

      const titulo = document.createElement("h5");
      titulo.textContent = `Pasajero ${i}`;
      div.appendChild(titulo);

      const labelUbicacion = document.createElement("label");
      labelUbicacion.textContent = "Ubicación:";
      const selectUbicacion = document.createElement("select");
      selectUbicacion.classList.add("form-select", "mb-2");
      selectUbicacion.required = true;

      if (clase === "Ejecutiva") {
        selectUbicacion.innerHTML = `
          <option value="Ventanilla">Ventanilla</option>
          <option value="Pasillo">Pasillo</option>
        `;
      } else {
        selectUbicacion.innerHTML = `
          <option value="Ventanilla">Ventanilla</option>
          <option value="Centro">Centro</option>
          <option value="Pasillo">Pasillo</option>
        `;
      }

      const labelSilla = document.createElement("label");
      labelSilla.textContent = "Nro de silla:";
      const inputSilla = document.createElement("input");
      inputSilla.type = "number";
      inputSilla.classList.add("form-control", "mb-2");
      inputSilla.required = true;

      if (clase === "Ejecutiva") {
        inputSilla.min = 1;
        inputSilla.max = 8;
      } else {
        inputSilla.min = 9;
        inputSilla.max = 50;
      }

      const inputNombre = document.createElement("input");
      inputNombre.type = "text";
      inputNombre.classList.add("form-control", "mb-2");
      inputNombre.placeholder = "Apellido y Nombre";
      inputNombre.maxLength = 100;
      inputNombre.required = true;

      const inputDni = document.createElement("input");
      inputDni.type = "number";
      inputDni.classList.add("form-control", "mb-2");
      inputDni.placeholder = "DNI (8 dígitos)";
      inputDni.min = 10000000;
      inputDni.max = 99999999;
      inputDni.required = true;

      const inputNacimiento = document.createElement("input");
      inputNacimiento.type = "date";
      inputNacimiento.classList.add("form-control", "mb-2");

      const divSexo = document.createElement("div");
      divSexo.classList.add("mb-2");
      divSexo.innerHTML = `
        <label>Sexo:</label><br>
        <input type="radio" name="sexo${i}" value="M" required> Masculino
        <input type="radio" name="sexo${i}" value="F" required> Femenino
      `;

      div.appendChild(labelUbicacion);
      div.appendChild(selectUbicacion);
      div.appendChild(labelSilla);
      div.appendChild(inputSilla);
      div.appendChild(inputNombre);
      div.appendChild(inputDni);
      div.appendChild(inputNacimiento);
      div.appendChild(divSexo);

      contenedor.appendChild(div);
    }
  }

  inputCantidad.addEventListener("input", generarFormularios);
  selectClase.addEventListener("change", generarFormularios);
});
