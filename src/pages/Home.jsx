// Imports
	// Import React
	import { Link } from 'react-router-dom';

	// Importing components
	import LetterGrid from '../components/LetterGrid';



export default function Home() {
	return (
		<div className='Home d-flex flex-h jc-btwn'>
			{/* <LetterGrid /> */}
			<section className='panel--interaction cont-height d-flex flex-v jc-btwn'>
				<div className='title-cont'>
					<h1>Cascadence</h1>
					<h2>By Geordie Marsh</h2>
				</div>
				<div className='pages-cont d-flex flex-v jc-btwn gap--xs'>
					<Link to="/test"><p>&gt; Test</p></Link>
					<Link to="/tessellation"><p>Tessellation</p></Link>
					<Link to="/word-snake?word=esfox"><p>Word snake</p></Link>
				</div>
				<div className='about-cont d-flex flex-h jc-start gap--sm'>
					<Link to="/what"><p>What?</p></Link>
					<Link to="/why"><p>Why?</p></Link>
					<Link to="/how"><p>How?</p></Link>
				</div>
			</section>
			<section className='panel--artwork'>

			</section>
		</div>
	);
}