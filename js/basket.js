let currentAmountOfProducts = JSON.parse(localStorage.getItem('favListCards') || '0').length

export function updateBasket() {
    const payFromBlock = document.querySelector(".pay-form__block");
    const basketCards = JSON.parse(localStorage.getItem('favListCards')) || [];
    let priceNumber = [];

    for (let i = 0; i < basketCards.length; i++) {
        let filterNumber = basketCards[i].price;
        let arrNumber = parseFloat(filterNumber.replace(/[^0-9.]/g, '')) * basketCards[i].amount;
        priceNumber.push(arrNumber);
    }

    let totalNumOfProduct = priceNumber.reduce((acc, cur) => acc + cur, 0);
    let installmentAmount = parseFloat(totalNumOfProduct / 12);
    localStorage.setItem('priceNumber', JSON.stringify(priceNumber));

    let priceNumberLength = basketCards.reduce((acc, item) => acc + item.amount, 0);

    if (basketCards.length === 0) {
        payFromBlock.innerHTML = `Empty bin`;
    } else {
        renderPayFormFilter(totalNumOfProduct, payFromBlock, priceNumberLength, installmentAmount);
        addPaymentFilterEvents();
    }
}

updateBasket()

export function renderPayFormFilter(totalNumOfProduct, payFromBlock, priceNumberLength, installmentAmount) {
    payFromBlock.innerHTML = `
        <div class="pay-form__filter">
            <a href="#" class="pay-form__filter-btn pay-from__filter--active" data-filter='permanent'>Permanent</a>
            <a href="#" class="pay-form__filter-btn" data-filter='installment'>Installment</a>
        </div>
        <div data-filter='permanent' class="pay-form__products-amount pay-form--unuqiue">
            <div class="pay-form__products-text">${priceNumberLength} products</div>
            <div class="pay-form__products-price">${totalNumOfProduct} USD</div>
        </div>
        <div data-filter='permanent' class="pay-form__products-total-amount pay-form--unuqiue">
            <div class="pay-form__products-total-text">Total</div>
            <div class="pay-form__products-total-price">${totalNumOfProduct} USD</div>
        </div>

        <div class="pay-form__products-amount pay-form--unuqiue payment-installments hide" data-filter='installment'>
            <div class="pay-form__products-text">Cost</div>
            <div class="pay-form__products-price installment-details">${totalNumOfProduct} USD</div>

            <div class="pay-form__products-text">Monthly payment</div>
            <div class="pay-form__products-price installment-details">${installmentAmount} USD</div>

            <div class="pay-form__products-text">Installment period</div>
            <div class="pay-form__products-price installment-details">12 months</div>
        </div>

        <div class="pay-form__products-total-amount pay-form--unuqiue installment-summary hide" data-filter='installment'>
            <div class="pay-form__products-total-text">Total:</div>
            <div class="pay-form__products-total-price installment-summary-total">${installmentAmount} USD × 12 мес = ${totalNumOfProduct} USD</div>
        </div>

    `
}

let totalNumberOfAmount = []

export function handleAmountChange() {
    let favoriteAmountBtns = document.querySelectorAll('.favorite__item-amount-operator');

    favoriteAmountBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let target = e.target;
            let itemElement = target.closest('.favorite__list-item');
            let itemId = itemElement.getAttribute('key');
            let amountDisplay = itemElement.querySelector('.favorite__item-amount-display');
            let favListCards = JSON.parse(localStorage.getItem('favListCards') || '[]');

            if (!favListCards[itemId]) return;

            if (target.getAttribute('data-filter') === 'plus-operator') {
                favListCards[itemId].amount++;
            } else if (target.getAttribute('data-filter') === 'minus-operator' && favListCards[itemId].amount > 1) {
                favListCards[itemId].amount--;
            }

            // Обновляем localStorage
            localStorage.setItem('favListCards', JSON.stringify(favListCards));
            console.log(favListCards[itemId].amount)
            // Обновляем UI
            amountDisplay.textContent = favListCards[itemId].amount;

            // Пересчитываем общее количество товаров
            totalNumberOfAmount = favListCards.reduce((acc, item) => acc + item.amount, 0);

            currentAmountOfProducts = totalNumberOfAmount;
            updateBasket();
        });
    });
}


function addPaymentFilterEvents() {
    const paymentFilterBtn = document.querySelectorAll('.pay-form__filter-btn')
    const payFormBlock = document.querySelectorAll(".pay-form__block .pay-form--unuqiue");

    paymentFilterBtn.forEach(item => {
        
        item.addEventListener('click', (e) => {
            const target = e.target

            paymentFilterBtn.forEach(btn => btn.classList.remove("pay-from__filter--active"))

            target.classList.add('pay-from__filter--active')

            payFormBlock.forEach(block => {
                block.classList.add('hide')
                if(block.getAttribute('data-filter') === target.getAttribute('data-filter')){
                    block.classList.remove('hide')
                }
            })
        })

    })
}