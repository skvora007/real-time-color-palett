import Vibrant from 'node-vibrant';

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

async function update() {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = video.videoWidth;
  tempCanvas.height = video.videoHeight;
  const tempCtx = tempCanvas.getContext('2d');

  tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

  const vibrant = new Vibrant(tempCanvas);
  const palette = await vibrant.getPalette();

  colorPalette.innerHTML = '';

  for (const colorName in palette) {
    const color = palette[colorName];
    if (color) {
      const colorElement = document.createElement('div');
      colorElement.style.backgroundColor = `rgb(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]})`;
      colorElement.className = 'color-box';
      colorPalette.appendChild(colorElement);
    }
  }

  requestAnimationFrame(update);
}
