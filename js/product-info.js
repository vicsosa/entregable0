const prodUrl = "https://japceibal.github.io/emercado-api/products/"
let id= localStorage.getItem('id');
const comentarios = "https://japceibal.github.io/emercado-api/products_comments/"
let coments=[];
const url_carrito = "https://japceibal.github.io/emercado-api/user_cart/25801.json"

function mostrar(producto){
    let htmlAgregar = "";
{
       
        htmlAgregar += 
        `   
        <div class="col">
            <div class="col-3">
                </div>
                    <div class="mb-1">
                        <h1>${producto.name}
                        </h1>
                        <hr>
                        <b>Precio</b>
                        <p>${producto.cost}</p> 
                        <b>Descripción</b>
                        <p>${producto.description}</p> 
                        <b>Categoría</b>
                        <p>${producto.category}</p> 
                        <b>Cantidad vendida</b>
                        <p>${producto.soldCount}</p>
                        <b>Imágenes ilustrativas</b><br>
                        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="10000">
                            <img src="${producto.images[0]}" class="d-block w-100" alt="imagen1">
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                            <img src="${producto.images[1]}" class="d-block w-100" alt="imagen2">
                            </div>
                            <div class="carousel-item">
                            <img src="${producto.images[2]}" class="d-block w-100" alt="imagen3">
                            </div>
                            <div class="carousel-item">
                            <img src="${producto.images[3]}" class="d-block w-100" alt="imagen4">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>         
                </div>
            </div>` 
 }    
document.getElementById("product-info").innerHTML = htmlAgregar;
}

function Showcomentarios(coments){
    let htmlAgregar2="";
    for (let comentario of coments){
        htmlAgregar2 += `
        <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 class="my-0">${comentario.user + " - Fecha " + comentario.dateTime} - ${calificar(comentario.score)}</h6>
          <small class="text-muted">${comentario.description}</small>
        </div>
      </li>`
    }
    document.getElementById("coments").innerHTML = htmlAgregar2;
    localStorage.setItem("ComentarObj", JSON.stringify(coments));
}

function calificar(score){
    let calificación="";
for (let i=1; i<=5; i++){
   if(i<=score){
       calificación += '<i class="fas fa-star checked"></i>' //estrella llena
   }else{
       calificación += '<i class="far fa-star checked"></i>' //estrella vacía
   }}
   document.getElementById('estrellas').innerHTML=calificación;
   return calificación;
}

function fecha(){
    let fecha= new Date()
    return `${fecha.getUTCDate()}-${fecha.getMonth()}-${fecha.getFullYear()} - ${fecha.getHours()}:${fecha.getMinutes()}`
}

function agregarNewComment(){
let stars = calificar(document.getElementById('estrellas').value);
let usuario = localStorage.getItem('usuario');
let score = document.getElementById('calificar').value;
let opinion = document.getElementById('opinión').value;
let requerimiento ="";
if(opinion!="" && stars!=""){
    coments.push({"product":id,"score":score,"description":opinion,"user":usuario,"dateTime":fecha()})
    document.getElementById('opinión').value="";
    document.getElementById('calificar').value="0";
    Showcomentarios(coments)
}else{
    requerimiento+= `Debes completar los campos para añadir tu comentario.`
    document.getElementById('opinión').style.borderColor = "red"
    document.getElementById('calificar').style.borderColor = "red"
}
    document.getElementById('requerido').innerHTML=requerimiento;
}

function mostrarRelacionados(arrayProdsRelacionados){
    let htmlProdRelacionados="";
    for (let productoRel of arrayProdsRelacionados){
    htmlProdRelacionados+=
    `<div class="col-md-4" onclick="setIDRel(${productoRel.id})">
    <a href="product-info.html">
          <div class="card mb-4 shadow-sm custom-card cursor-active">
              <img class="bd-placeholder-img card-img-top" src="${productoRel.image}" + " alt="product image">
              <h3 class="m-3">${productoRel.name}</h3>
              <div class="card-body">
              </div>
            </div>
          </div>`
}
document.getElementById("prodsRel").innerHTML = htmlProdRelacionados;
}

function cerrarSesion(){
    localStorage.removeItem('usuario');
}

function setIDRel(id) {
    localStorage.setItem("id", id);
} 

                         //ADDEVENTLISTENER Y JSON//
document.addEventListener("DOMContentLoaded", function(_e){
getJSONData(prodUrl + id + '.json').then(function(resultObj){
    if (resultObj.status === "ok")
    {
        prodUnit = resultObj.data;
        mostrar(prodUnit);
        console.log(prodUnit);
        prodRel= resultObj.data.relatedProducts;
        mostrarRelacionados(prodRel);
    }
});
getJSONData(comentarios + id + '.json').then(function(resultObj){
    if (resultObj.status === "ok")
    {
        urlComentarios = resultObj.data;
        Showcomentarios(urlComentarios)
        console.log(urlComentarios);
    }
});

document.getElementById('calificar').addEventListener('change', function(){
    calificar(document.getElementById('calificar').value);
})
document.getElementById('enviar').addEventListener('click',()=>{
    coments = JSON.parse(localStorage.getItem("ComentarObj"));
    agregarNewComment();
})
let usuario= localStorage.getItem('usuario');
        document.getElementById('usuario').innerHTML+=" " + usuario;
    
            if (usuario==undefined){
                   location.href="index.html"
            }
if(localStorage.getItem("produCompra")==null){
   localStorage.setItem("produCompra", '[]')
}
document.getElementById('comprar').addEventListener('click',()=>{
   produCompra= JSON.parse(localStorage.getItem("produCompra"))
   prodUnit['count'] = 1
   produCompra.push({"id":prodUnit.id,"name":prodUnit.name,"unitCost":prodUnit.cost,"currency":prodUnit.currency,"count":prodUnit.count, "image":prodUnit.images[0]})
   localStorage.setItem("produCompra", JSON.stringify(produCompra))
   location.href="cart.html"
})
});