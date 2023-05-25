import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const inputForm = document.querySelector('#datetime-picker');

const dayS = document.querySelector('span[data-days]');
const hourS = document.querySelector('span[data-hours]');
const minuteS = document.querySelector('span[data-minutes]');
const secondS = document.querySelector('span[data-seconds]');

let selectedDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

function convertMs(ms) {
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

flatpickr(inputForm, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
startBtn.addEventListener('click', () => {
  const x = setInterval(() => {
    const distance = selectedDate.getTime() - new Date().getTime();
    if (distance < 0) {
      clearInterval(x);
    } else {
      const { days, hours, minutes, seconds } = convertMs(distance);
      dayS.textContent = addLeadingZero(days, 2);
      hourS.textContent = addLeadingZero(hours, 2);
      minuteS.textContent = addLeadingZero(minutes, 2);
      secondS.textContent = addLeadingZero(seconds, 2);
    }
  }, 1000);
});
