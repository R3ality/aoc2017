'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

//input = '1111'; // test input, expecting 4
//input = '123123'; // test input, expecting 12
let capcha = 0;

for (let i = 0; i < input.length; i++) {
	let index = (i+input.length/2 >= input.length) ? (i+input.length/2)-input.length : i+input.length/2; // wrap around for circular array
	if (input[i] == input[index]) { // if next digit matches current digit
		capcha += parseInt(input[index]); // increment solution
	}
}

console.log('CAPCHA for part 2: '+ capcha);
