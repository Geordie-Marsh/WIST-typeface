// Imports
	// Importing components
	import { React, useEffect, useRef, useState } from 'react';
	import { useLocation } from "react-router-dom";

	// Importing defs
	import { $$, $$all, randomlyChoose } from '../../defs.js';

	// Importing constants
	import { TRANSITION_DURATION } from '../../constants.js';

	// Importing GSAP
	import { gsap } from 'gsap';
	
	// Importing components
	import LetterGrid from '../../components/LetterGrid';
	import Radio from '../../components/Radio';



export default function Tessellation() {
	const location = useLocation();

	// Radio functionality
	// Density radio
	const [radioDensity, setRadioDensity] = useState("medium"); // Default value
	const densityOptions = [ // Options
		{ name: "low", label: "Low" },
		{ name: "medium", label: "Medium" },
		{ name: "high", label: "High" }
	];
	const handleDensityChange = (name) => {
		setRadioDensity(name);
	}





	// The number of rows and columns is dependent on the viewport size
	const [items, setItems] = useState([]);

	// CONTROLLERS
	let controllerDensity = {
		low: 140,
		medium: 100,
		high: 60
	};

	// Movement consts
	const totalDur = 12;

	// The movement interval
	let movementInterval;



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
		console.log("Updating grid");
		// Directly calculate the number of columns and rows
		const columns = getGridColumns();
		const rows = getGridRows();

		// Dynamically adding in the grid elements from the useState items list
		let newItems = [];
		for (let i = 0; i < rows; i++) {
			let newItemsRow = [];

			for (let j = 0; j < columns; j++) {
				newItemsRow.push(
					<div className='letter-cont' key={ (i + 1) + "-" + (j + 1) }>
						<LetterGrid reference={ "--" + (i + 1) + "-" + (j + 1) } mode="tessellation" startDisplayed={ false } />
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
			// Running the tessellation engine
			tessellationEngine($$all('.letter-cont'));

			// Running the movement engine
			movementEngine(rows);
		}, 1000);
	}



	function tessellationEngine(letterElements) {
		// Updating the letters -- this is done by broadcasting a custom event for each letter
		letterElements.forEach(element => {
			// console.log(element.querySelector(".LetterGrid"));
			element.querySelector(".LetterGrid").dispatchEvent(
				new CustomEvent("letterChange", {
					// For now, return a random letter
					detail: randomlyChoose('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')
				})
			);
		});
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
		movementInterval = setInterval(() => {
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
		$$(".letters-cont").style.transform = "translateY(0%)";
		$$all(".letters-row").forEach(element => {
			element.style.transform = "translateY(" + 0 + "%)";
		});

		// Clearing the movement interval (from the movementEngine)
		clearInterval(movementInterval);

		// Resetting the items
		setItems([]);

		// Remaking the grid
		setTimeout(() => {
			updateGrid();
		}, 1);
	}, 300);

	// Add window resize event listener on component mount
	useEffect(() => {
		// updateGrid();
		window.addEventListener("resize", handleResize);
	
		// Cleanup event listener on component unmount
		return () => window.removeEventListener("resize", handleResize);
	}, []);



	function InitTessellation() {
		gsap.to(".options-cont", {
			opacity: 0,
			duration: TRANSITION_DURATION,
			onComplete: () => {
				$$(".options-cont").style.display = "none";
				updateGrid();
			}
		});
	}
	


	return (
		<div className='Tessellation mode-page'>
			<div className='mode-cont Tessellation__mode-cont'>
				{/* The grid of letters */}
				{ items }
				
				<div className='options-cont d-flex flex-v ai-c gap--sm'>
					<h1>Tessellation options</h1>
					<h2>Density</h2>
					<Radio
						options={ densityOptions }
						selectedValue={ radioDensity }
						onChange={ handleDensityChange }
					/>
					<>You have selected: { radioDensity }</>
					
					<button onClick={InitTessellation}>Tessellate!</button>
				</div>
			</div>
		</div>
	);
}