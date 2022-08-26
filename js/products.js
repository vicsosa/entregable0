const direccion = "https://japceibal.github.io/emercado-api/cats_products/";

let productsArray = [];

let categorías = localStorage.getItem('catID');

function showAutos(array){
    let htmlAñadir = "";

    for(let i = 0; i < array.products.length; i++){ 
        let articulo = array.products[i];
        htmlAñadir += 
        `    
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + articulo.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ articulo.name + " " + articulo.currency + " " + articulo.cost + `</h4> 
                        <p> `+ articulo.description +`</p> 
                        </div>
                        <small class="text-muted">` + articulo.soldCount + ` artículos</small> 
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("listado").innerHTML = htmlAñadir; 
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(direccion + categorías + '.json').then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showAutos(productsArray);
            console.log(productsArray);
            document.getElementById('titulo').innerHTML+= `<h4>Productos</h4>
            <h5>Verás aquí todos los productos de la categoría ` + productsArray.catName + ` </h5>` 
        }
    });
});