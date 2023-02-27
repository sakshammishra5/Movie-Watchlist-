 import './style.css'
var renderArea=document.getElementById("renderArea")
var searchBtn=document.getElementById("search-button")
var searchInput=document.querySelector(".search-input")
var searchString=""
var movieArray=[]
var localArray=[]

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    searchString=searchInput.value
    console.log(searchString);

    fetch(`https://www.omdbapi.com/?s=${searchString}&apikey=abfb5a92`)
    .then((res) => res.json())
    .then(data => {console.log(data) ,secondFetch(data)})

})

function secondFetch(data){
    for(let i=0;i<data.Search.length;i++){
        fetch(`https://www.omdbapi.com/?i=${data.Search[i].imdbID}&apikey=abfb5a92`)
        .then((res) => res.json())
        .then((info) => {console.log(info),renderCard(info)})
       }
}

function renderCard(info){
  const moviobj={
    id:info.imdbID,
    Poster:info.Poster,
    Title:info.Title,
    Rating:info.imdbRating,
    Runtime:info.Runtime,
    Genre:info.Genre,
    Plot:info.Plot
  }
  movieArray.push(moviobj)
renderArea.innerHTML+=
`<div class="card" id="${info.imdbID}">
<div class="card-poster-img"><img src=${info.Poster} alt=""></div>
<div class="card-info">
  <div><p>${info.Title}</p><img src="./Images/Icon (5).png" alt=""><p>${info.imdbRating}</p></div>
  <div><p>${info.Runtime}</p><p>${info.Genre}</p><a id="${info.imdbID}" class="add-watchlist-icon" href="#"><img id="${info.imdbID}" src="./Images/IconplusIcon.png" alt="#"></a><p>watchlist</p></div>
  <div><p>${info.Plot}</p></div>
</div>
</div>
`
}


renderArea.addEventListener("click",(e)=>{
  //console.log(document.getElementById(e.target.id).parentElement)
  //console.log(e.target.id)
  let element=movieArray.find(item=>item.id==(e.target.id))
  localArray.push(element)
  storeInlocalstorage(localArray)
});


function storeInlocalstorage(localArray){
localStorage.setItem('movieString',JSON.stringify(localArray))
}


