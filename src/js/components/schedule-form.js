const form = document.querySelector('.schedule-form');

if (form) {
  form.querySelectorAll('.dropdown--field').forEach((dropdown) => {
    const hidden = dropdown.parentElement?.querySelector('[data-schedule-select]');

    if (!hidden) {
      return;
    }

    dropdown.addEventListener('dropdown:change', (event) => {
      const { option } = event.detail;

      hidden.value = option?.textContent.trim() || event.detail.value;
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}
