

// index.js
export async  function fetchData() {
  const searchQuery = document.querySelector('.searchbar').value;
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=aab044a8c8a395ff28b777d2c0f890b1&query=${searchQuery}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Open the search-results.html page in the same window or tab
      const firstMovieId = data.results[0].id;
      const recommendationsUrl = `https://api.themoviedb.org/3/movie/${firstMovieId}/recommendations?api_key=aab044a8c8a395ff28b777d2c0f890b1`;

      const recommendationsResponse = await fetch(recommendationsUrl);

      if (!recommendationsResponse.ok) {
        throw new Error(`HTTP error! status: ${recommendationsResponse.status}`);
      }

      const recommendationsData = await recommendationsResponse.json();

      // Pass the search results and recommendations data to the new page
      const searchResultsUrl = `search-results.html?query=${searchQuery}&recommendations=${JSON.stringify(recommendationsData.results)}`;
      window.location.href = searchResultsUrl;
    } else {
      console.log('No results found.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

/// index.js
async function fetchAllMovies(maxPages) {
  let page = 1;
  const allMovies = [];

  while (true) {
    const res = await fetch('https://saadmomin2903--all.modal.run', {
      method: 'POST',
      // Assuming you need to pass some data in the body of the POST request
      // body: JSON.stringify({ page }), // Uncomment and modify accordingly
    });

    const data = await res.json();
    console.log("Data:", data); // Log the response data

    allMovies.push(
      ...data.map(movie => ({
        title: movie.title,
        posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      }))
    );

    if (data.page === data.total_pages || page >= maxPages) {
      break;
    }
    page++;
  }

  return allMovies;
}

export { fetchAllMovies };
document.getElementById("search-button").addEventListener("click", function() {
  const movieName = document.getElementById("search-input").value.trim(); // Get the value of the input field and trim any whitespace
  if (movieName !== "") { // Check if the input is not empty
      // Redirect to the search results page with the movie name as a query parameter
      window.location.href = `search-results.html?query=${encodeURIComponent(movieName)}`;
  }
});

