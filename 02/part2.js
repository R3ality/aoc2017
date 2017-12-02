'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

input = input.split(/\r\n|\n|\r/).map(d => { // split by rows
	return d.split(/\t/).map(Number); // then split by columns and parse to int
});

let v = false; // verbose output
let checksum = 0;
let dividesum = 0;

input.forEach((row) => {
	row.sort((a, b) => b - a); // sort row values from largest to smallest
	checksum += row[0] - row[row.length-1]; // substract smallest value from largest value

	row.forEach((val, index) => { // loop through values
		for (let i = index+1; i < row.length; i++) { // loop remaining values after the one we're checking
			if (val % row[i] == 0 ) { // if modulus is 0
				if (v) console.log('Modulus is 0 for division of '+ val +' / '+ row[i] +' = '+ (val/row[i]));
				dividesum += val/row[i];
			}
		}
	});

});

console.log('Spreadsheet checksum is '+ checksum +'. Sum of results for evenly divisible values of each row is '+ dividesum);