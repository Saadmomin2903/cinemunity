//search-result.js

const urlParams = new URLSearchParams(window.location.search);
const movieTitle = urlParams.get('query');

// Construct URL for TMDb API search endpoint
const apiKey = "aab044a8c8a395ff28b777d2c0f890b1";
const baseUrl = "https://api.themoviedb.org/3";
const searchEndpoint = "/search/movie";
const language = "en-US";
const includeAdult = false;
const page = 1;
const searchUrl = `${baseUrl}${searchEndpoint}?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}&include_adult=${includeAdult}&language=${language}&page=${page}`;

// Fetch search results from TMDb API
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWIwNDRhOGM4YTM5NWZmMjhiNzc3ZDJjMGY4OTBiMSIsInN1YiI6IjY2MzIyNzJhYzM5MjY2MDEyOTZkMGUwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1I-t6H1Iy8BOUZ_14U-uC-QeZCsG0JOxB8l6axB2yXQ'
    }
};

fetch(searchUrl, options)
    .then(response => response.json())
    .then(data => {
        // Display search results
        const searchResultsContainer = document.getElementById('search-results');
        if (data.results && data.results.length > 0) {
            data.results.forEach(movie => {
                const movieTitle = movie.title;
                const moviePoster = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'No poster available';
                const movieOverview = movie.overview || 'No overview available';
                const movieElement = document.createElement('div');
                movieElement.innerHTML = `
                    <h2>${movieTitle}</h2>
                    <img src="${moviePoster}" alt="${movieTitle} Poster">
                    <p>${movieOverview}</p>
                `;
                searchResultsContainer.appendChild(movieElement);
            });
        } else {
            searchResultsContainer.innerHTML = '<p>No results found</p>';
        }
    })
    .catch(err => console.error(err));