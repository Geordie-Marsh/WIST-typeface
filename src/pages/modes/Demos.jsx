// Imports
	// Importing React
	import { useRef, useState } from 'react';
	import { Outlet, Link } from 'react-router-dom';

	// Importing demo pages
	import Tessellation from './Tessellation';
	import Sentences from './Sentences';
	import WordSnake from './WordSnake';
	import DeparturesBoard from './Departures';
	import PerfumeDemo from './PerfumeDemo';

	// Importing components
	import Pagination from '../../components/Pagination';
	import * as Icons from '../../components/Icons';



export default function Demos() {
	const [currentDemo, setCurrentDemo] = useState("tessellation");
	const demoOptions = [ // Options
		{ name: "tessellation", label: "Tessellation" },
		{ name: "perfume-tv-ad", label: "Perfume TV ad" },
		{ name: "sentences", label: "Sentences" },
		{ name: "word-snake", label: "Word snake" },
		{ name: "departures-board", label: "Departures board" },
	];
	const handleDemoChange = (name) => {
		setCurrentDemo(name);
		// Adding this page to the shown pages
		shownPages.current.push(name);
	};

	const shownPages = useRef([]);



	


	return (
		<div className="Demos">
			{ currentDemo === "tessellation" && <Tessellation demo={ true } /> }
			{ currentDemo === "sentences" && <Sentences demo={ true } alreadyShown={
				// If "sentences" is in shownPages at least twice
				shownPages.current.filter(page => page === "sentences").length > 1
			} /> }
			{ currentDemo === "word-snake" && <WordSnake demo={ true } alreadyShown={
				// If "sentences" is in shownPages at least twice
				shownPages.current.filter(page => page === "word-snake").length > 1
			} /> }
			{ currentDemo === "departures-board" && <DeparturesBoard /> }
			{ currentDemo === "perfume-tv-ad" && <PerfumeDemo /> }
			

			<div className='title-cont d-flex flex-h jc-c ai-c'>
				<h1>
					{ currentDemo === "tessellation" && "Mode: Tessellation" }
					{ currentDemo === "sentences" && "Mode: Sentences" }
					{ currentDemo === "word-snake" && "Mode: Word snake" }
					{ currentDemo === "departures-board" && "Mock-up: Departures board" }
					{ currentDemo === "perfume-tv-ad" && "Mock-up: Perfume TV ad" }
				</h1>
			</div>

			<Pagination 
				options={ demoOptions }
				selectedValue={ currentDemo }
				onChange={ handleDemoChange }
			/>

			<div className='explore-button-cont'>
				<Link to={
					(currentDemo === "tessellation" && "/playground/tessellation") ||
					(currentDemo === "sentences" && "/playground/sentences") ||
					(currentDemo === "word-snake" && "/playground/word-snake") ||
					(currentDemo === "departures-board" && "/mock-up/departures-board") ||
					(currentDemo === "perfume-tv-ad" && "/mock-up/perfume-tv-ad")
				}><p>Explore this <Icons.ForwardArrow /></p></Link>
			</div>
		</div>
	)
}