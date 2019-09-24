let tbody = document.getElementById('tbody');
let order = document.getElementById('order');

// Store Data
var cart = [
    {
        ID: 0,
        product: "Nho Mỹ",
        image: "https://vinfruits.com/wp-content/uploads/2017/02/Nho-%C4%91%E1%BB%8F-M%E1%BB%B9-vinfruits.com-3.jpg",
        price: 130000,
        amount: 2
    },
    {
        ID: 1,
        product: "Táo Canada",
        image: "https://media-ak.static-adayroi.com/sys_master/hd4/h90/9535732383774.jpg",
        price: 230000,
        amount: 3
    }
];

window.onload = loadProduct(cart);

// Load all product
function loadProduct(cart) {
    let products = "";
    cart.forEach(function (p) {
        let quantity = p.price * p.amount;
        products += `
        <tr>
            <th scope="row">${p.ID}</th>
            <td>
                <img class="imgs" src="${p.image}">
            </td>
            <td>${p.product} </td>
            <td id="price">${p.price}</td>
            <td>
                <input type="number" name="amount" id="amount" min="1" max="10" value="${p.amount}">
            </td>
            <td id="total">${quantity}</td>
        </tr>`
    })
    products += `
    <tr>
        <th scope="row"></th>
        <td colspan="4">
            <input type="text" name="" id="">
        </td>
        <td>
            <button type="button" class="btn btn-secondary btn-sm" id="update_cart">Cập Nhật Giỏ Hàng</button>
        </td>
    </tr>
    `
    tbody.innerHTML = products;
};

// Event in Cart Page
let amount_input = document.querySelectorAll('#amount');
let update_cart = document.getElementById('update_cart');

amount_input.forEach(element => {
    element.addEventListener('change', () => actChangeAmout(element));
})
function actChangeAmout(element) {
    element.parentNode.nextElementSibling.textContent = element.value * element.parentNode.previousElementSibling.textContent;
}

update_cart.addEventListener('click', () => actUpdateCart(cart));
function actUpdateCart(cart) {
    amount_input.forEach((element, index) => {
        cart[index].amount = element.value;
    })
    alert("Cập Nhật Thành Công !!");
}

// load all product in payment
function loadProductPayment(cart) {
    let products = "";
    let temp_price = 0;
    cart.forEach(function (p) {
        let p_product = p.price * p.amount;
        temp_price += (p.price * p.amount);
        products += `
        <tr>
            <td>
                <img class="imgs" src="${p.image}">
            </td>
            <th scope="row">${p.product}</th>
            <td>${p.amount}</td>
            <td>${p_product}</td>
        </tr>`
    })
    products += `
        <tr>
            <th scope="row">Nhập mã giảm giá >></th>
            <td id="total_p"></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">Tạm Tính</th>
            <td></td>
            <td></td>
            <td id="temp_price">${temp_price}</td>
        </tr>
        <tr>
            <th scope="row">Giảm Giá</th>
            <td></td>
            <td></td>
            <td id="discount" class="text-danger"></td>
        </tr>
        <tr>
            <th scope="row">Tổng Cộng</th>
            <td></td>
            <td></td>
            <td id="total_price"></td>
        </tr>`
    order.innerHTML = products;
    actPayMethod();
}

// Event From Cart To Payment
let payment = document.getElementById('payment');

payment.addEventListener('click', () => actPayPage(cart));

function actPayPage(cart) {
    let carts = document.querySelector('.cart');
    let payments = document.querySelector('.payments');
    carts.style.display = "none";
    payments.style.display = "block";
    loadProductPayment(cart);
}

// Event In Payment
let pay_method = document.getElementById('pay_method');

pay_method.addEventListener('change', actPayMethod);

function actPayMethod() {
    let temp_price = document.getElementById('temp_price');
    let discount = document.getElementById('discount');
    let total_price = document.getElementById('total_price');

    let discounts = (pay_method.value * temp_price.textContent) / 100;
    discount.textContent = `- ${discounts}`;
    total_price.textContent = parseInt(temp_price.textContent) - discounts;
}

// Event Back To Payment
let back = document.getElementById('back');

back.addEventListener('click', actBackToCart);

function actBackToCart() {
    let cart = document.querySelector('.cart');
    let payments = document.querySelector('.payments');
    cart.style.display = "block";
    payments.style.display = "none";
}

// Pay
let payto = document.getElementById('payto');
let paymodals = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];

payto.addEventListener('click', actToPay);
span.addEventListener('click', actToPayClose);

function actToPay() {
    paymodals.style.display = "block";
}
function actToPayClose() {
    paymodals.style.display = "none";
}

// @Author: Đinh Sỹ Hùng