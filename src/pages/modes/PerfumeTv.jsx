// Imports
	// Importing assets
	import Video from '../../assets/mockup-perfume-tv-ad.mp4';



export default function PerfumeTv() {
	return (
		<div className="PerfumeTv mode-cont">
			<video 
				src={ Video }
				controls
				loop
			/>
		</div>
	)
}