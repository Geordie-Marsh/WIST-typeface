// Imports
	// Importing React
	import { useEffect, useState, useRef } from 'react';
	import { useLocation } from "react-router-dom";

	// Importing gsap
	import { gsap } from 'gsap';

	// Importing components
	import LetterGrid from '../../components/LetterGrid.jsx';
	import Radio from '../../components/Radio.jsx';
	import * as Button from '../../components/Button.jsx';
	import * as Input from '../../components/Input';

	// Importing defs
	import { $$, max, min } from '../../defs.js';

	// Importing constants
	import { TRANSITION_DURATION } from '../../constants.js';



export default function Sentences({ demo = false, alreadyShown = false }) {
	const location = useLocation();

	// Input functionality
	const [inputNumber, setInputNumber] = useState(9); // Default value
	const handleNumberChange = (newValue) => {
		setInputNumber(newValue);
	};
	// The number validity
	const [validNumber, setValidNumber] = useState(true);
	const handleNumberValidity = (newValue) => {
		setValidNumber(newValue);
	};
	// The min and max values for the number input
	const minNumber = 7;
	const maxNumber = 11;

	const [inputSentence, setInputSentence] = useState(
		( demo === true ) ? "Letters are to words. And words are to sentences. And sentences are to ideas. And ideas are to being human." : ""
	); // Default value
	const handleSentenceChange = (newValue) => {
		setInputSentence(newValue);
	};
	// The sentence validity
	const [validSentence, setValidSentence] = useState(true);
	const handleSentenceValidity = (newValue) => {
		setValidSentence(newValue);
	};
	// The min and max values for the sentence input
	const minSentence = 12;
	const maxSentence = 200;
	// The preset sentences
	const presetSentences = [
		"Letters are to words. And words are to sentences. And sentences are to ideas. And ideas are to being human.",
		"I see a little silhouetto of a man, Scaramouche, Scaramouche, will you do the Fandango? Thunderbolt and lightning, very, very frightening me. (Galileo)",
		"There's a starman waiting in the sky. He'd like to come and meet us but he thinks he'd blow our minds.",
		"If you liked it then you shoulda put a ring on it. Don't be mad once you see that he want it.",
		"Don't go wasting your emotion. Lay all your love on me. Don't go sharing your devotion. Lay all your love on me.",
		"I'm that bad type, make your mama sad type, make your girlfriend mad tight, might seduce your dad type, I'm the bad guy... duh!",
		"I'm a Barbie girl, in the Barbie world. Life in plastic, it's fantastic. You can brush my hair, undress me everywhere. Imagination, life is your creation!"
	];
	const [currentPreset, setCurrentPreset] = useState(0);

	// Radio functionality
	// Colour radio
	const [radioColour, setRadioColour] = useState(
		( demo === true ) ? "morning" : "rainbow"
	); // Default value
	const colourOptions = [ // Options
		{ name: "black", label: "Black" },
		{ name: "rainbow", label: "Rainbow" },
		{ name: "morning", label: "Morning" },
		{ name: "daylight", label: "Daylight" },
		{ name: "sunset", label: "Sunset" },
		{ name: "twilight", label: "Twilight" },
	];
	const handleColourChange = (name) => {
		setRadioColour(name);
	};
	// Gap radio
	const [radioGap, setRadioGap] = useState(
		( demo === true ) ? "none" : "small"
	); // Default value
	const gapOptions = [ // Options
		{ name: "none", label: "None" },
		{ name: "small", label: "Small" },
		{ name: "large", label: "Large" }
	];
	const handleGapChange = (name) => {
		setRadioGap(name);
	}

	// The items
	const [items, setItems] = useState(null);

	// The sentence
	const sentence = useRef("");

	// The sentence as an array
	let sentenceArray = [];

	// The program
	const program = useRef([]);

	// The index of the current instance
	const instanceIndex = useRef(0);
	// The index of the current letter
	const letterIndex = useRef(0);
	// The flag for a pause
	const pause = useRef(false);

	// The interval
	const interval = useRef(null);

	// The number of displayed letters
	const noOfDisplayedLetters = useRef(7);

	// The duration of an entire instance (in seconds)
	const instanceDuration = 2.5;

	// The variable to store the letter elements
	let letterElements = [];

	// The initialised flag
	const initialised = useRef(false);



	// Function to initialise the mode
	function init() {
		// Checking if the number is valid
		if (inputNumber < minNumber || inputNumber > maxNumber) {
			setValidNumber(false);
			return;
		}
		// Checking if the sentence is valid
		if (!(inputSentence.length >= minSentence && inputSentence.length <= maxSentence)) {
			setValidSentence(false);
			return;
		}
		
		
		if (!demo) {
			// Pushing the history state
			window.history.pushState({}, "", "#" + location.pathname);

			gsap.to(".options-cont", {
				opacity: 0,
				duration: TRANSITION_DURATION,
				onComplete: () => {
					$$(".options-cont").style.display = "none";

					$$(".letters-cont").style.display = "flex";
				}
			});

			// Ensuring the letter cont is visible
			$$(".letters-cont").style.opacity = 1;

			// Broadcasting that the settings are now inactive
			window.dispatchEvent(new CustomEvent('settingsInactive'));
		} else {
			$$(".letters-cont").style.display = "flex";
		}

		// Setting the initialised flag
		initialised.current = true;

		// Getting the sentence
		sentence.current = inputSentence;
		
		// Getting the number of displayed letters
		noOfDisplayedLetters.current = inputNumber;

		// Setting up the sentence array
		sentenceArray = sentence.current.split('');



		// Creating the letter elements
		let paddingClass = (radioGap === "small") ? "pad--small" : (radioGap === "large") ? "pad--large" : "";

		for (let i = 0; i < noOfDisplayedLetters.current; i++) {
			// Creating the letter elements
			letterElements.push(
				<div className={"letter-cont " + paddingClass} key={ i }>
					<LetterGrid 
						reference={ "letter" + i }
						mode='sentences'
						colour={ radioColour }
					/>
				</div>
			)
		}

		// Splitting the sentence into words
		let words = sentence.current.split(" ");
		// Converting the words into arrays of letters
		words = words.map(word => word.split(""));

		// Making each instance and adding it to the program
		while (words.length > 0) {
			let instance = [];

			// Getting the length of this word
			let wordLength = words[0].length;

			// Storing which words to remove from the wordlist
			let wordsToRemove = [];

			// Check if this word can fit wholely into the instance
			if (wordLength <= noOfDisplayedLetters.current) {
				// Adding the word to the instance
				words[0].forEach(letter => {
					instance.push(letter);
				});
				wordsToRemove.push(0);

				// Seeing if any following words will also fit into the instance
				for (let i = 1; i < words.length; i++) {
					const word = words[i];
					
					const potentialNewLength = instance.length + 1 + word.length;

					if (potentialNewLength <= noOfDisplayedLetters.current) {
						instance.push(" ");
						word.forEach(letter => {
							instance.push(letter);
						});
						wordsToRemove.push(i);
					} else {
						break;
					}
				}

				// Adding in trailing spaces
				while (instance.length < noOfDisplayedLetters.current) {
					instance.push(" ");
				}
			} else {
				// If the word is longer than the number of letters in each instance, remove the first x number of letters from the word
				let word = words[0];
				let instanceLetters = word.slice(0, noOfDisplayedLetters.current);
				instance.push(...instanceLetters);
				words[0] = word.slice(noOfDisplayedLetters.current);
			}

			// Removing the words that have been added to the instance
			words = words.filter((word, index) => !wordsToRemove.includes(index));

			// Adding the instance to the program
			program.current.push(instance);
		}

		// Setting the items
		setItems(letterElements);

		// if (!alreadyShown) {
			// Setting up the interval
			interval.current = setInterval(() => {
				// Checking if the pause flag is set
				if (pause.current) {
					pause.current = false;
					return;
				}

				// Getting the current instance
				let instance = program.current[instanceIndex.current];

				// Setting the letter
				// Broadcast the letter to the LetterGrid component
				window.dispatchEvent(
					new CustomEvent(('letterChangesentencesletter' + letterIndex.current), {
						detail: instance[letterIndex.current]
					})
				);

				// Incrementing the letter index
				letterIndex.current++;

				// Resetting the letter index if it goes over the number of letters in the instance
				if (letterIndex.current >= noOfDisplayedLetters.current) {
					letterIndex.current = 0;

					// Incrementing the instance index
					instanceIndex.current++;

					// Pausing the interval for one round
					pause.current = true;
				}
				// Resetting the instance index if it goes over the number of instances
				if (instanceIndex.current >= program.current.length) {
					instanceIndex.current = 0;
				}
			}, instanceDuration * 1000 / noOfDisplayedLetters.current);
		// }
	}	

	function initSettings() {
		// Setting the initialised flag
		initialised.current = false;

		// Broadcasting that the settings are now active
		window.dispatchEvent(new CustomEvent('settingsActive'));

		// Hiding the items
		gsap.to(".letters-cont", {
			opacity: 0,
			duration: TRANSITION_DURATION,
			onComplete: () => {
				$$(".letters-cont").style.display = "none";
				setItems(null);

				// Clearing the interval
				clearInterval(interval.current);

				// Resetting the variables
				sentence.current = "";
				sentenceArray = [];
				program.current = [];
				instanceIndex.current = 0;
				letterIndex.current = 0;
				pause.current = false;
				letterElements = [];
			}
		});

		// Showing the options
		$$(".options-cont").style.display = "flex";
		gsap.to(".options-cont", {
			opacity: 1,
			delay: TRANSITION_DURATION * 1.5,
			duration: TRANSITION_DURATION
		});
	}

	function initPresets() {
		// Setting the sentence
		setInputSentence(presetSentences[currentPreset]);

		// Incrementing the current preset
		setCurrentPreset((currentPreset + 1) % presetSentences.length);

		setTimeout(() => {
			// Make the textarea input detect the change
			window.dispatchEvent(new Event('textareaUpdated'));
		}, 4);
	}



	function handlePopstate() {
		if (initialised.current) {
			// Reloading the page
			// window.location.reload();
			initSettings();
		}
	}



	useEffect(() => {
		// If the demo is active, initialise the mode
		if (demo === true) {
			console.log(alreadyShown);
			init();
		}


		// Adding the event lister for the popstate event
		window.addEventListener("popstate", handlePopstate);

		// Adding the event listener for the settingsClicked event
		window.addEventListener("settingsClicked--sentences", initSettings);

		// Cleanup
		return () => {
			// Removing the event listeners
			window.removeEventListener("popstate", handlePopstate);

			// Removing the event listener for the settingsClicked event
			window.removeEventListener("settingsClicked--sentences", initSettings);

			// Clearing the interval
			clearInterval(interval.current);
		};
	}, []);



	return (
		<div className='Sentences mode-cont'>
			<div className='letters-cont'>
				{ items }
			</div>

			{ demo === false && 
				<div className='options-cont d-flex flex-v ai-c gap--md'>
					<h1>Sentences options</h1>

					<div className='d-flex flex-v ai-c gap--sm'>
						<h2>Number of letters displayed</h2>
						<Input.Number 
							placeholder="7"
							value={ inputNumber }
							onChange={ handleNumberChange }
							min={ minNumber }
							max={ maxNumber }
						/>
						{
							// If the number is too long or too short, show an error message
							((inputNumber < minNumber || inputNumber > maxNumber) && !validNumber) ? <p className='numberInputError'>(Number must be between {minNumber} and {maxNumber})</p> : ''
						}
					</div>
					
					<div className='d-flex flex-v ai-c gap--sm'>
						<h2>Sentence to print</h2>
						<div className='sentence-input-cont d-flex flex-h jc-btwn ai-c gap--sm'>
							<Input.TextArea 
								placeholder="Type here..."
								value={ inputSentence }
								onChange={ handleSentenceChange }
								minLength={ minSentence }
								maxLength={ maxSentence }
							/>
							<Button.Minor onClick={ initPresets }>Cycle presets</Button.Minor>
						</div>
						{
							// If the sentence is too long or too short, show an error message
							((inputSentence.length < minSentence || inputSentence.length > maxSentence) && !validSentence) ? <p className='sentenceInputError'>(The sentence must be {minSentence}-{maxSentence} characters long)</p> : ''
						}
					</div>

					<div className='d-flex flex-v ai-c gap--sm'>
						<h2>Colour</h2>
						<Radio
							options={ colourOptions }
							selectedValue={ radioColour }
							onChange={ handleColourChange }
						/>
					</div>
					<div className='d-flex flex-v ai-c gap--sm'>
						<h2>Gap between letters</h2>
						<Radio
							options={ gapOptions }
							selectedValue={ radioGap }
							onChange={ handleGapChange }
						/>
					</div>
					
					<Button.Major onClick={init}>Start!</Button.Major>
				</div>
			}
		</div>
	);
}