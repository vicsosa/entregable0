let prodCompra=[]

document.addEventListener("DOMContentLoaded", function(){

    let usuario= localStorage.getItem('usuario');
    document.getElementById('usuario').innerHTML+=" " + usuario;

    if (usuario==undefined){
            location.href="index.html"
        }

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    
});

function cerrarSesion(){
    localStorage.removeItem('usuario');
}