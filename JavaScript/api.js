let search=document.querySelector("#search");
//console.log(search);
search.addEventListener("keyup",(e) => {
    let searchText=e.target.value;
    SearchMovies(searchText);
    //when key press hide form text and h1
    let formText= document.getElementById("divBlock");
    formText.style.display="none";
    search.classList.add("afterkeyPress");
    document.querySelector("#formBlock").classList.add("afterkey_formBlock");
});
//speech recognition
let speechSearch=document.getElementById("#speechIcon");
speechSearch.addEventListener("click", () => {
    let formText= document.getElementById("divBlock");
    formText.style.display="none";
    search.classList.add("afterkeyPress");
    document.querySelector("#formBlock").classList.add("afterkey_formBlock");

   window.SpeechRecognition=
   window.SpeechRecognition || window.webkitSpeechRecognition;

   let recognition = new SpeechRecognition();
   recognition.interimResults=true;
let p=document.createElement("p");

   recognition.addEventListener("result", (e) => {
       let transcript =[...e.results]
       .map((result) => result[0])
       .map((result) => result.transcript)
       .join("");
       search.value=transcript;
     if (e.results[0].isFinal) {
       p=document.createElement("p");
       p.innerHTML=transcript;
       let searchText=transcript;
       SearchMovies(searchText);
      }
    });
   recognition.start();
});

function SearchMovies(searchText) {
    //console.log(searchText);
    const imdbAPi=`http://www.omdbapi.com/?s=${searchText}&apikey=fe0cfaee`;
    window.fetch(imdbAPi).then((data)=>{
        data
        .json()
        .then((movieData)=>{
            //console.log(movie.search);
            let movies = movieData.Search;
        let output = [];
            for (let movie of movies) {
                console.log(movie);
                output +=`
                <div>
                <img src="${moive.Poster}"/>
                    <h1>${movie.Title}</h1>
                    <p>${movie.Year}</p> 
                    <a href=" http://www.omdbapi.com/?i=tt3896198&apikey=fe0cfaee">Movie Details</a>
                </div>
                `;
            }
            let allImages=document.images;
            [...allImages].forEach((img) => {
                console.log(img);
              if  (img.src === "N/A") {
                  console.log("no image");
              }

            });
            document.getElementById("template").innerHTML=output;
            //console.log(movies);
        })
       // console.log(data);
       .catch((err) => console.log(err));
    })
    .catch((err)=> console.log(err));
}
