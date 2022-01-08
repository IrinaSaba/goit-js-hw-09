import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const {
    elements: { delay: delays, step, amount },
  } = event.currentTarget;
  // console.log(+delays.value);
  let delay = +delays.value;
  // console.log(delay);
  for (let position = 1; amount.value >= position; position += 1) {
    // console.log(+delays.value);
    delay += +step.value;
    // console.log(delay);
    function createPromise(position, delay) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const shouldResolve = Math.random() > 0.3;
          // console.log(shouldResolve);

          if (shouldResolve) {
            resolve({ position, delay }); // Fulfill
          }
          reject({ position, delay }); // Reject
        }, delay);
      });
    }

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
