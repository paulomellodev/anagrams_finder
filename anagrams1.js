
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


function getAnagramsOf(input){
  let result = []
  
  const wordsInAlphabetical = input.map(word => {
    result.push([]);
    return alphabetize(word)
  });
  result = findAnagrams(wordsInAlphabetical, result, palavras)
 
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


const button = document.getElementById("findButton");

button.addEventListener("click", function () {

  let typedText = document.getElementById("input").value;

  let typedWords = words(typedText);

  let anagrams = getAnagramsOf(typedWords);
    
  printResult(anagrams);

});
  