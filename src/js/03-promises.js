import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelectorAll('input')[0],
  step: document.querySelectorAll('input')[1],
  amount: document.querySelectorAll('input')[2],
  submit: document.querySelector('button'),
};

refs.submit.addEventListener('click', createPromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      // console.log(shouldResolve);

      if (shouldResolve) {
        resolve(` Fulfilled promise ${position} in ${delay}ms`); // Fulfill
      }
      reject(` Rejected promise ${position} in ${delay}ms`); // Reject
    }, '${delay}');
  });
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
