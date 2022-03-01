
// fetch with Promises

// fetch('https://dog.ceo/api/breeds/list/all')
// .then(res => res.json()
// .then(data => console.log(data)));

async function start() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    // console.log(data)
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
        console.log(data.message)
    }
    

}