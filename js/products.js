const direccion = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let productsArray = [];

function showAutos(array){
    let htmlAñadir = "";

    for(let i = 0; i < array.products.length; i++){ 
        let auto = array.products[i];
        htmlAñadir += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + auto.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ auto.name + auto.cost + `</h4> 
                        <p> `+ auto.description +`</p> 
                        </div>
                        <small class="text-muted">` + auto.soldCount + ` artículos</small> 
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("listado").innerHTML = htmlAñadir; 
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(direccion).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showAutos(productsArray);
            console.log(productsArray);
        }
    });
});