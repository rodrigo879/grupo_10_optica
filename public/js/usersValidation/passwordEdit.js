window.addEventListener('load', (e) => {
    const expresiones = {
        password: /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡\-_]){1})\S{6,16}$/,
    }
    
    let inputsOk = {
        passwordActual: false,
        password: false,
        confirmPassword: false,
    }
    
    let formulario = document.getElementById('formulario');
    let inputs = document.querySelectorAll('#formulario input');
    let iconError = document.querySelectorAll('.error')
    let divError = document.querySelectorAll('.validation_error');
    
    formulario.addEventListener('submit', (e) => {
        if(!inputsOk.passwordActual && !inputsOk.password && !inputsOk.confirmPassword) {
            e.preventDefault();
            divError[3].innerHTML = '<h3>Hay campos vacios o con errores</h3>';
        }
    });
    
    let validarFormulario = (evt) => {
        switch(evt.target.name) {
            case "passwordActual":
                validarCampo(expresiones.password, evt.target, 'passwordActual', 0, 'Ingrese su contraseña actual');
            break;
            case "password":
                validarCampo(expresiones.password, evt.target, 'password', 1, 'Ingrese una contraseña (mayor a 6 caracteres)');
            break;
            case "confirmPassword":
                validarCoincidenciaPassword();
            break;
        }
    }

    let validarCoincidenciaPassword = () => {
        let password = document.getElementById('password');
        let confirmPassword = document.getElementById('confirmPassword')
        if(password.value !== confirmPassword.value) {
            document.getElementById('confirmPassword').classList.add('is_invalid');
            iconError[2].style.visibility = 'visible';
            divError[2].innerText = 'Las contraseñas no coinciden';
            inputsOk['confirmPassword'] = false;
        } else {
            document.getElementById('confirmPassword').classList.remove('is_invalid'); 
            iconError[2].style.visibility = 'hidden';
            divError[2].innerText = '';
            inputsOk['confirmPassword'] = true;
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