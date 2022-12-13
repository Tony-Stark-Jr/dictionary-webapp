let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');

searchBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // clear data 
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';

    // Get input data
    let word = input.value;
    // call API get data
    if (word === '') {
        alert('Word is required');
        return;
    }

    getData(word);
})


async function getData(word) {

    loading.style.display = 'block'

    // API call
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const data = await response.json();

    console.log(data)


    // if empty result
    if (!data.length) {
        loading.style.display = 'none';

        let noResult = data.title;
        // notFound.innerText = 'No result found'
        notFound.innerText = noResult;
        return;
    }



    loading.style.display = 'none';

    // Result found
    let definition = data[0].meanings[0].definitions[0].definition
    defBox.innerText = `${definition}`


    // Sound
    let sound = data[0].phonetics[0].audio;
    if (sound) {
        let aud = document.createElement('audio');
        aud.src = sound;
        aud.controls = true;
        audioBox.appendChild(aud);
    }
}