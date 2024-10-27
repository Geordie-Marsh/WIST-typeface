

// Imports
	// Importing components
	import { useEffect, useRef, useState } from 'react';
	import { useLocation } from "react-router-dom";

	// Importing defs
	import { $$, randomlyChoose } from '../../defs.js';

	// Importing constants
	import { TRANSITION_DURATION } from '../../constants.js';

	// Importing GSAP
	import { gsap } from 'gsap';
	
	// Importing components
	import LetterGrid from '../../components/LetterGrid';
	import Radio from '../../components/Radio';
	import * as Button from '../../components/Button';
	import * as Input from '../../components/Input';



export default function WordSnake(WordSnake) {
	const location = useLocation();

	const [letters, setLetters] = useState([]);

	// Input functionality
	const [inputWord, setInputWord] = useState("type"); // Default value
	const handleWordChange = (newValue) => {
		setInputWord(newValue);
	};
	// The word validity
	const [validWord, setValidWord] = useState(true);
	const handleWordValidity = (newValue) => {
		setValidWord(newValue);
	};

	// Radio functionality
	// Colour radio
	const [radioColour, setRadioColour] = useState("black"); // Default value
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
	const [radioGap, setRadioGap] = useState("small"); // Default value
	const gapOptions = [ // Options
		{ name: "none", label: "None" },
		{ name: "small", label: "Small" },
		{ name: "large", label: "Large" }
	];
	const handleGapChange = (name) => {
		setRadioGap(name);
	}



	// The word
	const word = useRef(null);

	// Breaking the word into an array of characters
	let wordArray;

	// The variable to store the current state of the word snake
	let currentPerm = [];

	// The variable to store the letter elements
	let letterElements = [];
	
	// The duration of the interval (in seconds)
	const dur = 2.1;
	// The duration of the movement (in seconds)
	let moveDur;

	// The interval
	const interval = useRef(null);

	// Keeping track of whether the word snake has been initialised
	const wordSnakeInitialised = useRef(false);

	// Setting up the movement animation
	const tl = gsap.timeline({ repeat: -1, paused: true });



	function wordSnakeEngine() {
		
		if (currentPerm.length === 0) {
			currentPerm = wordArray;
		} else {
			// Removing the last letter and adding it to the start
			currentPerm.unshift(currentPerm.pop());
		}

		// Updating the letters -- this is done by broadcasting a custom event for each letter
		for (let i = 0; i < currentPerm.length; i++) {
			console.log("Word snake engine running, ", currentPerm[i]);
			// document.getElementById(letters[i]).dispatchEvent(new CustomEvent(('letterChangeletter' + (i + 1)), { detail: currentPerm[i] }));
			// console.log(".LetterGridletter" + (i + 1))
			// console.log(currentPerm);

			window.dispatchEvent(
				new CustomEvent(("letterChangeletter" + (i)), {
					detail: currentPerm[i]
					// For now, return a random letter
					// detail: randomlyChoose('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')
				})
			);
		}
	}



	// Init function
	function InitWordSnake() {
		if (inputWord.length < 4 || inputWord.length > 8) {
			setValidWord(false);
			return;
		}
		
		// Setting the word snake initialised flag
		wordSnakeInitialised.current = true;

		// Pushing the history state
		window.history.pushState({}, "", "#" + location.pathname);

		// Hiding the options
		gsap.to(".options-cont", {
			opacity: 0,
			duration: TRANSITION_DURATION,
			onComplete: () => {
				$$(".options-cont").style.display = "none";
			}
		});

		// Ensuring the letter conts are visible
		$$(".letters-cont").style.opacity = 1;
		$$(".duplicate-letters-cont").style.opacity = 1;

		// Broadcasting that the settings are now inactive
		window.dispatchEvent(new CustomEvent('settingsInactive'));
		
		// Getting the word
		word.current = inputWord;
		wordArray = word.current.split('');
		
		// Setting the move duration
		moveDur = dur * wordArray.length;
		
		// Setting up the interval
		interval.current = setInterval(wordSnakeEngine, dur * 1000);
		console.log(word, wordArray, moveDur, interval.current);

		// Creating the letter elements
		let paddingClass = (radioGap === "small") ? "pad--small" : (radioGap === "large") ? "pad--large" : "";

		for (let i = 0; i < wordArray.length; i++) {
			letterElements.push(
				<div className={"letter-cont " + paddingClass} key={ i }>
					<LetterGrid 
						reference={ "letter" + i } 
						mode="wordSnake" 
						colour={ radioColour }
					/>
				</div>
			);
		}
		setLetters(letterElements);

		tl.to('.letters-cont', {
			x: '-=100%',
			duration: moveDur,
			ease: 'none',
			onComplete: () => {
				gsap.set('.letters-cont', { x: '100%' });
				tl.addLabel("halfway");
			}
		}, 0);
		tl.to('.duplicate-letters-cont', {
			x: '-=200%',
			duration: moveDur * 2,
			ease: 'none',
		}, 0);
		tl.to('.letters-cont', {
			x: '-=100%',
			duration: moveDur,
			ease: 'none',
		}, moveDur);

		setTimeout(() => {
			tl.play();
		}, dur * 1000 * 1.9);
	}

	function initSettings() {
		// Setting the word snake initialised flag
		wordSnakeInitialised.current = false;

		// Clearing the interval
		clearInterval(interval.current);

		// Broadcasting that the settings are now active
		window.dispatchEvent(new CustomEvent('settingsActive'));

		// Hiding the items
		gsap.to(".letters-cont, .duplicate-letters-cont", {
			opacity: 0,
			duration: TRANSITION_DURATION
		});

		setTimeout(() => {
			// Resetting the items
			setLetters([]);

			// Resetting the variables
			word.current = null;
			wordArray = null;
			currentPerm = [];
			letterElements = [];

			// Resetting the timeline
			tl.pause(0);
			tl.clear();
		}, TRANSITION_DURATION * 1000);

		// Showing the options
		$$(".options-cont").style.display = "flex";
		gsap.to(".options-cont", {
			opacity: 1,
			delay: TRANSITION_DURATION * 1.5,
			duration: TRANSITION_DURATION
		});
	}
	


	function handlePopstate() {
		if (wordSnakeInitialised.current) {
			// Reloading the page
			window.location.reload();
		}
	}



	useEffect(() => {
		// Adding the event lister for the popstate event
		window.addEventListener("popstate", handlePopstate);

		// Adding the event listener for the settingsClicked event
		window.addEventListener("settingsClicked--word-snake", initSettings);

		// Cleanup
		return () => {
			clearInterval(interval.current);

			// Removing the event listeners
			window.removeEventListener("popstate", handlePopstate);

			// Removing the event listener for the settingsClicked event
			window.removeEventListener("settingsClicked--word-snake", initSettings);
		};
	}, []);



	return (
		<div className='WordSnake mode-cont'>
			<div className='letters-cont'>
				{ letters }
			</div>
			<div className='duplicate-letters-cont'>
				{ letters }
			</div>
			
			<div className='options-cont d-flex flex-v ai-c gap--md'>
				<h1>Word snake options</h1>

				<div className='d-flex flex-v ai-c gap--sm'>
					<h2>Word</h2>
					<Input.Text 
						placeholder="Enter a word..."
						value={ inputWord }
						onChange={ handleWordChange }
						minLength={ 4 }
						maxLength={ 8 }
					/>
					{
						// If the word is too long or too short, show an error message
						((inputWord.length < 4 || inputWord.length > 8) && !validWord) ? <p className='wordInputError'>(Word must be between 4-8 characters long)</p> : ''
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
				
				<Button.Major onClick={InitWordSnake}>Start word snake</Button.Major>
			</div>
		</div>
	);
}