// Imports
	// Importing React
	import { useEffect, useState } from "react"

	// Importing gsap
	import { gsap } from "gsap"


	
export default function FontName() {
	const animDur = 0.6;
	
	// Animating in the letters
	const tl = gsap.timeline({ paused: true });

	// Flag to check if the animation is playing
	const [isPlaying, setIsPlaying] = useState(false);


	
	function makeAnimation(timeline, offset, duration = animDur) {
		timeline.to(".casc", {
			strokeDashoffset: offset,
			duration: duration * 2,
			ease: "power2.in",
			onComplete: () => {
				if (offset === -101) {
					gsap.set('.casc', { strokeDashoffset: 101 });
				}
			}
		}, 0);
		
		timeline.to(".a1-centre", {
			strokeDashoffset: offset,
			duration: duration * 0.6,
			ease: "power2.out",
			onComplete: () => {
				if (offset === -101) {
					gsap.set('.a1-centre', { strokeDashoffset: 101 });
				}
			}
		}, duration * 1.5);
		
		timeline.to(".s-top", {
			strokeDashoffset: offset,
			duration: duration,
			ease: "power2.out",
			onComplete: () => {
				if (offset === -101) {
					gsap.set('.s-top', { strokeDashoffset: 101 });
				}
			}
		}, duration * 1.9);
		
		timeline.to(".cade", {
			strokeDashoffset: offset,
			duration: duration * 1.8,
			ease: "power1.inOut",
			onComplete: () => {
				if (offset === -101) {
					gsap.set('.cade', { strokeDashoffset: 101 });
				}
			}
		}, duration * 1.75);
		
		timeline.to(".a2-centre", {
			strokeDashoffset: offset,
			duration: duration * 0.6,
			ease: "power2.out",
			onComplete: () => {
				if (offset === -101) {
					gsap.set('.a2-centre', { strokeDashoffset: 101 });
				}
			}
		}, duration * 2.5);
		
		timeline.to(".d-top", {
			strokeDashoffset: offset,
			duration: duration * 0.8,
			ease: "power2.out",
			onComplete: () => {
				if (offset === -101) {
					gsap.set('.d-top', { strokeDashoffset: 101 });
				}
			}
		}, duration * 3);
		
		timeline.to(".e1-centre", {
			strokeDashoffset: offset,
			duration: duration * 0.4,
			ease: "power2.out",
			onComplete: () => {
				if (offset === -101) {
					gsap.set('.e1-centre', { strokeDashoffset: 101 });
				}
			}
		}, duration * 2.8);
		
		timeline.to(".enc", {
			strokeDashoffset: offset,
			duration: duration * 1.5,
			ease: "power1.inOut",
			onComplete: () => {
				if (offset === -101) {
					gsap.set('.enc', { strokeDashoffset: 101 });
				}
			}
		}, duration * 2.9);
		
		timeline.to(".n-top", {
			strokeDashoffset: offset,
			duration: duration * 0.4,
			ease: "power2.out",
			onComplete: () => {
				if (offset === -101) {
					gsap.set('.n-top', { strokeDashoffset: 101 });
				}
			}
		}, duration * 4);
		
		timeline.to(".ce", {
			strokeDashoffset: offset,
			duration: duration * 1.2,
			ease: "power1.inOut",
			onComplete: () => {
				if (offset === -101) {
					gsap.set('.ce', { strokeDashoffset: 101 });
				}
			}
		}, duration * 3.8);
		
		timeline.to(".e2-top", {
			strokeDashoffset: offset,
			duration: duration * 1.3,
			ease: "power2.out",
			onComplete: () => {
				if (offset === -101) {
					gsap.set('.e2-top', { strokeDashoffset: 101 });
				}
			}
		}, duration * 4.4);
		
		timeline.to(".e2-centre", {
			strokeDashoffset: offset,
			duration: duration * 0.4,
			ease: "power2.out",
			onComplete: () => {
				if (offset === -101) {
					gsap.set('.e2-centre', { strokeDashoffset: 101 });
				}
			}
		}, duration * 4.8);
	}



	function handleMouseEnter() {
		if (isPlaying) return;

		let newDur = 0.38;

		setIsPlaying(true);

		const tl2 = gsap.timeline();
		makeAnimation(tl2, -101, newDur);

		const tl3 = gsap.timeline({ delay: newDur * 3 });
		makeAnimation(tl3, 0, newDur);

		setTimeout(() => {
			setIsPlaying(false);
		}, newDur * 5.2 * 1200);
	}
	
	
	
	useEffect(() => {
		// Play the animation
		setTimeout(() => {
			makeAnimation(tl, 0);
			tl.play();
			setIsPlaying(true);
			setTimeout(() => {
				setIsPlaying(false);
			}, animDur * 5.2 * 1000);
		}, 800);
	
	// // Animating through the letters
		// setTimeout(() => {
		// 	const tl2 = gsap.timeline({ repeat: -1, repeatDelay: 3 });
		// 	makeAnimation(tl2, 202);

		// 	setTimeout(() => {
		// 		const tl3 = gsap.timeline({ repeat: -1, repeatDelay: 3 });
		// 		makeAnimation(tl3, 0);
		// 	}, 500);
		// }, 5000);

		

		
	}, [])

	return (
		<svg className="FontName" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2021 421" onMouseEnter={ handleMouseEnter }>
			<path 
				className="e2-centre" 
				pathLength={ 100 }
				d="M1810.5,310.5c.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451s5.626-11.79,9.035-17.066,7.325-10.126,11.708-14.509,9.233-8.299,14.509-11.708c5.276-3.409,10.978-6.613,17.066-8.967,6.088-2.354,12.13-3.879,18.333-5.074,8.219-1.583,15.029-1.846,22.497-1.846"
			/>
			<path 
				className="e2-top" 
				pathLength={ 100 }
				d="M1810.5,410.5V110.5c.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451,2.354-6.088,5.626-11.79,9.035-17.066s7.325-10.126,11.708-14.509c4.383-4.383,9.233-8.299,14.509-11.708s10.978-6.613,17.066-8.967c6.088-2.354,12.13-3.879,18.333-5.074,8.219-1.583,15.029-1.846,22.497-1.846,7.076.071,12.711.243,22.379,1.846,6.422,1.065,12.363,2.652,18.451,5.006,6.088,2.354,11.79,5.626,17.066,9.035,5.276,3.409,10.126,7.325,14.509,11.708,4.383,4.383,8.299,9.233,11.708,14.509s6.613,10.978,8.967,17.066c2.354,6.088,3.879,12.13,5.074,18.333,1.583,8.219,1.846,15.029,1.846,22.497"
			/>
			<path
				className="ce"
				pathLength={ 100 }
				d="M1610.5,310.5c0,7.468.263,14.278,1.846,22.497,1.195,6.204,2.72,12.246,5.074,18.333,2.354,6.088,5.558,11.79,8.967,17.066,3.409,5.276,7.325,10.126,11.708,14.509s9.233,8.299,14.509,11.708c5.276,3.409,10.978,6.682,17.066,9.035,6.088,2.354,12.029,3.941,18.451,5.006,9.668,1.603,15.303,1.775,22.379,1.846h100s100,0,100,0c7.468,0,14.278-.263,22.497-1.846,6.204-1.195,12.246-2.72,18.333-5.074,6.088-2.354,11.79-5.558,17.066-8.967,5.276-3.409,10.126-7.325,14.509-11.708,4.383-4.383,8.299-9.233,11.708-14.509,3.409-5.276,6.682-10.978,9.035-17.066,2.354-6.088,3.941-12.029,5.006-18.451,1.603-9.668,1.775-15.303,1.846-22.379"
			/>
			<line
				className="n-top" 
				pathLength={ 100 }
				x1="1610.5" y1="110.5" x2="1610.5" y2="10.5"
			/>
			<path 
				className="enc" 
				pathLength={ 100 }
				d="M1210.5,310.5c0,7.468.263,14.278,1.846,22.497,1.195,6.204,2.72,12.246,5.074,18.333,2.354,6.088,5.558,11.79,8.967,17.066,3.409,5.276,7.325,10.126,11.708,14.509,4.383,4.383,9.233,8.299,14.509,11.708,5.276,3.409,10.978,6.682,17.066,9.035,6.088,2.354,12.029,3.941,18.451,5.006,9.668,1.603,15.303,1.775,22.379,1.846h100V10.5l100,200,100,200V110.5c.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451,2.354-6.088,5.626-11.79,9.035-17.066s7.325-10.126,11.708-14.509c4.383-4.383,9.233-8.299,14.509-11.708s10.978-6.613,17.066-8.967c6.088-2.354,12.13-3.879,18.333-5.074,8.219-1.583,15.029-1.846,22.497-1.846h100"
			/>
			<path 
				className="e1-centre"
				pathLength={ 100 }
				d="M1210.5,310.5c.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451,2.354-6.088,5.626-11.79,9.035-17.066,3.409-5.276,7.325-10.126,11.708-14.509,4.383-4.383,9.233-8.299,14.509-11.708,5.276-3.409,10.978-6.613,17.066-8.967,6.088-2.354,12.13-3.879,18.333-5.074,8.219-1.583,15.029-1.846,22.497-1.846"
			/>
			<path 
				className="d-top"
				pathLength={ 100 }
				d="M1210.5,110.5c0-7.468-.263-14.278-1.846-22.497-1.195-6.204-2.72-12.246-5.074-18.333-2.354-6.088-5.558-11.79-8.967-17.066-3.409-5.276-7.325-10.126-11.708-14.509-4.383-4.383-9.233-8.299-14.509-11.708-5.276-3.409-10.978-6.682-17.066-9.035-6.088-2.354-12.029-3.941-18.451-5.006-9.668-1.603-15.303-1.775-22.379-1.846h-100v100"
			/>
			<path 
				className="a2-centre"
				pathLength={ 100 }
				d="M810.5,310.5c.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451,2.354-6.088,5.626-11.79,9.035-17.066,3.409-5.276,7.325-10.126,11.708-14.509s9.233-8.299,14.509-11.708c5.276-3.409,10.978-6.613,17.066-8.967,6.088-2.354,12.13-3.879,18.333-5.074,8.219-1.583,15.029-1.846,22.497-1.846,7.076.071,12.711.243,22.379,1.846,6.422,1.065,12.363,2.652,18.451,5.006,6.088,2.354,11.79,5.626,17.066,9.035,5.276,3.409,10.126,7.325,14.509,11.708s8.299,9.233,11.708,14.509c3.409,5.276,6.613,10.978,8.967,17.066,2.354,6.088,3.879,12.13,5.074,18.333,1.583,8.219,1.846,15.029,1.846,22.497"
			/>
			<path 
				className="cade"
				pathLength={ 100 }
				d="M610.5,310.5c0,7.468.263,14.278,1.846,22.497,1.195,6.204,2.72,12.246,5.074,18.333s5.558,11.79,8.967,17.066c3.409,5.276,7.325,10.126,11.708,14.509,4.383,4.383,9.233,8.299,14.509,11.708,5.276,3.409,10.978,6.682,17.066,9.035s12.029,3.941,18.451,5.006c9.668,1.603,15.303,1.775,22.379,1.846h100V110.5c.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451s5.626-11.79,9.035-17.066c3.409-5.276,7.325-10.126,11.708-14.509,4.383-4.383,9.233-8.299,14.509-11.708s10.978-6.613,17.066-8.967,12.13-3.879,18.333-5.074c8.219-1.583,15.029-1.846,22.497-1.846,7.076.071,12.711.243,22.379,1.846,6.422,1.065,12.363,2.652,18.451,5.006,6.088,2.354,11.79,5.626,17.066,9.035,5.276,3.409,10.126,7.325,14.509,11.708s8.299,9.233,11.708,14.509c3.409,5.276,6.613,10.978,8.967,17.066,2.354,6.088,3.879,12.13,5.074,18.333,1.583,8.219,1.846,15.029,1.846,22.497v300h100c7.468,0,14.278-.263,22.497-1.846,6.204-1.195,12.246-2.72,18.333-5.074,6.088-2.354,11.79-5.558,17.066-8.967,5.276-3.409,10.126-7.325,14.509-11.708,4.383-4.383,8.299-9.233,11.708-14.509,3.409-5.276,6.682-10.978,9.035-17.066,2.354-6.088,3.941-12.029,5.006-18.451,1.603-9.668,1.775-15.303,1.846-22.379V110.5c.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451,2.354-6.088,5.626-11.79,9.035-17.066,3.409-5.276,7.325-10.126,11.708-14.509s9.233-8.299,14.509-11.708c5.276-3.409,10.978-6.613,17.066-8.967,6.088-2.354,12.13-3.879,18.333-5.074,8.219-1.583,15.029-1.846,22.497-1.846,7.076.071,12.711.243,22.379,1.846,6.422,1.065,12.363,2.652,18.451,5.006,6.088,2.354,11.79,5.626,17.066,9.035,5.276,3.409,10.126,7.325,14.509,11.708,4.383,4.383,8.299,9.233,11.708,14.509,3.409,5.276,6.613,10.978,8.967,17.066,2.354,6.088,3.879,12.13,5.074,18.333,1.583,8.219,1.846,15.029,1.846,22.497"
			/>
			<path 
				className="s-top"
				pathLength={ 100 }
				d="M610.5,310.5c0-7.468-.263-14.278-1.846-22.497-1.195-6.204-2.72-12.246-5.074-18.333-2.354-6.088-5.558-11.79-8.967-17.066-3.409-5.276-7.325-10.126-11.708-14.509-4.383-4.383-9.233-8.299-14.509-11.708-5.276-3.409-10.978-6.682-17.066-9.035s-12.029-3.941-18.451-5.006c-9.668-1.603-15.303-1.775-22.379-1.846-7.076-.071-12.711-.243-22.379-1.846-6.422-1.065-12.363-2.652-18.451-5.006s-11.79-5.626-17.066-9.035-10.126-7.325-14.509-11.708-8.299-9.233-11.708-14.509c-3.409-5.276-6.613-10.978-8.967-17.066-2.354-6.088-3.879-12.13-5.074-18.333-1.583-8.219-1.846-15.029-1.846-22.497.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451s5.626-11.79,9.035-17.066c3.409-5.276,7.325-10.126,11.708-14.509,4.383-4.383,9.233-8.299,14.509-11.708s10.978-6.613,17.066-8.967,12.13-3.879,18.333-5.074c8.219-1.583,15.029-1.846,22.497-1.846h100"
			/>
			<path 
				className="a1-centre"
				pathLength={ 100 }
				d="M210.5,110.5c0,7.468.263,14.278,1.846,22.497,1.195,6.204,2.72,12.246,5.074,18.333,2.354,6.088,5.558,11.79,8.967,17.066,3.409,5.276,7.325,10.126,11.708,14.509s9.233,8.299,14.509,11.708,10.978,6.682,17.066,9.035,12.029,3.941,18.451,5.006c9.668,1.603,15.303,1.775,22.379,1.846,7.076.071,12.711.243,22.379,1.846,6.422,1.065,12.363,2.652,18.451,5.006s11.79,5.626,17.066,9.035c5.276,3.409,10.126,7.325,14.509,11.708,4.383,4.383,8.299,9.233,11.708,14.509,3.409,5.276,6.613,10.978,8.967,17.066,2.354,6.088,3.879,12.13,5.074,18.333,1.583,8.219,1.846,15.029,1.846,22.497"
			/>
			<path 
				className="casc"
				pathLength={ 100 }
				d="M210.5,10.5h-100c-7.468,0-14.278.263-22.497,1.846-6.204,1.195-12.246,2.72-18.333,5.074s-11.79,5.558-17.066,8.967-10.126,7.325-14.509,11.708c-4.383,4.383-8.299,9.233-11.708,14.509s-6.682,10.978-9.035,17.066c-2.354,6.088-3.941,12.029-5.006,18.451-1.603,9.668-1.775,15.303-1.846,22.379v200c0,7.468.263,14.278,1.846,22.497,1.195,6.204,2.72,12.246,5.074,18.333,2.354,6.088,5.558,11.79,8.967,17.066,3.409,5.276,7.325,10.126,11.708,14.509,4.383,4.383,9.233,8.299,14.509,11.708,5.276,3.409,10.978,6.682,17.066,9.035s12.029,3.941,18.451,5.006c9.668,1.603,15.303,1.775,22.379,1.846h100V110.5c.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451s5.626-11.79,9.035-17.066c3.409-5.276,7.325-10.126,11.708-14.509,4.383-4.383,9.233-8.299,14.509-11.708s10.978-6.613,17.066-8.967,12.13-3.879,18.333-5.074c8.219-1.583,15.029-1.846,22.497-1.846,7.076.071,12.711.243,22.379,1.846,6.422,1.065,12.363,2.652,18.451,5.006,6.088,2.354,11.79,5.626,17.066,9.035,5.276,3.409,10.126,7.325,14.509,11.708,4.383,4.383,8.299,9.233,11.708,14.509,3.409,5.276,6.613,10.978,8.967,17.066,2.354,6.088,3.879,12.13,5.074,18.333,1.583,8.219,1.846,15.029,1.846,22.497v300h100c7.468,0,14.278-.263,22.497-1.846,6.204-1.195,12.246-2.72,18.333-5.074,6.088-2.354,11.79-5.558,17.066-8.967s10.126-7.325,14.509-11.708,8.299-9.233,11.708-14.509,6.682-10.978,9.035-17.066c2.354-6.088,3.941-12.029,5.006-18.451,1.603-9.668,1.775-15.303,1.846-22.379V110.5c.071-7.076.243-12.711,1.846-22.379,1.065-6.422,2.652-12.363,5.006-18.451s5.626-11.79,9.035-17.066c3.409-5.276,7.325-10.126,11.708-14.509,4.383-4.383,9.233-8.299,14.509-11.708s10.978-6.613,17.066-8.967,12.13-3.879,18.333-5.074c8.219-1.583,15.029-1.846,22.497-1.846h100"
			/>
		</svg>
	)
}