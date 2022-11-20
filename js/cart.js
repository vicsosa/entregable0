const url_carrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
let carrito = [];

let productosCompra = JSON.parse(localStorage.getItem('produCompra'));
let carritofinal = carrito.concat(productosCompra) //se concatena array del producto del json con el array de los nuevos productos a añadir

function showCart(carritofinal){ //función que trae el producto desde el json al carrito de compras y además añade los productos que se quieran comprar en el momento
    let htmlAñadirCarrito="";
for(let i = 0; i < carritofinal.length; i++){
    htmlAñadirCarrito+=
    `
    <div class="col-md-2 col-lg-2 col-xl-2">
      <img
        src="${carritofinal[i].image}"
        class="img-fluid rounded-3" alt="Cotton T-shirt">
    </div>
    <div class="col-md-2 col-lg-2 col-xl-2">
      <h6 class="text-muted">Artículo</h6>
      <h6 class="text-black mb-0">${carritofinal[i].name}</h6>
    </div>
    <div class="col-md-3 col-lg-3 col-xl-3">
      <h6 class="text-muted">Costo</h6>
      ${carritofinal[i].currency}<span class="precios"> ${carritofinal[i].unitCost} </span>
    </div>
    
    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">                    
      <button class="btn btn-link px-2"
        onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
        <i class="fas fa-minus"></i>
      </button>
      <div>
      <input onclick="subtotal()" id="cantidad" min="0" name="quantity" value="${carritofinal[i].count}" type="number"
        class="form-control form-control-sm"  /></div>
      <button class="btn btn-link px-2" 
        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
        <i class="fas fa-plus"></i>
      </button>
      </div>
                <!-- SUBTOTAL -->
      <div class="col-md-3 col-lg-3 col-xl-2"> 
      <h6 class="text-muted">Subtotal</h6>
      <span name="subtotales"> 0</span>
    </div>

    <div class="col-md-1 col-lg-1 col-xl-1 text-end"> 
      <button class="btn btn-danger" class="eliminar-producto"><i class="fas fa-trash"></i></button>
    </div>
    <hr class="my-4" />
    ` 
}
document.getElementById('carrito').innerHTML= htmlAñadirCarrito;
calcularTotales() 
} 

function calcularTotales(){
let cantidad = document.getElementsByName("quantity");
let precio = document.getElementsByClassName("precios");
let subtotales= document.getElementsByName("subtotales");
let subfinal=0, costoEnvio=0
let envio15 = document.getElementById('goldradio').checked
let envio7 = document.getElementById('premiumradio').checked
let envio5 = document.getElementById('standardradio').checked
for (i=0; i< cantidad.length; i++){
  subtotales[i].innerHTML = parseInt(cantidad[i].value) * parseFloat(precio[i].innerHTML);
  cantidad[i].addEventListener('change', ()=>{calcularTotales();})
  subfinal+= parseInt(cantidad[i].value) * parseFloat(precio[i].innerHTML);
}
if(envio15==true){
  costoEnvio = subfinal * 0.15
}
if(envio7==true){
  costoEnvio = subfinal * 0.07
}
if(envio5==true){
  costoEnvio = subfinal * 0.05
}
document.getElementById("subtotalfinal").innerHTML=subfinal
document.getElementById("envio").innerHTML=costoEnvio
document.getElementById("total").innerHTML=costoEnvio+subfinal
}

function cerrarSesion(){
    localStorage.removeItem('usuario');
}

function validaciones(){
  let tarjeta = document.getElementById('goldradio1').checked
  let transferencia = document.getElementById('goldradio2').checked
  let envio1 = document.getElementById('goldradio').checked
  let envio2 = document.getElementById('premiumradio').checked
  let envio3 = document.getElementById('standardradio').checked

  //Elección de método de pago y que al elegir uno se desactiven los campos del método no seleccionado
  if(tarjeta==true && transferencia==false){
    document.getElementById('nrocuenta').disabled = true
    document.getElementById('nrotarjeta').disabled = false
    document.getElementById('codigoseg').disabled = false
    document.getElementById('exp').disabled = false
  } 
  else if(transferencia==true && tarjeta==false){
    document.getElementById('nrotarjeta').disabled = true
    document.getElementById('codigoseg').disabled = true
    document.getElementById('exp').disabled = true
    document.getElementById('nrocuenta').disabled = false
  }
  //Mensaje de que se requiere seleccionar método de pago
  if(transferencia==false && tarjeta==false){
    document.getElementById('mostrar').style.display="block"; //muestra el cartel de requerimiento
  }
  else if(transferencia==true || tarjeta==true){
    document.getElementById('mostrar').style.display="none" //oculta el cartel cuando se cumple la condición que no se había cumplido
  }
  if(transferencia==true){
    document.getElementById("no").style.display="none"
    document.getElementById("tarj").style.display="none"
    document.getElementById("transf").style.display="block"
  }
  else if(tarjeta==true){
    document.getElementById("no").style.display="none"
    document.getElementById("transf").style.display="none"
    document.getElementById("tarj").style.display="block"
  }

  //Mnesaje de que se requiere seleccionar un tipo de envío
  if(envio1==false && envio2==false && envio3==false){
    document.getElementById('selecEnvio').style.display="block" 
  }else if(envio1== true || envio2==true || envio3==true){
    document.getElementById('selecEnvio').style.display="none"
  }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(url_carrito).then(function(resultObj){
        if (resultObj.status === "ok"){
            carrito = resultObj.data.articles
            let productosCompra = JSON.parse(localStorage.getItem('produCompra'));
            let carritofinal = carrito.concat(productosCompra)
            showCart(carritofinal)
            localStorage.setItem("carrofinal", JSON.stringify(carritofinal))
            console.log(carritofinal)
        }
    });
    let usuario= localStorage.getItem('usuario');
        document.getElementById('usuario').innerHTML+=" " + usuario;
    
        if (usuario==undefined){
                location.href="index.html"
            }    
});

(function () {
  'use strict'

  // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
  var forms = document.querySelectorAll('.needs-validation')

  // Bucle sobre ellos y evitar el envío
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        else if(form.checkValidity()) {
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Has comprado con éxito!',
            timer: '2000',
            timerProgressBar: true,
            backdrop: true, /*cuando aparece el cartel, el fondo queda con sombrita*/ })
          setTimeout(2000);
        }
        form.classList.add('was-validated')
      }, false)

      })
    })()

