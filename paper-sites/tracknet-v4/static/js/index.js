window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
    }

    var carousels = bulmaCarousel.attach('.carousel', options);
    bulmaSlider.attach();
	
	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			if (mutation.target.style.display !== 'none') {
				bulmaCarousel.attach('.carousel', options);
				bulmaSlider.attach();
			}
		});
	});
	
	document.querySelectorAll('.carousel, .slider').forEach(el => {
		observer.observe(el, { attributes: true, attributeFilter: ['style'] });
	});
	

	const imagesContainer = document.getElementById('sample-images-container');
	imagesContainer.style.display = 'none';
	const videosContainer = document.getElementById('sample-videos-container');
	videosContainer.style.display = 'none';
	
})
