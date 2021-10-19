'use strict'

// Кнопка "Сменить героя"

let changeHeroButton = document.querySelector('.change-hero');

// Номер следующего героя и переменная с текущим аватаром

let numberNextHero = 2;
let currentAvatar = document.querySelector('.current-avatar');

// Звезды

let stars = document.querySelectorAll('.star');
let sumActiveStars = 0;
for (let currentStar of stars) {
    currentStar.addEventListener('click', function() {
        currentStar.classList.toggle('stars_click');
        currentStar.classList.toggle('no-active-star');
        countActiveStars();

// Проверка достижения 

        if (sumActiveStars === 1 && !openingAchivementSpace.querySelector('.Achive-8')) {
            activateAchivement(8);
        }

        if (sumActiveStars === 5) {
            if (numberClickChangeHero == 9) {
                changeHeroButton.classList.add('no-active-button');
                changeHeroButton.classList.remove('active-button');
            }
            else {
            makeActiveChangeHero();
            }
        }
        if (sumActiveStars !== 5) {
            makeDisActiveChangeHero();
            changeHeroButton.removeEventListener('click', changeHero);
        }
        if (changeHeroButton.classList.contains('active-button')) {
            changeHeroButton.addEventListener('click', changeHero);
        }
    });
};

// Функция, считающая количество активных звезд

function countActiveStars() {
    sumActiveStars = document.querySelectorAll('.stars_click').length;
    return sumActiveStars;
}

// Сделать кнопку "Сменить Героя" активной после 5 звезд

function makeActiveChangeHero() {
    changeHeroButton.classList.add('active-button');
    changeHeroButton.classList.remove('no-active-button');
}

function makeDisActiveChangeHero() {
    changeHeroButton.classList.remove('active-button');
    changeHeroButton.classList.add('no-active-button');
}

// Смена героя: функция-колбэк для кнопки changeHeroButton

let numberClickChangeHero = 0;
function changeHero() {

    changeHeroButton.classList.toggle('active-button');
    changeHeroButton.classList.toggle('no-active-button');
    currentAvatar.src = `img/lvl${numberNextHero++}.png`;
    for (let currentStar of stars) {
        currentStar.classList.remove('stars_click');
        currentStar.classList.add('no-active-star');
    }
    changeHeroButton.removeEventListener('click', changeHero);
    numberClickChangeHero++;

    // Проверки для открытия достижений "смени героя 1 раз"Б "Смени героя 3 раза", "Смени героя 5 раз", "Получи максимальный уровень"

    if (numberClickChangeHero == 1 && !openingAchivementSpace.querySelector('.Achive-3')){
        activateAchivement(3);
    }

    if (numberClickChangeHero == 3 && !openingAchivementSpace.querySelector('.Achive-4')){
        activateAchivement(4);
    }

    if (numberClickChangeHero == 5 && !openingAchivementSpace.querySelector('.Achive-5')){
        activateAchivement(5);
    }

    if (numberClickChangeHero == 9 && !openingAchivementSpace.querySelector('.Achive-6')){
        activateAchivement(6);
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
        countActiveStars();
        if (sumActiveStars === 1 && !openingAchivementSpace.querySelector('.Achive-8')) {
            activateAchivement(8);
        }
        if (sumActiveStars === 5) {
            makeActiveChangeHero();
        }
        if (sumActiveStars !== 5) {
            makeDisActiveChangeHero();
            changeHeroButton.removeEventListener('click', changeHero);
        }
        if (changeHeroButton.classList.contains('active-button')) {
            changeHeroButton.addEventListener('click', changeHero);
        }
    }
    else {
        currentPlus.previousElementSibling.style.width = aroundWidth[1];
    let counter = currentPlus.parentElement.querySelector('.counter');
    counter.textContent ++;
}
    // Проверка для открытия достижения "10 Воли"
    let counterWillpower = +document.querySelector('.counter-wol').textContent;
    if (counterWillpower == 10 && !openingAchivementSpace.querySelector('.Achive-0')) {
        activateAchivement(0);
    }

    // Проверка для открытия достижения "10 Интеллекта"
    let counterIntpower = +document.querySelector('.counter-int').textContent;
    if (counterIntpower == 10 && !openingAchivementSpace.querySelector('.Achive-1')) {
        activateAchivement(1);
    }

    // Проверка для открытия достижения "10 Сила" 
    let counterStrpower = +document.querySelector('.counter-str').textContent;
    if (counterStrpower == 10 && !openingAchivementSpace.querySelector('.Achive-2')) {
        activateAchivement(2);
    }

    // Проверка для открытия достижения "50 по любому показателю"

    if ((counterStrpower == 50 || counterIntpower == 50 || counterWillpower == 50) && !openingAchivementSpace.querySelector('.Achive-7')) {
        activateAchivement(7);
    }

})
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
let templateHero = document.querySelector('.new-hero').content;

for (let i = 1; i <= 10; i++){
    let newHero = templateHero.querySelector('.hero').cloneNode(true);
let linkHero = "url(/img/lvl"+i+".png)";
newHero.style.backgroundImage = linkHero;
blockHeroes.appendChild(newHero);
}

// Кнопка "Показать всех героев"

let openingAchivementSpace = document.querySelector('.open-achivements');
let showHeroes = document.querySelector('.show-all-heroes');
showHeroes.addEventListener ('click', function(){
    blockHeroes.classList.toggle('hidden');
    if (!ahivementsArea.classList.contains('hidden')) {
        ahivementsArea.classList.add('hidden');
    }
    if (!blockHeroes.classList.contains('hidden')) {
        achiveTitle.classList.add('hidden');
    }
    else {
        achiveTitle.classList.remove('hidden');
    }
    if (blockHeroes.classList.contains('hidden') && ahivementsArea.classList.contains('hidden')) {
        achiveTitle.textContent = 'Полученные достижения';
    }
    if (!ahivementsArea.classList.contains('hidden') || !blockHeroes.classList.contains('hidden')) {
        openingAchivementSpace.classList.add('hidden');
    }
    else {
        openingAchivementSpace.classList.remove('hidden'); 
    }
});

// Поиск всех "Имен" Героев (уровней) и присваивание

let nameLevel = document.querySelectorAll('.hero-level');
let lvl = 1;
for (let currentLevelHero of nameLevel) {
    currentLevelHero.textContent = `Уровень ${lvl++}`;
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

// Геройское имя

let heroName = document.querySelector('.user-name');
let buttonChangeName = document.querySelector('.change-name');
buttonChangeName.addEventListener('click', function() {
    heroName.textContent = prompt('Введите новое геройское имя', heroName.textContent);
})

// Блок Достижения

let achivementsTemplate = document.querySelector('.new-achivement').content;
let ahivementsArea = document.querySelector('.all-achivements');
for (let i = 0; i <= 9; i++) {
    let newAchive = achivementsTemplate.cloneNode(true);
    ahivementsArea.appendChild(newAchive);
}

// Кнопка "Показать Достижения"

let achiveTitle = document.querySelector('.achivements-title');
let openAchivementBlock = document.querySelector('.show-achivement');
openAchivementBlock.addEventListener('click', function() {
    ahivementsArea.classList.toggle('hidden');
    if (blockHeroes.classList.contains('hidden')) {
    achiveTitle.classList.remove('hidden');
    }
    if (ahivementsArea.classList.contains('hidden')) {
        achiveTitle.textContent = 'Полученные достижения';
    }
    else {
        achiveTitle.textContent = 'Все Достижения';
    }
    if (!ahivementsArea.classList.contains('hidden') && !blockHeroes.classList.contains('hidden')) {
        blockHeroes.classList.add('hidden');
    }
    if (blockHeroes.classList.contains('hidden')) {
        achiveTitle.classList.remove('hidden');
    }
    if (!ahivementsArea.classList.contains('hidden') || !blockHeroes.classList.contains('hidden')) {
        openingAchivementSpace.classList.add('hidden');
    }
    else {
        openingAchivementSpace.classList.remove('hidden'); 
    }
});

// Механика закрывания блоков "Показать достижения" и "Показать всех героев"

let buttonCloseHeroes = document.querySelector('.button-close-heroes');
buttonCloseHeroes.addEventListener ('click', function(){
    blockHeroes.classList.toggle('hidden');
    if (!blockHeroes.classList.contains('hidden')) {
        achiveTitle.classList.add('hidden');
        openingAchivementSpace.classList.add('hidden');
    }
    else {
        achiveTitle.classList.remove('hidden');
    }
    if (blockHeroes.classList.contains('hidden') && ahivementsArea.classList.contains('hidden')) {
        achiveTitle.textContent = 'Полученные достижения';
        openingAchivementSpace.classList.remove('hidden');
    }
    if (!ahivementsArea.classList.contains('hidden') || !blockHeroes.classList.contains('hidden')) {
        openingAchivementSpace.classList.add('hidden');
    }
    else {
        openingAchivementSpace.classList.remove('hidden'); 
    }
});

let buttonCloseAchivement = document.querySelector('.button-close-achivement');
buttonCloseAchivement.addEventListener ('click', function(){
    ahivementsArea.classList.toggle('hidden');
    achiveDescription.classList.add('hidden');
    if (blockHeroes.classList.contains('hidden')) {
        achiveTitle.classList.remove('hidden');
        }
    if (ahivementsArea.classList.contains('hidden')) {
        achiveTitle.textContent = 'Полученные достижения';
    }
    else {
        achiveTitle.textContent = 'Все Достижения';
    }
    if (!ahivementsArea.classList.contains('hidden') || !blockHeroes.classList.contains('hidden')) {
        openingAchivementSpace.classList.add('hidden');
    }
    else {
        openingAchivementSpace.classList.remove('hidden'); 
    }
});

// Разработка Достижений

let allAch = ahivementsArea.querySelectorAll('.achivement-element');

// Ссылки на картинки для достижений

let urlImgAchivements = [
    'url(/img/willpowerAchivement.png)',
    'url(/img/intAchivement.png)',
    'url(/img/strengthAchivement.png)',
    'url(/img/oneChangeHero.png)',
    'url(/img/threeChangeHero.png)',
    'url(/img/fiveChangeHero.png)',
    'url(/img/maxLevelAhivement.png)',
    'url(/img/generalDev.png)',
    'url(/img/firstStarAchivement.png)',
];

// Описание дефолтных достижений

let descriptionAchivements = [
    'Получи 10 очков воли',
    'Получи 10 очков интеллекта',
    'Получи 10 очков силы',
    'Смени героя 1 раз',
    'Смени героя 3 раза',
    'Смени героя 5 раз',
    'Получи максимальный уровень',
    'Получи 50 очков по любому параметру',
    'Получи первую звезду',
]
let defoltAchivements = ahivementsArea.querySelectorAll('.achivement-element');
let closeAhivements = []; // массив с background не открытых достижений (картинка достижения + замок + темный фон)
for (let i = 0; i <= 8; i++) {
    allAch[i].children[0].style.background = 'url(/img/lockAchivement.png) center / 50% 50% no-repeat, ' 
    + 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), '
    + urlImgAchivements[i] + 'center / 100% 100% no-repeat';
    allAch[i].children[0].style.borderRadius = '30px';
    closeAhivements.push(allAch[i].children[0].style.background);
}

// Добавление уникальных идентификаторов в каждое достижение (класс с номером).

for (let i = 0; i < defoltAchivements.length; i++) {
    defoltAchivements[i].classList.add(`Achive-${i}`);
}

// Блок, в котором информация о достижении

let achivementDescription = document.querySelector('.description-achivement');
let everAchivement = document.querySelectorAll('.achive-img');
let allAvatarAchivement = document.querySelectorAll('.achive-img');
let achiveDescription = document.querySelector('.achive-description');

let avatarAchivement = document.querySelector('.avatar-achivement');
for (let i = 0; i < defoltAchivements.length; i++) {
    defoltAchivements[i].addEventListener('click', function() {
        achivementDescription.textContent = descriptionAchivements[i];
        achiveDescription.classList.remove('hidden');
        avatarAchivement.style.background = allAvatarAchivement[i].style.background;
        avatarAchivement.className = 'avatar-achivement ' + defoltAchivements[i].classList[1];
    })
}

// Механика закрывания блока с описанием достижения

let closeAchivementDescription = document.querySelector(".button-close-description");
closeAchivementDescription.addEventListener('click', function(){
    achiveDescription.classList.add('hidden');
});


// Кнопка "Активировать достижение"

let allOpenAchivements = 0; // количество открытых достижений, пересчитывается при каждой активации или деактивации достижения

let buttonActivateAchivement = document.querySelector('.activation-achivement-button');
buttonActivateAchivement.addEventListener('click', function() {
    if (!avatarAchivement.style.background.includes('lockAchivement')) {
        alert('Достижение уже открыто!');
    }
    else {
    let currentAchivement = avatarAchivement.classList[1].split('-')[1];
    avatarAchivement.style.background = urlImgAchivements[currentAchivement] + 'center / 100% 100% no-repeat';
    allAvatarAchivement[currentAchivement].style.background = urlImgAchivements[currentAchivement] + 'center / 100% 100% no-repeat';
    openingAchivementSpace.appendChild(allAch[currentAchivement].cloneNode(true));
    allOpenAchivements = openingAchivementSpace.querySelectorAll('.achivement-element');
    for (let i = 0; i < allOpenAchivements.length; i++) {
        allOpenAchivements[i].onclick = function() {
            showInfoAchivement.call(this);
        }
    }
}
});

// Пользовательское достижение

let userAchivement = allAch[9];
userAchivement.children[0].style.backgroundImage = 'url()';

// Кнопка "Деактивировать достижение"

let buttonDeaktivateAchivement = document.querySelector('.deactivation-achivement-button');
buttonDeaktivateAchivement.addEventListener('click', function(){
    if(avatarAchivement.style.background.includes('lockAchivement')) {
        alert('Достижение не активно!');
    }
    else {
        let numberCurrentAchivement = avatarAchivement.classList[1].split('-')[1];
        let currentAchivement = avatarAchivement.classList[1];
        avatarAchivement.style.background = closeAhivements[numberCurrentAchivement];
        allAch[numberCurrentAchivement].children[0].style.background = closeAhivements[numberCurrentAchivement];
        openingAchivementSpace.removeChild(openingAchivementSpace.querySelector('.' + currentAchivement));
    }
});

// Общая фнукция для показа информации о достижении

let showInfoAchivement = function () {
    achiveDescription.classList.remove('hidden');
    let curentAvatarAchivement = this.querySelector('.achive-img').style.background;
    avatarAchivement.style.background = curentAvatarAchivement;
    let currentAchivement = this.classList[1].split('-')[1];
    achivementDescription.textContent = descriptionAchivements[currentAchivement];
    avatarAchivement.className = 'avatar-achivement ' + this.classList[1];
    }

//  Общая функция, активирующая автоматически дефолтные достижения

function activateAchivement(numberDefoltAchivement) {
    let achiveForActivation = ahivementsArea.querySelector('.Achive-' + numberDefoltAchivement);
    achiveForActivation.children[0].style.background = urlImgAchivements[numberDefoltAchivement] +  'center / 100% 100% no-repeat';
    openingAchivementSpace.appendChild(achiveForActivation.cloneNode(true));
    let achiveActivation = openingAchivementSpace.querySelector('.Achive-' + numberDefoltAchivement);
    achiveActivation.onclick = function() {
        showInfoAchivement.call(this);
    }
}

