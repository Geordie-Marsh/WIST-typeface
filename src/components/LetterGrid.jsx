// Imports
	// Importing the React library
	import { useEffect, useRef } from 'react';

	// Importing defs
	import { hide, show, randomlyChoose, containsExactSet, containsSet } from '../defs';


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
		// This is an array of all the segments
		const allSegments = [
			"oNwH",
			"oNwV",
			"oNwArc",
			"oNwInv",
			"oNV",
			"oNeH",
			"oNeV",
			"oNeArc",
			"oNeInv",
			"iNwV",
			"iNwArc",
			"iNV",
			"iNeV",
			"iNeArc",
			"iWH",
			"iEH",
			"iSwV",
			"iSwArc",
			"iSV",
			"iSeV",
			"iSeArc",
			"oSwV",
			"oSwH",
			"oSwArc",
			"oSwInv",
			"oSV",
			"oSeV",
			"oSeH",
			"oSeArc",
			"oSeInv"
		];

		// This object will be used to keep track of the current permutation, i.e., which segments are currently visible
		let perm = {
			oNwH:   true,
			oNwV:   true,
			oNwArc: true,
			oNwInv: true,
			oNV:    true,
			oNeH:   true,
			oNeV:   true,
			oNeArc: true,
			oNeInv: true,
			iNwV:   true,
			iNwArc: true,
			iNV:    true,
			iNeV:   true,
			iNeArc: true,
			iWH:    true,
			iEH:    true,
			iSwV:   true,
			iSwArc: true,
			iSV:    true,
			iSeV:   true,
			iSeArc: true,
			oSwV:   true,
			oSwH:   true,
			oSwArc: true,
			oSwInv: true,
			oSV:    true,
			oSeV:   true,
			oSeH:   true,
			oSeArc: true,
			oSeInv: true
		};



		

		// This function will be used to update the permutation
		function letterMaker(letter, prevPerm = null) {
			// Letter: the letter to be displayed
			// prevPerm: the previous permutation (optional; if not provided, a random permutation will be chosen)
			
			// The new permutation will be stored in this array
			// This will be updated as the function progresses and then returned at the end
			let newPerm = [];


			
			// This function is used to choose segments to show based on the previous permutation and the possible outcomes
			function chooseState(prevPerm, possibleOutcomes, optionalVisibility = false) {
				console.log("chooseState called with:", prevPerm, possibleOutcomes);
				
				// Sample possibleOutcomes: [["oNwV", "oNwH"], ["oNwArc"], ["oNwV", "oNwArc"]] (Square, Round, VStem)
				// optionalVisibility is a boolean for if the segment is optional to be visible (chosen from a 50% chance)
				
				// Getting all the involved segments (the same segment may appear in multiple outcomes, so this will )
				let segments = [];
				for (let i = 0; i < possibleOutcomes.length; i++) {
					const outcome = possibleOutcomes[i];
					
					// Go through each segment in the outcome
					for (let j = 0; j < outcome.length; j++) {
						const segment = outcome[j];
						
						// If the segment isn't already in the array, add it
						if (!segments.includes(segment)) {
							segments.push(segment);
						}
					}
				}
				console.log("Involved segments:", segments);
				
				// Getting all the segments that AREN'T in involved
				let notInvolvedSegments = allSegments.filter(segment => !segments.includes(segment));
				console.log("Not involved segments:", notInvolvedSegments);
				
				// Getting all the segments that were visible in the previous permutation
				let prevPermSegments = Object.keys(prevPerm).filter(key => prevPerm[key]);
				console.log("Previous permutation segments:", prevPermSegments);

				// We need to test all possible combinations of segments, i.e., first where only one segment is visible, then where two are visible, etc.
				// The problem is that we don't necessarily know how many segments there are
				// So we need to find all possible combinations of segments
				// This is a recursive function that will find all possible combinations of segments
				function findCombinations(segments, length = 1) {
					// If the length is 1, just return the segments
					if (length === 1) {
						return segments.map(segment => [segment]);
					}

					// If the length is greater than 1, find all combinations of the segments
					let combinations = [];
					for (let i = 0; i < segments.length; i++) {
						const segment = segments[i]; // The current segment
						const remainingSegments = segments.slice(i + 1); // The remaining segments
						const smallerCombinations = findCombinations(remainingSegments, length - 1); // The combinations of the remaining segments

						for (let j = 0; j < smallerCombinations.length; j++) {
							const smallerCombination = smallerCombinations[j]; // The current combination of the remaining segments
							combinations.push([segment, ...smallerCombination]); // Add the current segment to the combination of the remaining segments
						}
					}

					// Return all the combinations
					return combinations;
				}


				
				// Now we have all possible combinations of segments, we can test each one
					// We'll start will testing to see if any of the outcomes contains all the segments
					// If no outcomes are found, we'll check to see if this combination of all the possible segments was entirely present in the previous permutation
					// If they are, we'll randomly choose one of the possible outcomes
					// Otherwise, we'll test to see if any of the outcomes contains all but one of the segments
					// Then all but two, etc.
					// If there are multiple outcomes that match this number of segments, we'll randomly choose one
					// If an outcome is found, we'll stop the loop after testing all outcomes against that number of segments
					// If at the end no outcomes are found, we'll randomly choose one of the possible outcomes
				let matchingOutcomes = [];
				for (let i = segments.length; i >= 1; i--) {
					// Getting all combinations of segments of length i
					const combinations = findCombinations(segments, i);
					console.log(`Testing combinations of length ${i}:`, combinations);

					// Go through each combination
					for (let j = 0; j < combinations.length; j++) {
						const combination = combinations[j]; // The current combination
						console.log("Testing combination:", combination);

						// Check to see if the combination matches the previous permutation and doesn't contain any segments that aren't involved
						console.log(containsSet(prevPermSegments, combination), !containsSet(notInvolvedSegments, combination));
						if (containsSet(prevPermSegments, combination) && !containsSet(notInvolvedSegments, combination)) {
							console.log("Combination matches previous permutation and doesn't contain not involved segments:", combination);

							// If it does, check to see which (if any) of the possible outcomes contains the combination

							for (let k = 0; k < possibleOutcomes.length; k++) {
								const outcome = possibleOutcomes[k]; // The current outcome

								// If the outcome contains the combination and isn't already in the matchingOutcomes array
								if (containsSet(outcome, combination) && !matchingOutcomes.includes(outcome)) {
									// Add the outcome to the matchingOutcomes array
									matchingOutcomes.push(outcome);
								}
							}

						}
					}

					// If there are already any matching outcomes, stop the loop
					if (matchingOutcomes.length > 0) {
						break;
					}

					// If no outcomes are found and this is the combination with all the possible segments in it, check to see if the previous permutation contains all the segments
					if (i === segments.length && containsSet(prevPermSegments, segments)) {
						console.log("Previous permutation contains all segments");
						// If it does, randomly choose one of the possible outcomes
						const chosenOutcome = randomlyChoose(...possibleOutcomes);
						console.log("Randomly chosen outcome:", chosenOutcome);
						return chosenOutcome;
					}
				}




				console.log("Matching outcomes:", matchingOutcomes);

				// If there are no matching outcomes, randomly pick one of the possible outcomes
				if (matchingOutcomes.length === 0) {
					console.log("No matching outcomes found, randomly choosing one of the possible outcomes");
					const chosenOutcome = randomlyChoose(...possibleOutcomes);
					console.log("Randomly chosen outcome (const):", chosenOutcome);

					// If the outcome is already entirely present in the previous permutation, it can't be optionally visible
					// If it's not entirely present and optionallyVisible is true, there's a 50% chance it won't be visible
					console.log("TESTING: " + !containsSet(prevPermSegments, chosenOutcome), optionalVisibility, Math.random() < 0.5)
					if (!containsSet(prevPermSegments, chosenOutcome) && optionalVisibility && Math.random() < 0.5) {
						console.log("Outcome is optionally visible and randomly chosen not to be visible");
						return [];
					}

					return chosenOutcome;
				} else if (matchingOutcomes.length === 1) {
					// If there is only one matching outcome

					// If the outcome is already entirely present in the previous permutation, it can't be optionally visible
					// If it's not entirely present and optionallyVisible is true, there's a 50% chance it won't be visible
					console.log("TESTING: " + containsSet(prevPermSegments, [matchingOutcomes[0]]), optionalVisibility, Math.random() < 0.5)
					if (containsSet(prevPermSegments, [matchingOutcomes[0]]) && optionalVisibility && Math.random() < 0.5) {
						console.log("Outcome is optionally visible and randomly chosen not to be visible");
						return [];
					}

					console.log("One matching outcome found:", matchingOutcomes[0]);
					return matchingOutcomes[0];
				} else {
					// If there are multiple matching outcomes, randomly choose one
					const chosenOutcome = randomlyChoose(...matchingOutcomes);
					console.log("Multiple matching outcomes found, randomly chosen  (const):", chosenOutcome);

					// If the outcome is already entirely present in the previous permutation, it can't be optionally visible
					// If it's not entirely present and optionallyVisible is true, there's a 50% chance it won't be visible
					console.log("TESTING: " + containsSet(prevPermSegments, chosenOutcome), optionalVisibility, Math.random() < 0.5)
					if (containsSet(prevPermSegments, chosenOutcome) && optionalVisibility && Math.random() < 0.5) {
						console.log("Outcome is optionally visible and randomly chosen not to be visible");
						return [];
					}
					
					return chosenOutcome;
				}
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

				// Turning possibleOutcomes into a format that stateChooser can use
				let possibleOutcomesSegments = [];
				for (let i = 0; i < possibleOutcomes.length; i++) {
					const outcome = possibleOutcomes[i]; // The current outcome
					console.log("Processing outcome:", outcome);
					let outcomeSegments = [];
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
							case "Horizontal":
								outcomeSegments.push(`o${location}H`);
								break;
							case "Vertical":
								outcomeSegments.push(`o${location}V`);
								break;
							case "VStem":
								outcomeSegments.push(`o${location}V`, `o${location}Arc`);
								break;
							case "Outwards":
								outcomeSegments.push(`o${location}Inv`, `o${location}V`);
								break;
							case "Inwards":
								outcomeSegments.push(`o${location}Arc`, `o${NorS}V`);
								break;
							default:
								break;
						}   
					}
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
							default:
								break;
						}
					}
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
					console.log("Outcome segments:", outcomeSegments);
					possibleOutcomesSegments.push(outcomeSegments);
				}
				console.log("Possible outcomes segments:", possibleOutcomesSegments);
				
				// Using the chooseState function to choose the state
				const chosenState = chooseState(prevPerm, possibleOutcomesSegments, optionalVisibility);
				console.log("Chosen state:", chosenState);
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
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Nw", ["Square", "Round"]));
						// TOP-RIGHT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Ne", ["Square", "Round"]));
						// CENTRE-LEFT is variable: Up, Down or Horizontal
						newPerm.push(...chooseStatePresets(prevPerm, "centre", "W", ["Up", "Down", "Horizontal"]));
						// CENTRE-RIGHT is variable: Up, Down or Horizontal
						newPerm.push(...chooseStatePresets(prevPerm, "centre", "E", ["Up", "Down", "Horizontal"]));

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
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Nw", ["Square", "Round"]));
						// TOP-RIGHT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Ne", ["Square", "Round"]));
						// BOTTOM-RIGHT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Se", ["Square", "Round"]));
						// CENTRE-LEFT is variable: Up, Down or Horizontal, but random chance of not being visible
						newPerm.push(...chooseStatePresets(prevPerm, "centre", "W", ["Up", "Down", "Horizontal"], true));
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
					// C has 2 variables: the top-right and bottom-right corners

					// Adding the constant segments
					newPerm.push(
						"oNwArc",
						"iNwV",
						"iSwV",
						"oSwArc"
					);

					// VARIABLE SEGMENTS
						// TOP-RIGHT CORNER is variable: Horizontal or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Ne", ["Horizontal", "Round"]));
						// BOTTOM-RIGHT CORNER is variable: Horizontal or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Se", ["Horizontal", "Round"]));

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
							// Possible outcomes:
								// Stem extends to the very bottom and hook uses Arc
								// Inv
							newPerm.push(...chooseState(prevPerm, [
								["oSV", "oSwArc"],
								["oSwInv"]
							]));

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
							// Inwards leg: Down then Round
							// Outwards leg: Round then Down
						newPerm.push(...chooseState(prevPerm, [
							["iSV", "oSeInv"], 
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
						"iNV",
						"iNeV",
						"iSeV",
						"oSeV"
					);

					// VARIABLE SEGMENTS
						// TOP is custom:
						// Possible outcomes:
							// Facing out on left, facing out on right
							// Facing out on left, facing in on right
							// Facing in on left, facing out on right
						newPerm.push(...chooseState(prevPerm, [
							["oNwV", "oNwInv", "oNeV", "oNeInv"],
							["oNwV", "oNwInv", "oNV", "oNeArc"],
							["oNwArc", "oNV", "oNeInv", "oNeV"]
						]));

					break;
				case "n":
				case "N":
					// N has 2 variables: the top-left and bottom-right corners

					// Adding the constant segments
					newPerm.push(
						"iNwV",
						"iSwV",
						"oSwV",
						"iNV",
						"iSV",
						"oNeV",
						"iNeV",
						"iSeV"
					);

					// VARIABLE SEGMENTS
						// TOP-LEFT CORNER is variable: Outwards or Inwards
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Nw", ["Outwards", "Inwards"]));
						// BOTTOM-RIGHT CORNER is variable: Outwards or Inwards
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Se", ["Outwards", "Inwards"]));

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
						"iNwV"
					);

					// VARIABLE SEGMENTS
						// BOTTOM-LEFT CORNER is variable: Square or Round
						newPerm.push(...chooseStatePresets(prevPerm, "corner", "Sw", ["Square", "Round"]));
						// HOOK (bottom-right corner) is custom: Arc, Horizontal or Inv and Vertical
						newPerm.push(...chooseState(prevPerm, [["oSeInv"], ["oSeH"], ["oSeInv", "oSeV"]]));

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
						// BOTTOM-RIGHT QUARTER is custom: Inwards or Outwards
						newPerm.push(...chooseState(prevPerm, [
							["iSV", "oSeInv"], 
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
						"oSV"
					);

					// VARIABLE SEGMENTS
						// TOP OF STEM is custom:
						// Possible outcomes:
							// Vertical
							// Curving to the left (Inv)
						newPerm.push(...chooseState(prevPerm, [
							["oNV"],
							["oNwInv"]
						]));

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
					// W has 1 variable: the bottom, which is custom

					// Adding the constant segments
					newPerm.push(
						"oNwV",
						"iNwV",	
						"iSwV",
						"iSV",
						"oNeV",
						"iNeV",
						"iSeV"
					);

					// VARIABLE SEGMENTS
						// BOTTOM is custom:
						// Possible outcomes:
							// Facing out on left, facing out on right
							// Facing out on left, facing in on right
							// Facing in on left, facing out on right
						newPerm.push(...chooseState(prevPerm, [
							["oSwV", "oSwInv", "oSeV", "oSeInv"],
							["oSwV", "oSwInv", "oSV", "oSeArc"],
							["oSwArc", "oSV", "oSeInv", "oSeV"]
						]));

					break;
				case "x":
				case "X":
					// X has 3 variables: the entire shape is custom, and is done manually

					let prevPermSegments = Object.keys(prevPerm).filter(key => prevPerm[key]);

					const outcome1 = ["oNwInv", "oNeInv", "iNV", "iSV", "oSwInv", "oSeInv"];
					const outcome2 = ["oNwV", "iNwArc", "oNeV", "iNeArc", "oSwV", "iSwArc", "oSeV", "iSeArc"];
					const outcome3 = ["oNwInv", "iNV", "oNeV", "iNeArc", "oSwV", "iSwArc", "oSeInv", "iSV"];

					// Count how many of the segments in the first shape are already visible
					let count1 = 0;
					for (let segment of outcome1) {
						if (prevPermSegments.includes(segment)) {
							count1++;
						}
					}
					// Count how many of the segments in the second shape are already visible
					let count2 = 0;
					for (let segment of outcome2) {
						if (prevPermSegments.includes(segment)) {
							count2++;
						}
					}
					// Count how many of the segments in the third shape are already visible
					let count3 = 0;
					for (let segment of outcome3) {
						if (prevPermSegments.includes(segment)) {
							count3++;
						}
					}
					console.log("Count 1:", count1);
					console.log("Count 2:", count2);
					console.log("Count 3:", count3);

					// Choose the shape with the most visible segments - if two shapes have the same number of visible segments, randomly choose between them
					let chosenShape;
					if (count1 > count2 && count1 > count3) {
						chosenShape = outcome1;
					} else if (count2 > count1 && count2 > count3) {
						chosenShape = outcome2;
					} else if (count3 > count1 && count3 > count2) {
						chosenShape = outcome3;
					} else if (count1 === count2 && count1 > count3) {
						chosenShape = randomlyChoose(outcome1, outcome2);
					} else if (count1 === count3 && count1 > count2) {
						chosenShape = randomlyChoose(outcome1, outcome3);
					} else if (count2 === count3 && count2 > count1) {
						chosenShape = randomlyChoose(outcome2, outcome3);
					} else {
						chosenShape = randomlyChoose(outcome1, outcome2, outcome3);
					}

					console.log("Chosen shape:", chosenShape);

					newPerm.push(...chosenShape);
					
					break;
				case "y":
				case "Y":
					// Y has 3 variables: the centre-NW, the centre-right and the bottom-left corner

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

					break;
				case "z":
				case "Z":
					// Z is a fixed letter - no calculations needed

					newPerm.push(
						"oNwH",
						"oNeH",
						"oNeV",
						"iNeArc",
						"iSwArc",
						"oSwV",
						"oSwH",
						"oSeH"
					);

					break;
				default:
					// (For now) the default option is to show all the segments //TEMP

					newPerm.push(
						"oNwH",
						"oNwV",
						"oNwArc",
						"oNwInv",
						"oNV",
						"oNeH",
						"oNeV",
						"oNeArc",
						"oNeInv",
						"iNwV",
						"iNwArc",
						"iNV",
						"iNeV",
						"iNeArc",
						"iWH",
						"iEH",
						"iSwV",
						"iSwArc",
						"iSV",
						"iSeV",
						"iSeArc",
						"oSwV",
						"oSwH",
						"oSwArc",
						"oSwInv",
						"oSV",
						"oSeV",
						"oSeH",
						"oSeArc",
						"oSeInv"
					);

					break;
			}

			// Returning the new permutation
			return newPerm;
		}







		// This is the function to change to a new letter (or number, punctuation, etc.)
		function changeToLetter(letter) {
			// Store the existing permutation of the grid
			let existingPerm = Object.assign({}, perm);

			// Changing the permutation to be the new letter
			// Getting the array of segments that should be visible for the new letter
			let visibleSegments = letterMaker(letter, existingPerm);
			console.log(visibleSegments);//TEMP
			// Updating the permutation object to reflect the new letter
			for (let segment in perm) {
				// If the segment is in the new letter's array of visible segments
				if (visibleSegments.includes(segment)) {
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

		

		// A keypress event listener is added to the window to allow the user to change the letter
		window.addEventListener("keypress", (e) => {
			// The key that was pressed is stored in the variable 'key'
			let key = e.key;
			changeToLetter(key);
		});
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