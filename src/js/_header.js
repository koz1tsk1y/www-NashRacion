export function headerInit() {
    const header = document.querySelector('.header');
    if (header) {
        const burgerBtn = header.querySelector('.header__burger-btn');
        burgerBtn?.addEventListener('click', () => {
            header.classList.toggle('header--burger-active')
        })
    }
}