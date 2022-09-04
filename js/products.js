const direccion = "https://japceibal.github.io/emercado-api/cats_products/";
let categorías = localStorage.getItem('catID');
let Buscar= undefined;
let products = [];

function showProducts(articulos){
    let htmlAñadir = "";

    for(let articulo of articulos){
        if(Buscar==undefined || articulo.name.includes(Buscar) || articulo.description.includes(Buscar)){

        htmlAñadir += 
        `    
        <div class="list-group-item list-group-item-action">
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
        </div>
        `
        document.getElementById("listado").innerHTML = htmlAñadir; 
    }}}


function filtro(){
    //el parseInt me convierte a entero un numero que es tomado como string
    let minimo = parseInt(document.getElementById('Min').value);
    let maximo = parseInt(document.getElementById('Max').value);
    //al usar el 'or' permito que se filtre sólo ingresando como dato un precio minimo o un precio max., no necesariamente ambos. 
    listaFiltros = products.filter(articulo => articulo.cost >= minimo || articulo.cost <= maximo);
    listaFiltros.sort((a,b)=>a.cost-b.cost);
    showProducts(listaFiltros) 
}

//la función limpiar quita el filtro precio y vuelve a mostrar todo los artic de la categoria
function limpiar(){
   showProducts(products);
   parseInt(document.getElementById('Min').value="");
   parseInt(document.getElementById('Max').value="");
}

function ordenarASC(){
    let ascendente = document.getElementById('ascendente');
    listaOrdenada= products.sort (articulo => articulo.cost - articulo.cost)
    if (ascendente.click = true){
        products.sort((a,b)=> a.cost - b.cost);
        showProducts(listaOrdenada);
    }}

function ordenarDESC(){
    let descendente = document.getElementById('descendente');
    listaOrdenada= products.sort (articulo => articulo.cost - articulo.cost)
    if(descendente.click = true){
        products.sort((a,b)=> b.cost - a.cost);
        showProducts(listaOrdenada);
    }}

function ordenRel(){
    let relevancia = document.getElementById('rel');
    listaRelevancia= products.sort (articulo => articulo.soldCount - articulo.soldCount)
    if(relevancia.click=true){
    products.sort((a,b)=> a.soldCount - b.soldCount);
    showProducts(listaRelevancia);
    }}

document.addEventListener("DOMContentLoaded", function(_e){
    getJSONData(direccion + categorías + '.json').then(function(resultObj){
        if (resultObj.status === "ok")
        {
            products = resultObj.data.products;
            showProducts(products);
            console.log(products);
            document.getElementById('titulo').innerHTML+= `<h4>Productos</h4>
            <h5>Verás aquí todos los productos de la categoría ` + resultObj.data.catName + ` </h5>` 
        }
    });
        document.getElementById('filtrar').addEventListener('click',()=>{
            filtro();
            console.log(listaFiltros);
        })
        document.getElementById('clear').addEventListener('click',()=>{
            limpiar();
        })
        document.getElementById('buscar').addEventListener('input',()=>{
            Buscar = document.getElementById('buscar').value;
            showProducts(products);
        })
        let usuario= localStorage.getItem('dato');
        document.getElementById('usuario').innerHTML+=" " + usuario;
    
        if (usuario==undefined){
                location.href="index.html"
            }
    })



