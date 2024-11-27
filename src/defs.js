// Shortcut to call upon a DOM object (the first object with this CSS selector) by a CSS selector (e.g., h1, #ID, .class, etc.)
export const $$ = (CSSSelector) => document.querySelector(CSSSelector); 
// Shortcut to call upon multiple DOM objects by a CSS selector (e.g., h1, .class, etc.)
export const $$all = (CSSSelector) => document.querySelectorAll(CSSSelector);

// Shortcut for adding CSS classes
export const classAdd = (element, className) => element.classList.add(className);
// Shortcut for removing CSS classes
export const classRemove = (element, className) => element.classList.remove(className);
// Shortcut for removing all CSS classes
export const classRemoveAll = (element) => element.className = '';
// Shortcut for toggling CSS classes - i.e., if the element doesn't have this class it'll be given it, and if it already does it'll be removed from it
export const classToggle = (element, className) => element.classList.toggle(className);
// Shortcut for checking if an element has a certain CSS class
export const classHas = (element, className) => element.classList.contains(className);

// Shortcut for adding event listeners
export const on = (element, event, callback) => element.addEventListener(event, callback);

// Shortcut for console.log
export const log =  () => console.log;

// Math shortcuts
// Min and max
export const min = (numbers) => Math.min(numbers);
export const max = (numbers) => Math.max(numbers);
// Round to the nearest, up and down
export const round = (number) => Math.round(number);
export const roundUp = (number) => Math.ceil(number);
export const roundDown = (number) => Math.floor(number);

// Shortcut for changing a string into start case (This Is Start Case)
export function toStartCase(str) {
	// Creating an array of each word in the sentence
	let splitStr = str.toLowerCase().split(' ');

	for (var i = 0; i < splitStr.length; i++) {
       // Capitalising the first letter of each word in the string
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	}

	// Rejoining the words together back into one string
	let newStr = splitStr.join(" ");

	// Returning the joined string
	return newStr; 
}

// Shortcut for adding a CSS rule (to the global scope)
export const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

// Get a URL param
export const searchParams = () => new URLSearchParams(window.location.search);


// Show an element
export const show = element => classRemove(element, 'hidden');
// Hide an element
export const hide = element => classAdd(element, 'hidden');


// To randomly choose between a set of values
export const randomlyChoose = (...values) => values[roundDown(Math.random() * values.length)];


// To check if an array only contains exactly the same values
export function containsExactSet(array, values) {
	// Check if lengths match first
	if (array.length !== values.length) return false;
	
	// Sort both arrays and check if they are identical
	const sortedArray = array.slice().sort();
	const sortedValues = values.slice().sort();
  
	return sortedArray.every((value, index) => value === sortedValues[index]);
}
// To check if an array contains all but not necessarily just those values
export function containsSet(array, values) {
	return values.every(value => array.includes(value));
}


// To remove values from an array
export function removeValues(array, values) {
	return array.filter(value => !values.includes(value));
}


// To convert a colour from RGB to hex
export function rgbToHex(r, g, b) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}