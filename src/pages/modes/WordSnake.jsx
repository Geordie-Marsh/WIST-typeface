

// Imports
	// Importing components
	import { useEffect } from 'react';
	import { useLocation } from "react-router-dom";
	
	// Importing components
	import LetterGrid from '../../components/LetterGrid';



export default function WordSnake(WordSnake) {
	const location = useLocation();

	useEffect(() => {
		function newInput() {
			// Get the input value
			const inputValue = document.getElementById('query-input').value;
   
			// Create or update the query string
			const query = new URLSearchParams(window.location.search);
			query.set('q', inputValue); // 'q' is the key for the query parameter
   
			// Update the URL without reloading the page
			const newUrl = window.location.pathname + '?' + query.toString();
			window.history.replaceState(null, '', newUrl);
	   }

	   // Make the button update the URL
	   document.querySelector('button').addEventListener('click', newInput);
	}, []);

	useEffect(() => {
		
	}, [location]);

	return (
		<div className='WordSnake'>
			<LetterGrid />
			<LetterGrid />
			<LetterGrid />
			{/* A text input for the user to input a word to display */}
			<input type='text' id='query-input' placeholder='Enter a word' />
			<button >Update URL</button>
			
		</div>
	);
}