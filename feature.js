const addButton = document.querySelector("header button")
const addModal = document.getElementById('add-modal')
const backDrop = document.getElementById("backdrop")

const cancelBtn = document.querySelector("#add-modal .btn_cancel")
const addMovieBtn = document.querySelector("#add-modal .btn_success")

const userInput = document.querySelectorAll("input")
// const text = document.querySelector("#title")
// const imageUrl = document.querySelector("#image-url")
// const rating = document.querySelector("#rating")

const entryTextSection = document.getElementById("entry-text")

let movieList = []

const updateScreen = ()=>{
    if(movieList.length===0){
        entryTextSection.style.display="block"
    }else{
        entryTextSection.style.display="none"
    }
}

const renderScreen = (title,imageUrl,rating)=>{
    const newElement = document.createElement('li')
    newElement.className = "movie-element"
    newElement.innerHTML = `
    <div class="movie-element_image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element_info"
        <h2>${title}</h2>
        <p>${rating}/5 Star</p>
    </div>
    `
    const movieNameList = document.getElementById("movie-list")
    movieNameList.append(newElement)
}
const toggleBackDropHandler = ()=>{
    backDrop.classList.toggle("visible")
}

const movieHandler = ()=>{
    // console.log("clicked")
    addModal.classList.toggle("visible")
    toggleBackDropHandler()
}

const backDropHandler = ()=>{
    movieHandler()
}

const clearMovieInfo = ()=>{
    for (input of userInput){
        input.value = ""
    }
}

const addMovieBtnHandler = ()=>{
    const title = userInput[0].value
    const imageUrl = userInput[1].value
    const rating = userInput[2].value
    if(title.trim()==="" || imageUrl.trim()==="" || rating.trim === "" || +rating<1 || +rating > 5){
        alert("Enter valid Title, image URL and rating between 1-5.")
    }
    const movieInfo = {
        title: title,
        imageUrl:imageUrl,
        rating: rating
    }
    movieList.push(movieInfo)
    clearMovieInfo()
    movieHandler()
    renderScreen(movieInfo.title, movieInfo.imageUrl, movieInfo.rating)
    updateScreen()
    // console.log(movieList)
}

const cancelBtnHandler = ()=>{
    clearMovieInfo()
    movieHandler()
}
addButton.addEventListener("click",movieHandler)
backDrop.addEventListener("click",backDropHandler)
addMovieBtn.addEventListener("click",addMovieBtnHandler)
cancelBtn.addEventListener("click",cancelBtnHandler)