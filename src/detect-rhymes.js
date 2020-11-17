var cmuDictionary = require('cmu-pronouncing-dictionary');

module.exports = function(message) {

    const noiseWords = ['the', 'a', 'an'];
    let rhymeGroups = {};

    let words = message.match(/['\w]+/g);
    words.sort(w => w.length);

    for (let word of words)
    {
        if (word.length > 1 && noiseWords.indexOf(word.toLowerCase()) === -1)
        {
            let phonemes = cmuDictionary[word.toLowerCase()];

            if (phonemes) {
                let santizedPhonemes = phonemes.replace(/\d/g,'').replace(/UW R$/, 'AO').replace(/UH R$/, 'AO').replace(/AO R$/, 'AO').replace(/EH L/, 'AH L').replace(/AA/g, 'AO').replace(/IH S$/, 'EH S');

                let heuristics = [/AY T$/, /EH D$/]

                for (let heuristic of heuristics)
                {                
                    if (santizedPhonemes.match(heuristic)) {
                        santizedPhonemes = heuristic.toString().replace(/[\/\$]/g, "");
                    }
                }
                            
                let phonemesArray = santizedPhonemes.split(' ');

                let lastVowelIndex = 0, secondLastVowelIndex, vowelsCount = 0;
        
                for (let j = 0; j < phonemesArray.length; j++)
                {
                    if (phonemesArray[j].match(/^[AEIOU]/i))
                    {
                        secondLastVowelIndex = lastVowelIndex;
                        lastVowelIndex = j;
                        vowelsCount++;
                    }
                }
        
                let endPhonemesArray = phonemesArray.slice(vowelsCount > 1 && secondLastVowelIndex > 0 ? secondLastVowelIndex : lastVowelIndex);
                let endPhoneme = endPhonemesArray.join(' ');
            
                for (let key in rhymeGroups)
                {
                    if (endPhoneme.endsWith(key) || key.endsWith(endPhoneme)) 
                        endPhoneme = key;
                }

                if (!rhymeGroups[endPhoneme])
                {
                    rhymeGroups[endPhoneme] = [];
                }
        
                if (rhymeGroups[endPhoneme].indexOf(word.toLowerCase()) < 0)
                {
                    rhymeGroups[endPhoneme].push(word.toLowerCase());
                }
            }
        }
    }

    let returnArray = [];
    
    for (let key in rhymeGroups) {
        if (rhymeGroups[key].length < 2) {
            delete rhymeGroups[key];
        }
        else 
        {
            returnArray.push(rhymeGroups[key]);
        }
    }

    return returnArray;
}