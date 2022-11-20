function email(){
    let usuario= localStorage.getItem('usuario');
      document.getElementById('usuario').innerHTML+=" " + usuario;
  
      if (usuario==undefined){
              location.href="index.html"
          }   
    document.getElementById('email').value+= usuario //guarda en el input de email, el email ingresado al momento del login
}

function  almacenarPerfil(perfil){
  perfil= JSON.parse(localStorage.getItem('perfil'));
    let nombre1 = perfil.nombre1
    let apellido1 = perfil.apellido1
    let nombre2 = perfil.nombre2
    let apellido2 = perfil.apellido2
    let telefono = perfil.telefono
    if(nombre1!=null && apellido1!=null && nombre2!=null && apellido2!=null && telefono!=null){
        document.getElementById('nombre').value+= nombre1
        document.getElementById('apellido').value+= apellido1
        document.getElementById('nombre2').value+= nombre2
        document.getElementById('apellido2').value+= apellido2
        document.getElementById('telefono').value+= telefono
    }
}

function perfilEnLocal(){
 let perfil=[]
  perfil.nombre1 = document.getElementById('nombre').value;
  perfil.nombre2 = document.getElementById('nombre2').value;
  perfil.apellido1 = document.getElementById('apellido').value;
  perfil.apellido2 = document.getElementById('apellido2').value;
  perfil.email = document.getElementById('email').value;
  perfil.telefono = document.getElementById('telefono').value;
  console.log(perfil)
  perfil.push({"nombre1":perfil.nombre1,"nombre2":perfil.nombre2, "apellido1":perfil.apellido1,"apellido2":perfil.apellido2,"email":perfil.email,"telefono":perfil.telefono})
  localStorage.setItem('perfil', JSON.stringify(perfil));
}

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
              title: 'Se guardaron los cambios',
              timer: '2000',
              confirmButtonColor: '#0087F7',
              timerProgressBar: true,
              backdrop: true, //cuando aparece el cartel, el fondo queda con sombrita
            })
            perfilEnLocal() 
           // setTimeout(2000);
          }
          form.classList.add('was-validated')
        }, false)
  
        })
      })()

document.addEventListener("DOMContentLoaded", function(_e){
  email()
   almacenarPerfil()
    });