const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  bodyColor: document.querySelector('body'),
};
// console.log(refs.startBtn);
let timerId = null;

const changeBodyColor = function () {
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    refs.bodyColor.style.backgroundColor = color;
  }, 1000);
};

refs.startBtn.addEventListener('click', changeBodyColor);

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
