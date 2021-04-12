const menu = document.getElementById('menu')
menu.addEventListener('click', (event) => {
    let target = event.currentTarget.children;
    let clickedElement = event.target.id;
    changePage(clickedElement, target)

})

const sections = ['findAnagrams', 'setsOfAnagrams', 'twoWordAnagrams', 'threeWordAnagrams']
const changePage = (clicked, childTarget) => {
    for (let element = 0; element < childTarget.length; element++){
        const idElement = childTarget[element].id;
        const section = sections[element]
        const sectionToChange = document.getElementById(section);
        const divToChange = document.getElementById(idElement);

        if(idElement === clicked){
            divToChange.classList.add('active')
            sectionToChange.classList.remove('hidden')
        } else {
            divToChange.classList.remove('active')
            sectionToChange.classList.add('hidden')
        }
    };
}

function alphabetize(wordToAlphabetical) {
    return wordToAlphabetical.toLowerCase().split('').sort().join('').trim();
} 

function words(input) {
    return input.split(' ');
}

function findAnagrams(typedWordsAlphabetical, result, db){
    let output = result;

    db.map(word => {
        let wordAlpha = alphabetize(word);
        for (let i = 0; i < typedWordsAlphabetical.length; i++){
            if(wordAlpha === typedWordsAlphabetical[i]){
                output[wordAlpha].push(word)
            }
        }
    })
    return output
}

function getAnagramsOf(input, db){
    let result = {}
    const wordsInAlphabetical = input.map(word => {
        let wordAlphabetical = alphabetize(word)
        result[wordAlphabetical] = [];
        return wordAlphabetical
    });
    result = findAnagrams(wordsInAlphabetical, result, db)
    return result
}

function createDiv(anagrams){
    let createDiv = document.createElement('div')

    let newHeader = document.createElement('h3')
    newHeader.textContent = 'Palavras encontradas';
  
    createDiv.appendChild(newHeader)
 
    for (item in anagrams){
        let paragraphContent = `${item} = ${anagrams[item]}`
        let newParagraph = document.createElement('p')
        newParagraph.textContent = paragraphContent
        createDiv.appendChild(newParagraph)   
    }
    return createDiv
}

function filterWordsByLength(size, db){
    let filteredWords = [];
    filteredWords = db.filter(word => word.length === size)
    return filteredWords
}

function longestWord(db) {
    let maxLength = 0
    for (let i =0; i <db.length; i++) {
        if(db[i].length > maxLength){
            maxLength = db[i].length;
        }
    }
    return maxLength
}

const btnFindAnagrams = document.getElementById("btnFindAnagrams");
btnFindAnagrams.addEventListener('click', () => {
    
    let resultDiv = document.getElementById("anagramsResult");
    resultDiv.innerHTML = "";

    let typedText = document.getElementById("input").value;
    let typedWords = words(typedText);
    let anagrams = getAnagramsOf(typedWords, palavras);

    resultDiv.appendChild(createDiv(anagrams))
});
  
const btnSetsOfAnagrams = document.getElementById("setsOfAnagrams");
btnSetsOfAnagrams.addEventListener('click', () => {
    let anagrams = getSetsOfFiveAnagrams();
    let resultDiv = document.getElementById("setAnagramsResult");
    resultDiv.innerHTML = "";
    resultDiv.appendChild(createDiv(anagrams))
});
  