
let stars = document.querySelectorAll('.star');

for (let currentStar of stars) {
    currentStar.addEventListener('click', function() {
        currentStar.classList.toggle('stars_click');
    });
}
