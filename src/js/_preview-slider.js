export function previewSliderInit() {
    const slider = document.querySelector('.preview-slider');
    if (!slider) return;

    const previews = slider.querySelectorAll('.preview-slider__preview');
    const mainSlides = slider.querySelectorAll('.preview-slider__main-image');
    const main = slider.querySelector('.preview-slider__main');

    let currentIndex = 0;

    function setActive(index) {
        currentIndex = index;

        previews.forEach(p => p.classList.remove('preview-slider__preview--active'));
        previews[index].classList.add('preview-slider__preview--active');

        mainSlides.forEach(div => div.classList.remove('preview-slider__main-image--active'));
        mainSlides[index].classList.add('preview-slider__main-image--active');
    }

    // --- клик по превью ---
    previews.forEach((preview, index) => {
        preview.addEventListener('click', () => setActive(index));
    });

    // --- свайп по main (touch + mouse) ---
    let startX = 0;
    let isDown = false;

    // TOUCH
    main.addEventListener('touchstart', e => {
        isDown = true;
        startX = e.touches[0].clientX;
    }, { passive: true });

    main.addEventListener('touchend', e => {
        if (!isDown) return;
        isDown = false;

        const diff = e.changedTouches[0].clientX - startX;
        handleSwipe(diff);
    });

    // MOUSE
    main.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.clientX;
    });

    main.addEventListener('mouseup', e => {
        if (!isDown) return;
        isDown = false;

        const diff = e.clientX - startX;
        handleSwipe(diff);
    });

    // общая логика свайпа
    function handleSwipe(diff) {
        if (Math.abs(diff) > 50) {
            if (diff < 0) {
                currentIndex = (currentIndex + 1) % previews.length;
            } else {
                currentIndex = (currentIndex - 1 + previews.length) % previews.length;
            }
            setActive(currentIndex);
        }
    }

    setActive(0);
}
