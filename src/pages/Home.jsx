// Imports
	// Importing components
	import LetterGrid from '../components/LetterGrid';



export default function Home() {
	return (
		<div className='Home'>
			{/* <LetterGrid /> */}
			<section className='panel--interaction'>
				<div className='title-cont'>
					<h1>Cascadence</h1>
					<p><b>By Geordie Marsh</b></p>
				</div>
				<div className='pages-cont'>
					<a href="test"><p>Test</p></a>
					<a href="tessellation"><p>Tessellation</p></a>
					<a href="word-snake?word=esfox"><p>Word snake</p></a>
				</div>
			</section>
			<section className='panel--artwork'>

			</section>
		</div>
	);
}