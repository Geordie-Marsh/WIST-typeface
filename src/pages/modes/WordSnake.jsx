

// Imports
	// Importing components
	import { useEffect, useRef } from 'react';
	import { useLocation } from "react-router-dom";

	// Importing defs
	import { $$, randomlyChoose } from '../../defs.js';

	// Importing GSAP
	import { gsap } from 'gsap';
	
	// Importing components
	import LetterGrid from '../../components/LetterGrid';



export default function WordSnake(WordSnake) {
	const location = useLocation();

	// useEffect(() => {
	// 	function newInput() {
	// 		// Get the input value
	// 		const inputValue = document.getElementById('word-input').value;
   
	// 		// Create or update the query string
	// 		const query = new URLSearchParams(window.location.search);
	// 		query.set('word', inputValue); // 'word' is the key for the query parameter
   
	// 		// Update the URL without reloading the page
	// 		const newUrl = window.location.pathname + '?' + query.toString();
	// 		window.history.replaceState(null, '', newUrl);
	//    }

	//    // Make the button update the URL
	//    document.querySelector('button').addEventListener('click', newInput);
	// }, []);

	useEffect(() => {
		// Getting the word from the URL
		const query = new URLSearchParams(location.search);
		const word = query.get('word');

		// Breaking the word into an array of characters
		const wordArray = word.split('');

		// The variable to store the current state of the word snake
		let currentPerm = [];

		// Getting the letter elements
		let letters = [];
		for (let i = 0; i < wordArray.length; i++) {
			letters.push("letter" + (i + 1));
			// This will create an array of strings like ["letter1", "letter2", "letter3"]
		}

		// The duration of the interval (in seconds)
		let dur = 2.2;
		// The duration of the movement (in seconds)
		let moveDur = dur * wordArray.length;



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
					new CustomEvent(("letterChangeletter" + (i + 1)), {
						detail: currentPerm[i]
						// For now, return a random letter
						// detail: randomlyChoose('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')
					})
				);
			}
		}

		// Setting up the interval
		let interval = setInterval(wordSnakeEngine, dur * 1000);
		// wordSnakeEngine();

		// Adding the movement animation
		gsap.to('.letters-cont', {
			x: '-=100%',
			duration: moveDur,
			ease: 'none',
			repeat: -1
		});
		gsap.to('.duplicate-letters-cont', {
			x: '-=100%',
			duration: moveDur,
			ease: 'none',
			repeat: -1
		});

		// Cleanup
		return () => {
			clearInterval(interval);

			// Removing the event listeners
			for (let i = 0; i < currentPerm.length; i++) {
				window.removeEventListener(("letterChangeletter" + (i + 1)), wordSnakeEngine);
			}
		};
	}, [location]);

	// ! PROBLEMS:
	// - The letters and duplicate letters will be different because they are both left to random chance independently
	// - The letters are not in sync with the movement of the letters

	return (
		<div className='WordSnake mode-page'>
			<div className='mode-cont'>
				<div className='letters-cont'>
					<div className='letter-cont'><LetterGrid reference={ "letter1" } mode="wordSnake" /></div>
					<div className='letter-cont'><LetterGrid reference={ "letter2" } mode="wordSnake" /></div>
					<div className='letter-cont'><LetterGrid reference={ "letter3" } mode="wordSnake" /></div>
					<div className='letter-cont'><LetterGrid reference={ "letter4" } mode="wordSnake" /></div>
					<div className='letter-cont'><LetterGrid reference={ "letter5" } mode="wordSnake" /></div>
				</div>
				<div className='duplicate-letters-cont'>
					<div className='letter-cont'><LetterGrid reference={ "letter1" } mode="wordSnake" /></div>
					<div className='letter-cont'><LetterGrid reference={ "letter2" } mode="wordSnake" /></div>
					<div className='letter-cont'><LetterGrid reference={ "letter3" } mode="wordSnake" /></div>
					<div className='letter-cont'><LetterGrid reference={ "letter4" } mode="wordSnake" /></div>
					<div className='letter-cont'><LetterGrid reference={ "letter5" } mode="wordSnake" /></div>
				</div>
				{/* A text input for the user to input a word to display */}
				{/* <input type='text' id='word-input' placeholder='Enter a word' />
				<button >Update URL</button> */}
			</div>
		</div>
	);
}