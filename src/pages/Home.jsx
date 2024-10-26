// Imports
	// Import React
	import { useState } from 'react';
	import { Link } from 'react-router-dom';

	// Importing components
	import Artwork from '../components/Artwork';



export default function Home() {
	// useState for the link the user is currently hovering over
	const [hoveredLink, setHoveredLink] = useState(null);

	// Function to set the hovered link
	const handleMouseEnter = (link) => {
		setHoveredLink(link);

		// Adding a class to the Base component to change the background color
		document.querySelector('.Base').classList.add("style--" + link);
	}

	// Function to reset the hovered link
	const handleMouseLeave = () => {
		setHoveredLink(null);

		// Removing the class from the Base component
		// Remove all the classes then add back the Base class
		document.querySelector('.Base').className = 'Base'; 
	}

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
					<Link 
						className='link' 
						to="/playground/individual-letter"
						onMouseEnter={ () => handleMouseEnter('individual-letter') }
						onMouseLeave={ handleMouseLeave }
					><p>Individual letter</p></Link>
					<Link 
						className='link' 
						to="/playground/tessellation"
						onMouseEnter={ () => handleMouseEnter('tessellation') }
						onMouseLeave={ handleMouseLeave }
					><p>Tessellation</p></Link>
					<Link 
						className='link' 
						to="/playground/word-snake"
						onMouseEnter={ () => handleMouseEnter('word-snake') }
						onMouseLeave={ handleMouseLeave }
					><p>Word snake</p></Link>
					<Link 
						className='link' 
						to="/playground/sentences"
						onMouseEnter={ () => handleMouseEnter('sentences') }
						onMouseLeave={ handleMouseLeave }
					><p>Sentences</p></Link>

					<h2>Mock-ups</h2>
					<Link 
						className='link' 
						to="/mock-up/departures-board"
						onMouseEnter={ () => handleMouseEnter('departures-board') }
						onMouseLeave={ handleMouseLeave }
					><p>Departures board</p></Link>
					<Link 
						className='link' 
						to="/mock-up/perfume-digital-ad"
						onMouseEnter={ () => handleMouseEnter('perfume-digital-ad') }
						onMouseLeave={ handleMouseLeave }
					><p>Perfume digital ad</p></Link>
					<Link 
						className='link' 
						to="/mock-up/perfume-tv-ad"
						onMouseEnter={ () => handleMouseEnter('perfume-tv-ad') }
						onMouseLeave={ handleMouseLeave }
					><p>Perfume TV ad</p></Link>
				</div>
				<div className='about-cont d-flex flex-h jc-start gap--sm'>
					<Link to="/what"><p>What?</p></Link>
					<Link to="/why"><p>Why?</p></Link>
					<Link to="/how"><p>How?</p></Link>
				</div>
			</section>
			<section className='panel--artwork cont-height'>
				<Artwork className={ "style--" + hoveredLink } />
			</section>
		</div>
	);
}