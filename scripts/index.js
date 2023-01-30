import Color from 'https://colorjs.io/dist/color.js';

// elements

let actualColor = new Color('white');

const colorCells = Array.from(
  document.querySelectorAll('td[draggable="true"]'),
);

colorCells.forEach((colorCell) => {
  colorCell.addEventListener('dragstart', dragstartHandler);
});

const target = document.querySelector('aside > div');

// events

target.addEventListener('dragenter', dragenterHandler);

target.addEventListener('dragover', (event) => {
  event.preventDefault();
});

target.addEventListener('drop', dropHandler);

// execution

function dragstartHandler(event) {
  event.dataTransfer.setData('text/plain', event.target.style.background);
}

function dragenterHandler(event) {
  event.preventDefault();
  target.classList.add('capture');
  const colorSelected = event.dataTransfer.getData('text/plain');
  event.target.style.borderColor = colorSelected;
}

function dropHandler(event) {
  event.preventDefault();
  const colorSelected = new Color(event.dataTransfer.getData('text/plain'));
  event.target.style.background = actualColor
    .mix(colorSelected, 0.5)
    .to('srgb')
    .toString({ inGamut: false });

  actualColor = actualColor.mix(colorSelected, 0.5);
}
