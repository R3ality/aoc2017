'use strict';

const fs = require('fs'), path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

console.time('run-time');

input = input.split(/\r\n|\n|\r/).map(Number);
//input = [0, 3, 0, 1, -3 ]; // test input, expecting 5

let index = { this: 0, prev: null }; // for keeping track of indices
let steps = 0; // puzzle solution
let v = false; // verbose output

while (index.this >= 0 && index.this < input.length) { // while in bounds
	index.prev = index.this; // store current index as previous
	let out = 'Step '+ steps +': at position '+ index.this +' instruction is '+ input[index.this];
	index.this += input[index.this]; // interpret the instruction
	input[index.prev]++; // increment instruction at previous index
	if (v) console.log(out +' thus next index is '+ index.this +' and instruction will be incremented to '+ input[index.prev]);
	steps++; // increment the step counter
}

console.log('Steps in part I to reach the exit: '+ steps);

console.timeEnd('run-time');