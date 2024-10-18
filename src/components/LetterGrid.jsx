// Imports
	// Importing the React library
	import { useEffect, useRef } from 'react';

	// Importing defs
	import { hide, show, randomlyChoose, containsExactSet, containsSet, removeValues, rgbToHex } from '../defs';

	// Importing GSAP
	import { gsap } from 'gsap';


export default function LetterGrid() {
	// Guide to the naming system for the segments:
		// First letter 'o' or 'i' is short for 'outer' or 'inner' - the top- and bottom-most eights are 'outer' and the other four are 'inner'
		// Then the direction is specified, e.g., Nw for North-West
		// Then the segment type is specified: V = vertical line, H = horizontal line, Arc = a segment of circle, Diag = diagonal line

	// Refs are used for each segment (remember: you'll have to use .current after the ref to access the element)
	const oNwV   = useRef(null);
	const oNwH   = useRef(null);
	const oNwArc = useRef(null);
	const oNV    = useRef(null);
	const oNeV   = useRef(null);
	const oNeH   = useRef(null);
	const oNeArc = useRef(null);
	const iNwV   = useRef(null);
	const iNwArc = useRef(null);
	const iNV    = useRef(null);
	const iNeV   = useRef(null);
	const iNeArc = useRef(null);
	const NwDiag = useRef(null);
	const NeDiag = useRef(null);
	const iWH    = useRef(null);
	const iEH    = useRef(null);
	const SwDiag = useRef(null);
	const SeDiag = useRef(null);
	const iSwV   = useRef(null);
	const iSwArc = useRef(null);
	const iSV    = useRef(null);
	const iSeV   = useRef(null);
	const iSeArc = useRef(null);
	const oSwV   = useRef(null);
	const oSwH   = useRef(null);
	const oSwArc = useRef(null);
	const oSV    = useRef(null);
	const oSeV   = useRef(null);
	const oSeH   = useRef(null);
	const oSeArc = useRef(null);
	


	// useEffect will run once the component has mounted
	useEffect(() => {
		// CONTROLLERS
		let controllerColour = false;
		let controllerDur = 0.8;


		// This is an array of all the segments
		const allSegments = [
			"oNwV",
			"oNwH",
			"oNwArc",
			"oNV",
			"oNeV",
			"oNeH",
			"oNeArc",
			"iNwV",
			"iNwArc",
			"iNV",
			"iNeV",
			"iNeArc",
			"NwDiag",
			"NeDiag",
			"iWH",
			"iEH",
			"SwDiag",
			"SeDiag",
			"iSwV",
			"iSwArc",
			"iSV",
			"iSeV",
			"iSeArc",
			"oSwV",
			"oSwH",
			"oSwArc",
			"oSV",
			"oSeV",
			"oSeH",
			"oSeArc"
		];

		// This object will be used to keep track of the current permutation, i.e., which segments are currently visible
		let currentPerm = {
			oNwV: true,
			oNwH: true,
			oNwArc: true,
			oNV: true,
			oNeV: true,
			oNeH: true,
			oNeArc: true,
			iNwV: true,
			iNwArc: true,
			iNV: true,
			iNeV: true,
			iNeArc: true,
			NwDiag: true,
			NeDiag: true,
			iWH: true,
			iEH: true,
			SwDiag: true,
			SeDiag: true,
			iSwV: true,
			iSwArc: true,
			iSV: true,
			iSeV: true,
			iSeArc: true,
			oSwV: true,
			oSwH: true,
			oSwArc: true,
			oSV: true,
			oSeV: true,
			oSeH: true,
			oSeArc: true,
		};

		// The cycle of colours to go through
		const COLOUR_CYCLE = [
			"#f52929",
			"#ff6b00",
			"#fcb500",
			"#9ce500",
			"#0ac8f2",
			"#1e6bff",
			"#743ee6",
			"#ff458f"
		];
		let colourIndex = COLOUR_CYCLE.length - 2; // The index of the colour to start on





		// This function will be used to update the permutation
		function letterMaker(letter, prevPerm = null) {
			// Letter: the letter to be displayed
			// prevPerm: the previous permutation (optional; if not provided, a random permutation will be chosen)
			
			// The new permutation will be stored in this array
			// This will be updated as the function progresses and then returned at the end
			let newPerm = [];




			
			// This function is used to choose segments to show based on the previous permutation and the possible outcomes
			function chooseState(prevPerm, possibleOutcomes, optionalVisibility = false) {
				console.log("chooseState called with:", prevPerm, possibleOutcomes);//TEMP
				
				// PrevPerm is an object with the previous permutation
				// Sample possibleOutcomes: [["oNwV", "oNwH"], ["oNwArc"], ["oNwV", "oNwArc"]] (Square, Round, VStem)
				// optionalVisibility is a boolean for if the segment is optional to be visible (chosen from a 50% chance)

				// Turning the prevPerm object into an array of segments
				let prevPermSegments = Object.keys(prevPerm).filter(key => prevPerm[key]);
				console.log("Previous permutation segments:", prevPermSegments);//TEMP

				// For each possible outcome, we'll count how many of its segments are in the previous permutation
				// We'll then choose the outcome with the most segments in the previous permutation
				let bestOutcome = []; // The best outcome (note, outcomes should be pushed as arrays so this is an array of arrays)
				let bestOutcomeCount = 0; // The number of segments in the best outcome that are in the previous permutation

				// Go through each possible outcome
				for (let i = 0; i < possibleOutcomes.length; i++) {
					const outcome = possibleOutcomes[i]; // The current outcome
					console.log("Processing outcome:", outcome);//TEMP

					// Count how many segments in the outcome are in the previous permutation
					let count = 0;
					for (let j = 0; j < outcome.length; j++) {
						const segment = outcome[j]; // The current segment
						if (prevPermSegments.includes(segment)) {
							count++;
						}
					}
					console.log(`Outcome: ${outcome}, Count: ${count}`);//TEMP

					// The count may be equal to the best outcome count, in which case we'll add it to the best outcome array
					if (count === bestOutcomeCount) {
						bestOutcome.push(outcome);
						console.log(`Added to bestOutcome: ${outcome}`);//TEMP
					}
					// If the count is greater than the best outcome count, we'll replace the best outcome array with this outcome
					if (count > bestOutcomeCount) {
						bestOutcome = [outcome];
						bestOutcomeCount = count;
						console.log(`New bestOutcome: ${outcome}, bestOutcomeCount: ${bestOutcomeCount}`);//TEMP
					}
				}

				// If there are multiple best outcomes, we'll randomly choose one
				const chosenOutcome = randomlyChoose(...bestOutcome);
				console.log("Chosen outcome:", chosenOutcome);//TEMP

				// If it is optionally visible and none of the segments were already visible, we'll return an empty array 50% of the time
				if (optionalVisibility && bestOutcomeCount === 0) {
					if (Math.random() < 0.5) {
						return [];
					}					
				}
				return chosenOutcome;
			}





			// There are some commonly used presets for corners and centres
			// This function is used to invoke the stateChooser by using presets instead of arrays of segments
			function chooseStatePresets(prevPerm, type, location, possibleOutcomes, optionalVisibility = false) {
				console.log("chooseStatePresets called with:", prevPerm, type, location, possibleOutcomes);
				
				// Type is the type of segment: corner, centre, etc.
				// Location is the location of the segment: Ne, Se, Sw, Nw, E, W

				// Possible outcomes is an array of preset segment combinations
					// For corners:
						// "Round": Arc
						// "Square": Horizontal and Vertical
						// "Horizontal": Horizontal
						// "Vertical": Vertical
						// "VStem": Vertical and Arc
					// For centres:
						// "Up": Arc
						// "Down": Arc
						// "Horizontal": Horizontal
					// For centre-corners: (e.g., the inner hook of G)
						// "Round": Arc
						// "Square": Horizontal and Vertical
					

				// Turning possibleOutcomes into a format that stateChooser can use
				let possibleOutcomesSegments = [];
				for (let i = 0; i < possibleOutcomes.length; i++) {
					const outcome = possibleOutcomes[i]; // The current outcome
					console.log("Processing outcome:", outcome);//TEMP
					let outcomeSegments = []; // The segments for this outcome

					// If being used for a corner
					if (type === "corner") {
						let NorS;
						if (location === "Nw" || location === "Ne") {
							NorS = "N";
						} else {
							NorS = "S";
						}
						switch (outcome) {
							case "Round":
								outcomeSegments.push(`o${location}Arc`);
								break;
							case "Square":
								outcomeSegments.push(`o${location}H`, `o${location}V`);
								break;
							case "SquareRound":
								outcomeSegments.push(`o${location}H`, `o${location}V`, `o${location}Arc`);
								break;
							case "Horizontal":
								outcomeSegments.push(`o${location}H`);
								break;
							case "HorizontalRound":
								outcomeSegments.push(`o${location}H`, `o${location}Arc`);
								break;
							case "Vertical":
								outcomeSegments.push(`o${location}V`);
								break;
							case "VStem":
								outcomeSegments.push(`o${location}V`, `o${location}Arc`);
								break;
							default:
								break;
						}   
					}
					// If being used for a centre
					if (type === "centre") {
						let north;
						let south;
						if (location === "W") {
							north = "Nw";
							south = "Sw";
						} else {
							north = "Ne";
							south = "Se";
						}
						switch (outcome) {
							case "Up":
								outcomeSegments.push(`i${north}Arc`);
								break;
							case "Down":
								outcomeSegments.push(`i${south}Arc`);
								break;
							case "Horizontal":
								outcomeSegments.push(`i${location}H`);
								break;
							case "UpDown":
								outcomeSegments.push(`i${north}Arc`, `i${south}Arc`);
								break;
							case "UpHorizontal":
								outcomeSegments.push(`i${north}Arc`, `i${location}H`);
								break;
							case "DownHorizontal":
								outcomeSegments.push(`i${south}Arc`, `i${location}H`);
								break;
							case "UpDownHorizontal":
								outcomeSegments.push(`i${north}Arc`, `i${south}Arc`, `i${location}H`);
							default:
								break;
						}
					}
					// If being used for a centre-corner
					if (type === "centre-corner") {
						let EorW;
						if (location === "Nw" || location === "Sw") {
							EorW = "W";
						} else {
							EorW = "E";
						}
						switch (outcome) {
							case "Round":
								outcomeSegments.push(`i${location}Arc`);
								break;
							case "Square":
								outcomeSegments.push(
									`i${EorW}H`, 
									`i${location}V`
								);
								break; 
							default:
								break;
						}
					}
					console.log("Outcome segments:", outcomeSegments);//TEMP
					possibleOutcomesSegments.push(outcomeSegments);
				}
				console.log("Possible outcomes segments:", possibleOutcomesSegments);//TEMP
				
				// Using the chooseState function to choose the state
				const chosenState = chooseState(prevPerm, possibleOutcomesSegments, optionalVisibility);
				console.log("Chosen state:", chosenState);//TEMP
				return chosenState;
			}
			
			





			// The switch statement will calculate the new permutation based on the letter
			// 1 2 3 4 5 6 7 8 9 0   ! ? . , ' " : ; - + = ( ) [ ] { } < > / \ | @ # $ % ^ & * ~ ` _ =
			switch (letter) {
				case "a":
				case "A":
					// A has 4 variables: the top-left and top-right corners, centre-left and centre-right

					// Adding the constant segments
					newPerm.push(
						"oSwV",
						"iSwV",
						"iNwV",
						"oSeV",
						"iSeV",
						"iNeV"
					);

					// VARIABLE SEGMENTS
						// TOP-LEFT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Nw", ["Square", "Round"/* , "SquareRound" */]));
						// TOP-RIGHT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Ne", ["Square", "Round"/* , "SquareRound" */]));
						// CENTRE-LEFT is variable: Up, Down or Horizontal
						newPerm.push(...chooseStatePresets(prevPerm, "centre", "W", ["Up", "Down", "Horizontal"/* , "UpHorizontal", "DownHorizontal", "UpDownHorizontal" */]));
						// CENTRE-RIGHT is variable: Up, Down or Horizontal
						newPerm.push(...chooseStatePresets(prevPerm, "centre", "E", ["Up", "Down", "Horizontal"/* , "UpHorizontal", "DownHorizontal", "UpDownHorizontal" */]));

					break;
				case "b":
				case "B":
					// B has 5 variables: the top-left, top-right and bottom-right corners, and the centre-left and centre-right which are both custom

					// Adding the constant segments
					newPerm.push(
						"iNwV",
						"iSwV",
						"oSwV",
						"oSwH"
					);

					// VARIABLE SEGMENTS
						// TOP-LEFT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Nw", ["Square", "Round"/* , "SquareRound" */]));
						// TOP-RIGHT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Ne", ["Square", "Round"/* , "SquareRound" */]));
						// BOTTOM-RIGHT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Se", ["Square", "Round"/* , "SquareRound" */]));
						// CENTRE-LEFT is variable: Up, Down or Horizontal, but random chance of not being visible
						newPerm.push(...chooseStatePresets(prevPerm, "centre", "W", ["Up", "Down", "Horizontal"/* , "UpHorizontal", "DownHorizontal", "UpDownHorizontal" */], true));
						// CENTRE-RIGHT is custom
						// Possible outcomes:
							// Round on top and bottom
							// Round on top and Square on bottom
							// Square on top and Round on bottom
						newPerm.push(...chooseState(prevPerm, [
							["iNeArc", "iSeArc"], 
							["iNeArc", "iEH", "iSeV"], 
							["iNeV", "iEH", "iSeArc"]
						]));

					break;
				case "c":
				case "C":
					// C has 2 main variables: the top-right and bottom-right corners
					// C has 2 structural variables: the top-left and bottom-left corners

					// Adding the constant segments
					newPerm.push(
						"oNwArc",
						"iNwV",
						"iSwV",
						"oSwArc"
					);

					// VARIABLE SEGMENTS
						// TOP-RIGHT CORNER is variable: Horizontal or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Ne", ["Horizontal", "Round"/* , "SquareRound" */]));
						// BOTTOM-RIGHT CORNER is variable: Horizontal or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Se", ["Horizontal", "Round"/* , "SquareRound" */]));

					// // STRUCTURAL VARIABLES
					// 	// BOTTOM-LEFT CORNER is structurally variable: Round or SquareRound
					// 	newPerm.push(...chooseStatePresets(prevPerm, "corner", "Sw", ["Round"/* , "SquareRound" */]));
					// 	// TOP-LEFT CORNER is structurally variable: Round or SquareRound
					// 	newPerm.push(...chooseStatePresets(prevPerm, "corner", "Nw", ["Round"/* , "SquareRound" */]));

					break;
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
				case "e":
				case "E":
					// E has 6 variables, all 4 corners and the centre-left and centre-right

					// Adding the constant segments
					newPerm.push(
						"iNwV",
						"iSwV"
					);

					// VARIABLE SEGMENTS
						// TOP-LEFT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Nw", ["Square", "Round"]));
						// TOP-RIGHT CORNER is variable: Horizontal or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Ne", ["Horizontal", "Round"]));
						// BOTTOM-RIGHT CORNER is variable: Horizontal or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Se", ["Horizontal", "Round"]));
						// BOTTOM-LEFT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Sw", ["Square", "Round"]));
						// CENTRE-LEFT is variable: Up, Down or Horizontal
						newPerm.push(...chooseStatePresets(prevPerm, "centre", "W", ["Up", "Down", "Horizontal"]));
						// CENTRE-RIGHT is custom: Horizontal, but random chance of not being visible
						newPerm.push(...chooseState(prevPerm, [["iEH"]], true));

					break;
				case "f":
				case "F":
					// F has 4 variables: the top-left and top-right corners, and the centre-left and centre-right

					// Adding the constant segments
					newPerm.push(
						"iNwV",
						"iSwV",
						"oSwV"
					);

					// VARIABLE SEGMENTS
						// TOP-LEFT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Nw", ["Square", "Round"]));
						// TOP-RIGHT CORNER is variable: Horizontal or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Ne", ["Horizontal", "Round"]));
						// CENTRE-LEFT is variable: Down or Horizontal
						newPerm.push(...chooseStatePresets(prevPerm, "centre", "W", ["Down", "Horizontal"]));
						// CENTRE-RIGHT is custom: Horizontal, but random chance of not being visible
						newPerm.push(...chooseState(prevPerm, [["iEH"]], true));

					break;
				case "g":
				case "G":
					// G has 3 variables: the top-right and bottom-right corners, and the centre-SE

					// Adding the constant segments
					newPerm.push(
						"oNwArc",
						"iNwV",
						"iSwV",
						"oSwArc"
					);

					// VARIABLE SEGMENTS
						// TOP-RIGHT CORNER is variable: Horizontal, Round or Square
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Ne", ["Horizontal", "Round", "Square"]));
						// BOTTOM-RIGHT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Se", ["Square", "Round"]));
						// CENTRE-SE is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "centre-corner", "Se", ["Square", "Round"]));

					break;
				case "h":
				case "H":
					// H has 1 variable: the centre, which is custom

					// Adding the constant segments
					newPerm.push(
						"oNwV",
						"iNwV",
						"iSwV",
						"oSwV",
						"oNeV",
						"iNeV",
						"iSeV",
						"oSeV"
					);

					// VARIABLE SEGMENTS
						// CENTRE is custom:
						// Possible outcomes:
							// Up on left, Horizontal on right
							// Horizontal on left, Up on right
							// Down on left, Horizontal on right
							// Horizontal on left, Down on right
							// Horizontal on left, Horizontal on right
							// Up on left, Down on right
							// Down on left, Up on right
						newPerm.push(...chooseState(prevPerm, [
							["iNwArc", "iEH"],
							["iWH", "iNeArc"],
							["iSwArc", "iEH"],
							["iWH", "iSeArc"],
							["iWH", "iEH"],
							["iNwArc", "iSeArc"],
							["iSwArc", "iNeArc"]
						]));

					break;
				case "i":
				case "I":
					// I has 1 variable: the serifs are optional

					// Adding the constant segments
					newPerm.push(
						"oNV",
						"iNV",
						"iSV",
						"oSV"
					);

					// VARIABLE SEGMENTS
						// SERIFS are custom: randomly chosen to be visible or not
						newPerm.push(...chooseState(prevPerm, [["oNwH", "oSwH", "oNeH", "oSeH"]], true));

					break;
				case "j":
				case "J":
					// J is complex, and is done completely customly

					// Picking whether the stem is in the middle or on the right (this functions as a constant segment)
					newPerm.push(...chooseState(prevPerm, [
						["oNV", "iNV", "iSV"], // Stem in the middle
						["oNeV", "iNeV", "iSeV", "oSeArc"] // Stem on the right
					]));

					// VARIABLE SEGMENTS
						// Checking if the stem is in the middle
						if (newPerm.includes("oNV")) {
							// The J with the stem in the middle has 2 variables: the hook and the top serifs, the latter of which are optional, all of which are custom

							// HOOK is custom:
							newPerm.push("oSV", "oSwArc");

							// TOP SERIFS are custom: randomly chosen to be visible or not
							newPerm.push(...chooseState(prevPerm, [
								["oNwH"], 
								["oNwH", "oNeH"]
							], true));
						} else {
							// The J with the stem on the right has 2 variables: the hook and the top serifs, the latter of which are optional, all of which are custom

							// HOOK is custom:
							// Possible outcomes:
								// Curve continues
								// Curve becomes horizontal
							newPerm.push(...chooseState(prevPerm, [
								["oSwArc"],
								["oSwH"]
							]));

							// TOP SERIFS are custom: randomly chosen to be visible or not
							newPerm.push(...chooseState(prevPerm, [
								["oNeH"], 
								["oNeH", "oNwH"]
							], true));
						}

					break;
				case "k":
				case "K":
					// K has 2 variables: the centre-left and the bottom-right quarter, the latter of which is custom

					// Adding the constant segments
					newPerm.push(
						"oNwV",
						"iNwV",
						"iSwV",
						"oSwV",
						"iNeArc"
					);

					// VARIABLE SEGMENTS
						// CENTRE-LEFT is variable: Up, Down or Horizontal
						newPerm.push(...chooseStatePresets(prevPerm, "centre", "W", ["Up", "Down", "Horizontal"]));
						// BOTTOM-RIGHT QUARTER is custom:
						// Possible outcomes:
							// Straight leg: Diagonal
							// Outwards leg: Round then Down
						newPerm.push(...chooseState(prevPerm, [
							["SeDiag"],
							["iSeArc", "oSeV"]
						]));

					break;
				case "l":
				case "L":
					// L has 2 variables: the bottom-left and bottom-right corners

					// Adding the constant segments
					newPerm.push(
						"oNwV",
						"iNwV",
						"iSwV"
					);

					// VARIABLE SEGMENTS
						// BOTTOM-LEFT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Sw", ["Square", "Round"]));
						// BOTTOM-RIGHT CORNER is variable: Horizontal or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Se", ["Horizontal", "Round"]));

					break;
				case "m":
				case "M":
					// M has 1 variable: the top, which is custom

					// Adding the constant segments
					newPerm.push(
						"iNwV",
						"iSwV",
						"oSwV",
						"iNeV",
						"iSeV",
						"oSeV",
						"oNeV",
						"oNwV",
						"NwDiag",
						"NeDiag"
					);

					// // VARIABLE SEGMENTS
					// 	// TOP is custom:
					// 	// Possible outcomes:
					// 		// Diagonal on left, Curved on right
					// 		// Curved on left, Diagonal on right
					// 		// Diagonal on left, Diagonal on right
					// 	newPerm.push(...chooseState(prevPerm, [
					// 		["oNwV", "oNwInv", "oNeV", "oNeInv"],
					// 		["oNwV", "oNwInv", "oNV", "oNeArc"],
					// 		["oNwArc", "oNV", "oNeInv", "oNeV"]
					// 	]));

					//!Could add more variables

					break;
				case "n":
				case "N":
					// N has 2 variables: the top-left and bottom-right corners

					// Adding the constant segments
					newPerm.push(
						"iNwV",
						"iSwV",
						"oSwV",
						"oNeV",
						"iNeV",
						"iSeV",
						"oNwV",
						"NwDiag",
						"SeDiag",
						"oSeV"
					);

					// VARIABLE SEGMENTS
						// // TOP-LEFT CORNER is variable: Outwards or Inwards
						// newPerm.push(...chooseStatePresets(prevPerm, "corner", "Nw", ["Outwards", "Inwards"]));
						// // BOTTOM-RIGHT CORNER is variable: Outwards or Inwards
						// newPerm.push(...chooseStatePresets(prevPerm, "corner", "Se", ["Outwards", "Inwards"]));

						//!Could add more variables

					break;
				case "o":
				case "O":
					// O has 2 variables: the bottom-left and bottom-right corners

					// Adding the constant segments
					newPerm.push(
						"iSwV",
						"iNwV",
						"oNwArc",
						"oNeArc",
						"iNeV",
						"iSeV"
					);

					// VARIABLE SEGMENTS
						// BOTTOM-LEFT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Sw", ["Square", "Round"]));
						// BOTTOM-RIGHT CORNER is variable: Square or Round, BUT if the bottom-left corner is Round, the bottom-right corner must also be Round
						if (newPerm.includes("oSwArc")) {
							newPerm.push("oSeArc");
						} else {
							newPerm.push(...chooseStatePresets(prevPerm, "corner", "Se", ["Square", "Round"]));
						}

					break;
				case "p":
				case "P":
					// P has 4 variables: the top-left corner, the top-right corner, the centre-left and the centre-NE

					// Adding the constant segments
					newPerm.push(
						"iNwV",
						"iSwV",
						"oSwV"
					);

					// VARIABLE SEGMENTS
						// TOP-LEFT CORNER is variable: Square, Round or VStem
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Nw", ["Square", "Round", "VStem"]));
						// TOP-RIGHT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Ne", ["Square", "Round"]));
						// CENTRE-LEFT is variable: Up, Down or Horizontal
						newPerm.push(...chooseStatePresets(prevPerm, "centre", "W", ["Up", "Down", "Horizontal"]));
						// CENTRE-NE is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "centre-corner", "Ne", ["Square", "Round"]));

					break;
				case "q":
				case "Q":
					// Q has 1 variable: the bottom-left corner

					// Adding the constant segments
					newPerm.push(
						"oNwArc",
						"oNeArc",
						"iNeV",
						"iSeV",
						"oSeArc",
						"iSwV",
						"iNwV",
						"SeDiag"
					);

					// VARIABLE SEGMENTS
						// BOTTOM-LEFT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Sw", ["Square", "Round"]));

						//!Could add more variables

					break;
				case "r":
				case "R":
					// R has 5 variables: the top-left corner, the top-right corner, the centre-left, the centre-NE and the bottom-right quarter

					// Adding the constant segments
					newPerm.push(
						"iNwV",
						"iSwV",
						"oSwV"
					);

					// VARIABLE SEGMENTS
						// TOP-LEFT CORNER is variable: Square, Round or VStem
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Nw", ["Square", "Round", "VStem"]));
						// TOP-RIGHT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Ne", ["Square", "Round"]));
						// CENTRE-LEFT is variable: Up, Down or Horizontal
						newPerm.push(...chooseStatePresets(prevPerm, "centre", "W", ["Up", "Down", "Horizontal"]));
						// CENTRE-NE is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "centre-corner", "Ne", ["Square", "Round"]));
						// BOTTOM-RIGHT QUARTER is custom:
						// Possible outcomes:
							// Straight leg: Diagonal
							// Outwards leg: Round then Down
							newPerm.push(...chooseState(prevPerm, [
								["SeDiag"],
								["iSeArc", "oSeV"]
							]));

					break;
				case "s":
				case "S":
					// S has 2 variables: the top-right and bottom-left corners

					// Adding the constant segments
					newPerm.push(
						"oNwArc",
						"iNwArc",
						"iSeArc",
						"oSeArc"
					);

					// VARIABLE SEGMENTS
						// TOP-RIGHT CORNER is variable: Horizontal or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Ne", ["Horizontal", "Round"]));
						// BOTTOM-LEFT CORNER is variable: Horizontal or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Sw", ["Horizontal", "Round"]));

					break;
				case "t":
				case "T":
					// T has 1 variable: the top of the stem, which is custom

					// Adding the constant segments
					newPerm.push(
						"oNwH",
						"oNeH",
						"iNV",
						"iSV",
						"oSV",
						"oNV"
					);

					// // VARIABLE SEGMENTS
					// 	// TOP OF STEM is custom:
					// 	// Possible outcomes:
					// 		// Vertical
					// 		// Curving to the left (Inv)
					// 	newPerm.push(...chooseState(prevPerm, [
					// 		["oNV"],
					// 		["oNwInv"]
					// 	]));

					break;
				case "u":
				case "U":
					// U have 1 variable: the bottom-right corner, which is custom

					// Adding the constant segments
					newPerm.push(
						"oNwV",
						"iNwV",
						"iSwV",
						"oSwArc",
						"oSeArc",
						"iSeV",
						"iNeV",
						"oNeV"
					);

					// VARIABLE SEGMENTS
						// BOTTOM-RIGHT CORNER is custom: Vertical, but random chance of not being visible
						newPerm.push(...chooseState(prevPerm, [["oSeV"]], true));

					break;
				case "v":
				case "V":
					// V is a fixed letter - no calculations needed

					newPerm.push(
						"oNwV",
						"iNwV",
						"iSwV",
						"oSwV",
						"oSwH",
						"oSeArc",
						"iSeV",
						"iNeV",
						"oNeV"
					);

					break;
				case "w":
				case "W":
					// W is a fixed letter - no calculations needed

					// Adding the constant segments
					newPerm.push(
						"oNwV",
						"iNwV",	
						"iSwV",
						"oNeV",
						"iNeV",
						"iSeV",
						"oSwV",
						"SwDiag",
						"SeDiag",
						"oSeV",
					);

					break;
				case "x":
				case "X":
					// X is complex, and is done completely customly

					newPerm.push(...chooseState(prevPerm, [
						["oNwV", "iNwArc", "oNeV", "iNeArc", "oSwV", "iSwArc", "oSeV", "iSeArc"],
						["NwDiag", "NeDiag", "SeDiag", "SwDiag"]
					]));
					
					break;
				case "y":
				case "Y":
					// Y has 3 variables: the centre-NW, the centre-right and the bottom-left corner

					// If the previous permutation has the upper diagonal segments, then use the special symmetrical Y shape
					if (prevPerm["NwDiag"] || prevPerm["NeDiag"]) { 
						newPerm.push(
							"NwDiag",
							"NeDiag",
							"iSV",
							"oSV"
						);
					} else {

						// Adding the constant segments
						newPerm.push(
							"oNwV",
							"oNeV",
							"iNeV",
							"iSeV",
							"oSeArc"
						);

						// VARIABLE SEGMENTS
							// CENTRE-NW is variable: Square or Round
							newPerm.push(...chooseStatePresets(prevPerm, "centre-corner", "Nw", ["Square", "Round"]));
							// CENTRE-RIGHT is variable: Up, Down or Horizontal
							newPerm.push(...chooseStatePresets(prevPerm, "centre", "E", ["Up", "Down", "Horizontal"]));
							// BOTTOM-LEFT CORNER is variable: Horizontal or Round
							newPerm.push(...chooseStatePresets(prevPerm, "corner", "Sw", ["Horizontal", "Round"]));
					}

					break;
				case "z":
				case "Z":
					// Z is a fixed letter - no calculations needed

					newPerm.push(
						"oNwH",
						"oNeH",
						"NeDiag",
						"SwDiag",
						"oSwH",
						"oSeH"
					);

					break;
				default:
					// (For now) the default option is to clear the grid

					newPerm = [];

					break;
			}

			// Returning the new permutation
			return newPerm;
		}











		// This is the function to change to a new letter (or number, punctuation, etc.)
		function changeToLetter(letter) {
			// Store the existing permutation of the grid
			let existingPerm = Object.assign({}, currentPerm);
			let existingPermSegments = Object.keys(existingPerm).filter(key => existingPerm[key]);
			console.log("existingPerm: ", existingPerm, existingPermSegments);//TEMP

			// Getting the array of segments that should be visible for the new letter
			let newPerm = letterMaker(letter, existingPerm);
			console.log("newPerm: ", newPerm);//TEMP
			
			// Getting the array of segments that are being added
			let addedSegments = newPerm.filter(segment => !existingPermSegments.includes(segment));
			let groupedAddedSegments = groupSegments(addedSegments, letter);
			console.log("Added: ", addedSegments);//TEMP
			console.log("Grouped Added: ", groupedAddedSegments);//TEMP

			// Getting the array of segments that are being removed
			let removedSegments = existingPermSegments.filter(segment => !newPerm.includes(segment));
			let groupedRemovedSegments = groupSegments(removedSegments);
			console.log("Removed: ", removedSegments, groupedRemovedSegments);//TEMP

			// Getting the array of segments that are being kept
			let keptSegments = existingPermSegments.filter(segment => !removedSegments.includes(segment));


			// Changing the added colour
			// Getting a list of the colours currently visible
			let visibleColours = [];
			for (let segment of existingPermSegments) {
				let colour = eval(segment).current.style.stroke;
				console.log("Segment: ", segment, "Colour: ", colour);//TEMP
				
				// The colour is represented as an RGB string, e.g. "rgb(116, 62, 230)", so we need to convert it to a hex string
				// The rgbToHex function takes the RGB values as input, so we need to extract them from the string
				if (colour) {
					let rgb = colour.match(/\d+/g).map(Number);
					let colourHex = rgbToHex(...rgb);
					console.log("Colour: ", colourHex);//TEMP
	
					if (!visibleColours.includes(colourHex)) {
						visibleColours.push(colourHex);
					}
				}
			}
			console.log("Visible Colours: ", visibleColours);//TEMP

			// Getting a list of colours that could be used
			let availableColours = COLOUR_CYCLE.filter(colour => !visibleColours.includes(colour));
			console.log("Available Colours: ", availableColours);//TEMP

			// Choosing a new colour
			let newColour = randomlyChoose(...availableColours);
			console.log("New Colour: ", newColour);//TEMP

			

			// if (addedSegments.length > 0) {
			// 	if (colourIndex === COLOUR_CYCLE.length - 1) {
			// 		colourIndex = 0;
			// 	} else {
			// 		colourIndex++;
			// 	}	
			// }

			// The hierarchy of the segments; this dictates the order in which the segments are drawn
			const segmentsHierarchy = [
				"oNwV",
				"iNwV",
				"iSwV",
				"oSwV",
				"oNwH",
				"NwDiag",
				"oNwArc",
				"iNwArc",
				"iWH",
				"oNV",
				"iNV",
				"oNeH",
				"oNeV",
				"oNeArc",
				"NeDiag",
				"iNeV",
				"iNeArc",
				"iEH",
				"SwDiag",
				"iSV",
				"SeDiag",
				"iSwArc",
				"iSeV",
				"iSeArc",
				"oSwArc",
				"oSeV",
				"oSeArc",
				"oSwH",
				"oSV",
				"oSeH"
			];
			
			// Ordering the groupedAddedSegments and groupedRemovedSegments arrays based on the segmentsHierarchy array
			groupedAddedSegments.sort((a, b) => segmentsHierarchy.indexOf(a[0]) - segmentsHierarchy.indexOf(b[0]));
			groupedRemovedSegments.sort((a, b) => segmentsHierarchy.indexOf(a[0]) - segmentsHierarchy.indexOf(b[0]));
			console.log("Ordered Added: ", groupedAddedSegments);//TEMP

			
			// Updating the permutation to reflect the new letter and showing/hiding segments as necessary
			let letterChangeTl = gsap.timeline({ paused: true });
			
			// Setting the duration and easing of the animations
			let dur = controllerDur;
			let ease = "power2.inOut";

			// Removing the removed segments
			for (let group of groupedRemovedSegments) {
				console.log("Group: ", group);//TEMP
				// Use GSAP to animate the erasing of the group
				if (group.length === 1) {
					let segment = group[0];

					// Change the status of the segment to invisible
					currentPerm[segment] = false;

					// Erase the segment
					letterChangeTl.to(eval(segment).current, {
						duration: dur,
						strokeDashoffset: -101,
						ease: ease,
						onComplete: () => {
							gsap.set(eval(segment).current, { strokeDashoffset: 101 });
						}
					}, "<");
				} else {
					// If the group has multiple segments, string together the erasing of the segments
					let segmentDuration = dur * 2 / group.length;

					let tl = gsap.timeline({
						paused: true,
						defaults: {
							duration: segmentDuration,
							ease: "none"
						}
					});

					for (let segment of group) {
						// Change the status of the segment to invisible
						currentPerm[segment] = false;

						tl.to(eval(segment).current, {
							strokeDashoffset: -101,
							onComplete: () => {
								gsap.set(eval(segment).current, { strokeDashoffset: 101 });
							}
						});
					}

					letterChangeTl.to(tl, {
						time: tl.duration(),
						duration: tl.duration(),
						ease: ease,
					}, "<");
				}
			}

			// Adding the added segments
			for (let group of groupedAddedSegments) {
				console.log("Group: ", group);//TEMP
				// Use GSAP to animate the drawing of the group
				if (group.length === 1) {
					let segment = group[0];

					// Change the status of the segment to visible
					currentPerm[segment] = true;

					// If the group only has one segment, draw it normally
					letterChangeTl.to(eval(segment).current, {
						duration: dur,
						strokeDashoffset: 0,
						ease: ease,
					}, `>${dur * -1.3}`);

					// Changing the colour of the segment
					if (controllerColour) {
						eval(segment).current.style.stroke = newColour;
					}
				} else {
					// If the group has multiple segments, string together the drawing of the segments
					let segmentDuration = dur * 2 / group.length;

					let tl = gsap.timeline({
						paused: true,
						defaults: {
							duration: segmentDuration,
							ease: "none"
						}
					});

					for (let segment of group) {
						// Change the status of the segment to visible
						currentPerm[segment] = true;

						tl.to(eval(segment).current, {
							strokeDashoffset: 0,
						});

						// Changing the colour of the segment
						// eval(segment).current.style.stroke = COLOUR_CYCLE[colourIndex];
						if (controllerColour) {
							eval(segment).current.style.stroke = newColour;
						}
					}

					letterChangeTl.to(tl, {
						time: tl.duration(),
						duration: tl.duration(),
						ease: ease,
					}, `>${dur * -1.3}`);
				}
			}

			// Play the timeline
			letterChangeTl.play();
		}




		function groupSegments(segments, letter) {
			// Create a copy of the segments array
			let groupedSegments = [...segments];
			console.log("Segments copy: ", groupedSegments);//TEMP

			// Special cases
			// R and K hook
			if ((letter === "r" || letter === "R" || letter === "k" || letter === "K") && containsSet(segments, ["iSeArc", "oSeV"])) {
				groupedSegments = removeValues(groupedSegments, ["iSeArc", "oSeV"]);
				groupedSegments.push(["iSeArc", "oSeV"]);
			}

			// Straight line, centre
			switch (true) {
				case containsSet(segments, [
					"oNV",
					"iNV",
					"iSV",
					"oSV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNV", "iNV", "iSV", "oSV"]);
					groupedSegments.push(["oNV", "iNV", "iSV", "oSV"]);
					break;
				case containsSet(segments, [
					"oNw",
					"iNV",
					"iSV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNw", "iNV", "iSV"]);
					groupedSegments.push(["oNw", "iNV", "iSV"]);
					break;
				case containsSet(segments, [
					"iNV",
					"iSV",
					"oSV"
				]):
					groupedSegments = removeValues(groupedSegments, ["iNV", "iSV", "oSV"]);
					groupedSegments.push(["iNV", "iSV", "oSV"]);
					break;
				case containsSet(segments, [
					"oNw",
					"iNV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNw", "iNV"]);
					groupedSegments.push(["oNw", "iNV"]);
					break;
				case containsSet(segments, [
					"iNV",
					"iSV"
				]):
					groupedSegments = removeValues(groupedSegments, ["iNV", "iSV"]);
					groupedSegments.push(["iNV", "iSV"]);
					break;
				case containsSet(segments, [
					"iSV",
					"oSV"
				]):
					groupedSegments = removeValues(groupedSegments, ["iSV", "oSV"]);
					groupedSegments.push(["iSV", "oSV"]);
					break;
			};

			// Upper circle
			switch (true) {
				case containsSet(segments, [
					"oNeArc",
					"iNeArc",
					"iNwArc",
					"oNwArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNeArc", "iNeArc", "iNwArc", "oNwArc"]);
					groupedSegments.push(["oNeArc", "iNeArc", "iNwArc", "oNwArc"]);
					break;
				case containsSet(segments, [
					"oNwArc",
					"oNeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNwArc", "oNeArc"]);
					groupedSegments.push(["oNwArc", "oNeArc"]);
					break;
				case containsSet(segments, [
					"oNwH",
					"oNeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNwH", "oNeArc"]);
					groupedSegments.push(["oNwH", "oNeArc"]);
					break;
				case containsSet(segments, [
					"oNwArc",
					"oNeH"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNwArc", "oNeH"]);
					groupedSegments.push(["oNwArc", "oNeH"]);
					break;
			};

			// Lower circle
			switch (true) {
				case containsSet(segments, [
					"oSeArc",
					"iSeArc",
					"iSwArc",
					"oSwArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["oSeArc", "iSeArc", "iSwArc", "oSwArc"]);
					groupedSegments.push(["oSeArc", "iSeArc", "iSwArc", "oSwArc"]);
					break;
				case containsSet(segments, [
					"oSwArc",
					"oSeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["oSwArc", "oSeArc"]);
					groupedSegments.push(["oSwArc", "oSeArc"]);
					break;
				case containsSet(segments, [
					"oSwH",
					"oSeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["oSwH", "oSeArc"]);
					groupedSegments.push(["oSwH", "oSeArc"]);
					break;
				case containsSet(segments, [
					"oSwArc",
					"oSeH"
				]):
					groupedSegments = removeValues(groupedSegments, ["oSwArc", "oSeH"]);
					groupedSegments.push(["oSwArc", "oSeH"]);
					break;
			};

			// Middle horizontal bar
			switch (true) {
				case containsSet(segments, [
					"iWH",
					"iEH"
				]):
					groupedSegments = removeValues(groupedSegments, ["iWH", "iEH"]);
					groupedSegments.push(["iWH", "iEH"]);
					break;
				case containsSet(segments, [
					"iNwArc",
					"iNeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["iNwArc", "iNeArc"]);
					groupedSegments.push(["iNwArc", "iNeArc"]);
					break;
				case containsSet(segments, [
					"iSwArc",
					"iSeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["iSwArc", "iSeArc"]);
					groupedSegments.push(["iSwArc", "iSeArc"]);
					break;
				case containsSet(segments, [
					"iNwArc",
					"iEH"
				]):
					groupedSegments = removeValues(groupedSegments, ["iNwArc", "iEH"]);
					groupedSegments.push(["iNwArc", "iEH"]);
					break;
				case containsSet(segments, [
					"iWH",
					"iNeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["iWH", "iNeArc"]);
					groupedSegments.push(["iWH", "iNeArc"]);
					break;
				case containsSet(segments, [
					"iSwArc",
					"iEH"
				]):
					groupedSegments = removeValues(groupedSegments, ["iSwArc", "iEH"]);
					groupedSegments.push(["iSwArc", "iEH"]);
					break;
				case containsSet(segments, [
					"iWH",
					"iSeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["iWH", "iSeArc"]);
					groupedSegments.push(["iWH", "iSeArc"]);
					break;
				case containsSet(segments, [
					"iNwArc",
					"iSeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["iNwArc", "iSeArc"]);
					groupedSegments.push(["iNwArc", "iSeArc"]);
					break;
				case containsSet(segments, [
					"iSwArc",
					"iNeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["iSwArc", "iNeArc"]);
					groupedSegments.push(["iSwArc", "iNeArc"]);
					break;
			};

			// Upper horizontal bar
			switch (true) {
				case containsSet(segments, [
					"oNwH",
					"oNeH"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNwH", "oNeH"]);
					groupedSegments.push(["oNwH", "oNeH"]);
					break;
			};

			// Lower horizontal bar
			switch (true) {
				case containsSet(segments, [
					"oSwH",
					"oSeH"
				]):
					groupedSegments = removeValues(groupedSegments, ["oSwH", "oSeH"]);
					groupedSegments.push(["oSwH", "oSeH"]);
					break;
			};

			// Straight line, left
			switch (true) {
				case containsSet(segments, [
					"oNwV",
					"iNwV",
					"iSwV",
					"oSwV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNwV", "iNwV", "iSwV", "oSwV"]);
					groupedSegments.push(["oNwV", "iNwV", "iSwV", "oSwV"]);
					break;
				case containsSet(segments, [
					"oNwArc",
					"iNwV",
					"iSwV",
					"oSwV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNwArc", "iNwV", "iSwV", "oSwV"]);
					groupedSegments.push(["oNwArc", "iNwV", "iSwV", "oSwV"]);
					break;
				case containsSet(segments, [
					"oNwV",
					"iNwV",
					"iSwV",
					"oSwArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNwV", "iNwV", "iSwV", "oSwArc"]);
					groupedSegments.push(["oNwV", "iNwV", "iSwV", "oSwArc"]);
					break;
				case containsSet(segments, [
					"oNwArc",
					"iNwV",
					"iSwV",
					"oSwArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNwArc", "iNwV", "iSwV", "oSwArc"]);
					groupedSegments.push(["oNwArc", "iNwV", "iSwV", "oSwArc"]);
					break;
				case containsSet(segments, [
					"oNwV",
					"iNwV",
					"iSwV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNwV", "iNwV", "iSwV"]);
					groupedSegments.push(["oNwV", "iNwV", "iSwV"]);
					break;
				case containsSet(segments, [
					"oNwArc",
					"iNwV",
					"iSwV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNwArc", "iNwV", "iSwV"]);
					groupedSegments.push(["oNwArc", "iNwV", "iSwV"]);
					break;
				case containsSet(segments, [
					"iNwV",
					"iSwV",
					"oSwV"
				]):
					groupedSegments = removeValues(groupedSegments, ["iNwV", "iSwV", "oSwV"]);
					groupedSegments.push(["iNwV", "iSwV", "oSwV"]);
					break;
				case containsSet(segments, [
					"iNwV",
					"iSwV",
					"oSwArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["iNwV", "iSwV", "oSwArc"]);
					groupedSegments.push(["iNwV", "iSwV", "oSwArc"]);
					break;
				case containsSet(segments, [
					"oNwV",
					"iNwV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNwV", "iNwV"]);
					groupedSegments.push(["oNwV", "iNwV"]);
					break;
				case containsSet(segments, [
					"oNwArc",
					"iNwV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNwArc", "iNwV"]);
					groupedSegments.push(["oNwArc", "iNwV"]);
					break;
				case containsSet(segments, [
					"iNwV",
					"iSwV"
				]):
					groupedSegments = removeValues(groupedSegments, ["iNwV", "iSwV"]);
					groupedSegments.push(["iNwV", "iSwV"]);
					break;
				case containsSet(segments, [
					"iSwV",
					"oSwV"
				]):
					groupedSegments = removeValues(groupedSegments, ["iSwV", "oSwV"]);
					groupedSegments.push(["iSwV", "oSwV"]);
					break;
				case containsSet(segments, [
					"iSwV",
					"oSwArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["iSwV", "oSwArc"]);
					groupedSegments.push(["iSwV", "oSwArc"]);
					break;
			};
			
			// Straight line, right
			switch (true) {
				case containsSet(segments, [
					"oNeV",
					"iNeV",
					"iSeV",
					"oSeV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNeV", "iNeV", "iSeV", "oSeV"]);
					groupedSegments.push(["oNeV", "iNeV", "iSeV", "oSeV"]);
					break;
				case containsSet(segments, [
					"oNeArc",
					"iNeV",
					"iSeV",
					"oSeV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNeArc", "iNeV", "iSeV", "oSeV"]);
					groupedSegments.push(["oNeArc", "iNeV", "iSeV", "oSeV"]);
					break;
				case containsSet(segments, [
					"oNeV",
					"iNeV",
					"iSeV",
					"oSeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNeV", "iNeV", "iSeV", "oSeArc"]);
					groupedSegments.push(["oNeV", "iNeV", "iSeV", "oSeArc"]);
					break;
				case containsSet(segments, [
					"oNeArc",
					"iNeV",
					"iSeV",
					"oSeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNeArc", "iNeV", "iSeV", "oSeArc"]);
					groupedSegments.push(["oNeArc", "iNeV", "iSeV", "oSeArc"]);
					break;
				case containsSet(segments, [
					"oNeV",
					"iNeV",
					"iSeV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNeV", "iNeV", "iSeV"]);
					groupedSegments.push(["oNeV", "iNeV", "iSeV"]);
					break;
				case containsSet(segments, [
					"oNeArc",
					"iNeV",
					"iSeV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNeArc", "iNeV", "iSeV"]);
					groupedSegments.push(["oNeArc", "iNeV", "iSeV"]);
					break;
				case containsSet(segments, [
					"iNeV",
					"iSeV",
					"oSeV"
				]):
					groupedSegments = removeValues(groupedSegments, ["iNeV", "iSeV", "oSeV"]);
					groupedSegments.push(["iNeV", "iSeV", "oSeV"]);
					break;
				case containsSet(segments, [
					"iNeV",
					"iSeV",
					"oSeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["iNeV", "iSeV", "oSeArc"]);
					groupedSegments.push(["iNeV", "iSeV", "oSeArc"]);
					break;
				case containsSet(segments, [
					"oNeV",
					"iNeV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNeV", "iNeV"]);
					groupedSegments.push(["oNeV", "iNeV"]);
					break;
				case containsSet(segments, [
					"oNeArc",
					"iNeV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNeArc", "iNeV"]);
					groupedSegments.push(["oNeArc", "iNeV"]);
					break;
				case containsSet(segments, [
					"iNeV",
					"iSeV"
				]):
					groupedSegments = removeValues(groupedSegments, ["iNeV", "iSeV"]);
					groupedSegments.push(["iNeV", "iSeV"]);
					break;
				case containsSet(segments, [
					"iSeV",
					"oSeV"
				]):
					groupedSegments = removeValues(groupedSegments, ["iSeV", "oSeV"]);
					groupedSegments.push(["iSeV", "oSeV"]);
					break;
				case containsSet(segments, [
					"iSeV",
					"oSeArc"
				]):
					groupedSegments = removeValues(groupedSegments, ["iSeV", "oSeArc"]);
					groupedSegments.push(["iSeV", "oSeArc"]);
					break;
			};

			// For any segments that are not part of a group, put each one into an array of its own (so it can be animated individually) and add it to the groupedSegments array
			let ungroupedSegments = groupedSegments.filter(segment => !Array.isArray(segment));
			
			for (let segment of ungroupedSegments) {
				let newArray = [segment];
				groupedSegments.push(newArray);
			}

			// Remove the ungrouped segments from the groupedSegments array
			groupedSegments = groupedSegments.filter(segment => Array.isArray(segment));
			
			return groupedSegments;
		}


		

		// A keypress event listener is added to the window to allow the user to change the letter
		const handleKeyPress = (e) => {
			// The key that was pressed is stored in the variable 'key'
			let key = e.key;
			changeToLetter(key);
		};

		window.addEventListener("keypress", handleKeyPress);

		// Cleanup function to remove the event listener
		return () => {
			window.removeEventListener("keypress", handleKeyPress);
		};


	}, []);




	return (
		<svg className="LetterGrid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201 401" preserveAspectRatio='none'>
			<path 
				className="oSeArc" 
				ref={ oSeArc } 
				pathLength={ 100 }
				d="M100.5,400.5c7.468,0,14.278-.263,22.497-1.846,6.204-1.195,12.246-2.72,18.333-5.074,6.088-2.354,11.79-5.558,17.066-8.967s10.126-7.325,14.509-11.708,8.299-9.233,11.708-14.509c3.409-5.276,6.682-10.978,9.035-17.066s3.941-12.029,5.006-18.451c1.603-9.668,1.775-15.303,1.846-22.379"/>
			<path 
				className="oSwArc" 
				ref={ oSwArc } 
				pathLength={ 100 }
				d="M.5,300.5c0,7.468.263,14.278,1.846,22.497,1.195,6.204,2.72,12.246,5.074,18.333,2.354,6.088,5.558,11.79,8.967,17.066s7.325,10.126,11.708,14.509,9.233,8.299,14.509,11.708,10.978,6.682,17.066,9.035,12.029,3.941,18.451,5.006c9.668,1.603,15.303,1.775,22.379,1.846"/>
			<path 
				className="iSeArc" 
				ref={ iSeArc } 
				pathLength={ 100 }
				d="M100.5,200.5c7.076.071,12.711.243,22.379,1.846,6.422,1.065,12.363,2.652,18.451,5.006,6.088,2.354,11.79,5.626,17.066,9.035s10.126,7.325,14.509,11.708,8.299,9.233,11.708,14.509,6.613,10.978,8.967,17.066c2.354,6.088,3.879,12.13,5.074,18.333,1.583,8.219,1.846,15.029,1.846,22.497"/>
			<path 
				className="iSwArc" 
				ref={ iSwArc } 
				pathLength={ 100 }
				d="M.5,300.5c.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451s5.626-11.79,9.035-17.066,7.325-10.126,11.708-14.509,9.233-8.299,14.509-11.708c5.276-3.409,10.978-6.613,17.066-8.967s12.13-3.879,18.333-5.074c8.219-1.583,15.029-1.846,22.497-1.846"/>
			<path 
				className="iNeArc" 
				ref={ iNeArc } 
				pathLength={ 100 }
				d="M100.5,200.5c7.468,0,14.278-.263,22.497-1.846,6.204-1.195,12.246-2.72,18.333-5.074,6.088-2.354,11.79-5.558,17.066-8.967s10.126-7.325,14.509-11.708,8.299-9.233,11.708-14.509c3.409-5.276,6.682-10.978,9.035-17.066,2.354-6.088,3.941-12.029,5.006-18.451,1.603-9.668,1.775-15.303,1.846-22.379"/>
			<path 
				className="iNwArc" 
				ref={ iNwArc } 
				pathLength={ 100 }
				d="M.5,100.5c0,7.468.263,14.278,1.846,22.497,1.195,6.204,2.72,12.246,5.074,18.333,2.354,6.088,5.558,11.79,8.967,17.066s7.325,10.126,11.708,14.509,9.233,8.299,14.509,11.708c5.276,3.409,10.978,6.682,17.066,9.035s12.029,3.941,18.451,5.006c9.668,1.603,15.303,1.775,22.379,1.846"/>
			<path 
				className="oNeArc" 
				ref={ oNeArc } 
				pathLength={ 100 }
				d="M100.5.5c7.076.071,12.711.243,22.379,1.846,6.422,1.065,12.363,2.652,18.451,5.006s11.79,5.626,17.066,9.035,10.126,7.325,14.509,11.708,8.299,9.233,11.708,14.509,6.613,10.978,8.967,17.066c2.354,6.088,3.879,12.13,5.074,18.333,1.583,8.219,1.846,15.029,1.846,22.497"/>
			<path 
				className="oNwArc" 
				ref={ oNwArc } 
				pathLength={ 100 }
				d="M.5,100.5c.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451s5.626-11.79,9.035-17.066,7.325-10.126,11.708-14.509,9.233-8.299,14.509-11.708,10.978-6.613,17.066-8.967,12.13-3.879,18.333-5.074c8.219-1.583,15.029-1.846,22.497-1.846"/>
			
			<line 
				className="SeDiag" 
				ref={ SeDiag } 
				pathLength={ 100 }
				x1="100.5" y1="200.5" x2="200.5" y2="400.5"/>
			<line 
				className="SwDiag" 
				ref={ SwDiag } 
				pathLength={ 100 }
				x1="100.5" y1="200.5" x2=".5" y2="400.5"/>
			<line 
				className="NeDiag" 
				ref={ NeDiag } 
				pathLength={ 100 }
				x1="100.5" y1="200.5" x2="200.5" y2=".5"/>
			<line 
				className="NwDiag" 
				ref={ NwDiag } 
				pathLength={ 100 }
				x1="100.5" y1="200.5" x2=".5" y2=".5"/>
			
			<line 
				className="oSeH" 
				ref={ oSeH } 
				pathLength={ 100 }
				x1="100.5" y1="400.5" x2="200.5" y2="400.5"/>
			<line 
				className="oSwH" 
				ref={ oSwH } 
				pathLength={ 100 }
				x1=".5" y1="400.5" x2="100.5" y2="400.5"/>
			
			<line 
				className="iEH" 
				ref={ iEH } 
				pathLength={ 100 }
				x1="100.5" y1="200.5" x2="200.5" y2="200.5"/>
			<line 
				className="iWH" 
				ref={ iWH } 
				pathLength={ 100 }
				x1=".5" y1="200.5" x2="100.5" y2="200.5"/>
			
			<line 
				className="oNeH" 
				ref={ oNeH } 
				pathLength={ 100 }
				x1="100.5" y1=".5" x2="200.5" y2=".5"/>
			<line 
				className="oNwH" 
				ref={ oNwH } 
				pathLength={ 100 }
				x1=".5" y1=".5" x2="100.5" y2=".5"/>

			<line 
				className="oSV" 
				ref={ oSV } 
				pathLength={ 100 }
				x1="100.5" y1="300.5" x2="100.5" y2="400.5"/>
			<line 
				className="iSV" 
				ref={ iSV } 
				pathLength={ 100 }
				x1="100.5" y1="200.5" x2="100.5" y2="300.5"/>
			<line 
				className="iNV" 
				ref={ iNV } 
				pathLength={ 100 }
				x1="100.5" y1="100.5" x2="100.5" y2="200.5"/>
			<line 
				className="oNV" 
				ref={ oNV } 
				pathLength={ 100 }
				x1="100.5" y1=".5" x2="100.5" y2="100.5"/>
			
			<line 
				className="oSeV" 
				ref={ oSeV } 
				pathLength={ 100 }
				x1="200.5" y1="300.5" x2="200.5" y2="400.5"/>
			<line 
				className="iSeV" 
				ref={ iSeV } 
				pathLength={ 100 }
				x1="200.5" y1="200.5" x2="200.5" y2="300.5"/>
			<line 
				className="iNeV" 
				ref={ iNeV } 
				pathLength={ 100 }
				x1="200.5" y1="100.5" x2="200.5" y2="200.5"/>
			<line 
				className="oNeV" 
				ref={ oNeV } 
				pathLength={ 100 }
				x1="200.5" y1=".5" x2="200.5" y2="100.5"/>
			
			<line 
				className="oSwV" 
				ref={ oSwV } 
				pathLength={ 100 }
				x1=".5" y1="300.5" x2=".5" y2="400.5"/>
			<line 
				className="iSwV" 
				ref={ iSwV } 
				pathLength={ 100 }
				x1=".5" y1="200.5" x2=".5" y2="300.5"/>
			<line 
				className="iNwV" 
				ref={ iNwV } 
				pathLength={ 100 }
				x1=".5" y1="100.5" x2=".5" y2="200.5"/>
			<line 
				className="oNwV" 
				ref={ oNwV } 
				pathLength={ 100 }
				x1=".5" y1=".5" x2=".5" y2="100.5"/>
		</svg>
	);
}