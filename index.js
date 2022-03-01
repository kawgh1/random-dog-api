// glocals

let timer;
let deleteFirstPhotoDelay;



// fetch with Promises

// fetch('https://dog.ceo/api/breeds/list/all')
// .then(res => res.json()
// .then(data => console.log(data)));

async function start() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    // console.log(data.message)
    createBreedList(data.message)
}

start();

function createBreedList(breedList) {

    document.getElementById('breed').innerHTML = `
        <select onChange="loadByBreed(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(breedList).map(breed =>  {
               return  `<option>${breed}</option>`
            }).join('')}
        </select>`

}

async function loadByBreed(breed) {
    if(breed != "Choose a dog breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json();
        console.log(data.message.length + " images of " + breed)
        createSlideShow(data.message)
        
    }

}

function createSlideShow(images) {
    let currentPosition = 0;
    clearInterval(timer);
    clearTimeout(deleteFirstPhotoDelay)
    document.getElementById('slideshow').innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
    `

    currentPosition += 2;
    // timer
    timer = setInterval(nextSlide, 3000);

    function nextSlide() {
        document.getElementById('slideshow').insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
        deleteFirstPhotoDelay = setTimeout(function(){
            document.querySelector(".slide").remove()
        }, 8000);

        // increment currentPosition, but if it's the last image, reset back to 0 to start over
        if(currentPosition + 1 >= images.length) {
            currentPosition = 0;
        } else {
            currentPosition++;
        }
    }

}