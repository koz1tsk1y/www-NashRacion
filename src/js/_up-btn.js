export function upBtnInit() {
    const upBtns = document.querySelectorAll('.up-btn');
    if (!upBtns.length) return;

    upBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}
