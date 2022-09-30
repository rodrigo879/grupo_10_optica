window.addEventListener('load', (e) => {
    let buttonTruck = document.querySelectorAll(".button_truck");
    let enlaceDetalleProduct = document.querySelectorAll("#enlace_detalle");
    let idProduct = document.querySelectorAll(".main-section-img img");
    let imgProduct = document.querySelectorAll(".main-section-img img");
    let nameProduct = document.querySelectorAll(".section-h3 h3");
    let priceProduct = document.querySelectorAll(".precio-con-descuento");
    let carritoCart = document.querySelector(".p_cart_product");
    let checkIcon = document.querySelectorAll(".check");
    let checkAddProducto = document.querySelector(".check_addProduct")
    let acumulador = 0

    for (let i = 0; i < buttonTruck.length; i++) {
        buttonTruck[i].addEventListener('click', (e) => {
            acumulador ++;
            carritoCart.innerHTML = acumulador;
            addProductList(i);
            if(buttonTruck[0].classList[0] != 'boton-carrito') {
                checkIcon[i].style.visibility = 'visible';
                checkAddProducto.style.visibility = 'visible';
                setTimeout(() => {
                    checkIcon[i].style.visibility = 'hidden';
                    checkAddProducto.style.visibility = 'hidden';
                }, 1000);
            }
        })
    }

    const addProductList = (i) => {
        let newProduct = {
            id: idProduct[i].alt.replace(/[^0-9]+/g, ""),
            enlace: enlaceDetalleProduct[i].href,
            name: nameProduct[i].textContent,
            price: parseFloat((priceProduct[i].textContent).replace(/[^0-9]+/g, ""))/100,
            image: imgProduct[i].src,
            value: 1
        }
        if(!sessionStorage.getItem('shoppingList')){
            let shoppingList = [];
            shoppingList.push(newProduct)
            sessionStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            sessionStorage.setItem('priceList', JSON.stringify(shoppingList[0].price))
        } else if (sessionStorage.getItem('shoppingList') && sessionStorage.getItem('shoppingList').length > 0) {
            let shoppingList = JSON.parse(sessionStorage.getItem('shoppingList'));
            let priceList = JSON.parse(sessionStorage.getItem('priceList'));
            for (let j = 0; j < shoppingList.length; j++) {
                if(shoppingList[j].id == newProduct.id) {
                    shoppingList[j].value ++;
                    priceList += shoppingList[j].price;
                    sessionStorage.setItem('shoppingList', JSON.stringify(shoppingList));
                    sessionStorage.setItem('priceList', JSON.stringify(priceList))
                    return;
                } 
            }
            shoppingList.push(newProduct);
            priceList += shoppingList[shoppingList.length - 1].price;
            sessionStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            sessionStorage.setItem('priceList', JSON.stringify(priceList))
        }
    }
});