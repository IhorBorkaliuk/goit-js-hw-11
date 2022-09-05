import axios from "axios"

export const fetchImages = async (request, page) => {
    const API_KEY = '29728762-2a6b84e3d27132460ba58a3d0'
    return await fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${request}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`
  )
    .then(async response => {
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(response.status);
      }
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
};












// export async function fetchPictures(inputSearch, page) {
//     const API_KEY = '29728762-2a6b84e3d27132460ba58a3d0'

//     const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${inputSearch}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`)
//     if (!response.ok) {
//         throw new Error(response.status)
//     }
//     return await response.json()
// }