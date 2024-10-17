// Imports
	// Importing the React library
	import { useEffect, useRef } from 'react';

	// Importing defs
	import { hide, show, randomlyChoose, containsExactSet, containsSet, removeValues } from '../defs';

	// Importing GSAP
	import { gsap } from 'gsap';


export default function LetterGrid() {
	// Guide to the naming system for the segments:
		// First letter 'o' or 'i' is short for 'outer' or 'inner' - the top- and bottom-most eights are 'outer' and the other four are 'inner'
		// Then the direction is specified, e.g., Nw for North-West
		// Then the segment type is specified: V = vertical line, H = horizontal line, Arc = arc as part of one of the circles, Inv = arc that isn't part of the circles (ends on a corner)

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
	


	// useEffect is used to animate the grid
	useEffect(() => {
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
				
				// PrevPerm is an object with the previous permutation
				// Sample possibleOutcomes: [["oNwV", "oNwH"], ["oNwArc"], ["oNwV", "oNwArc"]] (Square, Round, VStem)
				// optionalVisibility is a boolean for if the segment is optional to be visible (chosen from a 50% chance)

				// Turning the prevPerm object into an array of segments
				let prevPermSegments = Object.keys(prevPerm).filter(key => prevPerm[key]);
				console.log("Previous permutation segments:", prevPermSegments);

				// For each possible outcome, we'll count how many of its segments are in the previous permutation
				// We'll then choose the outcome with the most segments in the previous permutation
				let bestOutcome = []; // The best outcome (note, outcomes should be pushed as arrays so this is an array of arrays)
				let bestOutcomeCount = 0; // The number of segments in the best outcome that are in the previous permutation

				// Go through each possible outcome
				for (let i = 0; i < possibleOutcomes.length; i++) {
					const outcome = possibleOutcomes[i]; // The current outcome
					console.log("Processing outcome:", outcome);

					// Count how many segments in the outcome are in the previous permutation
					let count = 0;
					for (let j = 0; j < outcome.length; j++) {
						const segment = outcome[j]; // The current segment
						if (prevPermSegments.includes(segment)) {
							count++;
						}
					}
					console.log(`Outcome: ${outcome}, Count: ${count}`);

					// The count may be equal to the best outcome count, in which case we'll add it to the best outcome array
					if (count === bestOutcomeCount) {
						bestOutcome.push(outcome);
						console.log(`Added to bestOutcome: ${outcome}`);
					}
					// If the count is greater than the best outcome count, we'll replace the best outcome array with this outcome
					if (count > bestOutcomeCount) {
						bestOutcome = [outcome];
						bestOutcomeCount = count;
						console.log(`New bestOutcome: ${outcome}, bestOutcomeCount: ${bestOutcomeCount}`);
					}
				}

				// If there are multiple best outcomes, we'll randomly choose one
				const chosenOutcome = randomlyChoose(...bestOutcome);
				console.log("Chosen outcome:", chosenOutcome);
				return chosenOutcome;
			}


			
			// This function is used to choose segments to show based on the previous permutation and the possible outcomes
			// function chooseState(prevPerm, possibleOutcomes, optionalVisibility = false) {
			// 	console.log("chooseState called with:", prevPerm, possibleOutcomes);
				
			// 	// Sample possibleOutcomes: [["oNwV", "oNwH"], ["oNwArc"], ["oNwV", "oNwArc"]] (Square, Round, VStem)
			// 	// optionalVisibility is a boolean for if the segment is optional to be visible (chosen from a 50% chance)
				
			// 	// Getting all the involved segments (the same segment may appear in multiple outcomes, so this will )
			// 	let segments = [];
			// 	for (let i = 0; i < possibleOutcomes.length; i++) {
			// 		const outcome = possibleOutcomes[i];
					
			// 		// Go through each segment in the outcome
			// 		for (let j = 0; j < outcome.length; j++) {
			// 			const segment = outcome[j];
						
			// 			// If the segment isn't already in the array, add it
			// 			if (!segments.includes(segment)) {
			// 				segments.push(segment);
			// 			}
			// 		}
			// 	}
			// 	console.log("Involved segments:", segments);
				
			// 	// Getting all the segments that AREN'T in involved
			// 	let notInvolvedSegments = allSegments.filter(segment => !segments.includes(segment));
			// 	console.log("Not involved segments:", notInvolvedSegments);
				
			// 	// Getting all the segments that were visible in the previous permutation
			// 	let prevPermSegments = Object.keys(prevPerm).filter(key => prevPerm[key]);
			// 	console.log("Previous permutation segments:", prevPermSegments);

			// 	// We need to test all possible combinations of segments, i.e., first where only one segment is visible, then where two are visible, etc.
			// 	// The problem is that we don't necessarily know how many segments there are
			// 	// So we need to find all possible combinations of segments
			// 	// This is a recursive function that will find all possible combinations of segments
			// 	function findCombinations(segments, length = 1) {
			// 		// If the length is 1, just return the segments
			// 		if (length === 1) {
			// 			return segments.map(segment => [segment]);
			// 		}

			// 		// If the length is greater than 1, find all combinations of the segments
			// 		let combinations = [];
			// 		for (let i = 0; i < segments.length; i++) {
			// 			const segment = segments[i]; // The current segment
			// 			const remainingSegments = segments.slice(i + 1); // The remaining segments
			// 			const smallerCombinations = findCombinations(remainingSegments, length - 1); // The combinations of the remaining segments

			// 			for (let j = 0; j < smallerCombinations.length; j++) {
			// 				const smallerCombination = smallerCombinations[j]; // The current combination of the remaining segments
			// 				combinations.push([segment, ...smallerCombination]); // Add the current segment to the combination of the remaining segments
			// 			}
			// 		}

			// 		// Return all the combinations
			// 		return combinations;
			// 	}


				
			// 	// Now we have all possible combinations of segments, we can test each one
			// 		// We'll start will testing to see if any of the outcomes contains all the segments
			// 		// If no outcomes are found, we'll check to see if this combination of all the possible segments was entirely present in the previous permutation
			// 		// If they are, we'll randomly choose one of the possible outcomes
			// 		// Otherwise, we'll test to see if any of the outcomes contains all but one of the segments
			// 		// Then all but two, etc.
			// 		// If there are multiple outcomes that match this number of segments, we'll randomly choose one
			// 		// If an outcome is found, we'll stop the loop after testing all outcomes against that number of segments
			// 		// If at the end no outcomes are found, we'll randomly choose one of the possible outcomes
			// 	let matchingOutcomes = [];
			// 	for (let i = segments.length; i >= 1; i--) {
			// 		// Getting all combinations of segments of length i
			// 		const combinations = findCombinations(segments, i);
			// 		console.log(`Testing combinations of length ${i}:`, combinations);

			// 		// Go through each combination
			// 		for (let j = 0; j < combinations.length; j++) {
			// 			const combination = combinations[j]; // The current combination
			// 			console.log("Testing combination:", combination);

			// 			// Check to see if the combination matches the previous permutation and doesn't contain any segments that aren't involved
			// 			console.log(containsSet(prevPermSegments, combination), !containsSet(notInvolvedSegments, combination));
			// 			if (containsSet(prevPermSegments, combination) && !containsSet(notInvolvedSegments, combination)) {
			// 				console.log("Combination matches previous permutation and doesn't contain not involved segments:", combination);

			// 				// If it does, check to see which (if any) of the possible outcomes contains the combination

			// 				for (let k = 0; k < possibleOutcomes.length; k++) {
			// 					const outcome = possibleOutcomes[k]; // The current outcome

			// 					// If the outcome contains the combination and isn't already in the matchingOutcomes array
			// 					if (containsSet(outcome, combination) && !matchingOutcomes.includes(outcome)) {
			// 						// Add the outcome to the matchingOutcomes array
			// 						matchingOutcomes.push(outcome);
			// 					}
			// 				}

			// 			}
			// 		}

			// 		// If there are already any matching outcomes, stop the loop
			// 		if (matchingOutcomes.length > 0) {
			// 			break;
			// 		}

			// 		// If no outcomes are found and this is the combination with all the possible segments in it, check to see if the previous permutation contains all the segments
			// 		if (i === segments.length && containsSet(prevPermSegments, segments)) {
			// 			console.log("Previous permutation contains all segments");
			// 			// If it does, randomly choose one of the possible outcomes
			// 			const chosenOutcome = randomlyChoose(...possibleOutcomes);
			// 			console.log("Randomly chosen outcome:", chosenOutcome);
			// 			return chosenOutcome;
			// 		}
			// 	}




			// 	console.log("Matching outcomes:", matchingOutcomes);

			// 	// If there are no matching outcomes, randomly pick one of the possible outcomes
			// 	if (matchingOutcomes.length === 0) {
			// 		console.log("No matching outcomes found, randomly choosing one of the possible outcomes");
			// 		const chosenOutcome = randomlyChoose(...possibleOutcomes);
			// 		console.log("Randomly chosen outcome (const):", chosenOutcome);

			// 		// If the outcome is already entirely present in the previous permutation, it can't be optionally visible
			// 		// If it's not entirely present and optionallyVisible is true, there's a 50% chance it won't be visible
			// 		console.log("TESTING: " + !containsSet(prevPermSegments, chosenOutcome), optionalVisibility, Math.random() < 0.5)
			// 		if (!containsSet(prevPermSegments, chosenOutcome) && optionalVisibility && Math.random() < 0.5) {
			// 			console.log("Outcome is optionally visible and randomly chosen not to be visible");
			// 			return [];
			// 		}

			// 		return chosenOutcome;
			// 	} else if (matchingOutcomes.length === 1) {
			// 		// If there is only one matching outcome

			// 		// If the outcome is already entirely present in the previous permutation, it can't be optionally visible
			// 		// If it's not entirely present and optionallyVisible is true, there's a 50% chance it won't be visible
			// 		console.log("TESTING: " + containsSet(prevPermSegments, [matchingOutcomes[0]]), optionalVisibility, Math.random() < 0.5)
			// 		if (containsSet(prevPermSegments, [matchingOutcomes[0]]) && optionalVisibility && Math.random() < 0.5) {
			// 			console.log("Outcome is optionally visible and randomly chosen not to be visible");
			// 			return [];
			// 		}

			// 		console.log("One matching outcome found:", matchingOutcomes[0]);
			// 		return matchingOutcomes[0];
			// 	} else {
			// 		// If there are multiple matching outcomes, randomly choose one
			// 		const chosenOutcome = randomlyChoose(...matchingOutcomes);
			// 		console.log("Multiple matching outcomes found, randomly chosen  (const):", chosenOutcome);

			// 		// If the outcome is already entirely present in the previous permutation, it can't be optionally visible
			// 		// If it's not entirely present and optionallyVisible is true, there's a 50% chance it won't be visible
			// 		console.log("TESTING: " + containsSet(prevPermSegments, chosenOutcome), optionalVisibility, Math.random() < 0.5)
			// 		if (containsSet(prevPermSegments, chosenOutcome) && optionalVisibility && Math.random() < 0.5) {
			// 			console.log("Outcome is optionally visible and randomly chosen not to be visible");
			// 			return [];
			// 		}
					
			// 		return chosenOutcome;
			// 	}
			// }





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
					// W has 1 variable: the bottom, which is custom

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

					// // VARIABLE SEGMENTS
					// 	// BOTTOM is custom:
					// 	// Possible outcomes:
					// 		// Facing out on left, facing out on right
					// 		// Facing out on left, facing in on right
					// 		// Facing in on left, facing out on right
					// 	newPerm.push(...chooseState(prevPerm, [
					// 		["oSwV", "oSwInv", "oSeV", "oSeInv"],
					// 		["oSwV", "oSwInv", "oSV", "oSeArc"],
					// 		["oSwArc", "oSV", "oSeInv", "oSeV"]
					// 	]));

					//!Could add more variables

					break;
				case "x":
				case "X":
					// X has 3 variables: the entire shape is custom, and is done manually

					// let prevPermSegments = Object.keys(prevPerm).filter(key => prevPerm[key]);

					// const outcome1 = ["oNwInv", "oNeInv", "iNV", "iSV", "oSwInv", "oSeInv"];
					// const outcome2 = ["oNwV", "iNwArc", "oNeV", "iNeArc", "oSwV", "iSwArc", "oSeV", "iSeArc"];
					// const outcome3 = ["oNwInv", "iNV", "oNeV", "iNeArc", "oSwV", "iSwArc", "oSeInv", "iSV"];

					// // Count how many of the segments in the first shape are already visible
					// let count1 = 0;
					// for (let segment of outcome1) {
					// 	if (prevPermSegments.includes(segment)) {
					// 		count1++;
					// 	}
					// }
					// // Count how many of the segments in the second shape are already visible
					// let count2 = 0;
					// for (let segment of outcome2) {
					// 	if (prevPermSegments.includes(segment)) {
					// 		count2++;
					// 	}
					// }
					// // Count how many of the segments in the third shape are already visible
					// let count3 = 0;
					// for (let segment of outcome3) {
					// 	if (prevPermSegments.includes(segment)) {
					// 		count3++;
					// 	}
					// }
					// console.log("Count 1:", count1);
					// console.log("Count 2:", count2);
					// console.log("Count 3:", count3);

					// // Choose the shape with the most visible segments - if two shapes have the same number of visible segments, randomly choose between them
					// let chosenShape;
					// if (count1 > count2 && count1 > count3) {
					// 	chosenShape = outcome1;
					// } else if (count2 > count1 && count2 > count3) {
					// 	chosenShape = outcome2;
					// } else if (count3 > count1 && count3 > count2) {
					// 	chosenShape = outcome3;
					// } else if (count1 === count2 && count1 > count3) {
					// 	chosenShape = randomlyChoose(outcome1, outcome2);
					// } else if (count1 === count3 && count1 > count2) {
					// 	chosenShape = randomlyChoose(outcome1, outcome3);
					// } else if (count2 === count3 && count2 > count1) {
					// 	chosenShape = randomlyChoose(outcome2, outcome3);
					// } else {
					// 	chosenShape = randomlyChoose(outcome1, outcome2, outcome3);
					// }

					// console.log("Chosen shape:", chosenShape);

					// newPerm.push(...chosenShape);

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

					// newPerm.push(
					// 	"oNwH",
					// 	"oNeH",
					// 	"oNeV",
					// 	"iNeArc",
					// 	"iSwArc",
					// 	"oSwV",
					// 	"oSwH",
					// 	"oSeH"
					// );

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
			let groupedAddedSegments = groupSegments(addedSegments);
			console.log("Added: ", addedSegments, groupedAddedSegments);//TEMP

			// Getting the array of segments that are being removed
			let removedSegments = existingPermSegments.filter(segment => !newPerm.includes(segment));
			let groupedRemovedSegments = groupSegments(removedSegments);
			console.log("Removed: ", removedSegments, groupedRemovedSegments);//TEMP


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
			let changeTl = gsap.timeline();

			// Adding the added segments
			for (let group of groupedAddedSegments) {
				console.log("Group: ", group);//TEMP
				// Use GSAP to animate the drawing of the group
				if (group.length === 1) {
					let segment = group[0];

					// Change the status of the segment to visible
					currentPerm[segment] = true;

					// If the group only has one segment, draw it normally
					gsap.to(eval(segment).current, {
						duration: 1,
						strokeDashoffset: 0,
						ease: "power1.inOut",
					});
				} else {
					// If the group has multiple segments, string together the drawing of the segments
					// blurAmount = gsap.utils.interpolate(blurAmountInitial, 0, Math.sqrt(self.progress));
					let tl = gsap.timeline();

					let segmentDuration = 1 / group.length;

					for (let segment of group) {
						// Change the status of the segment to visible
						currentPerm[segment] = true;

						tl.to(eval(segment).current, {
							duration: segmentDuration,
							strokeDashoffset: 0,
							ease: "none",
						});
					}

					gsap.to(tl, {
						time: tl.duration(),
						duration: 2,
						ease: "power3.inOut",
						onComplete: () => {
							tl.kill();
						}
					});
				}
			}

			// Removing the removed segments
			for (let group of groupedRemovedSegments) {
				console.log("Group: ", group);//TEMP
				// Use GSAP to animate the erasing of the group
				if (group.length === 1) {
					let segment = group[0];

					// Change the status of the segment to invisible
					currentPerm[segment] = false;

					// Erase the segment
					gsap.to(eval(segment).current, {
						duration: 1,
						strokeDashoffset: -100,
						ease: "power1.inOut",
						onComplete: () => {
							gsap.set(eval(segment).current, { strokeDashoffset: 100 });
						}
					});
				} else {
					// If the group has multiple segments, string together the erasing of the segments
					let tl = gsap.timeline();

					let segmentDuration = 1 / group.length;

					for (let segment of group) {
						// Change the status of the segment to invisible
						currentPerm[segment] = false;

						tl.to(eval(segment).current, {
							duration: segmentDuration,
							strokeDashoffset: -100,
							ease: "none", 
							onComplete: () => {
								gsap.set(eval(segment).current, { strokeDashoffset: 100 });
							}
						});
					}

					gsap.to(tl, {
						time: tl.duration(),
						duration: 2,
						ease: "power3.inOut",
						onComplete: () => {
							tl.kill();
						}
					});
				}
			}
		}




		function groupSegments(segments) {
			// Create a copy of the segments array
			let groupedSegments = [...segments];
			console.log("Segments copy: ", groupedSegments);//TEMP

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
					"oNeV",
					"iNeV",
					"iSeV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNeV", "iNeV", "iSeV"]);
					groupedSegments.push(["oNeV", "iNeV", "iSeV"]);
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
					"oNeV",
					"iNeV"
				]):
					groupedSegments = removeValues(groupedSegments, ["oNeV", "iNeV"]);
					groupedSegments.push(["oNeV", "iNeV"]);
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

		// // This is the function that will find routes (strings, snakes, paths, etc.) in the removed and added segments for animation purposes
		// function routesFinder(segments) {
		// 	// segments is an array of segments that are being added or removed

		// 	// Create the array to store the routes - note, routes are arrays of segments, so only arrays should be added to this array
		// 	let routes = [];

		// 	// Create an array of segments which have been accounted for
		// 	let accountedSegments = [];

		// 	const segmentsHierarchy = [
		// 		"oNwV",
		// 		"iNwV",
		// 		"iSwV",
		// 		"oSwV",
		// 		"oNwH",
		// 		"NwDiag",
		// 		"oNwArc",
		// 		"iNwArc",
		// 		"iWH",
		// 		"oNV",
		// 		"iNV",
		// 		"oNeH",
		// 		"oNeV",
		// 		"oNeArc",
		// 		"NeDiag",
		// 		"iNeV",
		// 		"iNeArc",
		// 		"iEH",
		// 		"SwDiag",
		// 		"iSV",
		// 		"SeDiag",
		// 		"iSwArc",
		// 		"iSeV",
		// 		"iSeArc",
		// 		"oSwArc",
		// 		"oSeV",
		// 		"oSeArc",
		// 		"oSwH",
		// 		"oSV",
		// 		"oSeH"
		// 	]

		// 	for (let i = 0; i < segmentsHierarchy.length; i++) {
		// 		const rank = segmentsHierarchy[i];
				
		// 		// Finding the most highly ranked segment in the segments array
		// 		if (segments.includes(rank)) {
		// 			// Checking if it's a valid route starter
		// 			let validNeighbours = findValidNeighbours(rank);
		// 		}
		// 	}

		// 	function findValidNeighbours(startingSegment, validSegments, accountedSegments, currentRoute) {
				
		// 	}


		// 	// Create a function to find the route of a segment
		// 	function findRoute(segment) {
		// 		// Create an array to store the route
		// 		let route = [segment];

		// 		// First, this route will conduct a search through the potential segments
		// 		// The segments have a defined hierarchy of which ones should start a route first (since some drawing directions look more natural than others)
		// 		// This will search through them in that order
		// 		// For a segment to pass to the next stage, it must be valid as a route starter, meaning it must have at most one valid route neighbour
		// 		// (it can have more neighbours, but only one neighbour that could be used as the next part of a route--this is so a route isn't started from what could be the middle of a longer route)


		// 		// First we'll explore 'forwards'
		// 		let forwardsRoute = []; // This will be the array to store the 'forwards' part of the route

		// 		// This loop will find the full route forwards fromt the segment in question 
		// 		let noMoreOptions = false;
		// 		while (noMoreOptions === false) {
		// 			// Find the best neighbour for the route to continue forwards with
		// 			// This function will weed out any invalid neighbours (i.e., those which can't be proceeded to or those which are already accounted for, etc.)
		// 			let nextNeighbour = findBestNeighbour(segment, segments, accountedSegments, forwardsRoute);
	
		// 			// If there are no more valid neighbours, then this segment is the end of the route (for this direction)
		// 			if (nextNeighbour === false) {
		// 				noMoreOptions = true;
		// 			} else {
		// 				// If there is a valid segment for the route to continue with, push it to the forwardsRoute and accountedSegments 
		// 				forwardsRoute.push(nextNeighbour);
		// 				accountedSegments.push(nextNeighbour);
		// 			}
		// 		}

		// 		// After 
				

		// 	}

			

		// 	function findBestNeighbour(startingSegment, validSegments, accountedSegments, currentRoute) {
		// 		let potentialNeighbour; // This stores the potential chosen neigbour
		// 		// switch (startingSegment) {
		// 		// 	case "oNwV":
		// 		// 		if (checkNeighbourValidity("iNwV")) {
		// 		// 			return "iNwV";
		// 		// 		} else if (checkNeighbourValidity("iNwArc")) {
		// 		// 			return "iNwArc";
		// 		// 		} else {
		// 		// 			return false;
		// 		// 		}
		// 		// 		break
		// 		// 	case "oNwH":
		// 		// 		if (checkNeighbourValidity("oNeH")) {
		// 		// 			return "oNeH";
		// 		// 		} else if (checkNeighbourValidity("oNeArc")) {
		// 		// 			return "oNeArc";
		// 		// 		} else {
		// 		// 			return false;
		// 		// 		}
		// 		// 		break;
		// 		// 	case "oNwArc":
		// 		// 		if (checkNeighbourValidity("oNwH") && )
		// 		// 	default:
		// 		// 		break;
		// 		// }

		// 		function checkNeighbourValidity(segment) {
		// 			if (validSegments.includes(segment) && accountedSegments.includes(segment)) {
		// 				return true;
		// 			} else {
		// 				return false;
		// 			}
		// 		}


		// 		// // Filter out any neighbours which aren't in the segments array
		// 		// 	let forwardsConsideredNeighbours = forwardsAllNeighbours.filter(neighbour => segments.includes(neighbour));
	
		// 		// 	// Filter out any neighbours which are already accounted for
		// 		// 	let forwardsFilteredNeighbours = forwardsConsideredNeighbours.filter(neighbour => accountedSegments.includes(neighbour));
		// 	}

		// 	// function findRoute(segment) {
		// 	// 	// segment is the segment to find the route for
		// 	// 	// Find the segment in the segments array
		// 	// 	let segmentIndex = segments.indexOf(segment);

		// 	// 	// If the segment is not in the array, return an empty array
		// 	// 	if (segmentIndex === -1) {
		// 	// 		return [];
		// 	// 	}

		// 	// 	// Create an array to store the route
		// 	// 	let route = [segment];

		// 	// 	// Add the segment to the accountedSegments array
		// 	// 	accountedSegments.push(segment);

		// 	// 	// Find the segment's neighbours
		// 	// 	let neighbours = findNeighbours(segment);

		// 	// 	// Find the neighbours that are in the segments array
		// 	// 	let activeNeighbours = neighbours.filter(neighbour => segments.includes(neighbour));

		// 	// 	// If there are no active neighbours, return the route
		// 	// 	if (activeNeighbours.length === 0) {
		// 	// 		return route;
		// 	// 	}

		// 	// 	// For each active neighbour
		// 	// 	for (let neighbour of activeNeighbours) {
		// 	// 		// If the neighbour is not already accounted for
		// 	// 		if (!accountedSegments.includes(neighbour)) {
		// 	// 			// Find the neighbour's route
		// 	// 			let neighbourRoute = findRoute(neighbour);

		// 	// 			// Add the neighbour's route to the route
		// 	// 			route.push(...neighbourRoute);
		// 	// 		}
		// 	// 	}

		// 	// 	// Return the route
		// 	// 	return route;
		// 	// }


		// }


		

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
		<svg className="LetterGrid" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201 401">
			<path 
				className="oSeArc" 
				ref={ oSeArc } 
				pathLength={ 100 }
				d="M100.5,400.5c7.468,0,14.278-.263,22.497-1.846,6.204-1.195,12.246-2.72,18.333-5.074,6.088-2.354,11.79-5.558,17.066-8.967s10.126-7.325,14.509-11.708,8.299-9.233,11.708-14.509c3.409-5.276,6.682-10.978,9.035-17.066s3.941-12.029,5.006-18.451c1.603-9.668,1.775-15.303,1.846-22.379"/>
			<line 
				className="oSeH" 
				ref={ oSeH } 
				pathLength={ 100 }
				x1="100.5" y1="400.5" x2="200.5" y2="400.5"/>
			<line 
				className="oSeV" 
				ref={ oSeV } 
				pathLength={ 100 }
				x1="200.5" y1="300.5" x2="200.5" y2="400.5"/>
			<line 
				className="oSV" 
				ref={ oSV } 
				pathLength={ 100 }
				x1="100.5" y1="300.5" x2="100.5" y2="400.5"/>
			<path 
				className="oSwArc" 
				ref={ oSwArc } 
				pathLength={ 100 }
				d="M.5,300.5c0,7.468.263,14.278,1.846,22.497,1.195,6.204,2.72,12.246,5.074,18.333,2.354,6.088,5.558,11.79,8.967,17.066s7.325,10.126,11.708,14.509,9.233,8.299,14.509,11.708,10.978,6.682,17.066,9.035,12.029,3.941,18.451,5.006c9.668,1.603,15.303,1.775,22.379,1.846"/>
			<line 
				className="oSwH" 
				ref={ oSwH } 
				pathLength={ 100 }
				x1=".5" y1="400.5" x2="100.5" y2="400.5"/>
			<line 
				className="oSwV" 
				ref={ oSwV } 
				pathLength={ 100 }
				x1=".5" y1="300.5" x2=".5" y2="400.5"/>
			<path 
				className="iSeArc" 
				ref={ iSeArc } 
				pathLength={ 100 }
				d="M100.5,200.5c7.076.071,12.711.243,22.379,1.846,6.422,1.065,12.363,2.652,18.451,5.006,6.088,2.354,11.79,5.626,17.066,9.035s10.126,7.325,14.509,11.708,8.299,9.233,11.708,14.509,6.613,10.978,8.967,17.066c2.354,6.088,3.879,12.13,5.074,18.333,1.583,8.219,1.846,15.029,1.846,22.497"/>
			<line 
				className="iSeV" 
				ref={ iSeV } 
				pathLength={ 100 }
				x1="200.5" y1="200.5" x2="200.5" y2="300.5"/>
			<line 
				className="iSV" 
				ref={ iSV } 
				pathLength={ 100 }
				x1="100.5" y1="200.5" x2="100.5" y2="300.5"/>
			<path 
				className="iSwArc" 
				ref={ iSwArc } 
				pathLength={ 100 }
				d="M.5,300.5c.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451s5.626-11.79,9.035-17.066,7.325-10.126,11.708-14.509,9.233-8.299,14.509-11.708c5.276-3.409,10.978-6.613,17.066-8.967s12.13-3.879,18.333-5.074c8.219-1.583,15.029-1.846,22.497-1.846"/>
			<line 
				className="iSwV" 
				ref={ iSwV } 
				pathLength={ 100 }
				x1=".5" y1="200.5" x2=".5" y2="300.5"/>
			<line 
				className="SeDiag" 
				ref={ SeDiag } 
				pathLength={ 100 }
				x1="100.5" y1="200.5" x2="200.5" y2="400.5"/>
			<line 
				className="SwDiag" 
				ref={ SwDiag } 
				pathLength={ 100 }
				x1="100.5" y1="200.5" x2="5" y2="400.5"/>
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
				className="NeDiag" 
				ref={ NeDiag } 
				pathLength={ 100 }
				x1="100.5" y1="200.5" x2="200.5" y2=".5"/>
			<line 
				className="NwDiag" 
				ref={ NwDiag } 
				pathLength={ 100 }
				x1="100.5" y1="200.5" x2=".5" y2=".5"/>
			<path 
				className="iNeArc" 
				ref={ iNeArc } 
				pathLength={ 100 }
				d="M100.5,200.5c7.468,0,14.278-.263,22.497-1.846,6.204-1.195,12.246-2.72,18.333-5.074,6.088-2.354,11.79-5.558,17.066-8.967s10.126-7.325,14.509-11.708,8.299-9.233,11.708-14.509c3.409-5.276,6.682-10.978,9.035-17.066,2.354-6.088,3.941-12.029,5.006-18.451,1.603-9.668,1.775-15.303,1.846-22.379"/>
			<line 
				className="iNeV" 
				ref={ iNeV } 
				pathLength={ 100 }
				x1="200.5" y1="100.5" x2="200.5" y2="200.5"/>
			<line 
				className="iNV" 
				ref={ iNV } 
				pathLength={ 100 }
				x1="100.5" y1="100.5" x2="100.5" y2="200.5"/>
			<path 
				className="iNwArc" 
				ref={ iNwArc } 
				pathLength={ 100 }
				d="M.5,100.5c0,7.468.263,14.278,1.846,22.497,1.195,6.204,2.72,12.246,5.074,18.333,2.354,6.088,5.558,11.79,8.967,17.066s7.325,10.126,11.708,14.509,9.233,8.299,14.509,11.708c5.276,3.409,10.978,6.682,17.066,9.035s12.029,3.941,18.451,5.006c9.668,1.603,15.303,1.775,22.379,1.846"/>
			<line 
				className="iNwV" 
				ref={ iNwV } 
				pathLength={ 100 }
				x1=".5" y1="100.5" x2=".5" y2="200.5"/>
			<path 
				className="oNeArc" 
				ref={ oNeArc } 
				pathLength={ 100 }
				d="M100.5.5c7.076.071,12.711.243,22.379,1.846,6.422,1.065,12.363,2.652,18.451,5.006s11.79,5.626,17.066,9.035,10.126,7.325,14.509,11.708,8.299,9.233,11.708,14.509,6.613,10.978,8.967,17.066c2.354,6.088,3.879,12.13,5.074,18.333,1.583,8.219,1.846,15.029,1.846,22.497"/>
			<line 
				className="oNeH" 
				ref={ oNeH } 
				pathLength={ 100 }
				x1="100.5" y1=".5" x2="200.5" y2=".5"/>
			<line 
				className="oNeV" 
				ref={ oNeV } 
				pathLength={ 100 }
				x1="200.5" y1=".5" x2="200.5" y2="100.5"/>
			<line 
				className="oNV" 
				ref={ oNV } 
				pathLength={ 100 }
				x1="100.5" y1=".5" x2="100.5" y2="100.5"/>
			<path 
				className="oNwArc" 
				ref={ oNwArc } 
				pathLength={ 100 }
				d="M.5,100.5c.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451s5.626-11.79,9.035-17.066,7.325-10.126,11.708-14.509,9.233-8.299,14.509-11.708,10.978-6.613,17.066-8.967,12.13-3.879,18.333-5.074c8.219-1.583,15.029-1.846,22.497-1.846"/>
			<line 
				className="oNwH" 
				ref={ oNwH } 
				pathLength={ 100 }
				x1=".5" y1=".5" x2="100.5" y2=".5"/>
			<line 
				className="oNwV" 
				ref={ oNwV } 
				pathLength={ 100 }
				x1=".5" y1=".5" x2=".5" y2="100.5"/>
		</svg>
	);
}