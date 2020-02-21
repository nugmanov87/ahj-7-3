import LoadImg from './LoadImg.js';

const blockImg = document.getElementsByClassName('block-img')[0];
const elError = document.getElementById('error-url');

const fieldSelectFile = document.querySelector('#field-select');
const dropFile = document.querySelector('#drop-file');

const loadImg = new LoadImg(blockImg, elError);
const server = 'https://ahj-7-3-3.herokuapp.com/';

function loadFile(files) {
  for (const item of files) {
    const formData = new FormData();
    formData.append('file', item);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${server}`);

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const urlImg = `${server}/${xhr.response}`;
        loadImg.createImg('nameImg', urlImg);
      }
    });
    xhr.send(formData);
  }
}

dropFile.addEventListener('click', () => {
  fieldSelectFile.value = null;
  fieldSelectFile.dispatchEvent(new MouseEvent('click'));
});

dropFile.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropFile.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  loadFile(files);
});

fieldSelectFile.addEventListener('input', (e) => {
  const files = Array.from(e.currentTarget.files);
  loadFile(files);
});

blockImg.addEventListener('click', (e) => {
  if (e.target.className === 'close') {
    const itemElemnt = e.target.closest('.item-img-div');
    const params = new URLSearchParams();
    params.append('file', itemElemnt.querySelector('.item-img').src);

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${server}/?${params}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      }

      console.log(xhr.responseText);
    });
    xhr.send();

    blockImg.removeChild(itemElemnt);
  }
});
