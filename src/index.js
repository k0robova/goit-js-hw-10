import axios from 'axios';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  divCatInfo: document.querySelector('.cat-info'),
};

function fetchBreeds() {
  const axios = require('axios').default;

  const BASE_URL = 'https://api.thecatapi.com/v1';
  axios.defaults.headers.common['x-api-key'] =
    'live_xVNUrPPCbr72SGM1xfY2I9jt6P2X90a5dkYi0kdB0lfRDIi92OSkoXxx91OBRxP9';

  // Виконання GET-запиту
  return axios.get(`${BASE_URL}/breeds`).then(response => {
    // if (!response.ok) {
    //   throw new Error(
    //     `Вимушена помилка статусу: ${response.status} | Причина: ${response.statusText}`
    //   );
    // }

    return response;
  });
}
let dataResult = [];
fetchBreeds()
  .then(data => {
    console.log('Отримані дані:', data.data);
    refs.select.innerHTML = createMarkup(data.data);
    dataResult = data.data;
  })
  .catch(error => {
    console.error('Помилка:', error);
  });

function createSelectElement(nameElement, idElement) {
  return `<option value=${nameElement} data-id=${idElement}>${nameElement}</option>;`;
}

function createMarkup(arr) {
  return arr.map(({ name, id }) => createSelectElement(name, id)).join('');
}

refs.select.addEventListener('change', function () {
  const selectedOption = refs.select.options[refs.select.selectedIndex];
  const selectedId = selectedOption.dataset.id;
  console.log('Ви вибрали опцію з id: ' + selectedId);

  const selectedElement = dataResult[refs.select.selectedIndex];
  console.log(selectedElement);

  fetchCatByBreed(selectedId)
    .then(data => {
      // !!! якщо запит був успішний

      // console.log('Отримані дані:', data.data);
      // refs.loader.style.display = 'block';

      refs.divCatInfo.innerHTML = createMarkupCatInfo(
        selectedElement,
        data.data[0].url
      );
    })
    .catch(error => {
      refs.error.style.display = 'block';
      console.error('Помилка:', error);
    });
});

function fetchCatByBreed(breedId) {
  const axios = require('axios').default;

  const BASE_URL = 'https://api.thecatapi.com/v1';
  axios.defaults.headers.common['x-api-key'] =
    'live_xVNUrPPCbr72SGM1xfY2I9jt6P2X90a5dkYi0kdB0lfRDIi92OSkoXxx91OBRxP9';
  refs.loader.style.display = 'block';
  refs.divCatInfo.style.display = 'none';

  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      // поки шукає
      refs.loader.style.display = 'none';
      refs.divCatInfo.style.display = 'block';
      return response;
    });
}

function createMarkupCatInfo(obj, imageSrc) {
  const { name, description, temperament } = obj;
  return `<img src="${imageSrc}" alt="${name}" width="500" heigth="400">
    <h2>${name}</h2>
    <p class="cat-description">${description}</p>
    <p class="cat-temperament">${temperament}</p>`;
}
