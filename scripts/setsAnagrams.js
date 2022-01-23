const maxLength = longestWord(palavras);

const getSetsOfAnagrams = (db) => {
  let output = [{}];

  for (let wordsLength = 1; wordsLength <= maxLength; wordsLength++) {
    let result = {};
    let filteredWords = filterWordsByLength(wordsLength, db);

    filteredWords.map((item) => {
      let wordAlphabetical = alphabetize(item);
      if (result[wordAlphabetical] === undefined) {
        result[wordAlphabetical] = [item];
      } else {
        result[wordAlphabetical].push(item);
      }
    });
    output.push(result);
  }
  return output;
};

// criar conjuntos de anagramas por tamanho de palavras
const setsOfAnagrams = getSetsOfAnagrams(palavras);

// criar array de anagramsa com cinco ou mais palavras
const getSetsOfFiveAnagrams = () => {
  let counter = 0;
  const setsOfFive = {};
  for (let i = 0; i < setsOfAnagrams.length; i++) {
    let arr = setsOfAnagrams[i];
    for (item in arr) {
      if (arr[item].length >= 5) {
        setsOfFive[item] = [arr[item]];
        counter++;
      }
    }
  }
  console.log(counter);
  return setsOfFive;
};

const verifyInput = (input, key) => {
  let splitedInput = input.split("");
  let splitedKey = key.split("");

  for (let index = 0; index < splitedKey.length; index++) {
    if (!splitedInput.includes(splitedKey[index])) {
      return false;
    } else {
      let positionOfLetter = splitedInput.indexOf(splitedKey[index]);
      splitedInput.splice(positionOfLetter, 1);
    }
  }
  return true;
};

//2 anagramas
const getAnagramsOfTwoWords = (text) => {
  let output = [];

  let textLength = text.length;

  for (let i = 1; i <= textLength - i; i++) {
    // quais conjuntos serão utilizados
    let firstSet = setsOfAnagrams[i];

    if (textLength - i <= maxLength) {
      let lastSet = setsOfAnagrams[textLength - i];
      // iterar sobre os conjuntos selecionados
      for (item in firstSet) {
        if (verifyInput(text, item)) {
          for (item2 in lastSet) {
            if (verifyInput(text, item2)) {
              let partial = alphabetize(item + item2);
              if (partial === text) {
                // criar output com dados que batem
                output.push(`[${firstSet[item]}] + [${lastSet[item2]}]`);
              }
            }
          }
        }
      }
    }
  }
  return output;
};

const btnTwoWords = document.getElementById("btnTwoWordAnagrams");
btnTwoWords.addEventListener("click", () => {
  let resultDiv = document.getElementById("twoWordAnagramsResult");
  resultDiv.innerHTML = "";

  // pegar o texto digitado e coloca-lo em ordem
  let typedText = document.getElementById("input2").value;
  let alphabeticalSentence = alphabetize(typedText);

  // verificar quantas letras possui o texto digitado
  let twoAnagrams = getAnagramsOfTwoWords(alphabeticalSentence);
  console.log(twoAnagrams);

  resultDiv.appendChild(createDiv(twoAnagrams));
});

//3 anagramas
const btnThreeWords = document.getElementById("btnThreeWordAnagrams");
btnThreeWords.addEventListener("click", () => {
  let resultDiv = document.getElementById("threeWordAnagramsResult");
  resultDiv.innerHTML = "";

  // pegar o texto digitado e coloca-lo em ordem
  let typedText = document.getElementById("input3").value;
  let alphabeticalSentence = alphabetize(typedText);

  // verificar quantas letras possui o texto digitado
  let threeAnagrams = getAnagramsOfThreeWords(alphabeticalSentence);
  console.log(threeAnagrams);

  resultDiv.appendChild(createDiv(threeAnagrams));
});

const getAnagramsOfThreeWords = (text) => {
  let output = [];
  let possibleWords = [];
  let textLength = text.length;

  for (let i = 0; i < textLength - 1; i++) {
    let set = setsOfAnagrams[i];
    let result = {};

    //verificar se letras do DB estão contidas nas palavras digitadas
    for (word in set) {
      if (verifyInput(text, word)) {
        result[word] = set[word];
      }
    }
    possibleWords.push(result);
  }

  // iterar sobre os conjuntos selecionados
  for (
    let setOneIndex = 1;
    setOneIndex <= textLength - setOneIndex;
    setOneIndex++
  ) {
    let firstSet = possibleWords[setOneIndex];

    for (
      let setTwoIndex = setOneIndex;
      setTwoIndex <= textLength - (setOneIndex + setTwoIndex);
      setTwoIndex++
    ) {
      let secondSet = possibleWords[setTwoIndex];
      let setLastIndex = textLength - (setOneIndex + setTwoIndex);
      console.log(setOneIndex, setTwoIndex, setLastIndex);

      if (setLastIndex <= maxLength + 1) {
        let lastSet = possibleWords[setLastIndex];
        for (word1 in firstSet) {
          for (word2 in secondSet) {
            let partial = alphabetize(word1 + word2);
            if (verifyInput(text, partial)) {
              for (word3 in lastSet) {
                let complete = alphabetize(partial + word3);
                if (complete === text) {
                  output.push(
                    `[${firstSet[word1]}] + [${secondSet[word2]}] + [${lastSet[word3]}]`
                  );
                }
              }
            }
          }
        }
      }
    }
  }
  return output;
};
