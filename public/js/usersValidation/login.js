window.addEventListener('load', (e) => {
    const expresiones = {
        user: /^[a-zA-Z0-9°\_\-]{3,15}$/,
        password: /^.{6,14}$/
    }

    let inputsOk = {
        user: false,
        password: false,
    }

    let formulario = document.getElementById('formulario');
    let inputs = document.querySelectorAll('#formulario input');
    let iconError = document.querySelectorAll('.error')
    let divError = document.querySelectorAll('.validation_error');

    formulario.addEventListener('submit', (e) => {
        if(!inputsOk.user || !inputsOk.password) {
            e.preventDefault();
            divError[2].innerHTML = '<h3>Debe ingresar usuario y contraseña</h3>';
        }
    });

    let validarFormulario = (evt) => {
        switch(evt.target.name) {
            case "user":
                validarCampo(expresiones.user, evt.target, 'user', 0, 'Ingrese un nombre de usuario valido');
            break;
            case "password":
                validarCampo(expresiones.password, evt.target, 'password', 1, 'Ingrese la contraseña');
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

    inputs.forEach((input) => { 
        input.addEventListener('blur', validarFormulario);
        input.addEventListener('keyup', validarFormulario);
    });
})