export function customStickyInit() {
    const stickyBlocks = document.querySelectorAll('.sticky');

    stickyBlocks.forEach(sticky => {
        const item = sticky.querySelector('.sticky__item');
        if (!item) return;

        let start = 0;
        let end = 0;
        let itemHeight = 0;
        let stickyHeight = 0;

        function recalc() {
            const rect = sticky.getBoundingClientRect();
            const scrollTop = window.scrollY;

            itemHeight = item.offsetHeight;
            stickyHeight = sticky.offsetHeight;

            // верхняя граница контейнера
            start = sticky.offsetTop;

            // нижняя граница, где item должен остановиться
            end = start + stickyHeight - itemHeight;
        }

        function onScroll() {
            const scroll = window.scrollY;

            if (scroll <= start) {
                // элемент в самом начале контейнера
                item.style.transform = `translateY(0px)`;
            } 
            else if (scroll >= end) {
                // элемент упёрся в низ контейнера
                item.style.transform = `translateY(${end - start}px)`;
            } 
            else {
                // элемент прилипает к верху экрана
                item.style.transform = `translateY(${scroll - start}px)`;
            }
        }

        recalc();
        onScroll();

        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', () => {
            recalc();
            onScroll();
        });
    });
}
