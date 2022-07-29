// Carrousel Primario. 
const containerImg = document.getElementById('containerImg');
const punto = document.querySelectorAll('.punto');

punto.forEach( (cadaPunto, i) => {
    punto[i].addEventListener('click', () => {
        let posicion = i;
        //posicion es 0 transformX es 0
        //posicion es 1 transformX es -50%
        //operacion = posicion *-50;
        let operacion = posicion * (-25);
        containerImg.style.transform = `translateX(${operacion}%)`
        punto.forEach ( (cadaPunto, i) => {
            punto[i].classList.remove('activo');
        })
        punto[i].classList.add('activo');
    });
});

// Carrousel Secundario.
const containerInfo = document.getElementById('containerInfo');
const punto1 = document.querySelectorAll('.punto1');

punto1.forEach( (cadaPunto, i) => {
    punto1[i].addEventListener('click', () => {
        let posicion = i;
        let operacion = posicion * (-100/3);
        containerInfo.style.transform = `translateX(${operacion}%)`
        punto1.forEach ( (cadaPunto, i) => {
            punto1[i].classList.remove('activo1');
        })
        punto1[i].classList.add('activo1');
    });
});

//Funcion que despliega menu en vista movile y tablet
function desplegarMenu() {
    let mainNavbar = document.getElementById("mainNavbar");
    if(mainNavbar.style.display == "flex") {
        mainNavbar.style.display = "none";
    } else {
        mainNavbar.style.display = "flex";
    }
}

//Funcion que muestra la contraseña en el input Register y Login
function mostrarPassword() {
    let inputPassword = document.getElementById("password");
    let checkbox = document.getElementById("checkPassword");
    let iconEyeSlash = document.getElementById("eyeSlash");
    let iconEye = document.getElementById("eye");

    if(inputPassword.type == "password" && checkbox.checked){
        inputPassword.type = "text";
        iconEyeSlash.style.display = "none";
        iconEye.style.display = "initial";
    }else{
        inputPassword.type = "password";
        iconEyeSlash.style.display = "initial";
        iconEye.style.display = "none   ";
    }
}

//Funcion que muestra la confirmar contraseña en el input Register y Login
function mostrarConfirmPassword() {
    let inputConfirmPassword = document.getElementById("confirmPassword");
    let checkboxConfirm = document.getElementById("checkPasswordConfirm");
    let iconEyeSlashConfirm = document.getElementById("eyeSlashConfirm");
    let iconEyeConfirm = document.getElementById("eyeConfirm");

    if(inputConfirmPassword.type == "password" && checkboxConfirm.checked){
        inputConfirmPassword.type = "text";
        iconEyeSlashConfirm.style.display = "none";
        iconEyeConfirm.style.display = "initial";
    }else{
        inputConfirmPassword.type = "password";
        iconEyeSlashConfirm.style.display = "initial";
        iconEyeConfirm.style.display = "none";
    }
}

//Funcion que muestra la contraseña actual en el input cambiar contraseña
function mostrarPasswordActual() {
    let inputPasswordActual = document.getElementById("passwordActual");
    let checkboxActual = document.getElementById("checkPasswordActual");
    let iconEyeSlashActual = document.getElementById("eyeSlashActual");
    let iconEyeActual = document.getElementById("eyeActual");

    if(inputPasswordActual.type == "password" && checkboxActual.checked){
        inputPasswordActual.type = "text";
        iconEyeSlashActual.style.display = "none";
        iconEyeActual.style.display = "initial";
    }else{
        inputPasswordActual.type = "password";
        iconEyeSlashActual.style.display = "initial";
        iconEyeActual.style.display = "none";
    }
}

//Alerta al borrar un producto.
function borrarProducto(id) {
    Swal.fire({
        title: 'Borramos el producto?',
        icon: 'warning',
        confirmButtonText: 'Borrar',
        footer: 'Eliminar producto de la base de datos',
        //width: '50vw',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showCancelButton: true,
        customClass: {
            confirmButton: 'btn-confirm',
        }
    }).then((result) => {
        if(result.isConfirmed) {
            Swal.fire({
                title: 'Producto borrado',
                icon: 'success',
                html: `<form action="/products/product/${id}?_method=delete" method="post"><button class="btn-confirm swal2-styled swal2-confirm" type= "submit">OK</button></form>`,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            })
        }
    });
};

//Alerta al borrar un usuario.
function borrarUsuario(id) {
    Swal.fire({
        title: 'Desea eliminar la cuenta?',
        icon: 'warning',
        confirmButtonText: 'Borrar',
        footer: 'Eliminar usuario de la base de datos',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showCancelButton: true,
        customClass: {
            confirmButton: 'btn-confirm',
        }
    }).then((result) => {
        if(result.isConfirmed) {
            Swal.fire({
                title: 'Usuario borrado',
                icon: 'success',
                html: `<form action="/users/profile/${id}?_method=delete" method="post"><button class="btn-confirm swal2-styled swal2-confirm" type= "submit">OK</button></form>`,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            })
        }
    });
};

//Ventana para ver medios de pagos.
//Hay que modificarlo para que el estilo quede en la hoja de CSS correspondiente.
function mediosDePago() {
    Swal.fire({
        title: 'MEDIOS DE PAGO',
        html:   '<div style="display: flex; padding:10px; margin:10px">' + 
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/cordobesa.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/cencosud.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/naranja.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/americanExpress.svg"></div>' +
                '</div>' + 
                '<div style="display: flex; padding:10px; margin:10px">' + 
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/rapipago.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/visaDebito.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/masterCardDebito.svg"></div>' +
                '</div>',
        showConfirmButton: false,
        showCloseButton: true,
        footer: 'Paga con seguridad en todas tus compras',
    })
}