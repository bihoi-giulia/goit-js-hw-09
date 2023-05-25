import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(position);
      }, delay);
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(position);
      }, delay);
    });
  }
}

const formular = document.querySelector('.form');
const delay = document.getElementsByName('delay')[0];
const step = document.getElementsByName('step')[0];
const amount = document.getElementsByName('amount')[0];

formular.addEventListener('submit', e => {
  e.preventDefault();
  const delayVal = parseInt(delay.value);
  const stepVal = parseInt(step.value);
  const amountVal = parseInt(amount.value);
  for (let i = 0; i < amountVal; i++) {
    let currentDelay = delayVal + stepVal * (i - 1);
    createPromise(i, currentDelay)
      .then(() => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${i} in ${currentDelay} ms`
        );
      })
      .catch(() => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${i} in ${currentDelay} ms`
        );
      });
    currentDelay += stepVal;
  }
});
