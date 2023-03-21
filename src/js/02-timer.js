// all modules
import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  timer: document.querySelector('#datetime-picker'),
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.button.disabled = true;
let selectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
      Notiflix.Notify.warning('Please choose a date in the future!');
      console.log(options);
    } else {
      refs.button.disabled = false;
    }
  },
};
flatpickr(refs.timer, options);

refs.button.addEventListener('click', onClick);

function onClick(e) {
  refs.button.disabled = true;

  const onTimerStart = setInterval(() => {
    const time = Date.now();
    const deltaTime = selectedDate.getTime() - time;
    console.log(deltaTime)

    if (deltaTime < 1000) {
      clearInterval(onTimerStart);
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    refs.days.textContent = days;
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}