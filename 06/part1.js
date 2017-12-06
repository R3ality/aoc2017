'use strict';

const fs = require('fs'), path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

console.time('run-time');

input = input.split(/\t/).map(Number);
//input = [0, 2, 7, 0 ]; // test input, expecting 5

input.forEach((val, ind) => { // convert to array of objects instead
	input[ind] = { bank: ind, data: val};
});

let known = []; // for storing known states
let cycle = 0; // cycle counter
let done = false; // completion flag

while (!done) {
	let sorted = input.slice(0).sort((a, b) => b.data - a.data || a.bank - b.bank); // create a sorted copy without modifying the original
	let data = sorted[0].data; // get the biggest value in the banks..
	let bank = sorted[0].bank; // .. and the index of that bank
	
	input[bank].data = 0; // empty the original bank
	for (let j = 1; j <= data; j++) { // distribute its data between all banks
		let index = ((bank+j) < input.length) ? bank+j : (bank+j) % input.length; // wrap around the end of array
		input[index].data++; // increment value
	}

	cycle++; // cycle completed, increment count

	let state = JSON.stringify(input);
	if (known[state]) done = true; // if we've seen this state before, we're done
	else known[state] = true; // else mark it as seen now
}

console.log('Redistribution cycles for first known state '+ cycle);

console.timeEnd('run-time');