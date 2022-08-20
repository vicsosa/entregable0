function erroreo(){
    document.getElementById('incompleto').classList.add("show");
    document.getElementById('clave1').style.borderColor = "red"
    document.getElementById('email').style.borderColor = "red"
}

function exitoso(){
    document.getElementById('exitoso').classList.add("show");
}

function ocultar(){
    document.getElementById('incompleto').classList.remove("show");
}

function login(){
    let usuario = document.getElementById('email').value;
    let clave = document.getElementById('clave1').value;
   if(usuario==="" || clave===""){ 
    erroreo();
   }else{
    localStorage.setItem('dato', usuario);
    exitoso(document.getElementById('incompleto').classList.remove("show"));
    location.href="portada.html"
}}

document.addEventListener('DOMContentLoaded' ,() =>{
    document.getElementById('ingresar').addEventListener('click' ,() =>{
    login();
    });
})
