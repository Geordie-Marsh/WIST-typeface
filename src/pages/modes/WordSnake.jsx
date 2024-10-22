

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
	import Button from '../../components/Button';
	import Input from '../../components/Input';



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
	let word;

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
	let interval;



	function wordSnakeEngine() {
		if (currentPerm.length === 0) {
			currentPerm = wordArray;
		} else {
			// Removing the last letter and adding it to the start
			currentPerm.unshift(currentPerm.pop());
		}

		// Updating the letters -- this is done by broadcasting a custom event for each letter
		for (let i = 0; i < currentPerm.length; i++) {
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



	// Setting up the movement animation
	const tl = gsap.timeline({ repeat: -1, paused: true });
	



	useEffect(() => {
		// Cleanup
		return () => {
			clearInterval(interval);

			// Removing the event listeners
			for (let i = 0; i < wordArray.length; i++) {
				window.removeEventListener(("letterChangeletter" + (i)), wordSnakeEngine);
			}
		};
	}, []);



	// Init function
	function InitWordSnake() {
		if (inputWord.length < 4 || inputWord.length > 8) {
			setValidWord(false);
			return;
		}

		// Hiding the options
		gsap.to(".options-cont", {
			opacity: 0,
			duration: TRANSITION_DURATION,
			onComplete: () => {
				$$(".options-cont").style.display = "none";
			}
		});

		// Getting the word
		word = inputWord;
		wordArray = word.split('');

		// Setting the move duration
		moveDur = dur * wordArray.length;

		// Setting up the interval
		interval = setInterval(wordSnakeEngine, dur * 1000);

		// Creating the letter elements
		for (let i = 0; i < wordArray.length; i++) {
			let paddingClass = (radioGap === "small") ? "pad--small" : (radioGap === "large") ? "pad--large" : "";

			letterElements.push(
				<div className={"letter-cont " + paddingClass} key={ i }>
					<LetterGrid 
						reference={ "letter" + i } 
						mode="wordSnake" 
						colour={ radioColour }
						style={{ padding: radioGap === "small" ? "0 2rem" : radioGap === "large" ? "0 4rem" : "0" }}
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



	return (
		<div className='WordSnake mode-page'>
			<div className='mode-cont'>
				<div className='letters-cont'>
					{ letters }
				</div>
				<div className='duplicate-letters-cont'>
					{ letters }
				</div>
				
				<div className='options-cont d-flex flex-v ai-c gap--md'>
					<h1>Word snake options</h1>

					<div className='d-flex flex-v ai-c'>
						<h2>Word</h2>
						<Input 
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
					<div className='d-flex flex-v ai-c'>
						<h2>Colour</h2>
						<Radio
							options={ colourOptions }
							selectedValue={ radioColour }
							onChange={ handleColourChange }
						/>
					</div>
					<div className='d-flex flex-v ai-c'>
						<h2>Gap between letters</h2>
						<Radio
							options={ gapOptions }
							selectedValue={ radioGap }
							onChange={ handleGapChange }
						/>
					</div>
					
					<Button onClick={InitWordSnake}>Start word snake</Button>
				</div>
			</div>
		</div>
	);
}