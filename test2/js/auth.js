'use strict';
const xhr = new XMLHttpRequest();
const auth = 'https://neto-api.herokuapp.com/signin';
const registration = 'https://neto-api.herokuapp.com/signup';
const authForm = document.querySelector('.sign-in-htm');
const registrationForm = document.querySelector('.sign-up-htm');
const inputs = document.querySelectorAll('input[type="submit"]');
const forms = document.querySelectorAll('form');
var formToSend;
var currentForm;

xhr.addEventListener("load", onLoad);
function onLoad() {
    let response = JSON.parse(xhr.responseText);
    let output =  currentForm.querySelector('.error-message');
    if(response.error){
        output.textContent = response.message
    }
    else {
        let lastWord;
        if(currentForm.classList.contains('sign-in-htm')) {
            lastWord = 'авторизован';
        }
        else if(currentForm.classList.contains('sign-up-htm')){
            lastWord = 'заренистрирован';
        }
        output.textContent = 'Пользователь ' + response.name + ' успешно ' + lastWord;
    }
}

for (let i = 0; i < forms.length; i ++){
    forms[i].addEventListener('click', sendData);
}
function sendData(event){
    var currentPath;

    event.preventDefault();
    if(event.target.type == 'submit'){
        currentForm = event.target.parentNode.parentNode;
        if(currentForm.classList.contains('sign-in-htm')){
            currentPath = auth;
        }
        else if(currentForm.classList.contains('sign-up-htm')){
            currentPath = registration;
        }
        formToSend =  new FormData(currentForm);
        for (const [k, v] of formToSend) {
            console.log(k + ': ' + v);
        }
        xhr.open('POST', currentPath);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(formToSend));
    }

}
