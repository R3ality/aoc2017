'use strict';

const fs = require('fs'), path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

console.time('run-time');

input = input.split(/\r\n|\n|\r/).map(s => { // split by phrase
	return s.split(' '); // then split by word
});

let valid = 0;

input.forEach((phrase) => {
	let uniqueWords = []; // array for unique words in the phrase
	for (let i = 0; i < phrase.length; i++) { // loop words
		let word = phrase[i].split('').sort((a, b) => (a < b) ? -1 : (a > b) ? 1 : 0).join(''); // sort the letters in the word to handle anagrams
		//console.log('Original word = "'+ phrase[i] +'". After sorting = "'+ word +'". Is it unique = '+ uniqueWords.includes(word));
		if (uniqueWords.includes(word)) continue; // if this word already appeared, skip
		else uniqueWords.push(word); // else store as unique
	}
	if (phrase.length === uniqueWords.length) valid++; // if all words were unique, increment valid phrase count
});

console.log('Number of valid passphrases is '+ valid);

console.timeEnd('run-time');