'use strict';

let input = 289326;
//input = 25; // test input

let edge = Math.ceil(Math.sqrt(input)); // calculate array length
if (edge % 2 === 0) edge++; // if length is even, increment (simplifies handing the center of a spiral array)

// construct the array
let arr = [];
for (let i = 0; i < edge; i++) {
	arr.push(new Array(edge).fill(0));
}

//for (let i = 0; i < arr.length; i++) console.log(arr[i].join('\t')); // print the array

let x = parseInt(Math.floor(edge/2)), y = parseInt(Math.floor(edge/2)); // center coordinates
let answer = null;

// fill the array spirally from the center
// some good examples utilized from here: // https://stackoverflow.com/questions/33684970/print-2-d-array-in-clockwise-expanding-spiral-from-center
arr[x][y] = 1; // starting value at the access port
let dir = 0; // direction: 0 = right, 1 = up, 2 = left, 3 = down
let num = 1; // number of slots before direction change

outerLoop:
for (let i = 1; i < edge; i++) {
	for (let j = 0; j < (i < (edge-1) ? 2 : 3); j++) {
		for (let k = 0; k < num; k++) {
			switch (dir) { // move to the next slot based on direction
				case 0: y = y + 1; break;
				case 1: x = x - 1; break;
				case 2: y = y - 1; break;
				case 3: x = x + 1; break;
			}
			arr[x][y] = getSurroundingSum();
			if (arr[x][y] > input) { // if written value is larger than input
				answer = arr[x][y];
				break outerLoop; // break to label (out of all loops)
			}
		}
		dir = (dir + 1) % 4; // update direction
	}
	num++;
}

//for (let i = 0; i < arr.length; i++) console.log(arr[i].join("\t")); // print the array

// return the sum of all surrounding slots (8)
function getSurroundingSum() {
	let sum = 0;
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			let xx = x+i, yy = y+j;
			if (xx < 0 || xx >= edge) continue; // x out of bounds, skip
			if (yy < 0 || yy >= edge) continue; // y out of bounds, skip
			sum += arr[xx][yy];
		}
	}
	return sum;
}

console.log('First written value that is bigger than the puzzle input is '+ answer);