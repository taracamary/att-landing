const DESKTOP_MQ = '(min-width: 1024px)';

const header = document.querySelector('.header');
const burger = document.querySelector('.header__burger');
const mobileNav = document.querySelector('#mobile-nav');

if (header && burger && mobileNav) {
  const closeDropdowns = (root) => {
    root.querySelectorAll('.dropdown--open').forEach((dropdown) => {
      dropdown.classList.remove('dropdown--open');
      const trigger = dropdown.querySelector('.dropdown__trigger');

      if (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  };

  const getBurgerLabel = (isOpen) => {
    const isRu = document.documentElement.getAttribute('lang') !== 'en';

    if (isOpen) {
      return isRu ? burger.dataset.ariaLabelExpandedRu : burger.dataset.ariaLabelExpandedEn;
    }

    return isRu ? burger.dataset.ariaLabelRu : burger.dataset.ariaLabelEn;
  };

  const setOpen = (isOpen) => {
    header.classList.toggle('header--expanded', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', getBurgerLabel(isOpen) || (isOpen ? 'Закрыть меню' : 'Открыть меню'));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
      closeDropdowns(header.querySelector('.header__controls') || header);
    } else {
      closeDropdowns(mobileNav);
    }
  };

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') !== 'true';
    setOpen(isOpen);
  });

  window.addEventListener('header:close-mobile-nav', () => {
    if (burger.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
    }
  });

  window.addEventListener('att:languagechange', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-label', getBurgerLabel(isOpen) || (isOpen ? 'Закрыть меню' : 'Открыть меню'));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
      return;
    }

    if (burger.getAttribute('aria-expanded') !== 'true') {
      return;
    }

    setOpen(false);
    burger.focus();
  });

  const desktopMq = window.matchMedia(DESKTOP_MQ);

  desktopMq.addEventListener('change', (event) => {
    if (event.matches) {
      setOpen(false);
    }
  });

  if (desktopMq.matches) {
    setOpen(false);
  }
}
