import AirDatepicker from 'air-datepicker';
import localeRuMod from 'air-datepicker/locale/ru';
import localeEnMod from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';

const localeRu = localeRuMod.default ?? localeRuMod;
const localeEn = localeEnMod.default ?? localeEnMod;

const dateFromInput = document.querySelector('#schedule-date-from');
const dateToInput = document.querySelector('#schedule-date-to');

if (dateFromInput && dateToInput) {
  const getLocale = () =>
    document.documentElement.getAttribute('lang') === 'en' ? localeEn : localeRu;

  const sharedOptions = {
    locale: getLocale(),
    autoClose: true,
    dateFormat: 'dd.MM.yyyy',
    buttons: ['clear'],
  };

  let datepickerTo;

  const datepickerFrom = new AirDatepicker(dateFromInput, {
    ...sharedOptions,
    onSelect({ date }) {
      datepickerTo.update({
        minDate: date || false,
      });
    },
  });

  datepickerTo = new AirDatepicker(dateToInput, {
    ...sharedOptions,
    onSelect({ date }) {
      datepickerFrom.update({
        maxDate: date || false,
      });
    },
  });

  const bindIcon = (input, picker) => {
    const control = input.closest('.schedule-form__control--date');
    const trigger = control?.querySelector('.schedule-form__icon--calendar');

    if (!trigger) {
      return;
    }

    trigger.addEventListener('click', () => {
      picker.show();
    });
  };

  bindIcon(dateFromInput, datepickerFrom);
  bindIcon(dateToInput, datepickerTo);

  const syncLocale = () => {
    const locale = getLocale();

    datepickerFrom.update({ locale, dateFormat: 'dd.MM.yyyy' });
    datepickerTo.update({ locale, dateFormat: 'dd.MM.yyyy' });
  };

  window.addEventListener('att:languagechange', syncLocale);
}
