class Usuario {
  constructor(nombre, pathImg) {
    this.nombre = nombre;
    this.gastos = [];
    this.pathImg = pathImg;
  }
}

const usuarios = [
  new Usuario("Juan", "img/usuarios/avatar_a.png"),
  new Usuario("Ana", "img/usuarios/avatar_b.png"),
  new Usuario("Pedro", "img/usuarios/avatar_c.png"),
];

class Gasto {
  constructor(titulo, monto, fecha) {
    this.titulo = titulo;
    this.monto = monto;
    this.fecha = fecha;
  }
}

function addEventListener() {
  let usuario = document.getElementById("usuario");
  let titulo = document.getElementById("titulo");
  let importe = document.getElementById("importe");
  let fecha = document.getElementById("fecha");
  let boton = document.getElementById("boton");

  boton.addEventListener("click", function (event) {
    //Previene el envio del formulario antes de las correcciones
    event.preventDefault();

    //Comprobación de que todos los campos estén rellenos
    if (usuario.value === "" || !titulo.value || !importe.value || !fecha.value) {
      alert("Debes rellenar todos los campos");
      return;
    }

    //Validación de cada campo
    let tituloValido = checkTitulo(titulo.value);
    let importeValido = checkImporte(importe.value);
    let fechaValida = checkFecha(fecha.value);

    //Aplica estilos visuales según validación
    aplicarEstilo(titulo, tituloValido);
    aplicarEstilo(importe, importeValido);
    aplicarEstilo(fecha, fechaValida);

    if (tituloValido && importeValido && fechaValida) {
      procesarFormulario(usuario.value,titulo.value,importe.value,fecha.value);
      limpiarFormulario();
    }
  });
}

function aplicarEstilo(elemento, esValido) {
  if (esValido) {
    elemento.style.border = "3px solid green";
  } else {
    elemento.style.border = "3px solid red";
  }
}

function limpiarEstilos() {
  ["titulo", "importe", "fecha"].forEach((id) => {
    document.getElementById(id).style.border = "";
  });
}

function checkTitulo(input) {
  let regex = /^[a-zA-Z\s]{1,20}$/;
  let esValido = regex.test(input);
  return esValido;
}

function checkImporte(value) {
  let regex = /^(1000\.00|[0-9]{1,3}\.[0-9]{2})$/;
  let esValido = regex.test(value);
  return esValido;
}

function checkFecha(value) {
  let regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  let esValido = regex.test(value);
  return esValido;
}


//Esta función vacía los campos, estableciendo los valores a una cadena vacía
function limpiarFormulario() {
  document.getElementById("usuario").value = "";
  document.getElementById("titulo").value = "";
  document.getElementById("importe").value = "";
  document.getElementById("fecha").value = "";
  limpiarEstilos();
}

function procesarFormulario(usuarioNombre, titulo, importe, fecha) {
  let usuario = usuarios.find((u) => u.nombre === usuarioNombre);

  if (usuario) {
    let nuevoGasto = new Gasto(titulo, parseFloat(importe), fecha);
    usuario.gastos.push(nuevoGasto);
    pestaniaResumen(usuario, titulo, importe, fecha);
  }else{
    console.log("Error");
  }
}

function pestaniaResumen(usuario, importe, fecha) {
  let resumenContainer = document.querySelector("#collapseOne .accordion-body");

  if (!resumenContainer) {
    return;
  }

  let nuevoGasto = document.createElement("div");
  nuevoGasto.className = "card mb-12 espacio";
  nuevoGasto.innerHTML = `
        <div class="row g-0">
            <div class="col-md-2">
                <img src="${usuario.pathImg}" class="img-fluid rounded-start" alt="${usuario.nombre}">
            </div>
            <div class="col-md-10">
                <div class="card-body">
                    <h5 class="card-title">${usuario.nombre}</h5>
                    <p class="card-text">Pagó ${importe}€ el ${fecha}.</p>
                </div>
            </div>
        </div>
    `;

  resumenContainer.appendChild(nuevoGasto);
}

/*
function pestaniaCuentas() {
  let cuentasContainer = document.querySelector("#collapseThree .accordion-body");

  // Calculo del total gastado
  let totalGastado = 0;
  for (let usuario of usuarios) {
    for (let gasto of usuario.gastos) {
      totalGastado += gasto.monto;
    }
  }
let cuentaDiv = document.createElement("div");
 cuentaDiv.innerHTML = `
   <div class="row g-0">
     <div class="col-md-2">
       <img src="${usuario.pathImg}" class="img-fluid rounded-start" alt="${usuario.nombre}">
     </div>
     <div class="col-md-10">
       <div class="card-body">
         <h5 class="card-title">${usuario.nombre}</h5>
         <p class="card-text">Total pagado: ${gastoUsuario.toFixed(2)}€</p>
         <p class="card-text">Balance: ${Math.abs(balance).toFixed(2)}€ ${estadoBalance}</p>
       </div>
     </div>
   </div>
 `;

    cuentasContainer.appendChild(cuentaDiv);
  }

}
*/

addEventListener();
