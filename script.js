const container = document.querySelector('#container');

const urlParams = new URLSearchParams(window.location.search);
const urlSize = urlParams.get('size');

let size = returnSize();

window.onload = makeGrid(size);

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', clearGrid);

const makeButton = document.getElementById('make');
makeButton.addEventListener('click', changeURL);

const squares = document.querySelectorAll('div.square');
squares.forEach(squares => squares.addEventListener('mouseenter', changeBackgroundToBlackGradually, {
    capture: false,
    once: false
}));

const userValue = document.getElementById('size');
userValue.value = size;

function returnMode() {
    let ele = document.getElementsByName('mode')
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            return ele[i].value;
        }
    }
}

function returnSize() {
    if (window.location.search === "") {
        return (16);
    } else {
        return urlSize;
    }
}

function clearGrid() {
    squares.forEach(squares => squares.classList.remove('filled'));
    squares.forEach(squares => squares.style.removeProperty('background-color'))
}

function changeURL() {
    let size = document.getElementById('size').value;
    window.location.replace('http://localhost:5500/?size=' + size);
}

function changeBackgroundToBlack(e) {
    this.classList.add('filledBlack');
}

function changeBackgroundToRandomColor(e) {
    let color = randomRGBA();
    this.style.backgroundColor = color;
}

function randomRGBA() {
    let o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function changeBackgroundToBlackGradually(e) {
    let currentAlpha = Number(this.style.backgroundColor.slice(-4, -1));
    if (this.style.backgroundColor.match(/rgba/)) {
        let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
        if (currentOpacity <= 0.9) {
            this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
            this.classList.add('gray');
        }
    } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
        return;
    } else {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
    }
}

function makeGrid(size) {
    if (size > 100) {
        return;
    } else {
        editCSS(size);
        editHTML(size);
    }
}

function editCSS(size) {
    container.setAttribute('style', 'grid-template-columns: repeat(' + size + ', auto');
}

function editHTML(size) {
    let n = Math.pow(size, 2);
    for (let i = 0; i < n; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        container.appendChild(square);
    }
}

// THIS MAY BE IMPLEMENTED LATER - radio buttons to change mode from hover to click
// 
// function chooseMode() {
//     const radioButtons = document.getElementsByName('mode');
//     for (i = 0; i < radioButtons.length; i++) {
//         if (radioButtons[i].checked) {
//             squares.forEach(squares => squares.addEventListener(radioButtons[i].value, changeBackground, {
//                 capture: false,
//                 once: false
//             }));
//         }
//     }
// }
// 