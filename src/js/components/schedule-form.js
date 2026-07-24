const form = document.querySelector('.schedule-form');

if (form) {
  form.querySelectorAll('.dropdown--field').forEach((dropdown) => {
    const hidden = dropdown.parentElement?.querySelector('[data-schedule-select]');

    if (!hidden) {
      return;
    }

    dropdown.querySelectorAll('.dropdown__option').forEach((option) => {
      option.addEventListener('click', () => {
        hidden.value = option.textContent.trim();
      });
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}
