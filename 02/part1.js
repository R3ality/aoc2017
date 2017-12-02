'use strict';

let fs = require('fs');
let path = require('path');
let input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'UTF8');

input = input.split(/\r\n|\n|\r/).map(d => { // split rows
	return d.split(/\t/).map(Number); // then split columns and parse to int
});

let checksum = 0;

input.forEach((row) => {
	row.sort((a, b) => a - b); // sort row values from smallest to largest
	checksum += row[row.length-1] - row[0];// substract smallest value from largest value
});

console.log('Spreadsheet checksum is '+ checksum);