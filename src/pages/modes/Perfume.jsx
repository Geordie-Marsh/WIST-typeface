// Imports
	// Importing assets
	import Video from '../../assets/mockup-perfume-ad.mp4';



export default function Perfume() {
	return (
		<div className="Perfume mode-cont">
			<video 
				src={ Video }
				controls
				loop
			/>
		</div>
	)
}