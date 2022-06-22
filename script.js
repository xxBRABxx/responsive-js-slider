
// define slider (you can define several sliders on page according to this structure)
if (document.querySelector("#s1-slider-wrap")) {
	const mySlider = document.querySelector("#s1-slider-wrap");
    arrowSlider(mySlider)
}

// slider logic
function arrowSlider(sliderWrap) {
	const slider = sliderWrap.querySelector("#slider");
    const sliderElements = sliderWrap.querySelectorAll(".slider-item")  
    const prewArrow = sliderWrap.querySelector("#slider-arrow-prew");
	const nextArrow = sliderWrap.querySelector("#slider-arrow-next");
    const initialLeftPos = parseInt(window.getComputedStyle(slider).getPropertyValue("left").split("px")[0]);
    const elMargin = parseInt(window.getComputedStyle(sliderElements[0]).getPropertyValue("margin-right").split("px")[0]);
	const sliderElWidth = sliderElements[0].offsetWidth + elMargin;
	const totalSlidersCount = sliderElements.length
	let slidersCount = 0;

	nextArrow.addEventListener("click", () => { showNext() });
	prewArrow.addEventListener("click", () => { showPrew() });

	// logic for touchpad
	let touchstartX = 0;
	let touchendX = 0;
	slider.addEventListener('touchstart', e => { touchstartX = e.changedTouches[0].screenX })
	slider.addEventListener('touchend', e => { 
		touchendX = e.changedTouches[0].screenX;
		touchendX < touchstartX ? showNext() : showPrew();
	});

	// main functions
	function showNext() {
		if (slidersCount == totalSlidersCount - 1) {
			// console.log("On End")
		} else {
            slidersCount++
			slider.style.left = initialLeftPos - sliderElWidth * slidersCount + "px";
            sliderElements.forEach(el => el.classList.remove("active"))
            sliderElements[slidersCount].classList.toggle("active")	
		}
	};
	function showPrew() {
        if (slidersCount == 0) {
			// console.log("On Start")
		} else {
			slidersCount--;
			slider.style.left = initialLeftPos - sliderElWidth * slidersCount + "px";
            sliderElements.forEach(el => el.classList.remove("active"));
            sliderElements[slidersCount].classList.toggle("active")
		}
	}
}