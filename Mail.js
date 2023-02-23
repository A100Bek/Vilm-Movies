class Cinema {
    constructor(image, title, year, url) {
        this.image = image
        this.title = title
        this.year = year
        this.url = url
    }
    render = () => {
        let txt = `<div class="cinima">
                            <img src="${this.image}" alt="">
                            <p class="cinima_title">${this.title}</p>
                            <span class="cinima_year">${this.year}</span>
                        </div>`
        this.url.innerHTML += txt
    }
}

fetch("http://www.omdbapi.com/?apikey=b76c85e4&s=panda")
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        data.Search.forEach(({ Title, Year, Poster, Type }) => {
            if (Type == "movie") {
                new Cinema(Poster, Title, Year, document.getElementById("cinima")
                ).render()  
            }else if(Type==="series") {
                new Cinema(Poster, Title, Year, document.getElementById("series")
                ).render() 
            }


        })
    });


const search = document.getElementById("search")
let data = {}
search.addEventListener("change", (event) => {
    data[event.target.name] = event.target.value
    console.log(data);
})

search.addEventListener("submit", (event) => {
    event.preventDefault();

    fetch(`http://www.omdbapi.com/?apikey=b76c85e4&s=${data.search}`)
        .then(res => res.json())
        .then((data) => {

            document.getElementById("result").innerHTML = ""

            data.Search.forEach(({ Title, Year, Poster }) => new Cinema(Poster, Title, Year, document.getElementById("result")
            ).render()
            )
        }
        );
})

document.getElementById("reset").addEventListener("click", () => {
    search[0].value = ""
    document.getElementById("result").innerHTML = ""

    window.pageYOffset = 0
})