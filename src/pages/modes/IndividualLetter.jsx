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

	// Importing defs
	import { $$ } from '../../defs.js';

	// Importing constants
	import { TRANSITION_DURATION } from '../../constants.js';



export default function IndividualLetter() {
	const location = useLocation();

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
		window.addEventListener("settingsClicked--individual-letter", initSettings);

		// Cleanup
		return () => {
			// Removing the event listeners
			window.removeEventListener("popstate", handlePopstate);

			// Removing the event listener for the settingsClicked event
			window.removeEventListener("settingsClicked--individual-letter", initSettings);
		};
	}, []);



	return (
		<div className='IndividualLetter mode-cont'>
			{ items }

			<div className='options-cont d-flex flex-v ai-c gap--md'>
				<h1>Individual letter options</h1>

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