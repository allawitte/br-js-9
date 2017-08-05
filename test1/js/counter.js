'use strict';
const counterBlock = document.querySelector('#counter');
const increment =document.querySelector('#increment');
const decrement =document.querySelector('#decrement');
const reset =document.querySelector('#reset');
var counter = localStorage.getItem('counter');

counterBlock.textContent = counter ? counter : 0;
increment.addEventListener('click', increaseValue);
decrement.addEventListener('click', decreaseValue);
reset.addEventListener('click', resetValue);

function increaseValue(){
    counter++;
    localStorage.setItem('counter', counter);
    updateCounter();
}

function decreaseValue(){
    counter--;
    localStorage.setItem('counter', counter);
    updateCounter();
}

function resetValue(){
    counter = 0;
    localStorage.setItem('counter', counter);
    updateCounter();
}

function updateCounter(){
    counterBlock.textContent = counter;
}
