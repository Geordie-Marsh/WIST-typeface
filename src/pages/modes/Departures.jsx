// Imports
	// Importing assets
	import Video from '../../assets/mockup-departures.mp4';



export default function Departures() {
	return (
		<div className="Departures mode-cont">
			<video 
				src={ Video }
				controls
				loop
			/>
		</div>
	)
}