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
let repeat = null; // for storing the repeating state
let cycle = { count: 0, repeat: 0 }; // cycle counters
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

	cycle.count++; // cycle completed, increment count

	let state = JSON.stringify(input);
	if (known[state]) { // if we've seen this state before
		if (repeat) { // if we're looking for a specific state
			if (repeat === state) done = true; // if this one matches, we're done
		}
		else { // else start looking for this one
			repeat = state;
			cycle.repeat = cycle.count;
		}
	}
	else known[state] = true; // else mark it as seen now
}

console.log('Redistribution cycles for first known state '+ cycle.repeat);
console.log('Number of cycles in repeating loop '+ (cycle.count-cycle.repeat));

console.timeEnd('run-time');