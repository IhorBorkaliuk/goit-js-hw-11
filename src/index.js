import { fetchPictures } from "./js/fetchPictures";
import Notiflix from 'notiflix';


const form = document.querySelector('#search-form')
console.log(form)
const input = document.querySelector('[name="searchQuery"]')
console.log(input)
const searchBtn = document.querySelector('[type="submit"]')
console.log(searchBtn)
const gallery = document.querySelector('.gallery')

let page = 1

searchBtn.addEventListener('click', onSearch)

function onSearch(evt) {
    evt.preventDefault();
    const inputSearch = input.value;

    if (inputSearch !== '') {
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
          `Hooray! We found ${foundData.totalHits} images.`
        );
        }
        })

    }
}


function createImages(images) {
    const markUpImages = images
        .map(image => {
        return `
<div class="photo-card">

  <img src="image.${webformatURL}" alt="image.${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${images.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${images.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${images.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${images.downloads}</b>
    </p>
  </div>
</div>
`
        }).join('')
    gallery.innerHTML = markUpImages
}





function clear() {
    gallery.innerHTML = ''
    page = 1
}