import * as axios from 'axios'

const apiKey = 'b3ce68707f91bff40f7a33979b7852ef'
const baseURL = 'https://api.themoviedb.org/3/'



export const getMovieDiscover = (page=1, language = 'en-US', { sort_by, asc, year, vote_average, with_genres }) => {
    const sort = sort_by + (asc ? '.asc' : '.desc')
    const release = year.trim()
    const rating = vote_average.trim()
    const genres =  with_genres.join(',')
    return axios.get(`${baseURL}discover/movie?api_key=${apiKey}`,{
        params: {
            page,
            language,
            year: release,
            vote_average: rating,
            with_genres: genres,
            sort_by: sort,
        }
    }).then(res => res)
}
export const getImagesMovie = (movieId) =>{
    return axios.get(`${baseURL}movie/${movieId}/images?api_key=${apiKey}`).then(res => res)
}

export const getMovie = (movieId, language = 'en-US') => {
    return axios.get(`${baseURL}movie/${movieId}?api_key=${apiKey}&language=${language}`).then(res => res)
}

export const getSimilarMovie = (movieId, language = 'en-US') => {
    return axios.get(`${baseURL}movie/${movieId}/similar?api_key=${apiKey}&language=${language}`).then(res => res)

}

export const getSearcMovies = (query = '', page = 1, language = 'en-US') => {
    return axios.get(`${baseURL}search/movie?api_key=${apiKey}&language=${language}&query=${query}&page=${page}`)
        .then(res => res)
}

export const getGenresList = (language = 'en-US') => {
    return axios.get(`${baseURL}genre/movie/list?api_key=${apiKey}&language=${language}`)
        .then(res => res)
}