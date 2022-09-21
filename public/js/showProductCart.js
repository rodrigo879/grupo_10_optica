window.addEventListener('load', (e) => {
    // Reemplaza el punto de los decimales por una coma en el precio de los productos..
    const toComma = n => n.toString().replace(".", ",");

    // Agrega el punto cada 3 caracteres en el precio de los productos..
    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    let sinProductos = document.querySelector('.sin_productos_en_el_carrito');
    let section = document.querySelector('section');
    let subtotal = document.getElementById('subtotal');
    let costoDelEnvio = document.getElementById('costo_del_envio');
    let total = document.getElementById('total');

    if(!sessionStorage.getItem('shoppingList') || sessionStorage.getItem('shoppingList').length == 2) {
        sessionStorage.setItem('priceList', 0)
        sinProductos.style.display = "flex";
        subtotal.innerHTML = "$0";
        total.innerHTML = "$0";
    } else {
        sinProductos.style.display = "none";
        let shoppingList = JSON.parse(sessionStorage.getItem('shoppingList'));
        let priceList = JSON.parse(sessionStorage.getItem('priceList'));
        subtotal.innerHTML = `$${toThousand(toComma(priceList.toFixed(2)))}`;
        if(costoDelEnvio) {
            let costoEnvioParseado = parseFloat((costoDelEnvio.textContent).replace(/[^0-9]+/g, ""))/100;
            let calculoTotal = priceList + costoEnvioParseado;
            total.innerHTML = `$${toThousand(toComma(calculoTotal.toFixed(2)))}`
        } else {
            total.innerHTML = `$${toThousand(toComma(priceList.toFixed(2)))}`;
        }
        for (let i = 0; i < shoppingList.length; i++) {            
            section.innerHTML += `<div class="productos">
                                <div class="container-imagenes">
                                    <a href="${shoppingList[i].id}">
                                        <img src="${shoppingList[i].image}">
                                    </a>    
                                </div>
                                <div class="container-info">
                                    <div class="info-top">
                                        <p>${shoppingList[i].name}</p>
                                        <button id="btn_borrar_producto_carrito" type="button"><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                    <div class="info-bottom">
                                        <div class="btn-controller-cant">
                                            <div class="btn-controller-cant-unid">
                                                <button id="btn_restar" type="button">-</button>
                                                <input id="input_cant" type="number" id="inputTypeProductCart" value="${shoppingList[i].value}" readonly>
                                                <button id="btn_sumar" type="button">+</button>
                                            </div>
                                            <p>$${toThousand(toComma(shoppingList[i].price.toFixed(2)))}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`
        }
        let botonBorrar = document.querySelectorAll('#btn_borrar_producto_carrito');
        let botonRestar = document.querySelectorAll('#btn_restar');
        let botonSumar = document.querySelectorAll('#btn_sumar');
        let inputCant = document.querySelectorAll('#input_cant');
        
        for (let i = 0; i < botonSumar.length; i++) {
            botonSumar[i].addEventListener('click', (e) => {
                inputCant[i].value ++;
                shoppingList[i].value = parseInt(inputCant[i].value);
                priceList += shoppingList[i].price;
                sessionStorage.setItem('shoppingList', JSON.stringify(shoppingList));
                sessionStorage.setItem('priceList', JSON.stringify(priceList));
                location.reload();
            })                
        }
        
        for (let i = 0; i < botonRestar.length; i++) {
            botonRestar[i].addEventListener('click', (e) => {
                if(inputCant[i].value > 1) {
                    inputCant[i].value --;
                    shoppingList[i].value = parseInt(inputCant[i].value);
                    priceList -= shoppingList[i].price;
                    sessionStorage.setItem('shoppingList', JSON.stringify(shoppingList));
                    sessionStorage.setItem('priceList', JSON.stringify(priceList));
                    location.reload();
                }
            })                
        }

        for (let i = 0; i < botonBorrar.length; i++) {
            botonBorrar[i].addEventListener('click', (e) => {
                priceList -= shoppingList[i].price * shoppingList[i].value;
                shoppingList.splice(i, 1);
                sessionStorage.setItem('shoppingList', JSON.stringify(shoppingList));
                sessionStorage.setItem('priceList', JSON.stringify(priceList));
                location.reload();
            })
        }
    }
})