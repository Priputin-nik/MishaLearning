// Звезды
let stars = document.querySelectorAll('.star');

for (let currentStar of stars) {
    currentStar.addEventListener('click', function() {
        currentStar.classList.toggle('stars_click');
        currentStar.classList.toggle('no-active-star');
    });
}

// Настройка повышения и понижения показателей

let width = ["240px", "215px", "190px", "165px", "140px", "120px", "95px", "70px", "45px", "22px", "0px"];

// Функция поиска следующего и предыдущего значений
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
// Событие на клик по "+"
let plus = document.querySelectorAll('.plus');
for (let currentPlus of plus) {
    currentPlus.addEventListener ('click', function(){
    let aroundWidth = searchElement(getComputedStyle(currentPlus.previousElementSibling).width);
    if (getComputedStyle(currentPlus.previousElementSibling).width === "0px") {
        currentPlus.previousElementSibling.style.width = "240px";
        let firstNoActiveStars = document.querySelector('.no-active-star');
        firstNoActiveStars.classList.toggle('stars_click');
        firstNoActiveStars.classList.toggle('no-active-star');
    }
    else {
        currentPlus.previousElementSibling.style.width = aroundWidth[1];
    let counter = currentPlus.parentElement.querySelector('.counter');
    counter.textContent ++;
}
});
}
// Событие на клик по "-"
let minus = document.querySelectorAll('.minus');
for (let currentMinus of minus) {
    currentMinus.addEventListener('click', function() {
    let cover = currentMinus.parentElement.querySelector(".cover-par");
    let aroundWidth = searchElement(getComputedStyle(cover).width);
    if (getComputedStyle(cover).width === "240px") {
        alert("Отнимать нельзя!");
    }
    else {
        cover.style.width = aroundWidth[0];
        let counter = currentMinus.parentElement.querySelector(".counter");
        counter.textContent --;
    }
});
}

// Корректровка левой границы закрывающей полоски



// Смена персонажей
