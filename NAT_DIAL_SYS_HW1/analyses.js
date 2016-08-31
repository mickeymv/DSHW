var hUttCount = 0, hTotalWordCount = 0, aTotalWordCount = 0, aUttCount = 0, hDistinctWordCount = 0, hAllWords = {}, aAllWords = {};


function buildReport() {
    var str = '\nTotal Human Dialogue Turns= ' + hUttCount + '\n' + '\nTotal AI Dialogue Turns= ' + aUttCount;
    var str2 = '\nTotal Human word Count= ' + totalNoOfHumanWords() + '\n';
    var str3 = '\nTotal AI word Count= ' + totalNoOfAIWords() + '\n';
    var str4 = '\nTotal Human words per utterance= ' + humanWordsPerTurn() + '\n'+'\nTotal AI words per utterance= ' + AIWordsPerTurn() + '\n'
    +'\nAverage AI wordlength= ' + AIAvgWordLength() + '\n'
    +'\nAverage Human wordlength= ' + humanAvgWordLength() + '\n'
    +'\nDistinct number of AI words= ' + Object.keys(aAllWords).length + '\n'
    +'\nDistinct number of Human words= ' + Object.keys(hAllWords).length + '\n';
    
    return str+str2+str3+str4;
}

function analyzeH(hUtt) {
    hUttCount ++;
    hTotalWordCount += noOfWordsInUtterance(hUtt,true);
}

function analyzeA(aUtt) {
    aUttCount++;
    aTotalWordCount += noOfWordsInUtterance(aUtt,false);
}

function noOfWordsInUtterance(utterance, isHuman) {
    var wordRegex = /[a-zA-Z'\-0-9]{1,}/gm;
    var noOfWordsInUtt = 0;
    while (true) {
        aWord = wordRegex.exec(utterance);
        if (aWord == null) break;
        aWord = aWord[0];
        noOfWordsInUtt++;
       if(isHuman) {
           if(hAllWords[aWord]) {
            hAllWords[aWord++];
           } else {
               hAllWords[aWord] = 1;
           }
        } else {
            if(aAllWords[aWord]) {
                    aAllWords[aWord++];
                   } else {
                       aAllWords[aWord] = 1;
                   }
        } 
    }
        if(noOfWordsInUtt < 4) console.log(utterance);
        return noOfWordsInUtt;
};

function totalNoOfHumanWords() {
    totNoOfWords = 0;
    for(var key in hAllWords) {
        totNoOfWords += hAllWords[key];
    }
    return totNoOfWords;
}

function totalHumanWordLength() {
    totalWordLength = 0;
    for(var key in hAllWords) {
        totalWordLength += key.length*hAllWords[key];
    }
    return totalWordLength;
}

function totalAIWordLength() {
    totalWordLength = 0;
    for(var key in aAllWords) {
        totalWordLength += key.length*aAllWords[key];
    }
    return totalWordLength;
}

function totalNoOfAIWords() {
    totNoOfWords = 0;
    for(var key in aAllWords) {
        totNoOfWords += aAllWords[key];
    }
    return totNoOfWords;
}

function AIWordsPerTurn() {
    return totalNoOfAIWords()/aUttCount;
}

function humanWordsPerTurn() {
    return totalNoOfHumanWords()/hUttCount;
}

function AIAvgWordLength() {
    return totalAIWordLength()/totalNoOfAIWords();
}

function humanAvgWordLength() {
    return totalHumanWordLength()/totalNoOfHumanWords();
}

