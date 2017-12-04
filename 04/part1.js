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
		if (uniqueWords.includes(phrase[i])) continue; // if this word already appeared, skip
		else uniqueWords.push(phrase[i]); // else store as unique
	}
	if (phrase.length === uniqueWords.length) valid++; // if all words were unique, increment valid phrase count
});

console.log('Number of valid passphrases is '+ valid);

console.timeEnd('run-time');