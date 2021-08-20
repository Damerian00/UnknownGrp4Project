const publicKey = "cf666bb77e15be90b02e3679ffa84cf0";
var searchBox;
let charVid = document.querySelector('#charVid');
let charLinks = document.querySelector('#charLinks');
let ytApiKey = "AIzaSyDiOZ44nzVN6XsP85hiAU76fyZkNyw7hN8";
ytApiKey = "AIzaSyCTRbHmUjeCYpRIZoiuxxq6U5S1gabwVUU";
var charactBio = document.querySelector("#charBio")


function searchAPI() {
    searchBox = document.querySelector("#characterInput").value;
    var marvelCharacterUrl = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchBox}&apikey=${publicKey}`;
    fetch(marvelCharacterUrl)
    console.log(searchBox);
    let ytUrl = `https://youtube.googleapis.com/youtube/v3/search?q=${searchBox},marvel&type=video&part=snippet&chart=mostPopular&key=${ytApiKey}`;
    fetch(marvelCharacterUrl)
        .then(async function (response) {
            if (response.ok) {
                const marvelCharacterData = await response.json();
                document.querySelector("#characterImg").setAttribute("src", marvelCharacterData.data.results[0].thumbnail.path + "/portrait_uncanny.jpg")
                charactBio.innerHTML = marvelCharacterData.data.results[0].description;
                        console.log("is this an array?", marvelCharacterData.data.results);
                            
                    
                for (var i = 0; i < marvelCharacterData.data.results.length; i++) {
                if (marvelCharacterData.data.results[i].description == "") {
                    searchBox = searchBox.toUpperCase();
                    charactBio.innerHTML = `${searchBox}: IS A CHARACTER IN THE MARVEL.`
                    console.log("Empty");
                } else if (marvelCharacterData.data.results[i].description !== ""){
                    console.log(marvelCharacterData.data.results[i].description)
                    charactBio.innerHTML = marvelCharacterData.data.results[i].description;
                    return
                }
                else {
                    console.log("No Bio or Description Available");
                }
            fetch(ytUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(ytData => {
                       console.log(ytData);
                       if (charVid.hasChildNodes()){
                        while (charVid.firstChild) {
                            charVid.removeChild(charVid.firstChild);
                          }
                    }else{
                       }
                       if (charLinks.hasChildNodes()){
                        while (charLinks.firstChild) {
                            charLinks.removeChild(charLinks.firstChild);
                          }
                    } else {}
                       for (let i = 0; i < ytData.items.length; i++) {
                           let video = ytData.items[i].id.videoId
                           console.log(video);
                           let link =  `https://www.youtube.com/watch?v=${video}`;
                           let vTag = document.createElement('iframe');
                           vTag.classList = "query col-2 p-2 mx-3";
                           vTag.src = `https://www.youtube.com/embed/${video}`;
                           let aTag = document.createElement('a');
                           aTag.classList = "p-1 text-center";
                           charVid.appendChild(vTag);
                           aTag.href = link;
                           aTag.setAttribute("target", "_blank")
                           aTag.innerHTML = searchBox.toUpperCase();
                           charLinks.appendChild(aTag); 
                           console.log(link);
                       }
                    })
                }   else {
                    response.text().then(ytData => {
                        console.log(ytData);
                    })
                }
            }  )  
        }
        }  else {
            response.text().then(marvelCharacterData => {
            console.log(marvelCharacterData);
        })
    }
});
}
document.querySelector("#searchCharacter").addEventListener("click", searchAPI)
