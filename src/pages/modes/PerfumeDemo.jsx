// Imports
	// Importing assets
	import image1 from '../../assets/ad-still-1.png';
	import image2 from '../../assets/ad-still-2.png';
	import image3 from '../../assets/ad-still-3.png';
	import image4 from '../../assets/ad-still-4.png';



export default function PerfumeDemo() {
	return (
		<div className="PerfumeDemo">
			<img className='mode-cont image1' src={ image1 } />
			<img className='mode-cont image2' src={ image2 } />
			<img className='mode-cont image3' src={ image3 } />
			<img className='mode-cont image4' src={ image4 } />
		</div>
	)
}