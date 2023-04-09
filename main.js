import ColorThief from 'color-thief';

const video = document.getElementById('video');
const colorPalette = document.getElementById('color-palette');

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    video.addEventListener('loadeddata', () => {
      update();
    });
  })
  .catch((err) => {
    console.error('Error accessing camera:', err);
  });

function update() {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = video.videoWidth;
  tempCanvas.height = video.videoHeight;
  const tempCtx = tempCanvas.getContext('2d');

  tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

  const colorThief = new ColorThief();
  const palette = colorThief.getPalette(tempCanvas, 5);

  colorPalette.innerHTML = '';

  for (const color of palette) {
    const colorElement = document.createElement('div');
    colorElement.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    colorElement.className = 'color-box';
    colorPalette.appendChild(colorElement);
  }

  requestAnimationFrame(update);
}
