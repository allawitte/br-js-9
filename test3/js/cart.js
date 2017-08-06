'use strict';

const apis = ['https://neto-api.herokuapp.com/cart/colors', 'https://neto-api.herokuapp.com/cart/sizes', 'https://neto-api.herokuapp.com/cart'];
const addLink = 'https://neto-api.herokuapp.com/cart';
const removeLink = 'https://neto-api.herokuapp.com/cart/remove';
const sizeSwatch = document.querySelector('#sizeSwatch');
const colorSwatch = document.querySelector('#colorSwatch');
const quickCart = document.querySelector('#quick-cart');
const addToCart = document.querySelector('#AddToCart');
const form = document.querySelector('#AddToCartForm');
let img = document.createElement('img');


img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
img.classList.add('crossed-out');
addToCart.addEventListener('click', send);


Promise.all(apis.map(item => fetch(item))).then(responses =>
    Promise.all(responses.map(res => res.json())
    ).then(responds => {
            handleColors(responds[0]);
            handleSizes(responds[1]);
            handleCart(responds[2]);
        }));

function send(e) {
    e.preventDefault();
    let formD = new FormData(form);
    formD.append('productId', form.dataset.productId);
    let fetchData = {
        method: 'POST',
        body: formD,
    };
    fetch(addLink, fetchData)
        .then((response) =>{
            return response.json();
        })
        .then(parseServerAnswer);
}

function parseServerAnswer(data){
    handleCart(data);
}

function handleColors(colors) {
    let color = localStorage.getItem('color');
    colors.forEach((item, indx) => {
        let colorBg = document.createElement('span');
        colorBg.style.backgroundColor = item.type;
        let label = document.createElement('label');
        label.style.borderColor = item.type;
        label.htmlFor = 'swatch-' + indx + '-' + item.type;
        label.appendChild(colorBg);
        let crossImg = img.cloneNode();
        label.appendChild(crossImg);

        let tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = item.title;

        let inputRadio = document.createElement('input');
        inputRadio.type = 'radio';
        inputRadio.name = 'color';
        inputRadio.id = 'swatch-' + indx + '-' + item.type;
        inputRadio.quickbeam = 'color';
        inputRadio.value = item.type;
        if (color == item.type) {
            inputRadio.setAttribute('checked', true)
        }
        if (!item.isAvailable) {
            inputRadio.setAttribute('disabled', true);
        }

        let divWrap = document.createElement('div');
        divWrap.dataset['value'] = item.type;
        divWrap.classList.add('swatch-element');
        divWrap.classList.add('color');
        divWrap.classList.add(item.type);
        if (item.isAvailable) {
            divWrap.classList.add('available');
        }
        else {
            divWrap.classList.add('soldout');
        }

        divWrap.appendChild(tooltip);
        divWrap.appendChild(inputRadio);
        divWrap.appendChild(label);
        divWrap.addEventListener('click', storeChoise);
        colorSwatch.appendChild(divWrap);
    })


}

function handleSizes(sizes) {
    let size = localStorage.getItem('size');
    sizes.forEach((item, indx) => {
        let crossImg = img.cloneNode();
        let label = document.createElement('label');
        label.htmlFor = 'swatch-' + indx + '-' + item.type;
        label.textContent = item.title;
        label.appendChild(crossImg);


        let inputRadio = document.createElement('input');
        inputRadio.type = 'radio';
        inputRadio.name = 'size';
        inputRadio.value = item.type;
        if (size == item.type) {
            inputRadio.setAttribute('checked', true)
        }
        if (!item.isAvailable) {
            inputRadio.setAttribute('disabled', true);
        }
        inputRadio.id = 'swatch-' + indx + '-' + item.type;

        let divWrap = document.createElement('div');
        divWrap.dataset['value'] = item.type;
        divWrap.classList.add('swatch-element');
        divWrap.classList.add('plain');
        divWrap.classList.add(item.type);
        if (item.isAvailable) {
            divWrap.classList.add('available');
        }
        else {
            divWrap.classList.add('soldout');
        }

        divWrap.appendChild(inputRadio);
        divWrap.appendChild(label);
        divWrap.addEventListener('click', storeChoise);
        sizeSwatch.appendChild(divWrap);
    });

}

function handleCart(cart) {
    let elems = quickCart.children;
    Array.from(elems).forEach(item => quickCart.removeChild(item));
    var totalPrice = 0;
    cart.forEach((item, indx)=> {
        let img = document.createElement('img');
        img.src = item.pic;
        img.title = item.title;

        let spanS1 = document.createElement('span');
        spanS1.classList.add('s1');
        spanS1.style.backgroundColor = '#000';
        spanS1.style.opacity = 0.5;
        spanS1.textContent = item.price;


        let spanS2 = document.createElement('span');
        spanS2.classList.add('s2');

        let divImgWpar = document.createElement('div');
        divImgWpar.classList.add('quick-cart-product-wrap');

        divImgWpar.appendChild(img);
        divImgWpar.appendChild(spanS1);
        divImgWpar.appendChild(spanS2);

        let spanCount = document.createElement('span');
        spanCount.classList.add('count');
        spanCount.classList.add('hide');
        spanCount.classList.add('fadeUp');
        spanCount.id = 'quick-cart-product-count-' + item.id;
        spanCount.textContent = item.quantity;
        totalPrice += item.price * item.quantity;

        let spanRemove = document.createElement('span');
        spanRemove.classList.add('quick-cart-product-remove')
        spanRemove.classList.add('remove');

        let divWrap = document.createElement('div');
        divWrap.classList.add('quick-cart-product');
        divWrap.classList.add('quick-cart-product-static');
        divWrap.id = 'quick-cart-product-' + item.id;
        divWrap.style.opacity = 1;

        divWrap.appendChild(divImgWpar);
        divWrap.appendChild(spanCount);
        divWrap.appendChild(spanRemove);

        quickCart.appendChild(divWrap);
        spanRemove.addEventListener('click', removeItem);
    });
    let strong = document.createElement('strong');
    strong.classList.add('quick-cart-text');
    strong.textContent = 'Оформить заказ';
    let br = document.createElement('br');
    strong.appendChild(br);

    let spanPrice = document.createElement('span');
    spanPrice.classList.add('quick-cart-price');
    spanPrice.textContent = totalPrice;


    let spanWrap = document.createElement('span');
    spanWrap.appendChild(strong);
    spanWrap.appendChild(spanPrice);

    let cartA = document.createElement('a');
    cartA.id = 'quick-cart-pay';
    cartA.setAttribute('quickbeam', 'cart-pay');
    cartA.classList.add('cart-ico');
    if (cart.length > 0) {
        cartA.classList.add('open');
    }
    cartA.appendChild(spanWrap);
    quickCart.appendChild(cartA);

}

function removeItem(e) {
    console.log('hello')
    let formD = new FormData(form);
    formD.append('productId', form.dataset.productId);
    formD.set('quantity', 0);
    let fetchData = {
        method: 'POST',
        body: formD,
    };
    fetch(removeLink, fetchData)
        .then((response) =>{
            return response.json();
        })
        .then(parseServerAnswer);
}

function storeChoise(e) {
    if (e.target.value) {
        let size = e.target.value;
        let name = e.target.name;
        localStorage.setItem(name, size);
    }
}


