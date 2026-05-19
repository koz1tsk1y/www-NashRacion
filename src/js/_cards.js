export function cardsInit() {
    const blocks = document.querySelectorAll('.cards');
    if (!blocks.length) return;

    blocks.forEach(block => {
        const tabs = block.querySelectorAll('.cards__tab');
        const items = block.querySelectorAll('.cards__item');

        // Если табов нет — просто показываем все карточки как есть
        if (!tabs.length) return;

        // --- ИНИЦИАЛИЗАЦИЯ ---
        const init = () => {
            // Сбрасываем активные табы
            tabs.forEach(t => t.classList.remove('cards__tab--active'));

            // Скрываем все карточки
            items.forEach(i => i.classList.add('cards__item--hidden'));

            // Активируем первый таб
            const firstTab = tabs[0];
            firstTab.classList.add('cards__tab--active');

            // Показываем карточки первой группы
            showGroup(firstTab.dataset.cardsGroup);
        };

        // --- ПОКАЗ ГРУППЫ ---
        const showGroup = group => {
            items.forEach(i => {
                i.classList.toggle(
                    'cards__item--hidden',
                    i.dataset.cardsGroup !== group
                );
            });
        };

        // --- ОБРАБОТЧИКИ ---
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('cards__tab--active'));
                tab.classList.add('cards__tab--active');
                showGroup(tab.dataset.cardsGroup);
            });
        });

        // Запускаем стартовую инициализацию
        init();
    });
}
