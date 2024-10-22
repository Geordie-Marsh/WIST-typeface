// Imports
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
					<a href="test"><p>&gt; Test</p></a>
					<a href="tessellation"><p>Tessellation</p></a>
					<a href="word-snake?word=esfox"><p>Word snake</p></a>
				</div>
				<div className='about-cont d-flex flex-h jc-start gap--sm'>
					<a href="what"><p>What?</p></a>
					<a href="why"><p>Why?</p></a>
					<a href="how"><p>How?</p></a>
				</div>
			</section>
			<section className='panel--artwork'>

			</section>
		</div>
	);
}