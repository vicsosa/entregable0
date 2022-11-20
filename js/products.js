const direccion = "https://japceibal.github.io/emercado-api/cats_products/";
let categorías = localStorage.getItem('catID');
let products = [];

function mostrarArticulos(articulos){
    let htmlAñadir = "";

    let texto = document.getElementById('buscar').value.toLowerCase(); //el método 'toLowerCase' convierte todo a minúscula. 

    for(let articulo of articulos){
        let palabra = articulo.name.toLowerCase() //el método 'toLowerCase' convierte todo a minúscula. 
        let descripción = articulo.description.toLowerCase(); //el método 'toLowerCase' convierte todo a minúscula. 
        if(palabra.indexOf(texto)!== -1 || descripción.indexOf(texto)!== -1){ 
/* indexOf tira -1 cuando no existen elementos iguales. Y tira 1 cuando sí existen. Al decir '!== -1' estamos diciendo
que si la palabra escrita en el buscador es diferente de inexistente, es decir existe, que muestre los productos coincidentes*/
        htmlAñadir += 
        `   
        <div onclick="setID(${articulo.id})" class="list-group-item list-group-item-action"><a href="product-info.html">
            <div class="row">
                <div class="col-3">
                    <img src="${articulo.image}" + " alt="product image" class="img-thumbnail">
                    </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${articulo.name + " -" + articulo.currency + " " + articulo.cost}</h4> 
                        <p> ${articulo.description}</p> 
                        </div>
                        <small class="text-muted">${articulo.soldCount} artículos</small> 
                    </div>
                </div>
            </div>
            </a>
        </div>`
    }
    document.getElementById("listado").innerHTML = htmlAñadir; 
}}

function filtro(){
    //el parseInt me convierte a entero un numero que es tomado como string
    let minimo = parseInt(document.getElementById('Min').value);
    let maximo = parseInt(document.getElementById('Max').value);
    //al usar el 'or' permito que se filtre sólo ingresando como dato un precio minimo o un precio max., no necesariamente ambos. 
    listaFiltros = products.filter(articulo => articulo.cost >= minimo && articulo.cost <= maximo);
    listaFiltros.sort((a,b)=>a.cost-b.cost);
    mostrarArticulos(listaFiltros)
}

//la función limpiar quita el filtro precio y vuelve a mostrar todo los artic de la categoria
function limpiar(){
   mostrarArticulos(products);
   parseInt(document.getElementById('Min').value="");
   parseInt(document.getElementById('Max').value="");
}

function ordenarASC(){
    let ascendente = document.getElementById('ascendente');
    listaOrdenada= products.sort (articulo => articulo.cost - articulo.cost)
    if (ascendente.click = true){
        products.sort((a,b)=> a.cost - b.cost);
        mostrarArticulos(listaOrdenada);
    }}

function ordenarDESC(){
    let descendente = document.getElementById('descendente');
    listaOrdenada= products.sort (articulo => articulo.cost - articulo.cost)
    if(descendente.click = true){
        products.sort((a,b)=> b.cost - a.cost);
        mostrarArticulos(listaOrdenada);
    }}

function ordenRel(){
    let relevancia = document.getElementById('rel');
    listaRelevancia= products.sort (articulo => articulo.soldCount - articulo.soldCount)
    if(relevancia.click=true){
    products.sort((a,b)=> a.soldCount - b.soldCount);
    mostrarArticulos(listaRelevancia);
    }}

    function setID(id) {
        localStorage.setItem("id", id);
    }

    function cerrarSesion(){
        localStorage.removeItem('usuario');
    }

document.addEventListener("DOMContentLoaded", function(_e){
    getJSONData(direccion + categorías + '.json').then(function(resultObj){
        if (resultObj.status === "ok")
        {
            products = resultObj.data.products;
            mostrarArticulos(products);
            console.log(products);
            document.getElementById('titulo').innerHTML+= `<h4>Productos</h4>
            <h5>Verás aquí todos los productos de la categoría ` + resultObj.data.catName + ` </h5>` 
        }
    })
        document.getElementById('filtrar').addEventListener('click',()=>{
            filtro();
            console.log(listaFiltros);
        })
        document.getElementById('clear').addEventListener('click',()=>{
            limpiar();
        })
        document.getElementById('buscar').addEventListener('input',()=>{
            mostrarArticulos(products);
        })
        let usuario= localStorage.getItem('usuario');
        document.getElementById('usuario').innerHTML+=" " + usuario;
    
            if (usuario==undefined){
                   location.href="index.html"
            }
});
