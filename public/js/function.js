// Carrousel Primario. 
const containerImg = document.getElementById('containerImg');
const punto = document.querySelectorAll('.punto');
punto.forEach( (cadaPunto, i) => {
    punto[i].addEventListener('click', () => {
        let posicion = i;
        let operacion = posicion * (-25);
        containerImg.style.transform = `translateX(${operacion}%)`
        punto.forEach ( (cadaPunto, i) => {
            punto[i].classList.remove('activo');
        })
        punto[i].classList.add('activo');
    });
});

// Carrousel Secundario de la vista movile y tablet.
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

// Funcion que despliega menu en vista movile y tablet
function desplegarMenu() {
    let mainNavbar = document.getElementById("mainNavbar");
    if(mainNavbar.style.display == "flex") {
        mainNavbar.style.display = "none";
    } else {
        mainNavbar.style.display = "flex";
    }
}

// Buscador Movile Table
function buscadorMovileTablet() {
    let ancorGlass = document.querySelector("#a_buscador");
    let divInputText = document.querySelector("#divBuscador");
    let inputText = document.querySelector(".inputTextSearch");
    let formMovileTablet = document.querySelector('#formMovileTablet');
    ancorGlass.addEventListener('click', (e) => {
        divInputText.style.display = "initial";
        inputText.focus();
        formMovileTablet.addEventListener('submit', (e) => {
            if(!inputText.value.length) {
                e.preventDefault();
            }
        })
    });
    inputText.addEventListener('blur', () => {
        divInputText.style.display = "none";
    })
}

//Prevenir buscar productos sin ingresar nada en el buscador
let formDesktop = document.querySelector('#formDesktop');
let inputDesktop = document.querySelector('.inputDesktop');
formDesktop.addEventListener('submit', (e) => {
    if(!inputDesktop.value.length) {
        e.preventDefault();
    }
})

// Funcion que muestra la contraseña en el input Register y Login
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

// Funcion que muestra la confirmar contraseña en el input Register y Login
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

// Funcion que muestra la contraseña actual en el input cambiar contraseña
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

// Alerta al borrar un producto.
function borrarProducto(id) {
    Swal.fire({
        title: 'Borramos el producto?',
        icon: 'warning',
        confirmButtonText: 'Borrar',
        footer: 'Eliminar producto de la base de datos',
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
                html: `<form action="/products/${id}?_method=delete" method="post"><button class="btn-confirm swal2-styled swal2-confirm" type= "submit">OK</button></form>`,
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            })
        }
    });
};

// Alerta al borrar un usuario.
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

// Radio buttom de crear producto, al cargar una marca deshabilita la que no se vaya a usar
function apagarInputRadioCrearProducto() {
    let radioExistsBrands = document.getElementById('radio_existsBrands')
    let radioNewBrands = document.getElementById('radio_newBrands')
    let divRadioExists = document.getElementById('div_radio_exists')
    let divRadioNew = document.getElementById('div_radio_new')
    
    if(radioExistsBrands.checked) {
        divRadioNew.classList.add('select_disabled')
        divRadioExists.classList.remove('select_disabled')
    }
    if(radioNewBrands.checked) {
        divRadioExists.classList.add('select_disabled')
        divRadioNew.classList.remove('select_disabled')
    } 
}

// Ventana para ver medios de pagos.
function mediosDePago() {
    Swal.fire({
        title: 'MEDIOS DE PAGO',
        html:   '<div style="display: flex; padding:10px; margin:10px">' + 
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/macro.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/masterCard.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/visa.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/naranja.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/americanExpress.svg"></div>' +
                '</div>' + 
                '<div style="display: flex; padding:10px; margin:10px">' + 
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/cordobesa.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/visaDebito.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/masterCardDebito.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/maestroDebito.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/cabalDebito.svg"></div>' +
                '</div>' +
                '<div style="display: flex; padding:10px; margin:10px">' + 
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/rapipago.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/mercadoPago.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/pagoFacil.svg"></div>' +
                    '<div style="width:100px; display: flex; justify-content: center; align-content: center; padding: 5px; margin: 10px; border: solid 1px black" class="alert-img"><img style="width: 90%" src="/images/medioDePagos/cencosud.svg"></div>' +
                '</div>',
        showConfirmButton: false,
        footer: 'Paga con seguridad en todas tus compras',
    })
}

// Ventana emergente al finalizar el carrito de compras.
function finalizar() {
    Swal.fire({
        title: 'OPERACIÓN EXITOSA',
        html: '<h3>Gracias por visitar</h3>' + '<img style="width:330px;" src="/images/logos/logo.png" alt="Optica RIFF">',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonColor: '#30653C',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        footer: 'Te esperamos pronto para tu proxima compra',
    }).then(() => {
        sessionStorage.removeItem('shoppingList');
        sessionStorage.removeItem('priceList')
        window.location.replace('http://localhost:3030/');
    })
}

// Ordenar la lista de productos.
function sortProducts() {
    let inputSelect = document.querySelector('#selectSortProducts');
    let divArticle = document.querySelector('.main-section-div');
    let articleProducts = document.querySelectorAll('.main-section-product');
    let precioDescuento = document.querySelectorAll('.precio-con-descuento');
    let enlaceDetalle = document.querySelectorAll('#enlace_detalle');
    
    let arrayArticle = [];
    for (let i = 0; i < precioDescuento.length; i++) {
        let precioParseado = precioDescuento[i].textContent.replace(/[^0-9]+/g, "")/100;
        let object = {
            indice: i,
            id: parseInt(enlaceDetalle[i].href.replace(/[^0-9]+/g, "")),
            precio: precioParseado,
            article: articleProducts[i]
        }
        arrayArticle.push(object);
    }

    divArticle.innerHTML = '';
    switch (inputSelect.value) {
        case "1":
            arrayArticle.sort((a, b) => {return a.id - b.id})
            for (let i = 0; i < articleProducts.length; i++) {
                divArticle.innerHTML += `${arrayArticle[i].article.outerHTML}`
            }
            break;
        case "2":
            arrayArticle.sort((a, b) => {return a.precio - b.precio})
            for (let i = 0; i < articleProducts.length; i++) {
                divArticle.innerHTML += `${arrayArticle[i].article.outerHTML}`
            }
            break;
        case "3":
            arrayArticle.sort((a, b) => {return b.precio - a.precio})
            for (let i = 0; i < articleProducts.length; i++) {
                divArticle.innerHTML += `${arrayArticle[i].article.outerHTML}`
            }
            break;
    }
}