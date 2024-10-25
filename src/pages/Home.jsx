// Imports
	// Import React
	import { Link } from 'react-router-dom';

	// Importing components
	// import LetterGrid from '../components/LetterGrid';



export default function Home() {
	return (
		<div className='Home d-flex flex-h jc-btwn'>
			{/* <LetterGrid /> */}
			<section className='panel--interaction cont-height d-flex flex-v jc-btwn'>
				<div className='title-cont'>
					<h1>Cascadence</h1>
					<h2>By Geordie Marsh</h2>
				</div>
				<div className='pages-cont d-flex flex-v jc-btwn gap--sm'>
					<h2>Playgrounds</h2>
					<Link className='link' to="/playground/individual-letter"><p>Individual letter</p></Link>
					<Link className='link' to="/playground/tessellation"><p>Tessellation</p></Link>
					<Link className='link' to="/playground/word-snake"><p>Word snake</p></Link>
					<h2>Mock-ups</h2>
					<Link className='link' to="/mock-up/departures-board"><p>Departures board</p></Link>
					<Link className='link' to="/mock-up/perfume-digital-ad"><p>Perfume digital ad</p></Link>
					<Link className='link' to="/mock-up/perfume-tv-ad"><p>Perfume TV ad</p></Link>
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