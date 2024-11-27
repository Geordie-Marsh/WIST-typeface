// Imports
	// Importing React
	import { useEffect } from "react";

	// Importing defs
	import { $$ } from "../defs";

export function Text({ value, placeholder, onChange, minLength, maxLength }) {
	// If the value is outside the min/max length, add a class to the input
	// to show the user that the input is invalid
	let inputClass = '';
	if (value.length < minLength || value.length > maxLength) {
		inputClass = 'invalid';
	}

	return (
		<div className='Input Text'>
			<input 
				type="text"
				value={value}
				placeholder={placeholder}
				onChange={(e) => onChange(e.target.value)}
				minLength={minLength}
				maxLength={maxLength}
				className={inputClass}
			/>
		</div>
	);
}

export function Number({ value, placeholder, onChange, min, max }) {
	// If the value is outside the min/max length, add a class to the input
	// to show the user that the input is invalid
	let inputClass = '';
	if (value < min || value > max) {
		inputClass = 'invalid';
	}

	return (
		<div className='Input Number'>
			<input 
				type="number"
				value={value}
				placeholder={placeholder}
				onChange={(e) => onChange(e.target.value)}
				min={min}
				max={max}
				className={inputClass}
			/>
		</div>
	);
}

export function TextArea({ value, placeholder, onChange, minLength, maxLength }) {
	// If the value is outside the min/max length, add a class to the input
	// to show the user that the input is invalid
	let inputClass = '';
	if (value.length < minLength || value.length > maxLength) {
		inputClass = 'invalid';
	}

	// Function to auto grow the textarea
	function autoGrow() {
		let element = $$(".TextArea textarea");
		element.style.height = "10px";
		element.style.height = (element.scrollHeight + 4) + "px";
	}

	useEffect(() => {
		// Add an event listener to the textarea to auto grow it
		window.addEventListener("textareaUpdated", autoGrow);
	}, []);

	return (
		<div className='Input TextArea'>
			<textarea 
				value={value}
				placeholder={placeholder}
				onChange={(e) => {
					onChange(e.target.value);
					autoGrow();
				}}
				minLength={minLength}
				maxLength={maxLength}
				className={inputClass}
				onInput={autoGrow}
			/>
		</div>
	);
}