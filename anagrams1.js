function alphabetize(wordToAlphabetical) {
  return wordToAlphabetical.toLowerCase().split("").sort().join("").trim();
} 


function findAnagrams(typedWordsAlphabetical, result, db){
  let output = result;
  
  db.map(word => {
    let wordAlpha = alphabetize(word);
    for (let i = 0; i < typedWordsAlphabetical.length; i++){
      if(wordAlpha === typedWordsAlphabetical[i]){
        output[i].push(word)
      } 
    }
  })
  return output
}


function words(input) {
  return input.split(' ');
}


function getAnagramsOf(input, db){
  let result = []
  
  const wordsInAlphabetical = input.map(word => {
    result.push([]);
    return alphabetize(word)
  });
  result = findAnagrams(wordsInAlphabetical, result, db)
 
  return result
}


function createDiv(anagrams){
  let createDiv = document.createElement('div')
  
  let newHeader = document.createElement('h3')
  newHeader.textContent = 'Palavras encontradas';
  
  createDiv.appendChild(newHeader)
 
  for (let i = 0; i < anagrams.length; i++){
    let paragraphContent = anagrams[i].join(' ')
    let newParagraph = document.createElement('p')
    newParagraph.textContent = paragraphContent
    createDiv.appendChild(newParagraph)   
  }
  return createDiv
}


function printResult(anagrams) {  
  let resultDiv = document.getElementById("anagramResult");
  resultDiv.innerHTML = "";
  let createdDiv = createDiv(anagrams)
  resultDiv.appendChild(createdDiv)
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


function getSetsOfFiveAnagrams(db) {
  let output = [];
  let maxLength = longestWord(db)

  for(let wordsLength = 1; wordsLength <= maxLength; wordsLength++){
    let result = {}
    let filteredWords = filterWordsByLength(wordsLength, db)

    filteredWords.map(item => {
      let wordAlphabetical = alphabetize(item)
      if(result[wordAlphabetical] === undefined) {
        result[wordAlphabetical] = [item];
      } else {
        result[wordAlphabetical].push(item);
      }
    })
    
    for(item in result){
      if(result[item].length >= 5){
          output.push(result[item])
      }
    }
  }
  return output
}


const btnFindAnagrams = document.getElementById("findButton");

btnFindAnagrams.addEventListener("click", function () {
  let typedText = document.getElementById("input").value;
  let typedWords = words(typedText);
  let anagrams = getAnagramsOf(typedWords, palavras);
  printResult(anagrams);
});

  
const btnSetsOfAnagrams = document.getElementById("setsOfAnagrams");

btnSetsOfAnagrams.addEventListener("click", function () {
  let anagrams = getSetsOfFiveAnagrams(palavras);
  printResult(anagrams);
});
  