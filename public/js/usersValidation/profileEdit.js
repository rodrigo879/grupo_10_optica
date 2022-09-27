window.addEventListener('load', (e) => {
    const expresiones = {
        fullName: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        user: /^[a-zA-Z0-9\_\-]{3,15}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    }
    
    let inputsOk = {
        fullName: true,
        user: true,
        email: true
    }
    
    let formulario = document.getElementById('formulario');
    let inputs = document.querySelectorAll('#formulario input');
    let iconError = document.querySelectorAll('.error');
    let divError = document.querySelectorAll('.validation_error');
    
    formulario.addEventListener('submit', (e) => {
        if(!inputsOk.fullName || !inputsOk.user || !inputsOk.email) {
            e.preventDefault();
            divError[3].innerHTML = '<h3>No puede dejar campos vacios</h3>';
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
        }
    }

    let validarCampo = (expresion, input, campo, i, mensaje) => {
        if(!expresion.test(input.value)) {    
            document.getElementById(campo).classList.add('is_invalid')
            iconError[i].style.visibility = 'visible';
            divError[i].innerText = mensaje;
            inputsOk[campo] = false;
            console.log(inputsOk)
        } else {
            document.getElementById(campo).classList.remove('is_invalid'); 
            iconError[i].style.visibility = 'hidden';
            divError[i].innerText = '';
            inputsOk[campo] = true;
            console.log(inputsOk);
        }
    }

    inputs.forEach((input) => { 
        input.addEventListener('blur', validarFormulario);
        input.addEventListener('keyup', validarFormulario);
    });
})