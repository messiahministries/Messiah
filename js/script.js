// Future JavaScript functions can go here
console.log("Messiah Ministry Website Loaded");

// Simple auto-scrolling verse carousel
function initVerseCarousel() {
	const slider = document.querySelector('.verse-slider .slides');
	if (!slider) return;

	const slides = slider.children;
	let index = 0;
	const total = slides.length;
	const interval = 3000; // 3 seconds
	let timer = null;

	function goTo(i) {
		index = (i + total) % total;
		slider.style.transform = `translateX(-${index * 100}%)`;
	}

	function next() {
		goTo(index + 1);
	}

	function start() {
		if (timer) return;
		timer = setInterval(next, interval);
	}

	function stop() {
		if (timer) { clearInterval(timer); timer = null; }
	}

	// Pause on hover, resume on leave
	const container = document.querySelector('.verse-slider');
	container.addEventListener('mouseenter', stop);
	container.addEventListener('mouseleave', start);

	// Start autoplay
	start();

	// Controls
	const btnPrev = document.querySelector('.verse-prev');
	const btnNext = document.querySelector('.verse-next');
	let resumeTimer = null;

	function userInteracted() {
		stop();
		if (resumeTimer) clearTimeout(resumeTimer);
		// resume autoplay after 5 seconds of inactivity
		resumeTimer = setTimeout(start, 5000);
	}

	if (btnPrev) {
		btnPrev.addEventListener('click', function () { goTo(index - 1); userInteracted(); });
	}
	if (btnNext) {
		btnNext.addEventListener('click', function () { goTo(index + 1); userInteracted(); });
	}

	// Keyboard support: left/right arrows
	document.addEventListener('keydown', function (e) {
		if (e.key === 'ArrowLeft') { goTo(index - 1); userInteracted(); }
		if (e.key === 'ArrowRight') { goTo(index + 1); userInteracted(); }
	});
}

document.addEventListener('DOMContentLoaded', initVerseCarousel);
// end of file
