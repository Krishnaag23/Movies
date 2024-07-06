const API_KEY = "b8ae9a851d5f90e11e50c61bd4887d00";
const API_URL = "https://api.themoviedb.org/3";

let surl, query;
let type = "movie";

document
  .getElementById("search-button")
  .addEventListener("click", searchMovies);
document
  .getElementById("filter-button")
  .addEventListener("click", filterMovies);

async function fetchMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

function displayMovies(movies, type) {
  const results = document.getElementById("results");
  results.innerHTML = "";
  if (type === "movie" || type === "") {
    movies.forEach((movie) => {
      const card = document.createElement("div");
      const a = document.createElement("a");
      a.setAttribute("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      a.innerHTML = "Stream";
      card.classList.add("card");
      if (movie.poster_path) {
        card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path} " alt="${
          movie.title
        }">
      <h3>${movie.title}</h3>
      <p>${movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
      <p>${movie.overview}</p>
    `;
      } else {
        card.innerHTML = `
      <img src="Analogue Rickroll Poster.jpeg" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
      <p>${movie.overview}</p>
    `;
      }
      card.appendChild(a);
      results.appendChild(card);
    });
  } else if (type === "tv") {
    movies.forEach((movie) => {
      const card = document.createElement("div");
      const a = document.createElement("a");
      a.setAttribute("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      a.innerHTML = "Stream";
      card.classList.add("card");
      card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path} " alt="${
        movie.name
      }">
      <h3>${movie.name}</h3>
      <p>${
        movie.first_air_date ? movie.first_air_date.split("-")[0] : "N/A"
      }</p>
      <p>${movie.overview}</p>
    `;
      card.appendChild(a);
      results.appendChild(card);
    });
  }
}

async function searchMovies() {
  query = document.getElementById("search-input").value;
  if (query) {
    surl = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
    const movies = await fetchMovies(surl);
    displayMovies(movies, type);
  }
}

async function filterMovies() {
  const year = document.getElementById("year-input").value;
  type = document.getElementById("type-select").value;
  if (surl) {
    surl = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
    if (year) surl += `&primary_release_year=${year}`;

    if (type === "tv") {
      surl = `${API_URL}/search/tv?api_key=${API_KEY}&query=${query}`;
      if (year) surl += `&first_air_date_year = ${year}`;
      const movies = await fetchMovies(surl);
      displayMovies(movies, type);
    }
    const movies = await fetchMovies(surl);
    displayMovies(movies, type);
  }
}
