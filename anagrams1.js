function alphabetize(wordToAlphabetical) {
  return wordToAlphabetical.toLowerCase().split("").sort().join("").trim();
} 


function findAnagrams(typedWordsAlphabetical, result, db){
  let output = result;
  
  db.map(word => {
    let wordAlpha = alphabetize(word);
    for (let i = 0; i < typedWordsAlphabetical.length; i++){
      //se for igual colocar no array correspondente
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


function printResult(anagrams) {  

  let resultDiv = document.getElementById("anagramResult");
  resultDiv.innerHTML = "";

  let newHeader = document.createElement('h3')
  newHeader.textContent = 'Palavras encontradas';

  let createDiv = document.createElement('div')

  createDiv.appendChild(newHeader)
  
  for (let i = 0; i < anagrams.length; i++){
    let paragraphContent = anagrams[i].join(' ')
    let newParagraph = document.createElement('p')
    newParagraph.textContent = paragraphContent
    createDiv.appendChild(newParagraph)   
  }
  resultDiv.appendChild(createDiv)
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
    
    let filteredWords = filterWordsByLength(wordsLength, db)
    console.log(filteredWords)

    for(let indexFilteredWord = 0; indexFilteredWord < filteredWords.length - 5;){
      let wordAlphabetical = alphabetize(filteredWords[indexFilteredWord])
      
      filteredWords.splice(0, 1)
      
      let result = []
      
      filteredWords.map((word, index) => {
        let wordAlpha = alphabetize(word);
        if(wordAlpha === wordAlphabetical){
            result.push(word)
            filteredWords.splice(index, 1)
        } 
      })
      if(result.length >=5 ){
        output.push(result)
      }
    }
    console.log(output)
  }

  return output
}



const button = document.getElementById("findButton");

button.addEventListener("click", function () {

  let typedText = document.getElementById("input").value;

  let typedWords = words(typedText);

  let anagrams = getAnagramsOf(typedWords, palavras);
  console.log(anagrams)
  printResult(anagrams);

});
  