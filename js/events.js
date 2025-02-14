const tabITem = document.querySelectorAll(".tabs__btn-item")
const tabContent = document.querySelectorAll(".tabs__content-item")
const favorites = document.querySelector('.favorites')
const favoritesClose = document.querySelector('.favorites-close')
const favoritesOpen = document.querySelector('.basket')

function open(e){
    const tabTarget = e.currentTarget;
    const button = tabTarget.dataset.button;

    tabITem.forEach(item => {
        item.classList.remove("tabs__btn-item--active")
    })

    tabContent.forEach(item => {
        item.classList.remove("tabs__content--active")
    })

    tabTarget.classList.add("tabs__btn-item--active")
    document.querySelector(`#${button}`).classList.add('tabs__content--active')

}

tabITem.forEach(btn => btn.addEventListener("click", open))

const menuBtn = document.querySelector('.menu-btn')
const menu = document.querySelector('.menu')

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('menu--active')
})

favoritesClose.addEventListener('click', () => {
    favorites.style.display = 'none'
})

favoritesOpen.addEventListener('click', () => {
    favorites.style.display = 'flex'
})
