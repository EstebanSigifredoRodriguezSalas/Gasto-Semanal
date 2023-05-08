// Definir variables para el presupuesto total y el presupuesto restante
let presupuestoTotal = 0;
let presupuestoRestante = 0;

// Función para preguntar el presupuesto al usuario
function preguntarPresupuesto() {
  let presupuestoIngresado = prompt('Ingrese su presupuesto semanal:');
  presupuestoIngresado = parseInt(presupuestoIngresado);

  // Validar que el presupuesto ingresado sea un número válido
  while (isNaN(presupuestoIngresado) || presupuestoIngresado <= 0) {
    presupuestoIngresado = prompt('Presupuesto no válido. Ingrese su presupuesto semanal:');
    presupuestoIngresado = parseInt(presupuestoIngresado);
  }

  // Asignar el presupuesto ingresado a las variables de presupuesto
  presupuestoTotal = presupuestoIngresado;
  presupuestoRestante = presupuestoIngresado;

  // Actualizar el presupuesto total y el presupuesto restante en el HTML
  const presupuestoTotalHTML = document.querySelector('#total');
  const presupuestoRestanteHTML = document.querySelector('#restante');
  presupuestoTotalHTML.textContent = presupuestoTotal;
  presupuestoRestanteHTML.textContent = presupuestoRestante;
}

// Llamar a la función preguntarPresupuesto al cargar la página
preguntarPresupuesto();

// Obtener elementos del HTML para manipularlos con JavaScript
const formulario = document.querySelector('#agregar-gasto');
const listaGastos = document.querySelector('#gastos ul');
const presupuestoTotalHTML = document.querySelector('#total');
const presupuestoRestanteHTML = document.querySelector('#restante');

// Agregar evento submit al formulario
formulario.addEventListener('submit', function(evento) {
  evento.preventDefault(); // Prevenir que el formulario se envíe

  // Obtener los valores ingresados por el usuario
  const nombreGasto = document.querySelector('#gasto').value;
  const cantidadGasto = parseInt(document.querySelector('#cantidad').value);

  // Validar que la cantidad de gasto ingresada sea un número válido
  if (isNaN(cantidadGasto) || cantidadGasto <= 0) {
    alert('Cantidad de gasto no válida.');
    return; // Salir de la función para que no se agregue el gasto a la lista
  }

  // Validar que el gasto no sea mayor que el presupuesto restante
  if (cantidadGasto > presupuestoRestante) {
    alert('El gasto no puede ser mayor que el presupuesto restante.');
    return; // Salir de la función para que no se agregue el gasto a la lista
  }

  // Crear un elemento li para agregar a la lista de gastos
  const nuevoGasto = document.createElement('li');
  nuevoGasto.className = 'list-group-item';
  nuevoGasto.innerHTML = `${nombreGasto} <span class="badge badge-primary badge-pill">$${cantidadGasto}</span>`;

  // Agregar el nuevo gasto a la lista de gastos
  listaGastos.appendChild(nuevoGasto);

  // Actualizar el presupuesto total y el presupuesto restante
  presupuestoRestante -= cantidadGasto;
  presupuestoRestanteHTML.textContent = presupuestoRestante;
});

class Presupuesto {
    constructor(presupuesto) {
      this.presupuesto = Number(presupuesto);
      this.restante = Number(presupuesto);
      this.gastos = [];
    }
  
    agregarGasto(nombre, cantidad) {
      const gasto = { nombre, cantidad };
      this.gastos.push(gasto);
      this.restante -= cantidad;
    }
  
    eliminarGasto(indice) {
      const gasto = this.gastos[indice];
      this.restante += gasto.cantidad;
      this.gastos.splice(indice, 1);
    }
  
    actualizarCantidad(cantidad) {
      this.presupuesto = Number(cantidad);
      this.restante = Number(cantidad);
      this.gastos = [];
    }
}

const presupuesto = new Presupuesto(500);

// Llamamos al método agregarGasto
presupuesto.agregarGasto('Comida', 50);

// Llamamos al método eliminarGasto
presupuesto.eliminarGasto(0);

// Llamamos al método actualizarCantidad
presupuesto.actualizarCantidad(1000);