// Imports
	import { useEffect } from "react"

	// Importing GSAP
	import { gsap } from "gsap"

	// Importing components
	import LetterGrid from "../../components/LetterGrid"

export default function PerfumeLogic() {
	useEffect(() => {
		// Progressively reveal the letters
		const tl = gsap.timeline();

		const arianaTime = 0.02;

		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeAriana l1"), {
					detail: "A"
				})
			);
		}, "<+=".concat(1 * arianaTime));
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeAriana l2"), {
					detail: "R"
				})
			);
		}, "<+=".concat(1.8 * arianaTime));
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeAriana l3"), {
					detail: "I"
				})
			);
		}, "<+=".concat(2.5 * arianaTime));
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeAriana l4"), {
					detail: "A"
				})
			);
		}, "<+=".concat(3.1 * arianaTime));
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeAriana l5"), {
					detail: "N"
				})
			);
		}, "<+=".concat(3.6 * arianaTime));
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeAriana l6"), {
					detail: "A"
				})
			);
		}, "<+=".concat(4 * arianaTime));
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeGrande l1"), {
					detail: "G"
				})
			);
		}, "<+=".concat(4.8 * arianaTime));
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeGrande l2"), {
					detail: "R"
				})
			);
		}, "<+=".concat(5.2 * arianaTime));
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeGrande l3"), {
					detail: "A"
				})
			);
		}, "<+=".concat(5.7 * arianaTime));
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeGrande l4"), {
					detail: "N"
				})
			);
		}, "<+=".concat(6.3 * arianaTime));
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeGrande l5"), {
					detail: "D"
				})
			);
		}, "<+=".concat(7 * arianaTime));
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeGrande l6"), {
					detail: "E"
				})
			);
		}, "<+=".concat(7.8 * arianaTime));



		const cloudTime = arianaTime * 2.4;

		let cloudTl = gsap.timeline();

		cloudTl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeCloud l1"), {
					detail: "C"
				})
			);
		}, "<+=".concat(1 * cloudTime));
		cloudTl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeCloud l2"), {
					detail: "L"
				})
			);
		}, "<+=".concat(1.6 * cloudTime));
		cloudTl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeCloud l3"), {
					detail: "O"
				})
			);
		}, "<+=".concat(2 * cloudTime));
		cloudTl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeCloud l4"), {
					detail: "U"
				})
			);
		}, "<+=".concat(2.4 * cloudTime));
		cloudTl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeCloud l5"), {
					detail: "D"
				})
			);
		}, "<+=".concat(3 * cloudTime));


		let colourTl = gsap.timeline();

		const colourTime = 3;

		colourTl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeColour l1"), {
					detail: "G"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeColour l2"), {
					detail: "O"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeColour l3"), {
					detail: "L"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeColour l4"), {
					detail: "D"
				})
			);
		}, "<+=".concat(1 * colourTime));
		colourTl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeColour l1"), {
					detail: "P"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeColour l2"), {
					detail: "I"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeColour l3"), {
					detail: "N"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeColour l4"), {
					detail: "K"
				})
			);
		}, "<+=".concat(2 * colourTime));
		colourTl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeColour l1"), {
					detail: "G"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeColour l2"), {
					detail: "O"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeColour l3"), {
					detail: "L"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeColour l4"), {
					detail: "D"
				})
			);
		}, "<+=".concat(3 * colourTime));

	}, []);



	return (
		<div className="PerfumeLogic">
			<div className="ArianaGrande d-flex flex-h">
				<LetterGrid reference={ "Ariana l1" } mode="set" /* initialLetter="A" */ />
				<LetterGrid reference={ "Ariana l2" } mode="set" /* initialLetter="R" */ />
				<LetterGrid reference={ "Ariana l3" } mode="set" /* initialLetter="I" */ />
				<LetterGrid reference={ "Ariana l4" } mode="set" /* initialLetter="A" */ />
				<LetterGrid reference={ "Ariana l5" } mode="set" /* initialLetter="N" */ />
				<LetterGrid reference={ "Ariana l6" } mode="set" /* initialLetter="A" */ />
				<LetterGrid mode="set" initialLetter=" " />
				<LetterGrid reference={ "Grande l1" } mode="set" /* initialLetter="A" */ />
				<LetterGrid reference={ "Grande l2" } mode="set" /* initialLetter="R" */ />
				<LetterGrid reference={ "Grande l3" } mode="set" /* initialLetter="I" */ />
				<LetterGrid reference={ "Grande l4" } mode="set" /* initialLetter="A" */ />
				<LetterGrid reference={ "Grande l5" } mode="set" /* initialLetter="N" */ />
				<LetterGrid reference={ "Grande l6" } mode="set" /* initialLetter="A" */ />
			</div>
			<div className="Cloud d-flex flex-h">
				<LetterGrid reference={ "Cloud l1" } mode="set" /* initialLetter="C" */ />
				<LetterGrid reference={ "Cloud l2" } mode="set" /* initialLetter="L" */ />
				<LetterGrid reference={ "Cloud l3" } mode="set" /* initialLetter="O" */ />
				<LetterGrid reference={ "Cloud l4" } mode="set" /* initialLetter="U" */ />
				<LetterGrid reference={ "Cloud l5" } mode="set" /* initialLetter="D" */ />
			</div>
			<div className="Colour d-flex flex-h">
				<LetterGrid reference={ "Colour l1" } mode="set" /* initialLetter="B" program={["B", "P", "G"]} */ />
				<LetterGrid reference={ "Colour l2" } mode="set" /* initialLetter="L" program={["L", "I", "O"]} */ />
				<LetterGrid reference={ "Colour l3" } mode="set" /* initialLetter="U" program={["U", "N", "L"]} */ />
				<LetterGrid reference={ "Colour l4" } mode="set" /* initialLetter="E" program={["E", "K", "D"]} */ />
			</div>
		</div>
	)
}