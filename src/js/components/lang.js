const DEFAULT_LANG = 'ru';
const SUPPORTED_LANGS = ['ru', 'en'];

export const initLanguage = () => {
  const savedLang = localStorage.getItem('lang');
  const currentLang = SUPPORTED_LANGS.includes(savedLang) ? savedLang : DEFAULT_LANG;

  document.documentElement.setAttribute('lang', currentLang);
};

const getLang = () => document.documentElement.getAttribute('lang') || DEFAULT_LANG;

const localizeAttributes = () => {
  const isRu = getLang() === 'ru';

  document.querySelectorAll('[data-aria-label-en]').forEach((el) => {
    const value = isRu ? el.dataset.ariaLabelRu : el.dataset.ariaLabelEn;

    if (value) {
      el.setAttribute('aria-label', value);
    }
  });

  document.querySelectorAll('[data-alt-en]').forEach((el) => {
    const value = isRu ? el.dataset.altRu : el.dataset.altEn;

    if (value != null) {
      el.setAttribute('alt', value);
    }
  });

  document.querySelectorAll('[data-placeholder-en]').forEach((el) => {
    const value = isRu ? el.dataset.placeholderRu : el.dataset.placeholderEn;

    if (value != null) {
      el.setAttribute('placeholder', value);
    }
  });

  document.querySelectorAll('.review-card__toggle').forEach((toggle) => {
    const expand = isRu ? toggle.dataset.labelExpandRu : toggle.dataset.labelExpandEn;
    const collapse = isRu
      ? toggle.dataset.labelCollapseRu
      : toggle.dataset.labelCollapseEn;

    if (expand) {
      toggle.dataset.labelExpand = expand;
    }

    if (collapse) {
      toggle.dataset.labelCollapse = collapse;
    }

    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    const nextLabel = isExpanded ? collapse : expand;

    if (nextLabel) {
      toggle.textContent = nextLabel;
    }
  });
};

const syncLanguageDropdown = () => {
  const dropdown = document.querySelector('.dropdown--language');

  if (!dropdown) {
    return;
  }

  const currentLang = getLang();

  dropdown.querySelectorAll('.dropdown__option').forEach((option) => {
    const isSelected = option.dataset.value === currentLang;

    option.classList.toggle('dropdown__option--selected', isSelected);
    option.setAttribute('aria-selected', String(isSelected));
  });
};

const setLanguage = (lang) => {
  if (!SUPPORTED_LANGS.includes(lang) || lang === getLang()) {
    return;
  }

  const apply = () => {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
    syncLanguageDropdown();
    localizeAttributes();
    window.dispatchEvent(new Event('att:languagechange'));
  };

  apply();
};

export const setupLanguage = () => {
  localizeAttributes();
  syncLanguageDropdown();

  const dropdown = document.querySelector('.dropdown--language');

  if (!dropdown) {
    return;
  }

  dropdown.addEventListener('dropdown:change', (event) => {
    const { value } = event.detail;

    if (SUPPORTED_LANGS.includes(value)) {
      setLanguage(value);
    }
  });

  window.addEventListener('att:languagechange', localizeAttributes);
};

initLanguage();
