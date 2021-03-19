function getAnagramsOf(input){

  let getAlphabetize = (alphabetize(input))
  console.log(getAlphabetize)

  let result = []

  palavras.map(item => {
    let wordAlpha = alphabetize(item);
    if(wordAlpha == getAlphabetize){
      result.push(item)
    }
  })

  result.splice(result.indexOf(input))
  
  return result
}

function alphabetize(a) {
  return a.toLowerCase().split("").sort().join("").trim();
}

const button = document.getElementById("findButton");

button.addEventListener("click", function () {
    let typedText = document.getElementById("input").value;
    getAnagramsOf(typedText);
  });
  