import { fetchPictures } from "./js/fetchPictures";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import InfiniteScroll from "infinite-scroll";


const input = document.querySelector('[name="searchQuery"]')
const searchBtn = document.querySelector('[type="submit"]')
const gallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')

let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

// let infScroll = new InfiniteScroll('gallery', {
//   path: 'https://pixabay.com/api/?key=${API_KEY}&q=${request}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}',
//   append: '.photo-card',
//   domParseResponse: false,
// })


let page = 1

searchBtn.addEventListener('click', onSearch)
loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch(evt) {
  evt.preventDefault();
  clear()
    const inputSearch = input.value;

    if (!inputSearch) {
        clear()
        return
  }
  fetchPictures(inputSearch, page)
    .then(data => {
      if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
                    );
    }
    else {
    createImages(data.hits)
    Notiflix.Notify.success(
      `Hooray! We found ${data.totalHits} images.`
    )
            loadMoreBtn.style.display = 'block'
                  gallerySimpleLightbox.refresh()
            }
    })
}


function onLoadMore() {
  page += 1;
  const inputSearch = input.value;
  loadMoreBtn.style.display = 'none'
    fetchPictures(inputSearch, page)
      .then(data => {
        const pagesCounter = Math.ceil(data.totalHits / 40)
      createImages(data.hits)
      Notiflix.Notify.success(
      `Hooray! We found ${data.totalHits} images.`);
        loadMoreBtn.style.display = 'block'
        
        if (page >= pagesCounter) {
    Notiflix.Notify.failure(
      'We`re sorry, but you`ve reached the end of search results.'
      );
        loadMoreBtn.style.display = 'none'
    }
        })  
} 


function createImages(images) {
    const markUpImages = images
        .map(image => {
        return `
<div class="photo-card">
<a href="${image.largeImageURL}" class="item__link">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${image.downloads}</b>
    </p>
  </div>
</div>
`
        }).join('')
  gallery.innerHTML += markUpImages
}





function clear() {
  gallery.innerHTML = ''
  page = 1
  loadMoreBtn.style.display = 'none'
}