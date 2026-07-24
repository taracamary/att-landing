import AirDatepicker from 'air-datepicker';
import localeRu from 'air-datepicker/locale/ru';
import 'air-datepicker/air-datepicker.css';

const dateFromInput = document.querySelector('#schedule-date-from');
const dateToInput = document.querySelector('#schedule-date-to');

if (dateFromInput && dateToInput) {
  const sharedOptions = {
    locale: localeRu,
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
}
