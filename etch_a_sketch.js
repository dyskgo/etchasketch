//Event Delegation
function getEventTarget(e) {
    e = e || window.event; 
    return e.target || e.srcElement; 
}

//Creates a 16x16 grid
for (i = 0; i < 16; i++) {
    for (j = 0; j < 16; j++) {
        let div = document.createElement('div');
        div.classList.add('cell');
        document.getElementById('container').appendChild(div);
    }
}

//Tells us what mode the grid is in
let currentMode = 'regular';

//Regular mouseover effect
let regularEffect = function(e) {
  if (getEventTarget(e).className === 'cell') getEventTarget(e).style.backgroundColor = 'black';
}

//Rainbow mouseover effect
let rainbowEffect = function(e) {
    let newColor = changeColor(); 
    if (getEventTarget(e).className === 'cell') getEventTarget(e).style.backgroundColor = newColor; 
}

//Shaes mouseover effect
let shadesEffect = function(e) {
if (getEventTarget(e).className === 'cell') {
     getEventTarget(e).style.backgroundColor = 'black';
     getEventTarget(e).style.opacity = (parseFloat(getEventTarget(e).style.opacity) || 0) + 0.1;
 }
}


//Variable Names for DOM Elements
let resetButton = document.getElementById('reset');
let container = document.getElementById('container');
let rainbow = document.getElementById('rainbow');
let shades = document.getElementById('shades');
let regular = document.getElementById('regular');

//Adds regular mouseover as default
container.addEventListener('mouseover', regularEffect); 

//Function to remove mouseover effects
let removeEffect = function() {
 if (currentMode === 'regular') container.removeEventListener('mouseover', regularEffect);
 if (currentMode === 'rainbow') container.removeEventListener('mouseover', rainbowButton);
 if (currentMode === 'shades') container.removeEventListener('mouseover', shadesEffect);
}

//Function to choose a random color
function changeColor() {
    let color1 = Math.floor(Math.random() * 255);
    let color2 = Math.floor(Math.random() * 255);
    let color3 = Math.floor(Math.random() * 255); 
    return `rgb(${color1}, ${color2}, ${color3})`
}

//Function to switch to rainbow effect
let rainbowButton = function(e) {
   let effect = 'rainbow';
   if (currentMode === effect) return; 
   removeEffect(); 
   let containerReset = container.querySelectorAll('.cell');
   for (i = 0; i < containerReset.length; i++) {
       containerReset[i].style.backgroundColor = '';
       containerReset[i].style.opacity = '1'; 
   }
   container.addEventListener('mouseover', rainbowEffect);          
   currentMode = 'rainbow';
}

//Function to switch to shades effect
let shadesButton = function(e) {
    let effect = 'shades';
    if (currentMode === effect) return; 
    removeEffect(); 
    let containerReset = container.querySelectorAll('.cell');
    for (i = 0; i < containerReset.length; i++) {
       containerReset[i].style.backgroundColor = '';
       containerReset[i].style.opacity = '0';
    }
    container.addEventListener('mouseover', shadesEffect);          
    currentMode = 'shades';
}

//Function to switch to regular effect
let regularButton = function(e) {
    let effect = 'regular';
    if (currentMode === effect) return; 
    removeEffect(); 
    let containerReset = container.querySelectorAll('.cell');
    for (i = 0; i < containerReset.length; i++) {
       containerReset[i].style.backgroundColor = '';
       containerReset[i].style.opacity = '1'; 
    }
    container.addEventListener('mouseover', regularEffect);          
    currentMode = 'regular';
}

//Function to reset the grid size
let resetEffect = function(e) {
    let resetInput = prompt('Enter the number of columns you want for the grid'); 
    if (resetInput === NaN || resetInput === null) return; 
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    container.style.gridTemplateRows = `repeat(${resetInput}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${resetInput}, 1fr)`;
    for (t = 0; t < resetInput; t++) 
        for (l = 0; l < resetInput; l++) {
            let div = document.createElement('div');
            div.classList.add('cell');
            document.getElementById('container').appendChild(div);
        }
}

//Attaches click events to each button
resetButton.addEventListener('click', resetEffect); 
rainbow.addEventListener('click', rainbowButton);
shades.addEventListener('click', shadesButton); 
regular.addEventListener('click', regularButton);