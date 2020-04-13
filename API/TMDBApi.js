const API_TOKEN = "ddfbcab6dd5d1a85a495c1d42d539096"

export function getFilmFromApi(text,page){
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${text}&page=${page}&external_source=imdb_id `
    return fetch(url)
    .then((response)=>response.json())
    .catch((error) =>console.error(error))
}

export function getImageFromApi (name) {
    return 'https://image.tmdb.org/t/p/w300' + name
  }
  export function getFilmFromId (id) {
    const url =  'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr '
    return fetch(url)
    .then((response)=>response.json())
    .catch((error) =>console.error(error))
  }