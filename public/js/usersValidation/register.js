window.addEventListener('load', (e) => {
    const expresiones = {
        fullName: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        user: /^[a-zA-Z0-9\_\-]{3,15}$/,
        password: /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡\-_]){1})\S{6,16}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    }
    
    let inputsOk = {
        fullName: false,
        user: false,
        email: false, 
        password: false,
        confirmPassword: false,
    }
    
    let formulario = document.getElementById('formulario');
    let inputs = document.querySelectorAll('#formulario input');
    let iconError = document.querySelectorAll('.error')
    let divError = document.querySelectorAll('.validation_error');
    
    formulario.addEventListener('submit', (e) => {
        if(!inputsOk.fullName || !inputsOk.user || !inputsOk.email || !inputsOk.password || !inputsOk.confirmPassword) {
            e.preventDefault();
            divError[5].innerHTML = '<h3>Hay campos vacios o con errores</h3>';
        }
    });
    
    let validarFormulario = (evt) => {
        switch(evt.target.name) {
            case "fullName":
                validarCampo(expresiones.fullName, evt.target, 'fullName', 0, 'Ingrese su nombre y apellido');
            break;
            case "user":
                validarCampo(expresiones.user, evt.target, 'user', 1, 'Ingrese un nombre de usuario (mayor a 3 caracteres)');
            break;
            case "email":
                validarCampo(expresiones.email, evt.target, 'email', 2, 'Ingrese un email de formato valido');
            break;
            case "password":
                validarCampo(expresiones.password, evt.target, 'password', 3, 'Ingrese una contraseña (mayor a 6 caracteres, debe incluir mayusculas, minisculas, numeros y simbolos)');
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
            iconError[4].style.visibility = 'visible';
            divError[4].innerText = 'Las contraseñas no coinciden';
            inputsOk['confirmPassword'] = false;
        } else {
            document.getElementById('confirmPassword').classList.remove('is_invalid'); 
            iconError[4].style.visibility = 'hidden';
            divError[4].innerText = '';
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