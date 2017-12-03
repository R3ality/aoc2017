'use strict';

let input = 289326;
//input = 25; // test input

let edge = Math.ceil(Math.sqrt(input)); // calculate array length
if (edge % 2 === 0) edge++; // if length is even, increment by 1 (simplifies handing of center slot)

// construct the array
let arr = [];
for (let i = 0; i < edge; i++) {
	arr.push(new Array(edge).fill(0));
}

//for (let i = 0; i < arr.length; i++) console.log(arr[i].join('\t')); // print the array

let x = parseInt(Math.floor(edge/2)), y = parseInt(Math.floor(edge/2)); // center slot coordinates
let port = [x, y], data = null; // variables for the access port (center) and the data coordinates

// fill the array spirally from the center
// some good examples utilized from here: // https://stackoverflow.com/questions/33684970/print-2-d-array-in-clockwise-expanding-spiral-from-center
arr[x][y] = 1; // starting value at the access port
let dir = 0; // direction: 0 = right, 1 = up, 2 = left, 3 = down
let num = 1; // number of slots before direction change
for (let i = 1; i < edge; i++) {
	for (let j = 0; j < (i < (edge-1) ? 2 : 3); j++) {
		for (let k = 0; k < num; k++) {
			let alloc = arr[x][y]; // store previous allocation
			switch (dir) { // move to the next slot based on direction
				case 0: y = y + 1; break;
				case 1: x = x - 1; break;
				case 2: y = y - 1; break;
				case 3: x = x + 1; break;
			}
			arr[x][y] = ++alloc; // increment the allocation and assign to this slot
			if (alloc === input) data = [x, y]; // allocation data match, store the coordinates
		}
		dir = (dir + 1) % 4; // update direction
	}
	num++;
}

//for (let i = 0; i < arr.length; i++) console.log(arr[i].join("\t")); // print the array

// https://en.wikipedia.org/wiki/Taxicab_geometry
function getManhattanDistance(pointA, pointB) {
	pointB = (typeof pointB !== 'undefined') ? pointB : [0, 0]; // if B was not specified, assume 0-coordinate
	return Math.abs(pointA[0]-pointB[0]) + Math.abs(pointA[1]-pointB[1]); // Math.abs(x1-x0) + Math.abs(y1-y0);
}

console.log('Manhattan distance between ('+ port +') and ('+ data +') is '+ getManhattanDistance(data, port));