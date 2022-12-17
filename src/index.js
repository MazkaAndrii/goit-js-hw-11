/**
 *1. Обозначить форму поиска
  2. Добавить слушателя на кнопку Поиск
  3. Написать функцию отправки HTPP -запроса по клику (axios)
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
const searchValue = document.querySelector('.main-input');
const imageList = document.querySelector('.gallery');
const continueButton = document.querySelector('.load-more');

const API_KEY = '32012356-0368280beb1a1f5a21315c6c1';

const PageSize = 40;
let currentPage = 1;

searchBtnRef.addEventListener('click', e => {
  e.preventDefault();
  getImagesAxios({ query: searchValue.value });
});

async function getImagesAxios({ query }) {
  const urlAPI = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PageSize}&page=${currentPage}`;
  try {
    const resAxios = await axios.get(urlAPI).then(res => res.data.hits);
    if (resAxios.length === 0) {
      notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again'
      );
      return;
    }
    renderGallery(resAxios);
  } catch (error) {
    console.log(error);
  }
}

// рендер галлереи
function renderGallery(array) {
  imageList.innerHTML = '';
  const imgMarkup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <div class="photo-card">
          <a class="gallery-item" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-card__image"/>
    <div class="info">
      <p class="info-item">
        <b>Likes : ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div> </a>
  `;
      }
    )
    .join('');

  imageList.insertAdjacentHTML('beforeend', imgMarkup);
}

// кнопка load-more

continueButton.addEventListener('click', e => {
  e.preventDefault();
  getImagesAxios(e);
});
