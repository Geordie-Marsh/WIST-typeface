export default function Radio({ options, selectedValue, onChange }) {
	const handleOptionClick = (name) => {
		if (onChange) {
			onChange(name);
		}
	}

	return (
		<div className='Radio d-flex jc-btwn'>
			{ options.map(option => (
				<div
					key={option.name}
					className={`Radio__option ${selectedValue === option.name ? 'selected' : ''}`}
					onClick={() => handleOptionClick(option.name)}
				>
					{ option.label }
				</div>
			)) }
		</div>
	);
}