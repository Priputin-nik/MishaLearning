// Звезды
let stars = document.querySelectorAll('.star');

for (let currentStar of stars) {
    currentStar.addEventListener('click', function() {
        currentStar.classList.toggle('stars_click');
        currentStar.classList.toggle('no-active-star');
    });
}
let plusInt = document.querySelector('.plus-int');
let minusInt = document.querySelector('.minus-int');

// Настройка повышения и понижения показателей

let width = ["240px", "215px", "190px", "165px", "140px", "120px", "95px", "70px", "45px", "22px", "0px"];
let coverInt = document.querySelector('.cover-int-par');
let counterInt = document.querySelector('.counterInt');
let searchElement = function(currentWidth) {
    let predNext = [];
    for (let i = 0; i < width.length; i++) {
        if (width[i]===currentWidth) {
            predNext[0] = width[i-1];
            predNext[1] = width[i+1];
        }
    }
   
    return predNext;
}

//событие на клик по плюсу/минусу
plusInt.addEventListener ('click', function() {
    let aroundWidth = searchElement(getComputedStyle(coverInt).width);
    if (getComputedStyle(coverInt).width === "0px") {
        coverInt.style.width = "240px";
        let firstNoActiveStars = document.querySelector('.no-active-star');
        firstNoActiveStars.classList.toggle('stars_click');
        firstNoActiveStars.classList.toggle('no-active-star');
    }
    else{
    coverInt.style.width = aroundWidth[1];
    counterInt.textContent ++;
}
});

minusInt.addEventListener('click', function() {
    let aroundWidth = searchElement(getComputedStyle(coverInt).width);
    if (getComputedStyle(coverInt).width === "240px") {
        alert("Отнимать нельзя!");
    }
    else {
    coverInt.style.width = aroundWidth[0];
    counterInt.textContent --;
    }
});

// Смена персонажей
let characters = ["/img/lvl1.png", "/img/lvl2.png"]
