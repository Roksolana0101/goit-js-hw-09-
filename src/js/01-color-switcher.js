function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

refs.start.addEventListener('click', onStart);
refs.stop.addEventListener('click', onStop);

let Id;

function onStart() {
  refs.start.disabled = true;
  refs.stop.disabled = false;

  Id = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
    refs.stop.disabled = true;
  refs.start.disabled = false;

  clearInterval(Id);
}
