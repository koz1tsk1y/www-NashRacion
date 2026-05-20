export function quizInit() {
    const quiz = document.querySelector('.quiz');
    if (!quiz) return;

    const tabs = quiz.querySelectorAll('.quiz__tab');
    const items = quiz.querySelectorAll('.quiz__item');
    const btnPrev = quiz.querySelector('.quiz__btn-prev');
    const btnNext = quiz.querySelector('.quiz__btn-next');
    const btnSubmit = quiz.querySelector('.quiz__submit');

    let index = 0;

    // --- ВАЛИДАЦИЯ ТЕКУЩЕГО ШАГА ---
    const validateStep = step => {
        const item = items[step];
        item.classList.remove('quiz__item--error');

        let valid = true;

        // Проверяем radio-группы
        const radioGroups = [...item.querySelectorAll('input[type="radio"]')]
            .reduce((groups, radio) => {
                groups[radio.name] = groups[radio.name] || [];
                groups[radio.name].push(radio);
                return groups;
            }, {});

        for (const groupName in radioGroups) {
            const group = radioGroups[groupName];
            if (!group.some(r => r.checked)) {
                valid = false;
            }
        }

        // Проверяем текстовые поля
        const textInputs = item.querySelectorAll('input[type="text"]');
        textInputs.forEach(input => {
            if (input.value.trim() === '') valid = false;
        });

        // Проверяем hidden inputs (кастомные селекты)
        const hiddenInputs = item.querySelectorAll('input[type="hidden"]');
        hiddenInputs.forEach(input => {
            if (input.value.trim() === '') valid = false;
        });

        if (!valid) {
            item.classList.add('quiz__item--error');
        }

        return valid;
    };

    // --- СТАРТОВАЯ ИНИЦИАЛИЗАЦИЯ ---
    const init = () => {
        tabs.forEach(t => t.classList.remove('quiz__tab--active'));
        items.forEach(i => i.classList.remove('quiz__item--active'));

        tabs[0].classList.add('quiz__tab--active');
        items[0].classList.add('quiz__item--active');

        index = 0;
    };

    // --- ОБНОВЛЕНИЕ ШАГА ---
    const update = () => {
        tabs.forEach(t => t.classList.remove('quiz__tab--active'));
        items.forEach(i => i.classList.remove('quiz__item--active'));

        tabs[index].classList.add('quiz__tab--active');
        items[index].classList.add('quiz__item--active');

        quiz.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    // --- КНОПКА "ДАЛЕЕ" ---
    btnNext.addEventListener('click', () => {
        if (!validateStep(index)) return;

        if (index < items.length - 1) {
            index++;
            update();
        }
    });

    // --- КНОПКА "НАЗАД" ---
    btnPrev.addEventListener('click', () => {
        if (index > 0) {
            index--;
            update();
        }
    });

    // --- КНОПКА "ПОДОБРАТЬ КОРМ" ---
    btnSubmit.addEventListener('click', e => {
        if (!validateStep(index)) {
            e.preventDefault();
            return;
        }

        if (index < items.length - 1) {
            e.preventDefault();
            index++;
            update();
        }
    });

    // --- КЛИК ПО ТАБАМ ---
    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            if (!validateStep(index)) return;
            index = i;
            update();
        });
    });

    init();
}
