export default function Artwork({ className}) {
	return (
		<svg className={ "Artwork " + className } xmlns="http://www.w3.org/2000/svg" viewBox="0.5 0.5 400.5 400.5">
			{/* <line	   className="BorderN"      pathLength={ 100 }  x1=".5" y1=".5" x2="400.5" y2=".5"/>
			<line	   className="BorderE"      pathLength={ 100 }  x1="400.5" y1=".5" x2="400.5" y2="400.5"/>
			<line	   className="BorderS"      pathLength={ 100 }  x1="400.5" y1="400.5" x2=".5" y2="400.5"/>
			<line	   className="BorderW"      pathLength={ 100 }  x1=".5" y1="400.5" x2=".5" y2=".5"/> */}

			<path      className="CircleSe"     pathLength={ 100 }  d="M400.5,200.5c0,110.457-89.543,200-200,200"/>
			<path      className="CircleSw"     pathLength={ 100 }  d="M200.5,400.5C90.043,400.5.5,310.957.5,200.5"/>
			<path      className="CircleNe"     pathLength={ 100 }  d="M200.5.5c110.457,0,200,89.543,200,200"/>
			<path      className="CircleNw"     pathLength={ 100 }  d="M.5,200.5C.5,90.043,90.043.5,200.5.5"/>
			<path      className="ArcSeB"       pathLength={ 100 }  d="M400.5,400.5c-110.457,0-200-89.543-200-200"/>
			<path      className="ArcSeT"       pathLength={ 100 }  d="M200.5,200.5c110.457,0,200,89.543,200,200"/>
			<path      className="ArcSwB"       pathLength={ 100 }  d="M200.5,200.5c0,110.457-89.543,200-200,200"/>
			<path      className="ArcSwT"       pathLength={ 100 }  d="M.5,400.5c0-110.457,89.543-200,200-200"/>
			<path      className="ArcNeB"       pathLength={ 100 }  d="M400.5.5c0,110.457-89.543,200-200,200"/>
			<path      className="ArcNeT"       pathLength={ 100 }  d="M200.5,200.5C200.5,90.043,290.043.5,400.5.5"/>
			<path      className="ArcNwB"       pathLength={ 100 }  d="M200.5,200.5C90.043,200.5.5,110.957.5.5"/>
			<path      className="ArcNwT"       pathLength={ 100 }  d="M.5.5c110.457,0,200,89.543,200,200"/>
			<line      className="DiagSeW"      pathLength={ 100 }  x1="400.5" y1="400.5" x2=".5" y2="200.5"/>
			<line      className="DiagSeN"      pathLength={ 100 }  x1="400.5" y1="400.5" x2="200.5" y2=".5"/>
			<line      className="DiagSwE"      pathLength={ 100 }  x1=".5" y1="400.5" x2="400.5" y2="200.5"/>
			<line      className="DiagSwN"      pathLength={ 100 }  x1=".5" y1="400.5" x2="200.5" y2=".5"/>
			<line      className="DiagNeS"      pathLength={ 100 }  x1="400.5" y1=".5" x2="200.5" y2="400.5"/>
			<line      className="DiagNeW"      pathLength={ 100 }  x1="400.5" y1=".5" x2=".5" y2="200.5"/>
			<line      className="DiagNwS"      pathLength={ 100 }  x1=".5" y1=".5" x2="200.5" y2="400.5"/>
			<line      className="DiagNwE"      pathLength={ 100 }  x1=".5" y1=".5" x2="400.5" y2="200.5"/>
			<line      className="HorizontalB"  pathLength={ 100 }  x1=".5" y1="300.5" x2="400.5" y2="300.5"/>
			<line      className="HorizontalC"  pathLength={ 100 }  x1="400.5" y1="200.5" x2=".5" y2="200.5"/>
			<line      className="HorizontalT"  pathLength={ 100 }  x1=".5" y1="100.5" x2="400.5" y2="100.5"/>
			<line      className="VerticalR"    pathLength={ 100 }  x1="300.5" y1=".5" x2="300.5" y2="400.5"/>
			<line      className="VerticalC"    pathLength={ 100 }  x1="200.5" y1="400.5" x2="200.5" y2=".5"/>
			<line      className="VerticalL"    pathLength={ 100 }  x1="100.5" y1=".5" x2="100.5" y2="400.5"/>
		</svg>
	);
}