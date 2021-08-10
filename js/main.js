'use strict'

// Звезды

let stars = document.querySelectorAll('.star');
let sumActiveStars = '';
for (let currentStar of stars) {
    currentStar.addEventListener('click', function() {
        currentStar.classList.toggle('stars_click');
        currentStar.classList.toggle('no-active-star');
        sumActiveStars = document.querySelectorAll('.stars_click').length;
        if (sumActiveStars === 5) {
            makeActiveChangeHero();
        }
        if (changeHeroButton.classList.contains('active-button')) {
            changeHeroButton.addEventListener('click', changeHero);
            }
    });
}

// Сделать кнопку "Сменить Героя" активной после 5 звезд

let changeHeroButton = document.querySelector('.change-hero');
let makeActiveChangeHero = function() {
    changeHeroButton.classList.add('active-button');
    changeHeroButton.classList.remove('no-active-button');

}

// Смена героя: функция-колбэк для кнопки changeHeroButton

let numberNextHero = 2;
let currentAvatar = document.querySelector('.current-avatar');
let changeHero = function() {
    changeHeroButton.classList.remove('active-button');
    changeHeroButton.classList.add('no-active-button');
    currentAvatar.src = `img/lvl${numberNextHero++}.png`;
    for (let currentStar of stars) {
        currentStar.classList.remove('stars_click');
    }
}


// Настройка повышения и понижения показателей

let width = ["240px", "215px", "190px", "168px", "143px", "120px", "95px", "70px", "48px", "22px", "0px"];

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

// Блок "Все персонажи"

let blockHeroes = document.querySelector('.heroes');
let templateHero = document.querySelector('#new-hero').content;

for (let i =1; i <=10; i++){
    let newHero = templateHero.querySelector('.hero').cloneNode(true);
let linkHero = "url(/img/lvl"+i+".png)";
newHero.style.backgroundImage = linkHero;
blockHeroes.appendChild(newHero);
}

let buttonCloseHeroes = document.querySelector('.button-close-heroes');
buttonCloseHeroes.addEventListener ('click', function(){
    blockHeroes.classList.toggle('hidden');
});

// Кнопка "Показать всех героев"

let showHeroes = document.querySelector('.show-all-heroes');
showHeroes.addEventListener ('click', function(){
    blockHeroes.classList.toggle('hidden');
});

// Поиск всех "Имен" Героев (уровней) и присваивание

let nameHero = document.querySelectorAll('.hero-name');
let lvl = 1;
for (let currentNameHero of nameHero) {
    currentNameHero.textContent = `Уровень ${lvl++}`;
}

// Показывать уровень героя при наведении

let hero = document.querySelectorAll('.hero');
for (let eachHero of hero) {
    eachHero.addEventListener("mouseover", function(){
        eachHero.firstElementChild.classList.remove('hidden');
    });
}
for (let eachHero of hero) {
    eachHero.addEventListener("mouseout", function(){
        eachHero.firstElementChild.classList.add('hidden');
    });
}



