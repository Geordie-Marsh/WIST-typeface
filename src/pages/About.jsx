// Imports
	// Import React
	import { useEffect, useState } from "react";
	import { Link } from "react-router-dom";

	// Importing components
	import LetterGrid from "../components/LetterGrid";
	import * as Button from "../components/Button";



export default function About() {
	const [slide, setSlide] = useState(0);
	const slides = [
		"modules",
		"grid",
		"letter",
		"change",
	];

	function nextSlide() {
		if (slide < slides.length - 1) {
			setSlide(slide + 1);
			
			if (slide === 0) {
				window.dispatchEvent(
					new CustomEvent(("letterChangeset"), {
						detail: "full"
					})
				);
			}
			
			if (slide === 1) {
				window.dispatchEvent(
					new CustomEvent(("letterChangeset"), {
						detail: "p"
					})
				);
			}

			if (slide === 2) {
				window.dispatchEvent(
					new CustomEvent(("letterChangeset"), {
						detail: "k"
					})
				);
			}
		} else {
			setSlide(0);
			slideModules();
		}

	}

	function slideModules() {
		window.dispatchEvent(
			new CustomEvent(("letterChangeset"), {
				detail: "modules"
			})
		);
	}


	useEffect(() => {
		// Initialising the first slide
		slideModules();
	}, []);


	return (
		<div className="About mode-cont">
			<div className="d-flex flex-v jc-c ai-c gap--md">
				{
					(slide === 0) &&
					<>
						<h1>Modules</h1>
						<p>We start with 3 modules: a short straight line, a long diagonal line, and a quarter-circle.</p>
					</>
				}
				{
					(slide === 1) &&
					<>
						<h1>Grid</h1>
						<p>These modules are used to build this grid. By showing or hiding certain segments of this grid, we can make legible letters.</p>
					</>
				}
				{
					(slide === 2) &&
					<>
						<h1>Letters</h1>
						<p>Due to the nature of the grid, most letters can have many permutations; for example, a corner could be rounded or pointed without affecting the letter's legibility. </p>
					</>
				}
				{
					(slide === 3) &&
					<>
						<h1>Change</h1>
						<p>When changing to a new letter, the system will try to keep as many parts of the letter the same and only change what's necessary. This means the look of a given letter is dependent on what came before it. </p>
					</>
				}
				<LetterGrid mode="set" reference={""} />
				<div className="d-flex flex-h jc-bwtn ai-c gap--sm">
					{
						(slide !== 3) ?
						<Button.Minor onClick={ nextSlide }><p>Next</p></Button.Minor> :
						<>
							<Button.Minor onClick={ nextSlide }><p>Restart</p></Button.Minor>
							<Button.Minor><Link to="/playground/individual-letter">Explore</Link></Button.Minor>
						</>
					}
				</div>
			</div>
		</div>
	)
}