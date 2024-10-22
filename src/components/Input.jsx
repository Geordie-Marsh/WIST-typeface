export default function Input({ value, placeholder, onChange, minLength, maxLength }) {
	// If the value is outside the min/max length, add a class to the input
	// to show the user that the input is invalid
	let inputClass = '';
	if (value.length < minLength || value.length > maxLength) {
		inputClass = 'invalid';
	}

	return (
		<div className='Input'>
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