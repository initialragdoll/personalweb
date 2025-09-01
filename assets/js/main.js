/*
	Origin Template Design by HTML5 UP
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Fix: IE flexbox fix.
		if (browser.name == 'ie') {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function() {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function() {

						var wh = $window.height();

						$main.each(function() {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

	// Gallery.
		$window.on('load', function() {

			var $gallery = $('.gallery');

			$gallery.poptrox({
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#1f2328',
				overlayOpacity: 0.65,
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 50,
				usePopupNav: true,

				// New: Add a custom link to the caption on open.
					/ Add the onOpen and onClose functions
    onOpen: function() {
        var artstationUrl = this._$a.attr('data-artstation-url');
        
        // Only append the link if the attribute exists
        if (artstationUrl) {
            var $caption = this._$caption;
            $caption.append('<a href="' + artstationUrl + '" target="_blank">Check more on ArtStation</a>');
        }
    },
    
    onClose: function() {
        var $caption = this._$caption;
        $caption.find('a').remove();
    }
});
	

			// Hack: Adjust margins when 'small' activates.
				breakpoints.on('>small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 50;
					});
				});

				breakpoints.on('<=small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 5;
					});
				});

		});

	// Section transitions.
		if (browser.canUse('transition')) {

			var on = function() {

				// Galleries.
					$('.gallery')
						.scrollex({
							top:		'30vh',
							bottom:		'30vh',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Generic sections.
					$('.main.style1')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					$('.main.style2')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Contact.
					$('#contact')
						.scrollex({
							top:		'50%',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

			};

			var off = function() {

				// Galleries.
					$('.gallery')
						.unscrollex();

				// Generic sections.
					$('.main.style1')
						.unscrollex();

					$('.main.style2')
						.unscrollex();

				// Contact.
					$('#contact')
						.unscrollex();

			};

			breakpoints.on('<=small', off);
			breakpoints.on('>small', on);

		}

	// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.on('resize', function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {

					// Update scrolly links.
						$('a[href^="#"]').scrolly({
							speed: 1500,
							offset: $header.outerHeight() - 1
						});

					// Re-enable animations/transitions.
						setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.on('load', function() {
				$window.trigger('resize');
			});


/* --- START: NEW GAME PROJECT CAROUSEL LOGIC --- */
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const websiteLink = document.getElementById('websiteLink');
const platformLink = document.getElementById('platformLink');

// This array holds the data for your game projects.
const projects = [
	/* PC Game */
	{
		desktopImage: './images/games/GameProject_01.jpg',
		mobileImage: './images/games/GameProject_01_mobile.jpg',
		webUrl: 'https://unseal.fr/',
		steamUrl: 'https://store.steampowered.com/app/YOUR_APP_ID/',
		playStoreUrl: null,
	},
	/* Mobile Game */
	{
		desktopImage: 'https://placehold.co/1920x1080/5a5a5a/FFFFFF?text=Incoming+Project',
		mobileImage: 'https://placehold.co/1080x1920/5a5a5a/FFFFFF?text=Incoming+Project',
		webUrl: null,
		steamUrl: null,
		playStoreUrl: 'https://play.google.com/store/apps/details?id=com.example.projectb',
	}
	// Add more projects as needed
];

let currentProjectIndex = 0;

/**
 * Renders the carousel slides and updates the links.
 */
function renderCarousel() {
	// Clear existing slides
	carouselTrack.innerHTML = '';

	projects.forEach((project, index) => {
		const slide = document.createElement('div');
		slide.className = 'carousel-slide';
		const isMobile = window.innerWidth <= 736;
		const imageUrl = isMobile ? project.mobileImage : project.desktopImage;
		slide.style.backgroundImage = `url('${imageUrl}')`;

		slide.dataset.index = index;
		carouselTrack.appendChild(slide);
	});
	updateCarouselPosition();
	updateLinks();
}

/**
 * Updates the carousel's position based on the current index.
 */
function updateCarouselPosition() {
	const offset = -currentProjectIndex * 100;
	carouselTrack.style.transform = `translateX(${offset}vw)`;
}

/**
 * Updates all links based on the current project.
 */
function updateLinks() {
    const currentProject = projects[currentProjectIndex];
    if (!currentProject) {
        // If the project doesn't exist, hide all buttons.
        if (websiteLink) websiteLink.style.display = 'none';
        if (platformLink) platformLink.style.display = 'none';
        return;
    }

    // Update the official website link
    if (currentProject.webUrl) {
        if (websiteLink) {
            websiteLink.href = currentProject.webUrl;
            websiteLink.style.display = 'inline-flex';
        }
    } else {
        // Hide the website link if no URL is provided
        if (websiteLink) websiteLink.style.display = 'none';
    }

    // Update the platform link (Steam or Play Store)
    const platformIcon = document.getElementById('platformIcon');
    const platformText = document.getElementById('platformText');

    if (currentProject.playStoreUrl) {
        if (platformLink && platformIcon && platformText) {
            platformLink.href = currentProject.playStoreUrl;
            platformIcon.className = 'fab fa-google-play';
            platformText.textContent = 'Play Store';
            platformLink.style.display = 'inline-flex';
        }
    } else if (currentProject.steamUrl) {
        if (platformLink && platformIcon && platformText) {
            platformLink.href = currentProject.steamUrl;
            platformIcon.className = 'fab fa-steam';
            platformText.textContent = 'Steam Page';
            platformLink.style.display = 'inline-flex';
        }
    } else {
        if (platformLink) platformLink.style.display = 'none';
    }
}

/**
 * Moves to the next project in the carousel.
 */
function nextProject() {
	if (currentProjectIndex < projects.length - 1) {
		currentProjectIndex++;
	} else {
		currentProjectIndex = 0; // Loop back to the beginning
	}
	updateCarouselPosition();
	updateLinks();
}

/**
 * Moves to the previous project in the carousel.
 */
function prevProject() {
	if (currentProjectIndex > 0) {
		currentProjectIndex--;
	} else {
		currentProjectIndex = projects.length - 1; // Loop to the end
	}
	updateCarouselPosition();
	updateLinks();
}

// Event listeners for navigation buttons
if (prevBtn) prevBtn.addEventListener('click', prevProject);
if (nextBtn) nextBtn.addEventListener('click', nextProject);

// Initial render when the page loads
window.addEventListener('load', renderCarousel);


})(jQuery);







