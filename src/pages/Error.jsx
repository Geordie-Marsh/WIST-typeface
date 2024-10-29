// Imports
	// Import React
	import { useEffect } from 'react';
	import { Link } from 'react-router-dom';

	// Importing components
	import * as Button from "../components/Button";
	import LetterGrid from '../components/LetterGrid';



export default function Error() {
	useEffect(() => {
		setTimeout(() => {
			window.dispatchEvent(
				new CustomEvent("letterChangesetletter1", { 
					detail: "4" 
				})
			);
		}, 200);
		setTimeout(() => {
			window.dispatchEvent(
				new CustomEvent("letterChangesetletter2", { 
					detail: "0" 
				})
			);
		}, 400);
		setTimeout(() => {
			window.dispatchEvent(
				new CustomEvent("letterChangesetletter3", { 
					detail: "4" 
				})
			);
		}, 600);
	}, []);



	return (
		<div className="Error d-flex flex-v jc-c ai-c gap--lg">
			<div className="error404 d-flex flex-h">
				<LetterGrid mode='set' reference="letter1" />
				<LetterGrid mode='set' reference="letter2" />
				<LetterGrid mode='set' reference="letter3" />
			</div>
			<p>Oops, looks like I haven't made this page yet.<br /><br />How embarrasing!</p>
			<Button.Major><Link to="/">Go back home</Link></Button.Major>
		</div>
	)
}