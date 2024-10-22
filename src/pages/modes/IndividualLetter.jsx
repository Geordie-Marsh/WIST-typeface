// Imports
	// Importing components
	import { useEffect } from 'react';
import LetterGrid from '../../components/LetterGrid.jsx';

	// Importing defs
	import { randomlyChoose } from '../../defs.js';



export default function IndividualLetter() {
	return (
		<div className='IndividualLetter'>
			<LetterGrid />
		</div>
	);
}