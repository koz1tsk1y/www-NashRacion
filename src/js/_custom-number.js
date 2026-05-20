export function customNumberInit() {
    const blocks = document.querySelectorAll('.custom-number');
    if (!blocks.length) return;

    blocks.forEach(block => {
        const input = block.querySelector('.custom-number__input');
        const btnMinus = block.querySelector('.custom-number__btn-minus');
        const btnPlus = block.querySelector('.custom-number__btn-plus');

        const min = Number(block.dataset.numberMin) || 0;

        // --- ИНИЦИАЛИЗАЦИЯ ---
        let value = Number(input.value);
        if (isNaN(value) || value < min) value = min;
        input.value = value;

        // --- ФУНКЦИЯ ОБНОВЛЕНИЯ ---
        const update = newValue => {
            if (newValue < min) newValue = min;
            input.value = newValue;
        };

        // --- СОБЫТИЯ ---
        btnMinus.addEventListener('click', () => {
            update(Number(input.value) - 1);
        });

        btnPlus.addEventListener('click', () => {
            update(Number(input.value) + 1);
        });

        // Ограничиваем ручной ввод
        input.addEventListener('input', () => {
            let v = Number(input.value.replace(/\D+/g, ''));
            if (isNaN(v)) v = min;
            update(v);
        });
    });
}
