// Imports
	// Importing components
	import { React, useEffect, useRef, useState } from 'react';
	import { useLocation, useNavigate } from "react-router-dom";

	// Importing defs
	import { $$, $$all, randomlyChoose } from '../../defs.js';

	// Importing constants
	import { TRANSITION_DURATION, WORDS } from '../../constants.js';

	// Importing GSAP
	import { gsap } from 'gsap';
	
	// Importing components
	import LetterGrid from '../../components/LetterGrid';
	import Radio from '../../components/Radio';
	import * as Button from '../../components/Button';



export default function Tessellation() {
	const location = useLocation();

	// Radio functionality
	// Density radio
	const [radioDensity, setRadioDensity] = useState("medium"); // Default value
	const densityOptions = [ // Options
		{ name: "low", label: "L" },
		{ name: "medium", label: "M" },
		{ name: "high", label: "H" }
	];
	const handleDensityChange = (name) => {
		setRadioDensity(name);
	};
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



	// The number of rows and columns is dependent on the viewport size
	const [items, setItems] = useState([]);

	// CONTROLLERS
	const controllerDensity = {
		low: 140,
		medium: 100,
		high: 60
	};

	// Movement consts
	const totalDur = 12;

	// The movement interval
	const movementInterval = useRef(null);

	// Keeping track of whether the tessellation has been initialised
	const tessellationInitialised = useRef(false);



	function getGridColumns() {
		const gridItemWidth = controllerDensity[radioDensity];
		const newColumns = Math.floor(window.innerWidth / gridItemWidth);
		return newColumns;
	}

	function getGridRows() {
		const gridItemHeight = controllerDensity[radioDensity] * 2;
		const newRows = Math.ceil(window.innerHeight / gridItemHeight) + 1;
		return newRows;
	}

	function updateGrid() {
		// Setting the tessellation initialised flag
		tessellationInitialised.current = true;

		// Broadcasting that the settings are now inactive
		window.dispatchEvent(new CustomEvent('settingsInactive'));

		// Directly calculate the number of columns and rows
		const columns = getGridColumns();
		const rows = getGridRows();

		// Dynamically adding in the grid elements from the useState items list
		let newItems = [];
		for (let i = 0; i < rows; i++) {
			let newItemsRow = [];

			for (let j = 0; j < columns; j++) {
				// Making the program for the letter
				// This is done by randomly selecting 5 words from the WORDS constant
				let program = [];
				for (let k = 0; k < 5; k++) {
					// Randomly selecting a word from the WORDS constant
					let word = randomlyChoose(...WORDS);
					// Turning the word into an array of letters
					let letters = word.split("");
					// Adding the letters to the program
					program.push(...letters);
				}

				newItemsRow.push(
					<div className='letter-cont' key={ (i + 1) + "-" + (j + 1) }>
						<LetterGrid 
							reference={ "--" + (i + 1) + "-" + (j + 1) } 
							mode="tessellation" 
							startDisplayed={ false } 
							program={ program } 
							colour={ radioColour }
						/>
					</div>
				)
			}

			newItems.push(
				<div className={`letters-row letter-row--${ i }`} key={ i }>
					{ newItemsRow }
				</div>
			);
		}

		let itemsReturn = (
			<div className='letters-cont'>
				{ newItems }
			</div>
		)

		setItems(itemsReturn);

		setTimeout(() => {
			// Running the movement engine
			movementEngine(rows);
		}, 500);
	}

	

	function movementEngine(rowCount) {
		const repeatNo = 100;
		let movedRows = 0;
		let timesOver = 1;

		// Moving the rows
		gsap.to('.letters-cont', {
			y: '-=' + (100 * repeatNo) + '%',
			duration: totalDur * repeatNo,
			ease: 'none',
			repeat: -1,
		});

		// Moving the individual rows to the bottom when they've reached the top
		movementInterval.current = setInterval(() => {
			if (movedRows % rowCount === 0 && movedRows > 0) {
				if (timesOver === repeatNo) {
					timesOver = 1;
					$$all(".letters-row").forEach(element => {
						element.style.transform = "translateY(" + 0 + "%)";
					});
				} else {
					timesOver++;
				}
			}
			$$(".letter-row--" + (movedRows % rowCount)).style.transform = "translateY(" + (100 * rowCount * timesOver) + "%)";
			movedRows++;
 		}, totalDur / rowCount * 1000);
	}




	function initTessellation() {
		// Pushing the history state
		window.history.pushState({}, "", "#" + location.pathname);

		gsap.to(".options-cont", {
			opacity: 0,
			duration: TRANSITION_DURATION,
			onComplete: () => {
				$$(".options-cont").style.display = "none";
				updateGrid();
			}
		});
	}

	function initSettings() {
		// Setting the tessellation initialised flag
		tessellationInitialised.current = false;
		
		// Clearing the movement interval (from the movementEngine)
		clearInterval(movementInterval.current);

		// Hiding the items
		gsap.to(".letters-cont", {
			opacity: 0,
			duration: TRANSITION_DURATION
		});

		setTimeout(() => {
			// Resetting the items
			setItems([]);
		}, TRANSITION_DURATION * 1000);		

		// Broadcasting that the settings are now active
		window.dispatchEvent(new CustomEvent('settingsActive'));

		// Showing the settings
		$$(".options-cont").style.display = "flex";
		gsap.to(".options-cont", {
			opacity: 1,
			delay: TRANSITION_DURATION * 1.5,
			duration: TRANSITION_DURATION
		});
	}




	// Debounce function
	function debounce(func, timeout = 2000) {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => { 
				func.apply(this, args); 
			}, timeout);
		};
	}
	
	// Resize event listener
	const handleResize = debounce(() => {
		// Killing all GSAP
		$$all(".LetterGrid").forEach(element => {
			element.dispatchEvent(
				new CustomEvent("letterChangeStop")
			)
		});

		// Killing the GSAP for the movement
		gsap.killTweensOf('.letters-cont');
		if (tessellationInitialised.current) {
			console.log("Resizing");
			$$(".letters-cont").style.transform = "translateY(0%)";
			$$all(".letters-row").forEach(element => {
				element.style.transform = "translateY(" + 0 + "%)";
			});

			// Clearing the movement interval (from the movementEngine)
			clearInterval(movementInterval.current);
			
			// Resetting the items
			setItems([]);
	
			// Remaking the grid
			setTimeout(() => {
				updateGrid();
			}, 50);
		}
	}, 300);

	function handlePopstate() {
		if (tessellationInitialised.current) {
			// Reloading the page
			window.location.reload();
		}
	}

	// Adding event listeners
	useEffect(() => {
		// Adding the event listener for the resize event
		window.addEventListener("resize", handleResize);

		// Adding the event lister for the popstate event
		window.addEventListener("popstate", handlePopstate);

		// Adding the event listener for the settingsClicked event
		window.addEventListener("settingsClicked--tessellation", initSettings);
	
		// Cleanup event listener and interval on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("popstate", handlePopstate);
			window.removeEventListener("settingsClicked--tessellation", initSettings);
			clearInterval(movementInterval.current);
		};
	}, []);



	

	


	return (
		<div className='Tessellation mode-cont'>
			{/* The grid of letters */}
			{ items }
			
			<div className='options-cont d-flex flex-v ai-c gap--md'>
				<h1>Tessellation options</h1>

				<div className='d-flex flex-v ai-c gap--sm'>
					<h2>Density</h2>
					<Radio
						options={ densityOptions }
						selectedValue={ radioDensity }
						onChange={ handleDensityChange }
					/>
					{
						// If the high density is selected, show a warning
						(radioDensity === "high") ? <p className='densityWarning'><i>(Warning:  high density may cause performance issues)</i></p> : ''
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
				
				<Button.Major onClick={initTessellation}>Tessellate!</Button.Major>
			</div>
		</div>
	);
}