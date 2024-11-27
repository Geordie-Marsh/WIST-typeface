// Imports
	// Importing React
	import { useEffect } from 'react';

	// Importing GSAP
	import { gsap } from 'gsap';

	// Importing components
	import LetterGrid from '../../components/LetterGrid';

	// Importing assets
	import Qantas from '../../assets/airline-qantas.png';



export default function DeparturesLogic() {
	// Setting up the timeline
	let tl = gsap.timeline({ paused: true });

	useEffect(() => {
		// Changing the time to 14:00
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangetime l2"), {
					detail: "4"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangetime l3"), {
					detail: "0"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangetime l4"), {
					detail: "0"
				})
			);
		}, ">+=0");


		// Changing flight1 to 'DEPARTED'
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l1 red"), {
					detail: "D"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l2 red"), {
					detail: "E"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l3 red"), {
					detail: "P"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l4 red"), {
					detail: "A"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l5 red"), {
					detail: "R"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l6 red"), {
					detail: "T"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l7 red"), {
					detail: "E"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l8 red"), {
					detail: "D"
				})
			);
			// Removing the red class from these letters
			const elements = document.querySelectorAll('.LetterGrid--flight1.stat.red');
			elements.forEach(element => {
				element.classList.remove('red');
			});
		}, ">+=5");

		// Changing flight9 to 'CANCELLED'
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l1"), {
					detail: "C"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l2"), {
					detail: "A"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l3"), {
					detail: "N"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l4"), {
					detail: "C"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l5"), {
					detail: "E"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l6"), {
					detail: "L"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l7"), {
					detail: "L"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l8"), {
					detail: "E"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l9"), {
					detail: "D"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l10"), {
					detail: " "
				})
			);
			// Adding the red class to these letters
			const elements = document.querySelectorAll('.LetterGrid--flight9.stat');
			elements.forEach(element => {
				element.classList.add('red');
			});

			// Changing the est. time and gate numbers to -
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 esti l1"), {
					detail: "-"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 esti l2"), {
					detail: "-"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 esti l3"), {
					detail: "-"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 esti l4"), {
					detail: "-"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 gate l1"), {
					detail: "-"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 gate l2"), {
					detail: "-"
				})
			);
		}, ">+=3");

		// Changing flight 3 to 'FINAL CALL'
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l1 green"), {
					detail: "F"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l2 green"), {
					detail: "I"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l3 green"), {
					detail: "N"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l4 green"), {
					detail: "A"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l5 green"), {
					detail: "L"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l6 green"), {
					detail: " "
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l7 green"), {
					detail: "C"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l8 green"), {
					detail: "A"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l9 green"), {
					detail: "L"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l10 green"), {
					detail: "L"
				})
			);
			// Removing the green class from these letters
			const elements = document.querySelectorAll('.LetterGrid--flight3.stat.green');
			elements.forEach(element => {
				element.classList.remove('green');
			});
			// Adding the red class to these letters
			const elementsRed = document.querySelectorAll('.LetterGrid--flight3.stat');
			elementsRed.forEach(element => {
				element.classList.add('red');
			});
		}, ">+=3");

		// Changing the est. time of flight 6 to 16:15
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 esti l1"), {
					detail: "1"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 esti l2"), {
					detail: "6"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 esti dots"), {
					detail: ":"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 esti l3"), {
					detail: "1"
				})
			);
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 esti l4"), {
					detail: "5"
				})
			);
		}, ">+=3");

		// Changing the est. time of flight 5 to 14:26
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 esti l4"), {
					detail: "6"
				})
			);
		}, ">+=2");


		// Moving all the flights up a row
		// (i.e., the letters in flight 1 will turn into the letters in flight 2, etc.)
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 code l1"), {
					detail: "J"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 code l2"), {
					detail: "Q"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 code l3"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 code l4"), {
					detail: "6"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 code l5"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 code l6"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l1"), {
					detail: "S"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l2"), {
					detail: "U"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l3"), {
					detail: "N"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l4"), {
					detail: "S"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l5"), {
					detail: "H"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l6"), {
					detail: "I"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l7"), {
					detail: "N"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l8"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l9"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l10"), {
					detail: "C"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l11"), {
					detail: "O"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l12"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l13"), {
					detail: "S"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 dest l14"), {
					detail: "T"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 sche l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 sche l2"), {
					detail: "3"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 sche l3"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 sche l4"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 esti l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 esti l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 esti l3"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 esti l4"), {
					detail: "8"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 gate l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 gate l2"), {
					detail: "9"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l1 red"), {
					detail: "F"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l2 red"), {
					detail: "I"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l3 red"), {
					detail: "N"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l4 red"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l5 red"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l6 red"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l7 red"), {
					detail: "C"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l8 red"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l9 red"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l10 red"), {
					detail: "L"
				}
			));
			// Adding the red class to the stat letters
			const flight1elements = document.querySelectorAll('.LetterGrid--flight1.stat');
			flight1elements.forEach(element => {
				element.classList.add('red');
			});

			// Flight2-->3: VA326 SYDNEY 14:05 14:24 23 FINAL CALL
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 code l1"), {
					detail: "V"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 code l2"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 code l3"), {
					detail: "3"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 code l4"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 code l5"), {
					detail: "6"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 code l6"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l1"), {
					detail: "S"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l2"), {
					detail: "Y"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l3"), {
					detail: "D"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l4"), {
					detail: "N"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l5"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l6"), {
					detail: "Y"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l7"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l8"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l9"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l10"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l11"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l12"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l13"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 dest l14"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 sche l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 sche l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 sche l3"), {
					detail: "0"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 sche l4"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 esti l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 esti l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 esti l3"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 esti l4"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 gate l1"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 gate l2"), {
					detail: "3"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 stat l1 green"), {
					detail: "F"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 stat l2 green"), {
					detail: "I"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 stat l3 green"), {
					detail: "N"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 stat l4 green"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 stat l5 green"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 stat l6 green"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 stat l7 green"), {
					detail: "C"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 stat l8 green"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 stat l9 green"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight2 stat l10 green"), {
					detail: "L"
				}
			));

			// Flight3-->4: QF162 BRISBANE 14:25 14:35 13 GO TO GATE
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 code l1"), {
					detail: "Q"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 code l2"), {
					detail: "F"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 code l3"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 code l4"), {
					detail: "6"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 code l5"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 code l6"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l1"), {
					detail: "B"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l2"), {
					detail: "R"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l3"), {
					detail: "I"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l4"), {
					detail: "S"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l5"), {
					detail: "B"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l6"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l7"), {
					detail: "N"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l8"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l9"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l10"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l11"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l12"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l13"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 dest l14"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 sche l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 sche l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 sche l3"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 sche l4"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 esti l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 esti l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 esti l3"), {
					detail: "3"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 esti l4"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 gate l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 gate l2"), {
					detail: "3"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l1 green"), {
					detail: "G"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l2 green"), {
					detail: "O"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l3 green"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l4 green"), {
					detail: "T"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l5 green"), {
					detail: "O"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l6 green"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l7 green"), {
					detail: "G"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l8 green"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l9 green"), {
					detail: "T"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight3 stat l10 green"), {
					detail: "E"
				}
			));
			// Removing the red class to the stat letters
			const flight3elements = document.querySelectorAll('.LetterGrid--flight3.stat');
			flight3elements.forEach(element => {
				element.classList.remove('red');
			});
			// Adding the green class to the stat letters
			flight3elements.forEach(element => {
				element.classList.add('green');
			});

			// Flight4-->5: ZL6833 WAGGA WAGGA 14:25 14:26 16 BOARDING
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 code l1"), {
					detail: "Z"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 code l2"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 code l3"), {
					detail: "6"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 code l4"), {
					detail: "8"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 code l5"), {
					detail: "3"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 code l6"), {
					detail: "3"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l1"), {
					detail: "W"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l2"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l3"), {
					detail: "G"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l4"), {
					detail: "G"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l5"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l6"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l7"), {
					detail: "W"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l8"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l9"), {
					detail: "G"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l10"), {
					detail: "G"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l11"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l12"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l13"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 dest l14"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 sche l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 sche l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 sche l3"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 sche l4"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 esti l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 esti l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 esti l3"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 esti l4"), {
					detail: "6"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 gate l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 gate l2"), {
					detail: "6"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 stat l1 green"), {
					detail: "B"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 stat l2 green"), {
					detail: "O"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 stat l3 green"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 stat l4 green"), {
					detail: "R"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 stat l5 green"), {
					detail: "D"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 stat l6 green"), {
					detail: "I"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 stat l7 green"), {
					detail: "N"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 stat l8 green"), {
					detail: "G"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 stat l9 green"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight4 stat l10 green"), {
					detail: " "
				}
			));

			// Flight5-->6: VA158 MELBOURNE 14:30 16:15 7 DELAYED
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 code l1"), {
					detail: "V"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 code l2"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 code l3"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 code l4"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 code l5"), {
					detail: "8"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 code l6"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l1"), {
					detail: "M"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l2"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l3"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l4"), {
					detail: "B"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l5"), {
					detail: "O"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l6"), {
					detail: "U"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l7"), {
					detail: "R"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l8"), {
					detail: "N"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l9"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l10"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l11"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l12"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l13"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 dest l14"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 sche l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 sche l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 sche l3"), {
					detail: "3"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 sche l4"), {
					detail: "0"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 esti l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 esti l2"), {
					detail: "6"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 esti l3"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 esti l4"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 gate l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 gate l2"), {
					detail: "6"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 gate l3"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 gate l4"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 stat l1 green"), {
					detail: "D"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 stat l2 green"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 stat l3 green"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 stat l4 green"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 stat l5 green"), {
					detail: "Y"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 stat l6 green"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 stat l7 green"), {
					detail: "D"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 stat l8 green"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 stat l9 green"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight5 stat l10 green"), {
					detail: " "
				}
			));
			// Removing the green class to the stat
			const flight5elements = document.querySelectorAll('.LetterGrid--flight5.stat');
			flight5elements.forEach(element => {
				element.classList.remove('green');
			});
			// Adding the yellow class to the stat letters
			flight5elements.forEach(element => {
				element.classList.add('yellow');
			});


			// Flight6-->7: VA883 ADELAIDE 14:35 14:35 22 GO TO GATE
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 code l1"), {
					detail: "V"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 code l2"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 code l3"), {
					detail: "8"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 code l4"), {
					detail: "8"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 code l5"), {
					detail: "3"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 code l6"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l1"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l2"), {
					detail: "D"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l3"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l4"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l5"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l6"), {
					detail: "I"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l7"), {
					detail: "D"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l8"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l9"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l10"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l11"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l12"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l13"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 dest l14"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 sche l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 sche l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 sche l3"), {
					detail: "3"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 sche l4"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 esti l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 esti l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 esti l3"), {
					detail: "3"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 esti l4"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 gate l1"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 gate l2"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 stat l1 yellow"), {
					detail: "G"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 stat l2 yellow"), {
					detail: "O"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 stat l3 yellow"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 stat l4 yellow"), {
					detail: "T"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 stat l5 yellow"), {
					detail: "O"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 stat l6 yellow"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 stat l7 yellow"), {
					detail: "G"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 stat l8 yellow"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 stat l9 yellow"), {
					detail: "T"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight6 stat l10 yellow"), {
					detail: "E"
				}
			));
			// Removing the yellow class to the stat
			const flight6elements = document.querySelectorAll('.LetterGrid--flight6.stat');
			flight6elements.forEach(element => {
				element.classList.remove('yellow');
			});
			// Adding the green class to the stat letters
			flight6elements.forEach(element => {
				element.classList.add('green');
			});


			// Flight7-->8: VA312 MELBOURNE 14:40 14:40 12 ETD: 14:40
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 code l1"), {
					detail: "V"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 code l2"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 code l3"), {
					detail: "3"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 code l4"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 code l5"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 code l6"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l1"), {
					detail: "M"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l2"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l3"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l4"), {
					detail: "B"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l5"), {
					detail: "O"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l6"), {
					detail: "U"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l7"), {
					detail: "R"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l8"), {
					detail: "N"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l9"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l10"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l11"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l12"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l13"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 dest l14"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 sche l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 sche l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 sche l3"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 sche l4"), {
					detail: "0"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 esti l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 esti l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 esti l3"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 esti l4"), {
					detail: "0"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 gate l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 gate l2"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 stat l1 green"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 stat l2 green"), {
					detail: "T"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 stat l3 green"), {
					detail: "D"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 stat l4 green"), {
					detail: ":"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 stat l5 green"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 stat l6 green"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 stat l7 green"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 stat l8 green"), {
					detail: ":"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 stat l9 green"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight7 stat l10 green"), {
					detail: "0"
				}
			));
			// Removing the green class to the stat
			const flight7elements = document.querySelectorAll('.LetterGrid--flight7.stat');
			flight7elements.forEach(element => {
				element.classList.remove('green');
			});


			// Flight8-->9: QF426 SYDNEY 14:40 --:-- -- CANCELLED
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 code l1"), {
					detail: "Q"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 code l2"), {
					detail: "F"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 code l3"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 code l4"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 code l5"), {
					detail: "6"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 code l6"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l1"), {
					detail: "S"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l2"), {
					detail: "Y"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l3"), {
					detail: "D"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l4"), {
					detail: "N"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l5"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l6"), {
					detail: "Y"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l7"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l8"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l9"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l10"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l11"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l12"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l13"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 dest l14"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 sche l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 sche l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 sche l3"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 sche l4"), {
					detail: "0"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 esti l1"), {
					detail: "-"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 esti l2"), {
					detail: "-"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 esti l3"), {
					detail: "-"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 esti l4"), {
					detail: "-"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 gate l1"), {
					detail: "-"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 gate l2"), {
					detail: "-"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 stat l1"), {
					detail: "C"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 stat l2"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 stat l3"), {
					detail: "N"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 stat l4"), {
					detail: "C"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 stat l5"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 stat l6"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 stat l7"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 stat l8"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 stat l9"), {
					detail: "D"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight8 stat l10"), {
					detail: " "
				}
			));
			// Adding the red class to the stat letters
			const flight8elements = document.querySelectorAll('.LetterGrid--flight8.stat');
			flight8elements.forEach(element => {
				element.classList.add('red');
			});

			
			// Flight9-->10: JQ296 PERTH 14:50 14:55 2 ETD: 14:55
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 code l1"), {
					detail: "J"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 code l2"), {
					detail: "Q"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 code l3"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 code l4"), {
					detail: "9"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 code l5"), {
					detail: "6"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 code l6"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l1"), {
					detail: "P"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l2"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l3"), {
					detail: "R"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l4"), {
					detail: "T"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l5"), {
					detail: "H"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l6"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l7"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l8"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l9"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l10"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l11"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l12"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l13"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 dest l14"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 sche l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 sche l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 sche l3"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 sche l4"), {
					detail: "0"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 esti l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 esti l2"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 esti l3"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 esti l4"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 gate l1"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 gate l2"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l1"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l2"), {
					detail: "T"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l3"), {
					detail: "D"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l4"), {
					detail: ":"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l5"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l6"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l7"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l8"), {
					detail: ":"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l9"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight9 stat l10"), {
					detail: "5"
				}
			));
			// Removing the red class to the stat
			const flight9elements = document.querySelectorAll('.LetterGrid--flight9.stat');
			flight9elements.forEach(element => {
				element.classList.remove('red');
			});


			// Flight10-->11: QF812 TOWNSVILLE 15:05 18:45 -- DELAYED
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 code l1"), {
					detail: "Q"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 code l2"), {
					detail: "F"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 code l3"), {
					detail: "8"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 code l4"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 code l5"), {
					detail: "2"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 code l6"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l1"), {
					detail: "T"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l2"), {
					detail: "O"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l3"), {
					detail: "W"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l4"), {
					detail: "N"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l5"), {
					detail: "S"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l6"), {
					detail: "V"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l7"), {
					detail: "I"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l8"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l9"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l10"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l11"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l12"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l13"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 dest l14"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 sche l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 sche l2"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 sche l3"), {
					detail: "0"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 sche l4"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 esti l1"), {
					detail: "1"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 esti l2"), {
					detail: "8"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 esti l3"), {
					detail: "4"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 esti l4"), {
					detail: "5"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 gate l1"), {
					detail: "-"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 gate l2"), {
					detail: "-"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 stat l1"), {
					detail: "D"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 stat l2"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 stat l3"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 stat l4"), {
					detail: "A"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 stat l5"), {
					detail: "Y"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 stat l6"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 stat l7"), {
					detail: "D"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 stat l8"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 stat l9"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight10 stat l10"), {
					detail: " "
				}
			));
			// Adding the yellow class to the stat letters
			const flight10elements = document.querySelectorAll('.LetterGrid--flight10.stat');
			flight10elements.forEach(element => {
				element.classList.add('yellow');
			});
		}, ">+=4");

		
		// Changing the status of flight 1 to 'CLOSED'
		tl.add(() => {
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l1 red"), {
					detail: "C"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l2 red"), {
					detail: "L"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l3 red"), {
					detail: "O"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l4 red"), {
					detail: "S"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l5 red"), {
					detail: "E"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l6 red"), {
					detail: "D"
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l7 red"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l8 red"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l9 red"), {
					detail: " "
				}
			));
			window.dispatchEvent(
				new CustomEvent(("letterChangeflight1 stat l10 red"), {
					detail: " "
				}
			));
		}, ">+=4");



		setTimeout(() => {
			tl.play();
		}, 5000);
	}, []);


	return (
		<div className='DeparturesLogic'>
			<div className='flights-list'>

				<div className='key-cont flight-cont'>
					{/* <img className='flight1 airline' src={ Qantas } /> */}
					<LetterGrid reference={ "key code l1" }   mode="set"  colour='black'  initialLetter="F" />
					<LetterGrid reference={ "key code l2" }   mode="set"  colour='black'  initialLetter="L" />
					<LetterGrid reference={ "key code l3" }   mode="set"  colour='black'  initialLetter="I" />
					<LetterGrid reference={ "key code l4" }   mode="set"  colour='black'  initialLetter="G" />
					<LetterGrid reference={ "key code l5" }   mode="set"  colour='black'  initialLetter="H" />
					<LetterGrid reference={ "key code l6" }   mode="set"  colour='black'  initialLetter="T" />
					<LetterGrid reference={ "key dest l1" }   mode="set"  colour='black'  initialLetter="D" />
					<LetterGrid reference={ "key dest l2" }   mode="set"  colour='black'  initialLetter="E" />
					<LetterGrid reference={ "key dest l3" }   mode="set"  colour='black'  initialLetter="S" />
					<LetterGrid reference={ "key dest l4" }   mode="set"  colour='black'  initialLetter="T" />
					<LetterGrid reference={ "key dest l5" }   mode="set"  colour='black'  initialLetter="I" />
					<LetterGrid reference={ "key dest l6" }   mode="set"  colour='black'  initialLetter="N" />
					<LetterGrid reference={ "key dest l7" }   mode="set"  colour='black'  initialLetter="A" />
					<LetterGrid reference={ "key dest l8" }   mode="set"  colour='black'  initialLetter="T" />
					<LetterGrid reference={ "key dest l9" }   mode="set"  colour='black'  initialLetter="I" />
					<LetterGrid reference={ "key dest l10" }  mode="set"  colour='black'  initialLetter="O" />
					<LetterGrid reference={ "key dest l11" }  mode="set"  colour='black'  initialLetter="N" />
					<LetterGrid reference={ "key dest l12" }  mode="set"  colour='black'  initialLetter=" " />
					<LetterGrid reference={ "key dest l13" }  mode="set"  colour='black'  initialLetter=" " />
					<LetterGrid reference={ "key dest l14" }  mode="set"  colour='black'  initialLetter=" " />
					<LetterGrid reference={ "key sche l1" }   mode="set"  colour='black'  initialLetter="S" />
					<LetterGrid reference={ "key sche l2" }   mode="set"  colour='black'  initialLetter="C" />
					<LetterGrid reference={ "key sche dots" } mode="set"  colour='black'  initialLetter="H" />
					<LetterGrid reference={ "key sche l3" }   mode="set"  colour='black'  initialLetter="." />
					<LetterGrid reference={ "key sche l4" }   mode="set"  colour='black'  initialLetter=" " />
					<LetterGrid reference={ "key esti l1" }   mode="set"  colour='black'  initialLetter="E" />
					<LetterGrid reference={ "key esti l2" }   mode="set"  colour='black'  initialLetter="S" />
					<LetterGrid reference={ "key esti dots" } mode="set"  colour='black'  initialLetter="T" />
					<LetterGrid reference={ "key esti l3" }   mode="set"  colour='black'  initialLetter="." />
					<LetterGrid reference={ "key esti l4" }   mode="set"  colour='black'  initialLetter=" " />
					<LetterGrid reference={ "key gate l1" }   mode="set"  colour='black'  initialLetter="G" />
					<LetterGrid reference={ "key gate l2" }   mode="set"  colour='black'  initialLetter="." />
					<LetterGrid reference={ "key stat l1" }   mode="set"  colour='black'  initialLetter="S" />
					<LetterGrid reference={ "key stat l2" }   mode="set"  colour='black'  initialLetter="T" />
					<LetterGrid reference={ "key stat l3" }   mode="set"  colour='black'  initialLetter="A" />
					<LetterGrid reference={ "key stat l4" }   mode="set"  colour='black'  initialLetter="T" />
					<LetterGrid reference={ "key stat l5" }   mode="set"  colour='black'  initialLetter="U" />
					<LetterGrid reference={ "key stat l6" }   mode="set"  colour='black'  initialLetter="S" />
					<LetterGrid reference={ "key stat l7" }   mode="set"  colour='black'  initialLetter=" " />
					<LetterGrid reference={ "key stat l8" }   mode="set"  colour='black'  initialLetter=" " />
					<LetterGrid reference={ "key stat l9" }   mode="set"  colour='black'  initialLetter=" " />
					<LetterGrid reference={ "key stat l10" }  mode="set"  colour='black'  initialLetter=" " />
				</div>
				<div className='flight1-cont flight-cont'>
					{/* <img className='flight1 airline' src={ Qantas } /> */}
					<LetterGrid reference={ "flight1 code l1" }   mode="set"  colour='white'  initialLetter="Q" />
					<LetterGrid reference={ "flight1 code l2" }   mode="set"  colour='white'  initialLetter="F" />
					<LetterGrid reference={ "flight1 code l3" }   mode="set"  colour='white'  initialLetter="6" />
					<LetterGrid reference={ "flight1 code l4" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight1 code l5" }   mode="set"  colour='white'  initialLetter="8" />
					<LetterGrid reference={ "flight1 code l6" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight1 dest l1" }   mode="set"  colour='white'  initialLetter="B" />
					<LetterGrid reference={ "flight1 dest l2" }   mode="set"  colour='white'  initialLetter="R" />
					<LetterGrid reference={ "flight1 dest l3" }   mode="set"  colour='white'  initialLetter="I" />
					<LetterGrid reference={ "flight1 dest l4" }   mode="set"  colour='white'  initialLetter="S" />
					<LetterGrid reference={ "flight1 dest l5" }   mode="set"  colour='white'  initialLetter="B" />
					<LetterGrid reference={ "flight1 dest l6" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight1 dest l7" }   mode="set"  colour='white'  initialLetter="N" />
					<LetterGrid reference={ "flight1 dest l8" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight1 dest l9" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight1 dest l10" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight1 dest l11" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight1 dest l12" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight1 dest l13" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight1 dest l14" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight1 sche l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight1 sche l2" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight1 sche dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight1 sche l3" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight1 sche l4" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight1 esti l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight1 esti l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight1 esti dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight1 esti l3" }   mode="set"  colour='white'  initialLetter="0" />
					<LetterGrid reference={ "flight1 esti l4" }   mode="set"  colour='white'  initialLetter="0" />
					<LetterGrid reference={ "flight1 gate l1" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight1 gate l2" }   mode="set"  colour='white'  initialLetter="9" />
					<LetterGrid reference={ "flight1 stat l1 red" }   mode="set"  colour='white'  initialLetter="C" />
					<LetterGrid reference={ "flight1 stat l2 red" }   mode="set"  colour='white'  initialLetter="L" />
					<LetterGrid reference={ "flight1 stat l3 red" }   mode="set"  colour='white'  initialLetter="O" />
					<LetterGrid reference={ "flight1 stat l4 red" }   mode="set"  colour='white'  initialLetter="S" />
					<LetterGrid reference={ "flight1 stat l5 red" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight1 stat l6 red" }   mode="set"  colour='white'  initialLetter="D" />
					<LetterGrid reference={ "flight1 stat l7 red" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight1 stat l8 red" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight1 stat l9 red" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight1 stat l10 red" }  mode="set"  colour='white'  initialLetter=" " />
				</div>
				<div className='flight2-cont flight-cont dark'>
					{/* <img className='flight2 airline' src={ Qantas } /> */}
					<LetterGrid reference={ "flight2 code l1" }   mode="set"  colour='white'  initialLetter="J" />
					<LetterGrid reference={ "flight2 code l2" }   mode="set"  colour='white'  initialLetter="Q" />
					<LetterGrid reference={ "flight2 code l3" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight2 code l4" }   mode="set"  colour='white'  initialLetter="6" />
					<LetterGrid reference={ "flight2 code l5" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight2 code l6" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight2 dest l1" }   mode="set"  colour='white'  initialLetter="S" />
					<LetterGrid reference={ "flight2 dest l2" }   mode="set"  colour='white'  initialLetter="U" />
					<LetterGrid reference={ "flight2 dest l3" }   mode="set"  colour='white'  initialLetter="N" />
					<LetterGrid reference={ "flight2 dest l4" }   mode="set"  colour='white'  initialLetter="S" />
					<LetterGrid reference={ "flight2 dest l5" }   mode="set"  colour='white'  initialLetter="H" />
					<LetterGrid reference={ "flight2 dest l6" }   mode="set"  colour='white'  initialLetter="I" />
					<LetterGrid reference={ "flight2 dest l7" }   mode="set"  colour='white'  initialLetter="N" />
					<LetterGrid reference={ "flight2 dest l8" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight2 dest l9" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight2 dest l10" }  mode="set"  colour='white'  initialLetter="C" />
					<LetterGrid reference={ "flight2 dest l11" }  mode="set"  colour='white'  initialLetter="O" />
					<LetterGrid reference={ "flight2 dest l12" }  mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight2 dest l13" }  mode="set"  colour='white'  initialLetter="S" />
					<LetterGrid reference={ "flight2 dest l14" }  mode="set"  colour='white'  initialLetter="T" />
					<LetterGrid reference={ "flight2 sche l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight2 sche l2" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight2 sche dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight2 sche l3" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight2 sche l4" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight2 esti l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight2 esti l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight2 esti dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight2 esti l3" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight2 esti l4" }   mode="set"  colour='white'  initialLetter="8" />
					<LetterGrid reference={ "flight2 gate l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight2 gate l2" }   mode="set"  colour='white'  initialLetter="9" />
					<LetterGrid reference={ "flight2 stat l1 red" }   mode="set"  colour='white'  initialLetter="F" />
					<LetterGrid reference={ "flight2 stat l2 red" }   mode="set"  colour='white'  initialLetter="I" />
					<LetterGrid reference={ "flight2 stat l3 red" }   mode="set"  colour='white'  initialLetter="N" />
					<LetterGrid reference={ "flight2 stat l4 red" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight2 stat l5 red" }   mode="set"  colour='white'  initialLetter="L" />
					<LetterGrid reference={ "flight2 stat l6 red" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight2 stat l7 red" }   mode="set"  colour='white'  initialLetter="C" />
					<LetterGrid reference={ "flight2 stat l8 red" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight2 stat l9 red" }   mode="set"  colour='white'  initialLetter="L" />
					<LetterGrid reference={ "flight2 stat l10 red" }  mode="set"  colour='white'  initialLetter="L" />
				</div>
				<div className='flight3-cont flight-cont'>
					{/* <img className='flight2 airline' src={ Qantas } /> */}
					<LetterGrid reference={ "flight3 code l1" }   mode="set"  colour='white'  initialLetter="V" />
					<LetterGrid reference={ "flight3 code l2" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight3 code l3" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight3 code l4" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight3 code l5" }   mode="set"  colour='white'  initialLetter="6" />
					<LetterGrid reference={ "flight3 code l6" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight3 dest l1" }   mode="set"  colour='white'  initialLetter="S" />
					<LetterGrid reference={ "flight3 dest l2" }   mode="set"  colour='white'  initialLetter="Y" />
					<LetterGrid reference={ "flight3 dest l3" }   mode="set"  colour='white'  initialLetter="D" />
					<LetterGrid reference={ "flight3 dest l4" }   mode="set"  colour='white'  initialLetter="N" />
					<LetterGrid reference={ "flight3 dest l5" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight3 dest l6" }   mode="set"  colour='white'  initialLetter="Y" />
					<LetterGrid reference={ "flight3 dest l7" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight3 dest l8" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight3 dest l9" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight3 dest l10" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight3 dest l11" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight3 dest l12" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight3 dest l13" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight3 dest l14" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight3 sche l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight3 sche l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight3 sche dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight3 sche l3" }   mode="set"  colour='white'  initialLetter="0" />
					<LetterGrid reference={ "flight3 sche l4" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight3 esti l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight3 esti l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight3 esti dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight3 esti l3" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight3 esti l4" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight3 gate l1" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight3 gate l2" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight3 stat l1 green" }   mode="set"  colour='white'  initialLetter="B" />
					<LetterGrid reference={ "flight3 stat l2 green" }   mode="set"  colour='white'  initialLetter="O" />
					<LetterGrid reference={ "flight3 stat l3 green" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight3 stat l4 green" }   mode="set"  colour='white'  initialLetter="R" />
					<LetterGrid reference={ "flight3 stat l5 green" }   mode="set"  colour='white'  initialLetter="D" />
					<LetterGrid reference={ "flight3 stat l6 green" }   mode="set"  colour='white'  initialLetter="I" />
					<LetterGrid reference={ "flight3 stat l7 green" }   mode="set"  colour='white'  initialLetter="N" />
					<LetterGrid reference={ "flight3 stat l8 green" }   mode="set"  colour='white'  initialLetter="G" />
					<LetterGrid reference={ "flight3 stat l9 green" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight3 stat l10 green" }  mode="set"  colour='white'  initialLetter=" " />
				</div>
				<div className='flight4-cont flight-cont dark'>
					{/* <img className='flight2 airline' src={ Qantas } /> */}
					<LetterGrid reference={ "flight4 code l1" }   mode="set"  colour='white'  initialLetter="Q" />
					<LetterGrid reference={ "flight4 code l2" }   mode="set"  colour='white'  initialLetter="F" />
					<LetterGrid reference={ "flight4 code l3" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight4 code l4" }   mode="set"  colour='white'  initialLetter="6" />
					<LetterGrid reference={ "flight4 code l5" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight4 code l6" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight4 dest l1" }   mode="set"  colour='white'  initialLetter="B" />
					<LetterGrid reference={ "flight4 dest l2" }   mode="set"  colour='white'  initialLetter="R" />
					<LetterGrid reference={ "flight4 dest l3" }   mode="set"  colour='white'  initialLetter="I" />
					<LetterGrid reference={ "flight4 dest l4" }   mode="set"  colour='white'  initialLetter="S" />
					<LetterGrid reference={ "flight4 dest l5" }   mode="set"  colour='white'  initialLetter="B" />
					<LetterGrid reference={ "flight4 dest l6" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight4 dest l7" }   mode="set"  colour='white'  initialLetter="N" />
					<LetterGrid reference={ "flight4 dest l8" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight4 dest l9" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight4 dest l10" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight4 dest l11" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight4 dest l12" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight4 dest l13" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight4 dest l14" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight4 sche l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight4 sche l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight4 sche dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight4 sche l3" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight4 sche l4" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight4 esti l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight4 esti l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight4 esti dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight4 esti l3" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight4 esti l4" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight4 gate l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight4 gate l2" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight4 stat l1 green" }   mode="set"  colour='white'  initialLetter="G" />
					<LetterGrid reference={ "flight4 stat l2 green" }   mode="set"  colour='white'  initialLetter="O" />
					<LetterGrid reference={ "flight4 stat l3 green" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight4 stat l4 green" }   mode="set"  colour='white'  initialLetter="T" />
					<LetterGrid reference={ "flight4 stat l5 green" }   mode="set"  colour='white'  initialLetter="O" />
					<LetterGrid reference={ "flight4 stat l6 green" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight4 stat l7 green" }   mode="set"  colour='white'  initialLetter="G" />
					<LetterGrid reference={ "flight4 stat l8 green" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight4 stat l9 green" }   mode="set"  colour='white'  initialLetter="T" />
					<LetterGrid reference={ "flight4 stat l10 green" }  mode="set"  colour='white'  initialLetter="E" />
				</div>
				<div className='flight5-cont flight-cont'>
					{/* <img className='flight2 airline' src={ Qantas } /> */}
					<LetterGrid reference={ "flight5 code l1" }   mode="set"  colour='white'  initialLetter="Z" />
					<LetterGrid reference={ "flight5 code l2" }   mode="set"  colour='white'  initialLetter="L" />
					<LetterGrid reference={ "flight5 code l3" }   mode="set"  colour='white'  initialLetter="6" />
					<LetterGrid reference={ "flight5 code l4" }   mode="set"  colour='white'  initialLetter="8" />
					<LetterGrid reference={ "flight5 code l5" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight5 code l6" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight5 dest l1" }   mode="set"  colour='white'  initialLetter="W" />
					<LetterGrid reference={ "flight5 dest l2" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight5 dest l3" }   mode="set"  colour='white'  initialLetter="G" />
					<LetterGrid reference={ "flight5 dest l4" }   mode="set"  colour='white'  initialLetter="G" />
					<LetterGrid reference={ "flight5 dest l5" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight5 dest l6" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight5 dest l7" }   mode="set"  colour='white'  initialLetter="W" />
					<LetterGrid reference={ "flight5 dest l8" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight5 dest l9" }   mode="set"  colour='white'  initialLetter="G" />
					<LetterGrid reference={ "flight5 dest l10" }  mode="set"  colour='white'  initialLetter="G" />
					<LetterGrid reference={ "flight5 dest l11" }  mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight5 dest l12" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight5 dest l13" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight5 dest l14" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight5 sche l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight5 sche l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight5 sche dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight5 sche l3" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight5 sche l4" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight5 esti l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight5 esti l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight5 esti dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight5 esti l3" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight5 esti l4" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight5 gate l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight5 gate l2" }   mode="set"  colour='white'  initialLetter="6" />
					<LetterGrid reference={ "flight5 stat l1 green" }   mode="set"  colour='white'  initialLetter="B" />
					<LetterGrid reference={ "flight5 stat l2 green" }   mode="set"  colour='white'  initialLetter="O" />
					<LetterGrid reference={ "flight5 stat l3 green" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight5 stat l4 green" }   mode="set"  colour='white'  initialLetter="R" />
					<LetterGrid reference={ "flight5 stat l5 green" }   mode="set"  colour='white'  initialLetter="D" />
					<LetterGrid reference={ "flight5 stat l6 green" }   mode="set"  colour='white'  initialLetter="I" />
					<LetterGrid reference={ "flight5 stat l7 green" }   mode="set"  colour='white'  initialLetter="N" />
					<LetterGrid reference={ "flight5 stat l8 green" }   mode="set"  colour='white'  initialLetter="G" />
					<LetterGrid reference={ "flight5 stat l9 green" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight5 stat l10 green" }  mode="set"  colour='white'  initialLetter=" " />
				</div>
				<div className='flight6-cont flight-cont dark'>
					{/* <img className='flight2 airline' src={ Qantas } /> */}
					<LetterGrid reference={ "flight6 code l1" }   mode="set"  colour='white'  initialLetter="V" />
					<LetterGrid reference={ "flight6 code l2" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight6 code l3" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight6 code l4" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight6 code l5" }   mode="set"  colour='white'  initialLetter="8" />
					<LetterGrid reference={ "flight6 code l6" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight6 dest l1" }   mode="set"  colour='white'  initialLetter="M" />
					<LetterGrid reference={ "flight6 dest l2" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight6 dest l3" }   mode="set"  colour='white'  initialLetter="L" />
					<LetterGrid reference={ "flight6 dest l4" }   mode="set"  colour='white'  initialLetter="B" />
					<LetterGrid reference={ "flight6 dest l5" }   mode="set"  colour='white'  initialLetter="O" />
					<LetterGrid reference={ "flight6 dest l6" }   mode="set"  colour='white'  initialLetter="U" />
					<LetterGrid reference={ "flight6 dest l7" }   mode="set"  colour='white'  initialLetter="R" />
					<LetterGrid reference={ "flight6 dest l8" }   mode="set"  colour='white'  initialLetter="N" />
					<LetterGrid reference={ "flight6 dest l9" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight6 dest l10" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight6 dest l11" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight6 dest l12" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight6 dest l13" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight6 dest l14" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight6 sche l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight6 sche l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight6 sche dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight6 sche l3" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight6 sche l4" }   mode="set"  colour='white'  initialLetter="0" />
					<LetterGrid reference={ "flight6 esti l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight6 esti l2" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight6 esti dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight6 esti l3" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight6 esti l4" }   mode="set"  colour='white'  initialLetter="0" />
					<LetterGrid reference={ "flight6 gate l1" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight6 gate l2" }   mode="set"  colour='white'  initialLetter="7" />
					<LetterGrid reference={ "flight6 stat l1 yellow" }   mode="set"  colour='white'  initialLetter="D" />
					<LetterGrid reference={ "flight6 stat l2 yellow" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight6 stat l3 yellow" }   mode="set"  colour='white'  initialLetter="L" />
					<LetterGrid reference={ "flight6 stat l4 yellow" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight6 stat l5 yellow" }   mode="set"  colour='white'  initialLetter="Y" />
					<LetterGrid reference={ "flight6 stat l6 yellow" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight6 stat l7 yellow" }   mode="set"  colour='white'  initialLetter="D" />
					<LetterGrid reference={ "flight6 stat l8 yellow" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight6 stat l9 yellow" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight6 stat l10 yellow" }  mode="set"  colour='white'  initialLetter=" " />
				</div>
				<div className='flight7-cont flight-cont'>
					{/* <img className='flight2 airline' src={ Qantas } /> */}
					<LetterGrid reference={ "flight7 code l1" }   mode="set"  colour='white'  initialLetter="V" />
					<LetterGrid reference={ "flight7 code l2" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight7 code l3" }   mode="set"  colour='white'  initialLetter="8" />
					<LetterGrid reference={ "flight7 code l4" }   mode="set"  colour='white'  initialLetter="8" />
					<LetterGrid reference={ "flight7 code l5" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight7 code l6" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight7 dest l1" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight7 dest l2" }   mode="set"  colour='white'  initialLetter="D" />
					<LetterGrid reference={ "flight7 dest l3" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight7 dest l4" }   mode="set"  colour='white'  initialLetter="L" />
					<LetterGrid reference={ "flight7 dest l5" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight7 dest l6" }   mode="set"  colour='white'  initialLetter="I" />
					<LetterGrid reference={ "flight7 dest l7" }   mode="set"  colour='white'  initialLetter="D" />
					<LetterGrid reference={ "flight7 dest l8" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight7 dest l9" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight7 dest l10" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight7 dest l11" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight7 dest l12" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight7 dest l13" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight7 dest l14" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight7 sche l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight7 sche l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight7 sche dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight7 sche l3" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight7 sche l4" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight7 esti l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight7 esti l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight7 esti dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight7 esti l3" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight7 esti l4" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight7 gate l1" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight7 gate l2" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight7 stat l1 green" }   mode="set"  colour='white'  initialLetter="G" />
					<LetterGrid reference={ "flight7 stat l2 green" }   mode="set"  colour='white'  initialLetter="O" />
					<LetterGrid reference={ "flight7 stat l3 green" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight7 stat l4 green" }   mode="set"  colour='white'  initialLetter="T" />
					<LetterGrid reference={ "flight7 stat l5 green" }   mode="set"  colour='white'  initialLetter="O" />
					<LetterGrid reference={ "flight7 stat l6 green" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight7 stat l7 green" }   mode="set"  colour='white'  initialLetter="G" />
					<LetterGrid reference={ "flight7 stat l8 green" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight7 stat l9 green" }   mode="set"  colour='white'  initialLetter="T" />
					<LetterGrid reference={ "flight7 stat l10 green" }  mode="set"  colour='white'  initialLetter="E" />
				</div>
				<div className='flight8-cont flight-cont dark'>
					{/* <img className='flight2 airline' src={ Qantas } /> */}
					<LetterGrid reference={ "flight8 code l1" }   mode="set"  colour='white'  initialLetter="Q" />
					<LetterGrid reference={ "flight8 code l2" }   mode="set"  colour='white'  initialLetter="A" />
					<LetterGrid reference={ "flight8 code l3" }   mode="set"  colour='white'  initialLetter="3" />
					<LetterGrid reference={ "flight8 code l4" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight8 code l5" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight8 code l6" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight8 dest l1" }   mode="set"  colour='white'  initialLetter="M" />
					<LetterGrid reference={ "flight8 dest l2" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight8 dest l3" }   mode="set"  colour='white'  initialLetter="L" />
					<LetterGrid reference={ "flight8 dest l4" }   mode="set"  colour='white'  initialLetter="B" />
					<LetterGrid reference={ "flight8 dest l5" }   mode="set"  colour='white'  initialLetter="O" />
					<LetterGrid reference={ "flight8 dest l6" }   mode="set"  colour='white'  initialLetter="U" />
					<LetterGrid reference={ "flight8 dest l7" }   mode="set"  colour='white'  initialLetter="R" />
					<LetterGrid reference={ "flight8 dest l8" }   mode="set"  colour='white'  initialLetter="N" />
					<LetterGrid reference={ "flight8 dest l9" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight8 dest l10" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight8 dest l11" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight8 dest l12" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight8 dest l13" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight8 dest l14" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight8 sche l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight8 sche l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight8 sche dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight8 sche l3" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight8 sche l4" }   mode="set"  colour='white'  initialLetter="0" />
					<LetterGrid reference={ "flight8 esti l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight8 esti l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight8 esti dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight8 esti l3" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight8 esti l4" }   mode="set"  colour='white'  initialLetter="0" />
					<LetterGrid reference={ "flight8 gate l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight8 gate l2" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight8 stat l1" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight8 stat l2" }   mode="set"  colour='white'  initialLetter="T" />
					<LetterGrid reference={ "flight8 stat l3" }   mode="set"  colour='white'  initialLetter="D" />
					<LetterGrid reference={ "flight8 stat l4" }   mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight8 stat l5" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight8 stat l6" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight8 stat l7" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight8 stat l8" }   mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight8 stat l9" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight8 stat l10" }  mode="set"  colour='white'  initialLetter="0" />
				</div>
				<div className='flight9-cont flight-cont'>
					{/* <img className='flight2 airline' src={ Qantas } /> */}
					<LetterGrid reference={ "flight9 code l1" }   mode="set"  colour='white'  initialLetter="Q" />
					<LetterGrid reference={ "flight9 code l2" }   mode="set"  colour='white'  initialLetter="F" />
					<LetterGrid reference={ "flight9 code l3" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight9 code l4" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight9 code l5" }   mode="set"  colour='white'  initialLetter="6" />
					<LetterGrid reference={ "flight9 code l6" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight9 dest l1" }   mode="set"  colour='white'  initialLetter="S" />
					<LetterGrid reference={ "flight9 dest l2" }   mode="set"  colour='white'  initialLetter="Y" />
					<LetterGrid reference={ "flight9 dest l3" }   mode="set"  colour='white'  initialLetter="D" />
					<LetterGrid reference={ "flight9 dest l4" }   mode="set"  colour='white'  initialLetter="N" />
					<LetterGrid reference={ "flight9 dest l5" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight9 dest l6" }   mode="set"  colour='white'  initialLetter="Y" />
					<LetterGrid reference={ "flight9 dest l7" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight9 dest l8" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight9 dest l9" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight9 dest l10" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight9 dest l11" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight9 dest l12" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight9 dest l13" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight9 dest l14" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight9 sche l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight9 sche l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight9 sche dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight9 sche l3" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight9 sche l4" }   mode="set"  colour='white'  initialLetter="0" />
					<LetterGrid reference={ "flight9 esti l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight9 esti l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight9 esti dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight9 esti l3" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight9 esti l4" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight9 gate l1" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight9 gate l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight9 stat l1" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight9 stat l2" }   mode="set"  colour='white'  initialLetter="T" />
					<LetterGrid reference={ "flight9 stat l3" }   mode="set"  colour='white'  initialLetter="D" />
					<LetterGrid reference={ "flight9 stat l4" }   mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight9 stat l5" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight9 stat l6" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight9 stat l7" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight9 stat l8" }   mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight9 stat l9" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight9 stat l10" }  mode="set"  colour='white'  initialLetter="5" />
				</div>
				<div className='flight10-cont flight-cont dark'>
					{/* <img className='flight2 airline' src={ Qantas } /> */}
					<LetterGrid reference={ "flight10 code l1" }   mode="set"  colour='white'  initialLetter="J" />
					<LetterGrid reference={ "flight10 code l2" }   mode="set"  colour='white'  initialLetter="Q" />
					<LetterGrid reference={ "flight10 code l3" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight10 code l4" }   mode="set"  colour='white'  initialLetter="9" />
					<LetterGrid reference={ "flight10 code l5" }   mode="set"  colour='white'  initialLetter="6" />
					<LetterGrid reference={ "flight10 code l6" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight10 dest l1" }   mode="set"  colour='white'  initialLetter="P" />
					<LetterGrid reference={ "flight10 dest l2" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight10 dest l3" }   mode="set"  colour='white'  initialLetter="R" />
					<LetterGrid reference={ "flight10 dest l4" }   mode="set"  colour='white'  initialLetter="T" />
					<LetterGrid reference={ "flight10 dest l5" }   mode="set"  colour='white'  initialLetter="H" />
					<LetterGrid reference={ "flight10 dest l6" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight10 dest l7" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight10 dest l8" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight10 dest l9" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight10 dest l10" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight10 dest l11" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight10 dest l12" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight10 dest l13" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight10 dest l14" }  mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight10 sche l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight10 sche l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight10 sche dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight10 sche l3" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight10 sche l4" }   mode="set"  colour='white'  initialLetter="0" />
					<LetterGrid reference={ "flight10 esti l1" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight10 esti l2" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight10 esti dots" } mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight10 esti l3" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight10 esti l4" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight10 gate l1" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight10 gate l2" }   mode="set"  colour='white'  initialLetter="2" />
					<LetterGrid reference={ "flight10 stat l1" }   mode="set"  colour='white'  initialLetter="E" />
					<LetterGrid reference={ "flight10 stat l2" }   mode="set"  colour='white'  initialLetter="T" />
					<LetterGrid reference={ "flight10 stat l3" }   mode="set"  colour='white'  initialLetter="D" />
					<LetterGrid reference={ "flight10 stat l4" }   mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight10 stat l5" }   mode="set"  colour='white'  initialLetter=" " />
					<LetterGrid reference={ "flight10 stat l6" }   mode="set"  colour='white'  initialLetter="1" />
					<LetterGrid reference={ "flight10 stat l7" }   mode="set"  colour='white'  initialLetter="4" />
					<LetterGrid reference={ "flight10 stat l8" }   mode="set"  colour='white'  initialLetter=":" />
					<LetterGrid reference={ "flight10 stat l9" }   mode="set"  colour='white'  initialLetter="5" />
					<LetterGrid reference={ "flight10 stat l10" }  mode="set"  colour='white'  initialLetter="5" />
				</div>
			</div>


			<div className='time-cont'>
				<div className='time'>
					<LetterGrid reference={ "time l1" } mode='set' colour='white' initialLetter="1" />
					<LetterGrid reference={ "time l2" } mode='set' colour='white' initialLetter="3" />
					<LetterGrid reference={ "time dots" } mode='set' colour='white' initialLetter=":" />
					<LetterGrid reference={ "time l3" } mode='set' colour='white' initialLetter="5" />
					<LetterGrid reference={ "time l4" } mode='set' colour='white' initialLetter="9" />
				</div>
				<div className='date'>
					<LetterGrid reference={ "day l1" } mode='set' colour='white' initialLetter="W" />
					<LetterGrid reference={ "day l1" } mode='set' colour='white' initialLetter="E" />
					<LetterGrid reference={ "day l1" } mode='set' colour='white' initialLetter="D" />
					<LetterGrid reference={ "" } mode='set' colour='white' initialLetter=" " />
					<LetterGrid reference={ "date l1" } mode='set' colour='white' initialLetter="2" />
					<LetterGrid reference={ "date l1" } mode='set' colour='white' initialLetter="9" />
					<LetterGrid reference={ "" } mode='set' colour='white' initialLetter=" " />
					<LetterGrid reference={ "month l1" } mode='set' colour='white' initialLetter="M" />
					<LetterGrid reference={ "month l1" } mode='set' colour='white' initialLetter="A" />
					<LetterGrid reference={ "month l1" } mode='set' colour='white' initialLetter="Y" />
				</div>
			</div>
		</div>
	);
}