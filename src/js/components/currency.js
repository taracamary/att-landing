const DEFAULT_CURRENCY = 'BYN';
const SUPPORTED_CURRENCIES = ['BYN', 'RUB', 'EUR'];

export const initCurrency = () => {
  const saved = localStorage.getItem('currency');
  const currency = SUPPORTED_CURRENCIES.includes(saved) ? saved : DEFAULT_CURRENCY;

  document.documentElement.dataset.currency = currency;
};

const getCurrency = () =>
  document.documentElement.dataset.currency || DEFAULT_CURRENCY;

const syncCurrencyDropdown = () => {
  const dropdown = document.querySelector('.dropdown--currency');

  if (!dropdown) {
    return;
  }

  const currency = getCurrency();

  dropdown.querySelectorAll('.dropdown__option').forEach((option) => {
    const isSelected = option.dataset.value === currency;

    option.classList.toggle('dropdown__option--selected', isSelected);
    option.setAttribute('aria-selected', String(isSelected));
  });
};

const setCurrency = (currency) => {
  if (!SUPPORTED_CURRENCIES.includes(currency) || currency === getCurrency()) {
    return;
  }

  document.documentElement.dataset.currency = currency;
  localStorage.setItem('currency', currency);
  syncCurrencyDropdown();
};

export const setupCurrency = () => {
  syncCurrencyDropdown();

  const dropdown = document.querySelector('.dropdown--currency');

  if (!dropdown) {
    return;
  }

  dropdown.addEventListener('dropdown:change', (event) => {
    const { value } = event.detail;

    if (SUPPORTED_CURRENCIES.includes(value)) {
      setCurrency(value);
    }
  });
};

initCurrency();
