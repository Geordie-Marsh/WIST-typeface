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

	return (
		<div className='Input TextArea'>
			<textarea 
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