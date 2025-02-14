import { handleAmountChange, updateBasket } from "./basket.js"

const accessoriesList = document.querySelectorAll('.accessories__items .accessories__item')
const choosedItems = document.querySelector('.chosed-list')

let favListCards = JSON.parse(localStorage.getItem('favListCards')) || []
if(favListCards.length == 0){
    choosedItems.innerHTML = 'Empty bin'
}else if(favListCards.length >= 1){
    renderFav(favListCards)
}

accessoriesList.forEach((item, id) => {

    let accessoriesImage = item.querySelector('.accessories__item-img').src;
    let accessoriesBuyBtn = item.querySelector('.accessories__item-btn');
    let accessoriesTitle = item.querySelector('.accessories__item-title').innerHTML;
    let accessoriesText = item.querySelector('.accessories__item-text').innerHTML;
    let accessoriesPrice = item.querySelector('.accessories__item-price').innerHTML;

    item.setAttribute('data-filter', id);

    accessoriesBuyBtn.addEventListener('click', () => {

        let existingCard = favListCards.find(card => card.title === accessoriesTitle);

        if(existingCard){
            existingCard.amount += 1;
        }else{
            favListCards.push({
                img: accessoriesImage,
                title: accessoriesTitle,
                text: accessoriesText,
                price: accessoriesPrice,
                amount: 1
            });
        }

        localStorage.setItem('favListCards', JSON.stringify(favListCards));

        renderFav(favListCards);
        updateBasket();

    });

});

function renderFav(favList){

    choosedItems.innerHTML = favList.map((element, id) => {
        return  `
                <div class="favorite__list-item" key=${id}>
                    <img src=${element.img} alt=${id} class="favorite__item-img">
                    <h3 class="favorite__item-title">${element.title}</h3>
                    <div class="favorite__item-amount">
                        <buttom data-filter='minus-operator' class="favorite__item-amount-minus favorite__item-amount-operator"></buttom>
                        <p class="favorite__item-amount-display">${element.amount}</p>
                        <button data-filter='plus-operator' class="favorite__item-amount-plus favorite__item-amount-operator"></button>
                    </div>
                    <p class="favorite__item-price">${element.price}</p>
                    <div class="favorite__item-btns">
                        <button dataset=${id} class="favorite__item-btn favorite-btn-fav">
                            <a class="favorite__item-favorite-btn">
                                <img src="images/icons/favorite.svg" alt="">
                            </a>
                        </button>
                        <button dataset=${id} class="favorite__item-btn favorite-btn-bin">    
                            <a class="favorite__item-delete-btn">
                                <img src="images/icons/bin.svg" alt="">
                            </a>
                        </button>
                    </div>
                </div>
        `
    }).join('')

    deleteBtn()
    handleAmountChange()

}

function deleteBtn(){
    let deleteBtn = document.querySelectorAll('.favorite-btn-bin')
 
    deleteBtn.forEach(element => {
        element.addEventListener("click", (e) => {
            const btnId = e.target.closest('.favorite-btn-bin').getAttribute('dataset')
            favListCards.splice(btnId, 1)

            localStorage.setItem('favListCards', JSON.stringify(favListCards))

            if(favListCards.length == 0){
                choosedItems.innerHTML = `Empty bin`
                updateBasket()
            }else if(favListCards.length >= 1){
                renderFav(favListCards)
                updateBasket()
                handleAmountChange()
            }
        })
    });
}