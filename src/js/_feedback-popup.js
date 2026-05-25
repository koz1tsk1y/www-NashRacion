export function feedbackPopupInit() {
  const popup = document.querySelector('.feedback-popup');
  if (!popup) return;

  const body = popup.querySelector('.feedback-popup__body');

  document.addEventListener('click', (e) => {
    const openBtn = e.target.closest('[data-feedback]');
    const closeBtn = e.target.closest('.feedback-popup__close');

    // Открыть
    if (openBtn) {
      popup.classList.add('feedback-popup--active');
      return;
    }

    // Закрыть по кнопке
    if (closeBtn) {
      popup.classList.remove('feedback-popup--active');
      return;
    }

    // Закрыть по клику вне body
    if (popup.classList.contains('feedback-popup--active') && !e.target.closest('.feedback-popup__body')) {
      popup.classList.remove('feedback-popup--active');
    }
  });

  // Закрытие по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('feedback-popup--active')) {
      popup.classList.remove('feedback-popup--active');
    }
  });
}
