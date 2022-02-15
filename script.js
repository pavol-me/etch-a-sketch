const container = document.getElementById('container');
// the only way I've been able to use user input for grid generation was through url attributes
const urlParams = new URLSearchParams(window.location.search);
const urlSize = urlParams.get('size');
const size = returnSize();
const makeButton = document.getElementById('make');
const resetButton = document.getElementById('reset');
const blackButton = document.getElementById('black');
const rainbowButton = document.getElementById('rainbow');
const eraseButton = document.getElementById('erase');
let color = 'black';

function randomRGBA() {
    let o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function returnSize() {
    if (window.location.search === "") {
        return 16;
    } else {
        return urlSize;
    }
}

function makeGrid(size) {
    if (size > 100) {
        return;
    } else {
// this makes grid template in container
        container.setAttribute('style', 'grid-template-columns: repeat(' + size + ', auto)');
// this generates the "pixels" of the grid
        let n = Math.pow(size, 2);
        for (i = 0; i < n; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.setAttribute('style', 'background-color: white')
            container.appendChild(pixel);
        }
    }
    const pixels = document.querySelectorAll('.pixel')
    pixels.forEach(pixels => pixels.addEventListener('mouseenter', changeBackground, {
        capture: true,
        once: false
    }));
    document.getElementById('inputSize').value = size;
}

function changeBackground() {
    switch (color) {
        case 'black':
            this.style.backgroundColor = '#000000';
            break;
        case 'rainbow':
            this.style.backgroundColor = randomRGBA();
            break;
        case 'erase':
            this.style.backgroundColor = 'white';
            break;    
    }
}

//this function takes size from the input and puts it into URL attribute
function changeURL() {
    let inputSize = document.getElementById('inputSize').value;
    window.location.replace('http://localhost:5500/?size=' + inputSize);
}

function resetGrid() {
    const pixels = document.querySelectorAll('.pixel')
    pixels.forEach(pixels => pixels.style.removeProperty("background-color"));
}

window.onload = makeGrid(size);
makeButton.addEventListener('click', changeURL);
resetButton.addEventListener('click', resetGrid);
blackButton.addEventListener('click', () => color = 'black');
rainbowButton.addEventListener('click', () => color = 'rainbow');
eraseButton.addEventListener('click', () => color = 'erase');
// make new grid when hitting enter while in size input
document.getElementById('inputSize').addEventListener('keyup', function(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
        changeURL();
    }
});