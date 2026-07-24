const dropdowns = document.querySelectorAll('.dropdown');

if (dropdowns.length) {
  const setOpen = (dropdown, isOpen) => {
    dropdown.classList.toggle('dropdown--open', isOpen);
    const trigger = dropdown.querySelector('.dropdown__trigger');

    if (trigger) {
      trigger.setAttribute('aria-expanded', String(isOpen));
    }
  };

  const closeAll = (except = null) => {
    dropdowns.forEach((dropdown) => {
      if (dropdown !== except) {
        setOpen(dropdown, false);
      }
    });
  };

  const updateTriggerLabel = (trigger, label) => {
    for (const node of trigger.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        node.textContent = ` ${label} `;
        return;
      }
    }
  };

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('.dropdown__trigger');

    if (!trigger) {
      return;
    }

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const willOpen = !dropdown.classList.contains('dropdown--open');
      closeAll(dropdown);
      setOpen(dropdown, willOpen);
    });

    dropdown.querySelectorAll('.dropdown__option').forEach((option) => {
      option.addEventListener('click', (event) => {
        event.stopPropagation();

        dropdown.querySelectorAll('.dropdown__option').forEach((item) => {
          item.classList.remove('dropdown__option--selected');
          item.setAttribute('aria-selected', 'false');
        });

        option.classList.add('dropdown__option--selected');
        option.setAttribute('aria-selected', 'true');
        updateTriggerLabel(trigger, option.textContent.trim());
        setOpen(dropdown, false);
      });
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) {
      closeAll();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAll();
    }
  });
}
