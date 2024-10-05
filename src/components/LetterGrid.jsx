// Imports
	// Importing the React library
	import { useEffect, useRef } from 'react';

	// Importing defs
	import { hide, show } from '../defs';


export default function LetterGrid() {
	// Guide to the naming system for the segments:
		// First letter 'o' or 'i' is short for 'outer' or 'inner' - the top- and bottom-most eights are 'outer' and the other four are 'inner'
		// Then the direction is specified, e.g., Nw for North-West
		// Then the segment type is specified: V = vertical line, H = horizontal line, Arc = arc as part of one of the circles, Inv = arc that isn't part of the circles (ends on a corner)

	// Refs are used for each segment (remember: you'll have to use .current after the ref to access the element)
	const oNwH   = useRef(null);
	const oNwV   = useRef(null);
	const oNwArc = useRef(null);
	const oNwInv = useRef(null);
	const oNV    = useRef(null);
	const oNeH   = useRef(null);
	const oNeV   = useRef(null);
	const oNeArc = useRef(null);
	const oNeInv = useRef(null);
	const iNwV   = useRef(null);
	const iNwArc = useRef(null);
	const iNV    = useRef(null);
	const iNeV   = useRef(null);
	const iNeArc = useRef(null);
	const iWH    = useRef(null);
	const iEH    = useRef(null);
	const iSwV   = useRef(null);
	const iSwArc = useRef(null);
	const iSV    = useRef(null);
	const iSeV   = useRef(null);
	const iSeArc = useRef(null);
	const oSwV   = useRef(null);
	const oSwH   = useRef(null);
	const oSwArc = useRef(null);
	const oSwInv = useRef(null);
	const oSV    = useRef(null);
	const oSeV   = useRef(null);
	const oSeH   = useRef(null);
	const oSeArc = useRef(null);
	const oSeInv = useRef(null);


	// useEffect is used to animate the grid
	useEffect(() => {
		// This object will be used to keep track of the current permutation, i.e., which segments are currently visible
		let perm = {
			oNwH:   false,
			oNwV:   false,
			oNwArc: false,
			oNwInv: false,
			oNV:    false,
			oNeH:   false,
			oNeV:   false,
			oNeArc: false,
			oNeInv: false,
			iNwV:   false,
			iNwArc: false,
			iNV:    false,
			iNeV:   false,
			iNeArc: false,
			iWH:    false,
			iEH:    false,
			iSwV:   false,
			iSwArc: false,
			iSV:    false,
			iSeV:   false,
			iSeArc: false,
			oSwV:   false,
			oSwH:   false,
			oSwArc: false,
			oSwInv: false,
			oSV:    false,
			oSeV:   false,
			oSeH:   false,
			oSeArc: false,
			oSeInv: false
		};



		// Defining the letter makers
		// Each letter maker will work out which segments should be visible for the letter (based on the rules of the letter)
		// The function will return an array with the segments that should be visible
		
		
		
		const makeLetter = {
			d: () => {
				// D is a fixed letter - no calculations needed
				let newPerm = [];

				newPerm.push("oNwH");
				newPerm.push("oNeArc");
				newPerm.push("iNeV");
				newPerm.push("iSeV");
				newPerm.push("oSeArc");
				newPerm.push("oSwH");
				newPerm.push("oSwV");
				newPerm.push("iSwV");
				newPerm.push("iNwV");
				newPerm.push("oNwV");
				
				return newPerm;
			},

		};

		class letterMaker {
			constructor(letter, previousPerm = null) {
				this.letter = letter;
				this.previousPerm = previousPerm;

				// Calculating the new permutation based on the previous permutation
				this.newPerm = this.calculateNewPerm();
			}

			calculateNewPerm() {
				// The new permutation will be stored in this array, which be updated as the function progresses and then returned at the end
				let newPerm = [];

				// There are some common variable parts of letters, like the corners or the centres; these have presets
				// These presets will get assigned in the letter calculations, but to save repeating code, the segments won't get pushed to newPerm until after the switch
				let cornerNW, cornerNE, cornerSE, cornerSW, centreE, centreW;

				switch (this.letter) {
					case "d":
					case "D":
						// D is a fixed letter - no calculations needed

						newPerm.push(
							"oNwH",
							"oNeArc",
							"iNeV",
							"iSeV",
							"oSeArc",
							"oSwH",
							"oSwV",
							"iSwV",
							"iNwV",
							"oNwV"
						);
						
						break;
					case "q":
					case "Q":
						// Q has one variable in the bottom-right corner

						// Adding the constant segments
						newPerm.push(
							"oNwArc",
							"oNeArc",
							"iNeV",
							"iSeV",
							"oSeArc",
							"oSeInv", // The hook
							"iSwV",
							"iNwV"
						);

						// BOTTOM-RIGHT CORNER is variable: Square or Round
						if (this.previousPerm.oSwV || this.previousPerm.oSwH) {
							// If already Square
							cornerSW = "Square";
						} else if (this.previousPerm.oSwArc) {
							// If already Round
							cornerSW = "Round";
						} else {
							// Otherwise, randomly assign it
							cornerSW = Math.random() < 0.5 ? "Square" : "Round";
						}

						break;
					default:
						// Handle default case if necessary
						break;
				}

				// Presets
				if (cornerSW === "Square") {
					newPerm.push(
						"oSwH",
						"oSwV"
					);
				}
				if (cornerSW === "Round") {
					newPerm.push("oSwArc");
				}

				
				return newPerm;
			}
		}



		// This is the function to change to a new letter (or number, punctuation, etc.)
		function changeToLetter(letter) {
			// Store the existing permutation of the grid
			let existingPerm = Object.assign({}, perm);

			// Changing the permutation to be the new letter
			// Getting the array of segments that should be visible for the new letter
			let visibleSegments = new letterMaker(letter, existingPerm);
			// Updating the permutation object to reflect the new letter
			for (let segment in perm) {
				// If the segment is in the new letter's array of visible segments
				if (visibleSegments.newPerm.includes(segment)) {
					perm[segment] = true;
				} else {
					perm[segment] = false;
				}
			}

			// Going through each segment and hiding or showing it as necessary
			for (let segment in perm) {
				// If the segment is now visible
				if (perm[segment]) {
					show(eval(segment).current);
				} else {
					hide(eval(segment).current);
				}
			}
		}

		changeToLetter("Q")
	}, []);




	return (
		<svg className="LetterGrid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201 401">
			<line 
				className="o-nw-h"
				ref={ oNwH }
				x1=".5" y1=".5" x2="100.5" y2=".5"
			/>
			<line 
				className="o-nw-v"
				ref={ oNwV }
				x1=".5" y1="100.5" x2=".5" y2=".5"
			/>
			<path 
				className="o-nw-arc"
				ref={ oNwArc }
				d="M.5,100.5C.5,45.272,45.272.5,100.5.5"
			/>
			<path 
				className="o-nw-inv"
				ref={ oNwInv }
				d="M.5.5c55.228,0,100,44.772,100,100"
			/>
			<line 
				className="o-n-v"
				ref={ oNV }
				x1="100.5" y1=".5" x2="100.5" y2="100.5"
			/>
			<line 
				className="o-ne-h"
				ref={ oNeH }
				x1="100.5" y1=".5" x2="200.5" y2=".5"
			/>
			<line 
				className="o-ne-v"
				ref={ oNeV }
				x1="200.5" y1=".5" x2="200.5" y2="100.5"
			/>
			<path 
				className="o-ne-arc"
				ref={ oNeArc }
				d="M100.5.5c55.228,0,100,44.772,100,100"
			/>
			<path 
				className="o-ne-inv"
				ref={ oNeInv }
				d="M100.5,100.5C100.5,45.272,145.272.5,200.5.5"
			/>
			<line 
				className="i-nw-v"
				ref={ iNwV }
				x1=".5" y1="200.5" x2=".5" y2="100.5"
			/>
			<path 
				className="i-nw-arc"
				ref={ iNwArc }
				d="M100.5,200.5C45.272,200.5.5,155.728.5,100.5"
			/>
			<line 
				className="i-n-v"
				ref={ iNV }
				x1="100.5" y1="100.5" x2="100.5" y2="200.5"
			/>
			<line 
				className="i-ne-v" 
				ref={ iNeV }
				x1="200.5" y1="100.5" x2="200.5" y2="200.5"
			/>
			<path 
				className="i-ne-arc"
				ref={ iNeArc }
				d="M200.5,100.5c0,55.228-44.772,100-100,100"
			/>
			<line 
				className="i-w-h"
				ref={ iWH }
				x1="100.5" y1="200.5" x2=".5" y2="200.5"
			/>
			<line 
				className="i-e-h"
				ref={ iEH }
				x1="200.5" y1="200.5" x2="100.5" y2="200.5"
			/>
			<line 
				className="i-sw-v"
				ref={ iSwV }
				x1=".5" y1="300.5" x2=".5" y2="200.5"
			/>
			<path 
				className="i-sw-arc"
				ref={ iSwArc }
				d="M.5,300.5c0-55.228,44.772-100,100-100"
			/>
			<line 
				className="i-s-v"
				ref={ iSV }
				x1="100.5" y1="200.5" x2="100.5" y2="300.5"
			/>
			<line 
				className="i-se-v"
				ref={ iSeV }
				x1="200.5" y1="200.5" x2="200.5" y2="300.5"
			/>
			<path 
				className="i-se-arc"
				ref={ iSeArc }
				d="M100.5,200.5c55.228,0,100,44.772,100,100"
			/>
			<line 
				className="o-sw-v"
				ref={ oSwV }
				x1=".5" y1="400.5" x2=".5" y2="300.5"
			/>
			<line 
				className="o-sw-h"
				ref={ oSwH }
				x1="100.5" y1="400.5" x2=".5" y2="400.5"
			/>
			<path 
				className="o-sw-arc"
				ref={ oSwArc }
				d="M100.5,400.5c-55.228,0-100-44.772-100-100"
			/>
			<path 
				className="o-sw-inv"
				ref={ oSwInv }
				d="M100.5,300.5c0,55.228-44.772,100-100,100"
			/>
			<line 
				className="o-s-v" 
				ref={ oSV }
				x1="100.5" y1="300.5" x2="100.5" y2="400.5"
			/>
			<line 
				className="o-se-v"
				ref={ oSeV }
				x1="200.5" y1="300.5" x2="200.5" y2="400.5"
			/>
			<line 
				className="o-se-h" 
				ref={ oSeH }
				x1="200.5" y1="400.5" x2="100.5" y2="400.5"
			/>
			<path 
				className="o-se-arc"
				ref={ oSeArc }
				d="M200.5,300.5c0,55.228-44.772,100-100,100"
			/>
			<path 
				className="o-se-inv"
				ref={ oSeInv }
				d="M200.5,400.5c-55.228,0-100-44.772-100-100"
			/>
		</svg>
	);
}