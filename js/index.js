// {/* <li>
//     Mercado - $50.000
//     <button class="btn btn-sm btn-secondary">
//         <i class="bi bi-trash-fill"></i>
//     </button>
// </li> */}

const taskManager = new TaskManager();
console.log(taskManager.tasks);

const contenedorTareas = document.querySelector("#contenedorTareas");
const fechas = document.querySelector("#fechas");
const mensajeAlerta = document.querySelector("#mensajeAlerta");
const btnAgregar = document.querySelector("#btnAgregar");
const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.querySelector("#btnSiguiente");

let fechaSeleccionada = new Date();
let numeroTarea = 1;

function obtenerFechaClave(fecha) {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
}

function mostrarFechas() {
    fechas.innerHTML = "";
    for (let i = -3; i <= 3; i++) {
        let fecha = new Date(fechaSeleccionada);

        fecha.setDate(
            fechaSeleccionada.getDate() + i
        );

        const dia = String(fecha.getDate()).padStart(2, "0");
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const año = fecha.getFullYear();
        const tarjetaFecha = document.createElement("div");

        tarjetaFecha.classList.add("card", "p-3", "text-center");


        if (i === 0) {
            tarjetaFecha.classList.add(
                "fecha-seleccionada"
            );
        }

        tarjetaFecha.innerHTML = `<h5 class="mb-2"> ${dia}-${mes}-${año}</h5>`;


        tarjetaFecha.addEventListener("click",
            function () {
                fechaSeleccionada = new Date(fecha);
                mostrarFechas();
                mostrarTareas();
            }
        );
        
        
        fechas.appendChild(tarjetaFecha);
    }

    mostrarTareas();
}



function mostrarTareas() {
    const fechaActual = obtenerFechaClave(fechaSeleccionada);
    const tareas = document.querySelectorAll("#contenedorTareas .col-md-6");

    tareas.forEach(function (tarea) {
        if (tarea.dataset.fecha === fechaActual) {
            tarea.style.display = "";
        } else {
            tarea.style.display = "none";
        }
    });

    actualizarNumeros();
}


function agregarTarea() {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("col-md-6");


    tarjeta.dataset.fecha = obtenerFechaClave(fechaSeleccionada);  // Guardamos la fecha del día seleccionado

    tarjeta.innerHTML = `
        <div class="tarjeta-tarea">
            <div class="row g-3">

                <div class="col-md-1 d-flex align-items-start justify-content-center">
                    <div class="numero-tarea">${numeroTarea}
                    </div>
                </div>


                <div class="col-md-7">
                    <div class="mb-3">
                        <label class="form-label">Nombre de la tarea</label>

                        <input
                            type="text"
                            class="form-control nombre-tarea"
                            placeholder="Escribe el nombre de la tarea">
                        <div class="mensaje-error nombre-error"></div>
                    </div>


                    <div class="mb-3">
                        <label class="form-label">Descripción</label>

                        <textarea
                            class="form-control descripcion-tarea"
                            rows="2"
                            placeholder="Describe en qué consiste la tarea"
                        ></textarea>
                        <div class="mensaje-error descripcion-error"></div>
                    </div>


                    <div class="row g-3">
                        <div class="col-md-4">
                            <label class="form-label">Hora de inicio</label>
                            <select
                                class="form-select hora-inicio">
                                <option>08:00</option>
                                <option>09:00</option>
                                <option>10:00</option>
                                <option>11:00</option>
                                <option>12:00</option>
                                <option>13:00</option>
                                <option>14:00</option>
                                <option>15:00</option>
                                <option>16:00</option>
                                <option>17:00</option>
                                <option>18:00</option>
                                <option>19:00</option>
                                <option>20:00</option>
                            </select>
                        </div>


                        <div class="col-md-4">
                            <label class="form-label">Hora final</label>
                            <select
                                class="form-select hora-final">
                                <option>08:00</option>
                                <option>09:00</option>
                                <option>10:00</option>
                                <option>11:00</option>
                                <option>12:00</option>
                                <option>13:00</option>
                                <option>14:00</option>
                                <option>15:00</option>
                                <option>16:00</option>
                                <option>17:00</option>
                                <option>18:00</option>
                                <option>19:00</option>
                                <option>20:00</option>
                            </select>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Fecha final</label>

                            <input
                                type="date"
                                class="form-control fecha-entrega">
                            <div class="mensaje-error fecha-error"></div>
                        </div>
                    </div>
                </div>


                <div class="col-md-3">
                    <div class="text-center mb-4">
                        <label class="form-label d-block">Completar tarea</label>

                        <button
                            type="button"
                            class="btn-completar">
                            <i class="bi bi-check"></i>
                        </button>
                    </div>


                    <div class="text-center">
                        <label class="form-label d-block">Eliminar tarea</label>

                        <button
                            type="button"
                            class="btn-eliminar">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>`;


contenedorTareas.appendChild(tarjeta);

const inputNombre = tarjeta.querySelector(".nombre-tarea");
const inputDescripcion = tarjeta.querySelector(".descripcion-tarea");
const inputFecha = tarjeta.querySelector(".fecha-entrega");
const nombreError = tarjeta.querySelector(".nombre-error");
const descripcionError = tarjeta.querySelector(".descripcion-error");
const fechaError = tarjeta.querySelector(".fecha-error");

inputNombre.addEventListener("input",   // Quitar error del nombre cuando escribimos
    function () {
    if (inputNombre.value.trim() !== "") {
        nombreError.textContent = "";
    }
});


inputDescripcion.addEventListener("input",  // Quitar error de la descripción cuando escribimos
    function () {
    if (inputDescripcion.value.trim() !== "") {
        descripcionError.textContent = "";
    }
});


inputFecha.addEventListener("input", 
    function () {
    if (inputFecha.value !== "") {
        fechaError.textContent = "";
    }
});


const botonCompletar = tarjeta.querySelector(".btn-completar");

botonCompletar.addEventListener(
    "click",
    function () {
        const nombre = tarjeta.querySelector(".nombre-tarea");
        const descripcion = tarjeta.querySelector(".descripcion-tarea");
        const fechaEntrega = tarjeta.querySelector(".fecha-entrega");
        const datosTarea = {
            nombre: nombre.value,
            descripcion: descripcion.value,
            fechaEntrega: fechaEntrega.value,
            estado: "pendiente"
        };
        const formularioValido = validFormFieldInput(datosTarea);

if (!formularioValido) {
    mensajeAlerta.classList.remove("d-none");
    const nombreError = tarjeta.querySelector(".nombre-error");
    const descripcionError = tarjeta.querySelector(".descripcion-error");
    const fechaError = tarjeta.querySelector(".fecha-error");

    nombreError.textContent = "";
    descripcionError.textContent = "";
    fechaError.textContent = "";

if (datosTarea.nombre.trim() === "") {
    nombreError.textContent = "El nombre de la tarea es obligatorio.";
}

if (datosTarea.descripcion.trim() === "") {
    descripcionError.textContent = "La descripción de la tarea es obligatoria.";
}

if (datosTarea.fechaEntrega === "") {
    fechaError.textContent = "La fecha final es obligatoria.";
}
    return;
}

mensajeAlerta.classList.add("d-none");

if (!tarjeta.querySelector(".tarjeta-tarea").classList.contains("completada")) {
    datosTarea.estado = "completada";
    
    tarjeta
        .querySelector(".tarjeta-tarea")
        .classList.add("completada");
} else {
    datosTarea.estado = "pendiente";

    tarjeta
        .querySelector(".tarjeta-tarea")
        .classList.remove("completada");
}
console.log("Datos de la tarea:", datosTarea);
    }
);

const botonEliminar = tarjeta.querySelector(".btn-eliminar");

botonEliminar.addEventListener("click",
    function () {
        tarjeta.remove();
        actualizarNumeros();
    }
);
numeroTarea++;
mostrarTareas();
}


function actualizarNumeros() {
    const tareas = document.querySelectorAll("#contenedorTareas .col-md-6");
    let numero = 1;
    
tareas.forEach(function (tarea) {
    if (tarea.style.display !== "none") {
        const numeroTarea = tarea.querySelector(".numero-tarea");

numeroTarea.textContent = numero;
numero++;
}
});
}


function validFormFieldInput(data) {   //aqui tengo boton agregar
    console.log("LA FUNCIÓN DE VALIDACIÓN EXISTE");

    if (data.nombre.trim() === "") {
        return false;
    }

    if (data.descripcion.trim() === "") {
        return false;
    }

    if (data.fechaEntrega === "") {
        return false;
    }
    if (data.estado === "") {
    return false;
}
    return true;
}


btnAgregar.addEventListener("click",
    function () {
        agregarTarea();
    }
);


btnAnterior.addEventListener("click",  //desde aqui la flecha anterior
    function () {
        fechaSeleccionada.setDate(fechaSeleccionada.getDate() - 1);
        mostrarFechas();
    }
);

btnSiguiente.addEventListener("click",    //la flecha siguiente
    function () {
        fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1);
        mostrarFechas();
    }
);

mostrarFechas();
agregarTarea();