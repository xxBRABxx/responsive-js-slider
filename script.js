
// define slider (you can define several sliders on page according to this structure)
if (document.querySelector("#s1-slider-wrap")) {
	const mySlider = document.querySelector("#s1-slider-wrap");
    arrowSlider(mySlider)
}

// slider logic
function arrowSlider(sliderWrap) {
	const slider = sliderWrap.querySelector("#slider");
	const sliderCounterWrap = sliderWrap.querySelector("#slider-counter-wrap");
    const sliderElements = sliderWrap.querySelectorAll(".slider-item")  
    const prewArrow = sliderWrap.querySelector(".slider-arrows-prew");
	const nextArrow = sliderWrap.querySelector(".slider-arrows-next");

	const sliderWrapWidth = sliderWrap.offsetWidth;       
	const sliderWidth = slider.offsetWidth;
	const sliderElWidth = sliderElements[0].offsetWidth + 15; //15 is margin
	const totalSlidersCount = Math.floor(sliderWidth/sliderElWidth)
	let slidersCount = Math.floor(sliderWrapWidth/sliderElWidth)
	let overlay = false; // overlay check

	sliderCounterWrap.innerHTML = "<strong>" + slidersCount + "</strong> | " + totalSlidersCount;

	nextArrow.addEventListener("click", () => { showNext() });
	prewArrow.addEventListener("click", () => { showPrew() });

	let touchstartX = 0;
	let touchendX = 0;
	slider.addEventListener('touchstart', e => { touchstartX = e.changedTouches[0].screenX })
	slider.addEventListener('touchend', e => { 
		touchendX = e.changedTouches[0].screenX;
		touchendX < touchstartX ? showNext() : showPrew()
	});

	function showNext() {
		let leftPos = slider.style.left;	
		leftPos == "" ? leftPos = 0 : leftPos = leftPos.split("px")[0];
		if (leftPos != 0 && parseInt(leftPos.split("-")[1]) + sliderWrapWidth > sliderWidth) {
			//console.log("At the End")
		} else {
			slider.style.left = leftPos - sliderElWidth + "px";
			if (slidersCount < totalSlidersCount) {
				slidersCount++;
				sliderCounterWrap.innerHTML = "<strong>" + slidersCount + "</strong> | " + totalSlidersCount;
			} else {
				overlay = true 
			}
		}
	};
	function showPrew() {
		let leftPos = slider.style.left;
		if (leftPos == "" || leftPos == "0px") {
			//console.log("On Start")
		} else {
			leftPos = leftPos.split("px")[0]
			slider.style.left = parseInt(leftPos) + sliderElWidth + "px";
			if (!overlay) {
				slidersCount--
				sliderCounterWrap.innerHTML = "<strong>" + slidersCount + "</strong> | " + totalSlidersCount;	
			} else {
				overlay = false
			}
		}
	}
}