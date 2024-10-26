// Imports
	// Importing React
	import { useEffect, useState, useRef } from 'react';
	import { useLocation } from "react-router-dom";

	// Importing gsap
	import { gsap } from 'gsap';

	// Importing components
	import LetterGrid from '../../components/LetterGrid.jsx';
	import Radio from '../../components/Radio.jsx';
	import Button from '../../components/Button.jsx';
	import * as Input from '../../components/Input';

	// Importing defs
	import { $$ } from '../../defs.js';

	// Importing constants
	import { TRANSITION_DURATION } from '../../constants.js';



export default function Sentences() {
	const location = useLocation();

	// Input functionality
	const [inputNumber, setInputNumber] = useState(7); // Default value
	const handleNumberChange = (newValue) => {
		setInputNumber(newValue);
	};
	// The number validity
	const [validNumber, setValidNumber] = useState(true);
	const handleNumberValidity = (newValue) => {
		setValidNumber(newValue);
	};
	const [inputSentence, setInputSentence] = useState(7); // Default value
	const handleSentenceChange = (newValue) => {
		setInputSentence(newValue);
	};
	// The sentence validity
	const [validSentence, setValidSentence] = useState(true);
	const handleSentenceValidity = (newValue) => {
		setValidSentence(newValue);
	};

	// Radio functionality
	// Colour radio
	const [radioColour, setRadioColour] = useState("rainbow"); // Default value
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

	// The items
	const [items, setItems] = useState(null);

	const initialised = useRef(false);



	// Function to initialise the mode
	function init() {
		// Checking if the number is valid
		if (inputNumber < 5 || inputNumber > 9) {
			setValidNumber(false);
			return;
		}
		// Checking if the sentence is valid
		if (inputSentence.length < 18 || inputSentence.length > 100) {
			setValidSentence(false);
			return;
		}

		// Pushing the history state
		window.history.pushState({}, "", "#" + location.pathname);

		gsap.to(".options-cont", {
			opacity: 0,
			duration: TRANSITION_DURATION,
			onComplete: () => {
				$$(".options-cont").style.display = "none";

				initialised.current = true;

				// Broadcasting that the settings are now active
				window.dispatchEvent(new CustomEvent('settingsInactive'));

				setItems(
					<div className='letter'>
						<LetterGrid colour={ radioColour } allowedToStart={ initialised.current } />
					</div>
				);
			}
		});
	}

	function initSettings() {
		// Setting the word snake initialised flag
		initialised.current = false;

		// Broadcasting that the settings are now active
		window.dispatchEvent(new CustomEvent('settingsActive'));

		// Hiding the items
		gsap.to(".letter", {
			opacity: 0,
			duration: TRANSITION_DURATION,
			onComplete: () => {
				setItems(null);
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



	function handlePopstate() {
		if (initialised.current) {
			// Reloading the page
			// window.location.reload();
			initSettings();
		}
	}



	useEffect(() => {
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
		};
	}, []);



	return (
		<div className='Sentences mode-cont'>
			{ items }

			<div className='options-cont d-flex flex-v ai-c gap--md'>
				<h1>Sentences options</h1>

				<div className='d-flex flex-v ai-c gap--sm'>
					<h2>Number of letters displayed</h2>
					<Input.Number 
						placeholder="7"
						value={ inputNumber }
						onChange={ handleNumberChange }
						min={ 5 }
						max={ 9 }
					/>
					{
						// If the number is too long or too short, show an error message
						((inputNumber < 5 || inputNumber > 9) && !validNumber) ? <p className='numberInputError'>(Number must be between 5 and 9)</p> : ''
					}
				</div>
				
				<div className='d-flex flex-v ai-c gap--sm'>
					<h2>Sentence to print</h2>
					<Input.TextArea 
						placeholder="7"
						value={ inputSentence }
						onChange={ handleSentenceChange }
						minLength={ 18 }
						maxLength={ 100 }
					/>
					{
						// If the sentence is too long or too short, show an error message
						((inputSentence.length < 18 || inputSentence.length > 100) && !validSentence) ? <p className='sentenceInputError'>(The sentence must be 18-100 characters long)</p> : ''
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
				
				<Button onClick={init}>Start!</Button>
			</div>
		</div>
	);
}