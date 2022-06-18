let APIKEY = "676ff22685d8b88786e5e501105cb0b8";

let movieForm = document.querySelector("form");
let movieDisplayElement = document.getElementById("movieDisplay")

const generateError = (err) => {
    document.lastChild.innerHTML += `
        <span style="color: red;">${err} not found</span>
    `;
}

document.addEventListener("DOMContentLoaded", init);

let responseData; 

console.log(responseData)

function init(count) {

    document.getElementById("clicker").addEventListener("click", async (ev) => {
        
        let pageNum = 1
        searchedMovie = document.getElementById("search").value;
        const posterLink = "https://image.tmdb.org/t/p/w500"
        ev.preventDefault();
        let apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' + APIKEY + '&query='+ searchedMovie + '&page=' + pageNum;
        console.log(apiUrl);
        console.log(pageNum);

        try {
            document.getElementById("movieDisplay").innerHTML = "";
            let response = await fetch(apiUrl);
            console.log("resp", response);

            responseData = await response.json();
            console.log(responseData);
            console.log(searchedMovie)

            console.log(typeof responseData)
            if (Object.keys(responseData).length > 1){
                for (const Index in responseData.results){

                    const movieData = {
                        Id: responseData.results[Index].id,
                        Title: responseData.results[Index].original_title,
                        Rating: responseData.results[Index].vote_average,
                        ImagePath: responseData.results[Index].poster_path,
                    }

                    //console.log(movieData)
                    displayMovie(movieData, posterLink);

                }
            }

        } catch (e) {

            generateError(document.getElementById("search").value);
        }

    });

}

function displayMovie(movieData, posterLink) {
    document.getElementById("movieDisplay").innerHTML += `<div><p>${movieData.Title}</p> ${movieData.Rating} <img width=200px height=300px src=${posterLink + movieData.ImagePath}></div>`;
}

