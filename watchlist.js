// import storedmovie from './index.js'
import "./style.css";
var localMovies=[]
let renderArea=document.getElementById("Watchlist-renderArea")

getfromlocalstorage()

function getfromlocalstorage(){
  localMovies=JSON.parse(localStorage.getItem('movieString'))
//  console.log(localMovies);
}
// console.log(localMovies);
renderMovie()


function renderMovie(){
  localMovies.forEach((item) => {
    // console.log(item);
    renderArea.innerHTML += `<div class="card" id="${item.id}">
    <div class="card-poster-img"><img src=${item.Poster} alt=""></div>
    <div class="card-info">
      <div><p>${item.Title}</p><img src="./Images/Icon (5).png" alt=""><p>${item.Rating}</p></div>
      <div><p>${item.Runtime}</p><p>${item.Genre}</p><a id="${item.id}" class="add-watchlist-icon" href="#/"><img id="${item.id}" src="./Images/minus.png" alt="#"></a><p>Remove</p></div>
      <div><p>${item.Plot}</p></div>
    </div>
    </div>
     `
  })
}


renderArea.addEventListener("click",(e)=>{
if(e.target.id){
  removeFromWatchlist(e.target.id)
  console.log(localMovies);
  renderArea.innerHTML=""
  getfromlocalstorage()
  renderMovie()
}
})

function removeFromWatchlist(id){
  const movieToRemove=localMovies.filter(movie=>{
    return movie.id===id
  })
  // console.log(movieToRemove[0]);
  // const index=localMovies.indexOf(movieToRemove)
  localMovies.splice(movieToRemove,1)
  localStorage.setItem('movieString',JSON.stringify(localMovies))
}

