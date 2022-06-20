let APIKEY = "676ff22685d8b88786e5e501105cb0b8";
let movieForm = document.querySelector("form");
let movieGridElement = document.getElementById("movies-grid")

const generateError = (err) => {
    document.lastChild.innerHTML += `
        <span style="color: red;">${err} not found</span>
    `;
}

document.addEventListener("DOMContentLoaded", init);

//Global variables for fetched data
const posterLink = "https://image.tmdb.org/t/p/w500"
let responseData; 
let pageNum;
let searchedMovie;
let pageLoaded;
let atNowPlaying;

function init() {

    document.getElementById("clicker").addEventListener("click", async (ev) => {
    if (document.getElementById("search").value == ""){
        alert("Enter a movie name before searching")
        return 
    }
        pageNum = 1
        searchedMovie = document.getElementById("search").value;
        document.getElementById("search").value = ""
 
       ev.preventDefault();
        let apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + APIKEY + '&query='+ searchedMovie + '&page=' + pageNum;

        try {
            document.getElementById("movies-grid").innerHTML = "";
            let response = await fetch(apiUrl);
            responseData = await response.json();

            if (Object.keys(responseData).length > 1){
                for (const Index in responseData.results){
                    const movieData = {
                        Id: responseData.results[Index].id,
                        Title: responseData.results[Index].original_title,
                        Rating: responseData.results[Index].vote_average,
                        ImagePath: responseData.results[Index].poster_path,
                    }
                    displayMovie(movieData, posterLink);
                }
            }
            pageLoaded = true
        } catch (e) {

            generateError(document.getElementById("search").value);
        }

    });

}

function displayMovie(movieData, posterLink) {
    if (movieData.ImagePath == null){
        console.log("Image Not Found")
    }
    console.log(movieData, posterLink)
    document.getElementById("movies-grid").innerHTML += `
    <div class="movie-card">
    <img src=${posterLink + movieData.ImagePath} class="movie-poster" width="250px" length="350px"><p class="movie-title"><b>${movieData.Title}</b></p><p class="movie-votes">⭐${movieData.Rating}</p>
    </div>
    `;
}

async function loadMore(){

    if (document.getElementById("search").value == "" && pageLoaded == false){
        alert("Enter a movie name before searching")
        return 0
    }

    if (atNowPlaying == true){
    pageNum += 1
    let apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + APIKEY + '&language=en-US&page=' + pageNum;
        try {
            let response = await fetch(apiUrl);

            responseData = await response.json();
            if (Object.keys(responseData).length > 1){
                for (const Index in responseData.results){
                    const movieData = {
                        Id: responseData.results[Index].id,
                        Title: responseData.results[Index].original_title,
                        Rating: responseData.results[Index].vote_average,
                        ImagePath: responseData.results[Index].poster_path,
                    }
                    displayMovie(movieData, posterLink);
                }
            }

        } catch (e) {
            generateError(document.getElementById("search").value);
        }

    }

    pageNum += 1
    let apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + APIKEY + '&query='+ searchedMovie + '&page=' + pageNum;
        try {
            let response = await fetch(apiUrl);

            responseData = await response.json();
            if (Object.keys(responseData).length > 1){
                for (const Index in responseData.results){
                    const movieData = {
                        Id: responseData.results[Index].id,
                        Title: responseData.results[Index].original_title,
                        Rating: responseData.results[Index].vote_average,
                        ImagePath: responseData.results[Index].poster_path,
                    }
                    displayMovie(movieData, posterLink);
                }
            }

        } catch (e) {
            generateError(document.getElementById("search").value);
        }
    
    
}

async function loadCurrentMovies(){

    pageNum = 1
    let apiUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + APIKEY + '&language=en-US&page=' + pageNum;
        try {
            let response = await fetch(apiUrl);
            responseData = await response.json();

            if (Object.keys(responseData).length > 1){
                for (const Index in responseData.results){
                    const movieData = {
                        Id: responseData.results[Index].id,
                        Title: responseData.results[Index].original_title,
                        Rating: responseData.results[Index].vote_average,
                        ImagePath: responseData.results[Index].poster_path,
                    }
                    displayMovie(movieData, posterLink);
                }
                
            }

        } catch (e) {
            generateError(document.getElementById("search").value);
        }
    atNowPlaying = true
}

if (movieGridElement == undefined){
    loadCurrentMovies()
}
function returnHome(){
    document.getElementById("movies-grid").innerHTML = "";
    loadCurrentMovies();
}


//Image is Null
// Styling
