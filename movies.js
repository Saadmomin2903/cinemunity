// movies.js

export let currentPage = 1;
const moviesPerPage = 20;
let allMovies = [];

export async function displayMovies(fetchAllMovies) {
    allMovies = await fetchAllMovies();
    renderMovies();
}

function renderMovies() {
    const moviesListContainer = document.getElementById("movies-list");
    const pageInfo = document.getElementById("page-info");
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");

    moviesListContainer.innerHTML = "";

    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const moviesForCurrentPage = allMovies.slice(startIndex, endIndex);

    pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(allMovies.length / moviesPerPage)}`;

    moviesForCurrentPage.forEach(movie => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");

        const titleElement = document.createElement("h3");
        titleElement.textContent = movie.title;

        // Add event listener to title element to open a new page with movie title
        titleElement.addEventListener("click", () => {
            window.open(`movie-details.html?title=${encodeURIComponent(movie.title)}`, "_blank");
        });

        movieItem.appendChild(titleElement);

        moviesListContainer.appendChild(movieItem);
    });

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = endIndex >= allMovies.length;
}


document.getElementById("prev-page").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderMovies();
    }
});

document.getElementById("next-page").addEventListener("click", () => {
    if ((currentPage * moviesPerPage) < allMovies.length) {
        currentPage++;
        renderMovies();
    }
});
