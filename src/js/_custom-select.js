export function customSelectInit() {
    const selects = document.querySelectorAll('.custom-select');
    if (!selects.length) return;

    selects.forEach(select => {
        const hiddenInput = select.querySelector('input[type="hidden"]');
        const label = select.querySelector('.custom-select__label');
        const items = select.querySelectorAll('.custom-select__item');

        // --- ПОЛНАЯ СТАРТОВАЯ ИНИЦИАЛИЗАЦИЯ ---
        const init = () => {
            // 1. Убираем active со всего внутри селекта
            items.forEach(i => i.classList.remove('custom-select__item--active'));
            select.classList.remove('custom-select--active');

            // 2. Активируем первый пункт
            const firstItem = items[0];
            firstItem.classList.add('custom-select__item--active');

            // 3. Обновляем label и hidden input
            label.textContent = firstItem.textContent;
            hiddenInput.value = firstItem.dataset.customSelectValue;
        };

        // --- ОТКРЫТИЕ / ЗАКРЫТИЕ ---
        label.addEventListener('click', () => {
            select.classList.toggle('custom-select--active');
        });

        // --- ВЫБОР ПУНКТА ---
        items.forEach(item => {
            item.addEventListener('click', () => {
                items.forEach(i => i.classList.remove('custom-select__item--active'));
                item.classList.add('custom-select__item--active');

                label.textContent = item.textContent;
                hiddenInput.value = item.dataset.customSelectValue;

                select.classList.remove('custom-select--active');
            });
        });

        // --- КЛИК ВНЕ СЕЛЕКТА ---
        document.addEventListener('click', e => {
            if (!select.contains(e.target)) {
                select.classList.remove('custom-select--active');
            }
        });

        // Запускаем инициализацию
        init();
    });
}
