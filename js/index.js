function redireccionar (){
    location.href="portada.html"
}

function login(){
    let usuario = document.getElementById('email').value;
    let clave = document.getElementById('clave1').value;
   if(usuario==="" || clave===""){ 
    document.getElementById('clave1').style.borderColor = "red"
    document.getElementById('email').style.borderColor = "red"
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Los datos no cumplen con los requisitos.',
        confirmButtonText: 'Intentar  de nuevo',
        confirmButtonColor: '#0087F7',
        footer: '<p>¿Olvidaste tu contraseña?</p> ' + 
        ' <a href=""> Recuperala aquí.</a>'
      })
   }else{
    localStorage.setItem('dato', usuario);
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Has inciado sesión',
        confirmButtonText: '<a location.href="portada.html">¡Vamos a e-mercado!</a>',
        confirmButtonColor: '#0087F7',
        timer: '2500',
        timerProgressBar: true,
        backdrop: true, //cuando aparece el cartel, el fondo queda con sombrita
      })
      setTimeout("redireccionar()", 2000);
}}

document.addEventListener('DOMContentLoaded' ,() =>{
    document.getElementById('ingresar').addEventListener('click' ,() =>{
    login();
    });
})
