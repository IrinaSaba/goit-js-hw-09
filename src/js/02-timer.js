import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputControl: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysCounter: document.querySelector('[data-days]'),
  hoursCounter: document.querySelector('[data-hours]'),
  minetsCounter: document.querySelector('[data-minutes]'),
  secondsCounter: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (this.selectedDates[0].getTime() <= new Date().getTime()) {
      return alert('Please choose a date in the future');
    }
    refs.startBtn.removeAttribute('disabled');
    refs.startBtn.style.backgroundColor = 'skyblue';
  },
};
// console.log(new Date().getTime());
flatpickr('#datetime-picker', options);

const shoppingTimer = () => {};

refs.startBtn.addEventListener('click', shoppingTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
