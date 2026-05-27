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
            itemHeight = item.offsetHeight;
            stickyHeight = sticky.offsetHeight;

            start = sticky.offsetTop;
            end = start + stickyHeight - itemHeight;
        }

        function onScroll() {
            const scroll = window.scrollY;

            // базовое смещение — как sticky top:0
            let translate = scroll - start;

            // ограничиваем сверху
            if (translate < 0) translate = 0;

            // ограничиваем снизу
            if (scroll >= end) translate = end - start;

            item.style.transform = `translateY(${translate}px)`;
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
