const addButton = document.querySelector("header button")
const addModal = document.getElementById('add-modal')
const backDrop = document.getElementById("backdrop")

const cancelBtn = document.querySelector(".btn_cancel")
const addMovieBtn = document.querySelector(".btn_success")

const userInput = document.querySelectorAll("input")
// const text = document.querySelector("#title")
// const imageUrl = document.querySelector("#image-url")
// const rating = document.querySelector("#rating")

const entryTextSection = document.getElementById("entry-text")

const deleteModal = document.getElementById("delete-modal")

let movieList = []

const backDropHandler = ()=>{
    clearMovieHandler()
    cancelMovieDeleter()
    clearMovieInfo()
}

const updateScreen = ()=>{
    if(movieList.length===0){
        entryTextSection.style.display="block"
    }else{
        entryTextSection.style.display="none"
    }
}

const deleteMovie = (movieId)=>{
    console.log("clicked")
    let index = 0
    for(movie of movieList){
        if(movie.id=== movieId){
            break
        }
        index++
    }
    movieList.splice(index,1)
    const movieNameList = document.getElementById("movie-list")
    movieNameList.children[index].remove()
    cancelMovieDeleter()
}

const cancelMovieDeleter = ()=>{
    toggleBackDropHandler()
    deleteModal.classList.remove("visible")
}

const deleteMovieHandler = (movieId)=>{
    deleteModal.classList.add("visible")
    toggleBackDropHandler()

    const cancelDeleteBtn = deleteModal.querySelector(".btn_cancel")
    let confirmDeleteBtn = deleteModal.querySelector(".btn_danger")

    confirmDeleteBtn.replaceWith(confirmDeleteBtn.cloneNode(true))
    confirmDeleteBtn = deleteModal.querySelector(".btn_danger")
    cancelDeleteBtn.removeEventListener("click",cancelMovieDeleter)

    cancelDeleteBtn.addEventListener("click",cancelMovieDeleter)
    confirmDeleteBtn.addEventListener("click",deleteMovie.bind(null,movieId))
    // deleteMovie(movieId)
}

const renderScreen = (id,title,imageUrl,rating)=>{
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
    newElement.addEventListener('click',deleteMovieHandler.bind(null,id))
    const movieNameList = document.getElementById("movie-list")
    movieNameList.append(newElement)
}

const toggleBackDropHandler = ()=>{
    // console.log(backDrop.className)
    backDrop.classList.toggle("visible")
    // console.log(backDrop.className) 
}

const clearMovieHandler = ()=>{
    addModal.classList.remove("visible")
}

const showMovieHandler = ()=>{
    // console.log("clicked")
    addModal.classList.add("visible")
    toggleBackDropHandler()
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
    if(title.trim()==="" || imageUrl.trim()==="" || rating.trim === "" || +rating<1 || +rating > 10){
        alert("Enter valid Title, image URL and rating between 1-10.")
        return
    }
    const movieInfo = {
        id: Math.random().toString(),
        title: title,
        imageUrl:imageUrl,
        rating: rating
    }
    movieList.push(movieInfo)
    clearMovieInfo()
    toggleBackDropHandler()
    renderScreen(movieInfo.id, movieInfo.title, movieInfo.imageUrl, movieInfo.rating)
    clearMovieHandler()
    updateScreen()
    // console.log(movieList)
}

const cancelBtnHandler = ()=>{
    clearMovieHandler()
    toggleBackDropHandler()
    clearMovieInfo() 
}
addButton.addEventListener("click",showMovieHandler)
backDrop.addEventListener("click",backDropHandler)
addMovieBtn.addEventListener("click",addMovieBtnHandler)
cancelBtn.addEventListener("click",cancelBtnHandler)