export function Circle() {
	return (
		<svg className="Shape Circle" viewBox="0 0 100 100">
			<circle cx="50" cy="50" r="45" />
		</svg>
	)
}

export function Square() {
	return (
		<svg className="Shape Square" viewBox="0 0 100 100">
			<rect x="5" y="5" width="90" height="90" />
		</svg>
	)
}

export function Triangle() {
	return (
		<svg className="Shape Triangle" viewBox="0 0 100 100">
			<polygon points="50,5 95,95 5,95" />
		</svg>
	)
}