const maxLength = longestWord(palavras)

function getSetsOfAnagrams(db) {
    let output = [{}];
    
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
        output.push(result)
    }
    return output
}

// criar conjuntos de anagramas por tamanho de palavras
const setsOfAnagrams = getSetsOfAnagrams(palavras)

// criar array com to
const getSetsOfFiveAnagrams = () => {
    const setsOfFive = {};
    for(let i = 0; i < setsOfAnagrams.length; i++) {
        let arr = setsOfAnagrams[i]
        for(item in arr){
            if(arr[item].length >= 5){
                setsOfFive[item] = [arr[item]];
            } 
        }
    }
    return setsOfFive
}

const verifyInput = (input, key) => {
    let splitedInput = input.split('');
    let splitedKey = key.split('');

    for (let index = 0; index < splitedKey.length; index++){
        if(!splitedInput.includes(splitedKey[index])){
            return false
        } else {
            let positionOfLetter = splitedInput.indexOf(splitedKey[index])
            splitedInput.splice(positionOfLetter, 1)
        }
    }
    return true
}

//2 anagramas
const getAnagramsOfTwoWords = (text) => {
    let output = []
    
    let textLength = text.length;
    
    for(let i = 1; i <= textLength-i; i++){
        // quais conjuntos serão utilizados
        let firstSet = setsOfAnagrams[i]
        let lastSet = setsOfAnagrams[textLength-i];
        
        // iterar sobre os conjuntos selecionados
        for(item in firstSet){
            if(verifyInput(text, item)){
                for(item2 in lastSet){
                    if(verifyInput(text, item2)){
                        let partial = alphabetize(item+item2)
                        if(partial === text){
                            // criar output com dados que batem
                            output.push(`[${firstSet[item]}] + [${lastSet[item2]}]`)
                        }
                    }
                }
            }
        }
    }
    return output
}

const btnTwoWords = document.getElementById("btnTwoWordAnagrams");
btnTwoWords.addEventListener('click', () => {
    
    let resultDiv = document.getElementById("twoWordAnagramsResult");
    resultDiv.innerHTML = "";
    
    // pegar o texto digitado e coloca-lo em ordem
    let typedText = document.getElementById("input2").value;
    let alphabeticalSentence = alphabetize(typedText);
    
    // verificar quantas letras possui o texto digitado
    let twoAnagrams = getAnagramsOfTwoWords(alphabeticalSentence)
    console.log(twoAnagrams)

    resultDiv.appendChild(createDiv(twoAnagrams))
});


//3 anagramas
