import axios from 'axios';

export const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  divCatInfo: document.querySelector('.cat-info'),
};

export function fetchCatByBreed(breedId) {
  const axios = require('axios').default;

  const BASE_URL = 'https://api.thecatapi.com/v1';
  axios.defaults.headers.common['x-api-key'] =
    'live_xVNUrPPCbr72SGM1xfY2I9jt6P2X90a5dkYi0kdB0lfRDIi92OSkoXxx91OBRxP9';
  refs.error.style.display = 'none';
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

export function fetchBreeds() {
  const axios = require('axios').default;

  const BASE_URL = 'https://api.thecatapi.com/v1';
  axios.defaults.headers.common['x-api-key'] =
    'live_xVNUrPPCbr72SGM1xfY2I9jt6P2X90a5dkYi0kdB0lfRDIi92OSkoXxx91OBRxP9';

  // Виконання GET-запиту
  return axios.get(`${BASE_URL}/breeds`).then(response => {
    return response;
  });
}
