// Imports
	// Importing assets
	// import Animation from '../assets/loading-animation.webm';



export default function Loading() {
	function onAnimationEnded() {
		window.dispatchEvent(new Event("loadingAnimationEnded"));
	}

	return (
		<div className="Loading screen-width screen-height d-flex jc-c ai-c">
			<video 
				autoPlay loop muted 
				className="Loading__animation"
				onEnded={ onAnimationEnded }
			>
				<source src={ Animation } type="video/webm" />
			</video>
			{/* <img src={ Animation } alt="Loading animation" className="Loading__animation" /> */}
		</div>
	)
}