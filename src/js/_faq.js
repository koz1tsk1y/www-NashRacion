export function faqInit() {
    const items = document.querySelectorAll('.faq__item');

    items.forEach(item => {
        const question = item.querySelector('.faq__item-question');
        const answer = item.querySelector('.faq__item-answer');
        const inner = item.querySelector('.faq__item-answer-inner');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('faq__item--active');

            // закрываем все
            items.forEach(i => {
                i.classList.remove('faq__item--active');
                i.querySelector('.faq__item-answer').style.maxHeight = '0px';
            });

            // открываем текущий
            if (!isOpen) {
                item.classList.add('faq__item--active');
                answer.style.maxHeight = inner.scrollHeight + 'px';

                // скроллим к вопросу
                scrollToQuestion(question);
            }
        });

        // пересчёт при изменении размера окна
        window.addEventListener('resize', () => {
            if (item.classList.contains('faq__item--active')) {
                answer.style.maxHeight = inner.scrollHeight + 'px';
            }
        });
    });

    function scrollToQuestion(questionEl) {
        const rect = questionEl.getBoundingClientRect();
        const offset = rect.top + window.scrollY - (window.innerHeight / 2) + rect.height / 2;

        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
}
