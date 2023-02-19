// import './style.css'
var renderArea=document.getElementById("renderArea")
let searchBtn=document.getElementById("search-button")
var searchInput=document.querySelector(".search-input")
var searchString=""


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
renderArea.innerHTML+=
`<div class="card">
<div class="card-poster-img"><img src=${info.Poster} alt=""></div>
<div class="card-info">
  <div><p>${info.Title}</p><img src="./Images/Icon (5).png" alt=""><p>${info.imdbRating}</p></div>
  <div><p>${info.Runtime}</p><p>${info.Genre}</p><img src="./Images/IconplusIcon.png" alt=""><p>watchlist</p></div>
  <div><p>${info.Plot}</p></div>
</div>
</div>
`
}
