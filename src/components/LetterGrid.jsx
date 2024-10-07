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

		function letterMaker(letter, prevPerm = null) {
			// The new permutation will be stored in this array, which be updated as the function progresses and then returned at the end
			let newPerm = [];
			

			
			// This function is used to choose segments to show based on the previous permutation and the possible outcomes
			function chooseState(prevPerm, possibleOutcomes) {
				console.log("chooseState called with:", prevPerm, possibleOutcomes);
				
				// Sample possibleOutcomes: [["oNwV", "oNwH"], ["oNwArc"], ["oNwV", "oNwArc"]] (Square, Round, VStem)
				
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

					return combinations;
				}

				// Now we have all possible combinations of segments, we can test each one
				// We'll start with just one segment currently visible, then two, etc.
				let matchingOutcomes = [];
				// for (let i = 1; i <= segments.length; i++) {
				// 	const combinations = findCombinations(segments, i); // All combinations of segments of length i
				// 	console.log(`Testing combinations of length ${i}:`, combinations);

				// Now we have all possible combinations of segments, we can test each one
				// We'll start will testing to see if any of the outcomes contains all the segments
				// Then we'll test to see if any of the outcomes contains all but one of the segments
				// Then all but two, etc.
				// If there are multiple outcomes that match this number of segments, we'll randomly choose one
				// If an outcome is found, we'll stop the loop after testing all outcomes against that number of segments
				// If at the end no outcomes are found, we'll randomly choose one of the possible outcomes
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
				}




				console.log("Matching outcomes:", matchingOutcomes);

				// If there are no matching outcomes, randomly pick one of the possible outcomes
				if (matchingOutcomes.length === 0) {
					console.log("No matching outcomes found, randomly choosing one of the possible outcomes");
					const chosenOutcome = randomlyChoose(...possibleOutcomes);
					console.log("Randomly chosen outcome:", chosenOutcome);
					return chosenOutcome;
				} else if (matchingOutcomes.length === 1) {
					// If there is only one matching outcome, return it
					console.log("One matching outcome found:", matchingOutcomes[0]);
					return matchingOutcomes[0];
				} else {
					// If there are multiple matching outcomes, randomly choose one
					const chosenOutcome = randomlyChoose(...matchingOutcomes);
					console.log("Multiple matching outcomes found, randomly chosen:", chosenOutcome);
					return chosenOutcome;
				}
			}



			// There are some commonly used presets for corners and centres
			// This function is used to invoke the stateChooser by using presets instead of arrays of segments
			function chooseStatePresets(prevPerm, type, location, possibleOutcomes) {
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
					console.log("Outcome segments:", outcomeSegments);
					possibleOutcomesSegments.push(outcomeSegments);
				}
				console.log("Possible outcomes segments:", possibleOutcomesSegments);
				
				// Using the chooseState function to choose the state
				const chosenState = chooseState(prevPerm, possibleOutcomesSegments);
				console.log("Chosen state:", chosenState);
				return chosenState;
			}
			
			

			// The switch statement will calculate the new permutation based on the letter
			// B E F G H I J K M N O P R S T U V W X Y Z 1 2 3 4 5 6 7 8 9 0 ! ? . , ' " : ; - + = ( ) [ ] { } < > / \ | @ # $ % ^ & * ~ ` _ =
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

					// TOP-LEFT CORNER is variable: Square or Round
					newPerm.push(...chooseStatePresets(prevPerm, "corner", "Nw", ["Square", "Round"]));

					// TOP-RIGHT CORNER is variable: Square or Round
					newPerm.push(...chooseStatePresets(prevPerm, "corner", "Ne", ["Square", "Round"]));

					// BOTTOM-RIGHT CORNER is variable: Square or Round
					newPerm.push(...chooseStatePresets(prevPerm, "corner", "Se", ["Square", "Round"]));

					// CENTRE-LEFT is variable: Up, Down or Horizontal, but random chance of not being visible
					if (Math.random() < 0.5) {
						newPerm.push(...chooseStatePresets(prevPerm, "centre", "W", ["Up", "Down", "Horizontal"]));
					}

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
				case "l":
				case "L":
					// L has 2 variables: the bottom-left and bottom-right corners

					// Adding the constant segments
					newPerm.push(
						"oNwV",
						"iNwV",
						"iSwV"
					);

					// BOTTOM-LEFT CORNER is variable: Square or Round
					newPerm.push(...chooseStatePresets(prevPerm, "corner", "Sw", ["Square", "Round"]));

					// BOTTOM-RIGHT CORNER is variable: Horizontal or Round
					newPerm.push(...chooseStatePresets(prevPerm, "corner", "Se", ["Horizontal", "Round"]));

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

					// BOTTOM-LEFT CORNER is variable: Square or Round
					newPerm.push(...chooseStatePresets(prevPerm, "corner", "Sw", ["Square", "Round"]));
					
					// HOOK (bottom-right corner) is custom: Arc, Horizontal or Inv and Vertical
					newPerm.push(...chooseState(prevPerm, [["oSeInv"], ["oSeH"], ["oSeInv", "oSeV"]]));

					break;
				default:
					// For now, add all the segments to show the full grid

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

			// // Presets
			// switch (cornerNW) {
			// 	case "Square":
			// 		newPerm.push(
			// 			"oNwH",
			// 			"oNwV"
			// 		);
			// 		break;
			// 	case "Horizontal":
			// 		newPerm.push("oNwH");
			// 		break;
			// 	case "Vertical":
			// 		newPerm.push("oNwV");
			// 		break;
			// 	case "Round":
			// 		newPerm.push("oNwArc");
			// 		break;
			// 	case "VStem":
			// 		newPerm.push(
			// 			"oNwV",
			// 			"oNwArc"
			// 		);
			// 		break;
			// 	case "HStem":
			// 		newPerm.push(
			// 			"oNwH",
			// 			"oNwArc"
			// 		);
			// 		break;
			// 	default:
			// 		break;
			// }
			// switch (cornerNE) {
			// 	case "Square":
			// 		newPerm.push(
			// 			"oNeH",
			// 			"oNeV"
			// 		);
			// 		break;
			// 	case "Horizontal":
			// 		newPerm.push("oNeH");
			// 		break;
			// 	case "Vertical":
			// 		newPerm.push("oNeV");
			// 		break;
			// 	case "Round":
			// 		newPerm.push("oNeArc");
			// 		break;
			// 	case "VStem":
			// 		newPerm.push(
			// 			"oNeV",
			// 			"oNeArc"
			// 		);
			// 		break;
			// 	case "HStem":
			// 		newPerm.push(
			// 			"oNeH",
			// 			"oNeArc"
			// 		);
			// 		break;
			// 	default:
			// 		break;
			// }
			// switch (cornerSE) {
			// 	case "Square":
			// 		newPerm.push(
			// 			"oSeH",
			// 			"oSeV"
			// 		);
			// 		break;
			// 	case "Horizontal":
			// 		newPerm.push("oSeH");
			// 		break;
			// 	case "Vertical":
			// 		newPerm.push("oSeV");
			// 		break;
			// 	case "Round":
			// 		newPerm.push("oSeArc");
			// 		break;
			// 	case "VStem":
			// 		newPerm.push(
			// 			"oSeV",
			// 			"oSeArc"
			// 		);
			// 		break;
			// 	case "HStem":
			// 		newPerm.push(
			// 			"oSeH",
			// 			"oSeArc"
			// 		);
			// 		break;
			// 	default:
			// 		break;
			// }
			// switch (cornerSW) {
			// 	case "Square":
			// 		newPerm.push(
			// 			"oSwH",
			// 			"oSwV"
			// 		);
			// 		break;
			// 	case "Horizontal":
			// 		newPerm.push("oSwH");
			// 		break;
			// 	case "Vertical":
			// 		newPerm.push("oSwV");
			// 		break;
			// 	case "Round":
			// 		newPerm.push("oSwArc");
			// 		break;
			// 	case "VStem":
			// 		newPerm.push(
			// 			"oSwV",
			// 			"oSwArc"
			// 		);
			// 		break;
			// 	case "HStem":
			// 		newPerm.push(
			// 			"oSwH",
			// 			"oSwArc"
			// 		);
			// 		break;
			// 	default:
			// 		break;
			// }
			// switch (centreE) {
			// 	case "Up":
			// 		newPerm.push("iNeArc");
			// 		break;
			// 	case "Down":
			// 		newPerm.push("iSeArc");
			// 		break;
			// 	case "Horizontal":
			// 		newPerm.push("iEH");
			// 		break;
			// 	default:
			// 		break;
			// }
			// switch (centreW) {
			// 	case "Up":
			// 		newPerm.push("iNwArc");
			// 		break;
			// 	case "Down":
			// 		newPerm.push("iSwArc");
			// 		break;
			// 	case "Horizontal":
			// 		newPerm.push("iWH");
			// 		break;
			// 	default:
			// 		break;
			// }

			
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