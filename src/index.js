/**
 *1. Обозначить форму поиска
  2. Добавить слушателя на сабмит
  3. Написать функцию отправки HTPP -запроса по сабмиту (axios)
  API key: 32012356-0368280beb1a1f5a21315c6c1
  4. Уведомления notiflix 
  Если бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло. В таком случае показывай 
  уведомление с текстом "Sorry, there are no images matching your search query. Please try again."
  5. Написать функцию рендера разметки
  6. Пагинация + кнопка следующего запроса

 */

import axios from 'axios';
import notiflix from 'notiflix';

const searchBtnRef = document.querySelector('.search-button');
const searchValue = document.querySelector('#search-form');
const imageList = document.querySelector('.gallery');

searchBtnRef.addEventListener('click', e => {
  getImagesAxios({ query: searchValue.value });
});

const API_KEY = '32012356-0368280beb1a1f5a21315c6c1';
const PageSize = 40;

let currentPage = 1;
let totalPages = undefined;

function getImagesAxios(query) {
  const urlAPI = `https://pixabay.com/api/?Key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PageSize}&page=${currentPage}`;

  return axios
    .get(urlAPI)
    .then(res => res.data)
    .then(({ articles, totalResults }) => {
      return { articles, totalResults };
    })
    .catch(error => console.log(error));
}
