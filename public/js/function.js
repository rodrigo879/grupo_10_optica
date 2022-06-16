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

function desplegarMenu() {
    let mainNavbar = document.getElementById("mainNavbar");
    if(mainNavbar.style.display == "flex") {
        mainNavbar.style.display = "none";
    } else {
        mainNavbar.style.display = "flex";
    }
}