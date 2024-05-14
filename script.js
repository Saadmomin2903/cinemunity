//script.js
function trending() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWIwNDRhOGM4YTM5NWZmMjhiNzc3ZDJjMGY4OTBiMSIsInN1YiI6IjY2MzIyNzJhYzM5MjY2MDEyOTZkMGUwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1I-t6H1Iy8BOUZ_14U-uC-QeZCsG0JOxB8l6axB2yXQ'
      }
    };
  
    fetch('https://api.themoviedb.org/3/trending/all/week?language=en-US', options)
      .then(response => response.json())
      .then(response => {
        const trendingDiv = document.getElementById('trending');
        response.results.forEach(result => {
          const element = document.createElement('div');
          element.classList.add('movie');
          element.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200/${result.poster_path}" alt="${result.title || result.name}">
            <p>${result.title || result.name}</p>
          `;
          trendingDiv.appendChild(element);
        });
      })
      .catch(err => console.error(err));
  }