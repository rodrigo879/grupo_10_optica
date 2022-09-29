window.addEventListener('load', (e) => {
    const expresiones = {
        nameProduct: /^[a-zA-Z0-9À-ÿ\s\_\-]{5,40}$/,
        descriptionProduct: /^.{10,200}$/,
        imageProduct: /(.jpg|.jpeg|.png)$/i,
        trademarkProduct: /^[a-zA-Z0-9À-ÿ\s\_\-]{5,40}/,
        priceProduct: /\d+[\,.]\d{2}$/,
        discount: /\d{1,2}/
    }
    
    let inputsOk = {
        nameProduct: true,
        descriptionProduct: true,
        imageProduct: true,
        trademarkProduct: true,
        priceProduct: true,
        discount: true
    }
    
    let formulario = document.getElementById('formulario');
    let inputs = document.querySelectorAll('#formulario input');
    let textArea = document.querySelector('textarea');
    let iconError = document.querySelectorAll('.error');
    let divError = document.querySelectorAll('.validation_error');

    formulario.addEventListener('submit', (e) => {
        console.log(inputsOk);
        if(!inputsOk.nameProduct || !inputsOk.descriptionProduct || !inputsOk.imageProduct || !inputsOk.trademarkProduct || !inputsOk.priceProduct || !inputsOk.discount) {
            e.preventDefault();
            divError[6].innerHTML = '';
            imprimirCamposFaltantes().forEach((error) => {
                divError[6].innerHTML += `<h4>${error}</h4>`;
            });
        }
    });

    let imprimirCamposFaltantes = () => {
        let camposFaltantes = [];
        if(!inputsOk.nameProduct) { camposFaltantes.push("Error en el Nombre del Producto")}
        if(!inputsOk.descriptionProduct) { camposFaltantes.push("Error en la descripcion")}
        if(!inputsOk.imageProduct) { camposFaltantes.push("Falta cargar una imagen")}
        if(!inputsOk.trademarkProduct) { camposFaltantes.push("Error en la Marca del Producto")}
        if(!inputsOk.priceProduct) { camposFaltantes.push("Error en el Precio del Producto")}
        if(!inputsOk.discount) { camposFaltantes.push("Error en el Descuento del Producto")}
        return camposFaltantes;
    }

    let validarFormulario = (evt) => {
        switch(evt.target.name) {
            case "nameProduct":
                validarCampo(expresiones.nameProduct, evt.target, 'nameProduct', 0, 'Ingrese el nombre del producto (de 3 a 40 caracteres)');
            break;
            case "descriptionProduct":
                validarTextArea();
            break;
            case "trademarkProduct":
                validarCampo(expresiones.trademarkProduct, evt.target, 'trademarkProduct', 3, 'Ingrese la marca del producto (de 5 a 20 caracteres)');
            break;
            case "priceProduct":
                validarCampo(expresiones.priceProduct, evt.target, 'priceProduct', 4, 'Ingrese el precio del producto (Formato: 10,00)');
            break;
            case "discount":
                validarCampo(expresiones.discount, evt.target, 'discount', 5, 'Ingrese un descuento (de 0 a 99)');
            break;
        }
    }

    let validarCampo = (expresion, input, campo, i, mensaje) => {
        if(!expresion.test(input.value)) {    
            document.getElementById(campo).classList.add('is_invalid')
            iconError[i].style.visibility = 'visible';
            divError[i].innerText = mensaje;
            inputsOk[campo] = false; 
        } else {
            document.getElementById(campo).classList.remove('is_invalid'); 
            iconError[i].style.visibility = 'hidden';
            divError[i].innerText = '';
            inputsOk[campo] = true;
        }
    }

    let validarImagen = (input) => {
        if(inputs[1].value.length && expresiones.imageProduct.test(input.value)) {
            document.querySelector('.div_image').classList.remove('is_invalid');
            iconError[2].style.visibility = 'hidden';
            divError[2].innerText = `${inputs[1].value}`;
            divError[2].style.color = 'gray';
            inputsOk.imageProduct = true;
        } else {
            document.querySelector('.div_image').classList.add('is_invalid');
            iconError[2].style.visibility = 'visible';
            divError[2].innerText = 'Debe ingresar una imagen de formato valida (JPEG, JPG, PNG)';
            divError[2].style.color = 'red';
            inputsOk.imageProduct = false;
        }
    }

    let validarTextArea = () => {
        if(textArea.value.length < 10) {
            textArea.classList.add('is_invalid')
            iconError[1].style.visibility = 'visible';
            divError[1].innerText = "Ingrese una descripcion para el producto (de 10 a 200 caracteres)";
            inputsOk.descriptionProduct = false;
        } else {
            textArea.classList.remove('is_invalid');
            iconError[1].style.visibility = 'hidden';
            divError[1].innerText = "";
            inputsOk.descriptionProduct = true;
        }
    }

    inputs.forEach((input) => { 
        input.addEventListener('blur', validarFormulario);
        input.addEventListener('keyup', validarFormulario);
    });

    textArea.addEventListener('blur', validarFormulario);
    textArea.addEventListener('keyup', validarFormulario);

    inputs[1].addEventListener('click', (e) => {
        if(!inputs[1].value.length) {
            validarImagen(e.target);
            inputs[1].addEventListener('change', (e) => {
                validarImagen(e.target);
            })
        }
    })

    inputs[2].addEventListener('click', (e) => {
        inputs[4].classList.remove('is_invalid');
        iconError[3].style.visibility = 'hidden';
        divError[3].innerText = "";
        inputsOk.trademarkProduct = true;
    })

    inputs[3].addEventListener('click', (e) => {
        if(!inputs[4].value.length) {
            inputsOk.trademarkProduct = false;
        }
    })

})