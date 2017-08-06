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
    let sendForm = {};

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
            sendForm[k] = v;
        }
        xhr.open('POST', currentPath);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(sendForm));
    }

}
//'use strict';
//
//const f1 = document.getElementsByClassName('sign-in-htm')[0];
//const f2 = document.getElementsByClassName('sign-up-htm')[0];
//const startUrl = 'https://neto-api.herokuapp.com/';
//const endUrls = ['signin', 'signup'];
//
//document.addEventListener('DOMContentLoaded', onLoad);
//
//function onLoad() {
//    [f1, f2].forEach((item, i) => {
//        item.addEventListener('submit', function(e) {
//            return onSubmit(e, item, i);
//        });
//    });
//}
//
//function onSubmit(e, form, i) {
//    e.preventDefault();
//    const testF = {};
//    const fData = new FormData(form);
//    for (const [k, v] of fData) {
//        testF[k] = v;
//    }
//    const xhr = new XMLHttpRequest();
//    xhr.addEventListener('load', function (e) {
//        return onXhrLoad(e, xhr, form, i)
//    });
//    xhr.addEventListener('error', onXhrError);
//    xhr.open('POST', startUrl + endUrls[i]);
//    xhr.setRequestHeader('Content-Type', 'application/json');
//    xhr.send(JSON.stringify(testF));
//}
//
//function onXhrLoad(e, op1, form, i) {
//    const out = form.querySelector('output');
//    try {
//        const response = JSON.parse(op1.responseText);
//        console.log(response);
//        const {error, message} = response;
//        const successPhrase = 'Пользователь Иван успешно авторизован';
//        const repeatPhrase = 'Пользователь Иван успешно зарегистрирован';
//        console.log(error, message);
//        out.value = message ? message : i === 1 ? successPhrase : repeatPhrase;
//    }
//    catch(e) {
//        const response = null;
//    }
//}
//
//function onXhrError(e) {
//    console.log(e.data);
//}
//
