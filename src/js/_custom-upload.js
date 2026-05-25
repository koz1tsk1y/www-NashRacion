export function customUploadInit() {
  const wrappers = document.querySelectorAll('.custom-upload');
  if (!wrappers.length) return;

  wrappers.forEach(wrapper => {
    const input = wrapper.querySelector('input[type="file"]');
    const btn = wrapper.querySelector('.custom-upload__btn');
    const label = wrapper.querySelector('.custom-upload__label');
    const del = wrapper.querySelector('.custom-upload__del');

    // Открыть диалог выбора файла
    btn.addEventListener('click', () => input.click());

    // При выборе файла
    input.addEventListener('change', () => {
      if (input.files.length > 0) {
        label.textContent = input.files[0].name;
      }
    });

    // Удалить файл
    del.addEventListener('click', () => {
      input.value = '';
      label.textContent = '';
    });
  });
}
