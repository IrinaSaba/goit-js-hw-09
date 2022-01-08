import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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
    // console.log(this.selectedDates[0] - new Date());
    if (selectedDates[0].getTime() <= new Date().getTime()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.removeAttribute('disabled');
    refs.startBtn.style.backgroundColor = 'skyblue';
    refs.startBtn.addEventListener('click', event => {
      const timerId = setInterval(() => {
        if (selectedDates[0] - new Date() >= 0) {
          updateTimer(convertMs(this.selectedDates[0] - new Date()));
        }
      }, 1000);
    });
  },
};

// console.log(new Date().getTime());
flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysCounter.textContent = `${days}`;
  refs.hoursCounter.textContent = `${hours}`;
  refs.minetsCounter.textContent = `${minutes}`;
  refs.secondsCounter.textContent = `${seconds}`;
}
// options.updateTimer();
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
