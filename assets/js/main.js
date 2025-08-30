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
				usePopupNav: true
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
const steamLink = document.getElementById('steamLink');
const websiteLink = document.getElementById('websiteLink');

// This array holds the data for your game projects.
const projects = [
    {
        desktopImage: './images/games/GameProject_01.jpg',
        mobileImage: './images/games/GameProject_01_mobile.jpg', // Mobile image path
        webUrl: 'https://unseal.fr/',
        steamUrl: 'https://store.steampowered.com/app/YOUR_APP_ID/',
    },
    {
        desktopImage: 'https://placehold.co/1920x1080/000000/FFFFFF?text=Project+B',
        mobileImage: 'https://placehold.co/1080x1920/000000/FFFFFF?text=Mobile+Project+B', // Mobile image path
        webUrl: 'https://www.google.com/', 
        steamUrl: 'https://store.steampowered.com/app/2',
    }
	/* In coming projects
    {
        image: 'https://placehold.co/1920x1080/000000/FFFFFF?text=Project+C',
        webUrl: 'https://www.youtube.com/', 
        steamUrl: 'https://store.steampowered.com/app/3',
    },
    {
        image: 'https://placehold.co/1920x1080/000000/FFFFFF?text=Project+D',
        webUrl: 'https://www.twitch.tv/', 
        steamUrl: 'https://store.steampowered.com/app/4',
    }
	*/
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
       /* slide.style.backgroundImage = `url('${project.image}')`; */
		const isMobile = window.innerWidth <= 736;
		const imageUrl = isMobile ? project.mobileImage : project.desktopImage;
		slide.style.backgroundImage = `url('${imageUrl}')`;
		
        slide.dataset.index = index;
        carouselTrack.appendChild(slide);
    });
    updateCarouselPosition();
    updateSteamLink();
    updateWebLink();
}

/**
 * Updates the carousel's position based on the current index.
 */
function updateCarouselPosition() {
    const offset = -currentProjectIndex * 100;
    carouselTrack.style.transform = `translateX(${offset}vw)`;
}

/**
* Updates the web link to the URL of the current project.*/
function updateWebLink() {
    if (projects[currentProjectIndex] && websiteLink) {
        // Set the href attribute to the project's web URL
        websiteLink.href = projects[currentProjectIndex].webUrl;
    }
}
    
 /* Updates the Steam link to the URL of the current project.*/
function updateSteamLink() {
    if (projects[currentProjectIndex]) {
        steamLink.href = projects[currentProjectIndex].steamUrl;
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
    updateSteamLink();
    updateWebLink();
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
    updateSteamLink();
    updateWebLink();
}
// Event listeners for navigation buttons
prevBtn.addEventListener('click', prevProject);
nextBtn.addEventListener('click', nextProject);

// Initial render when the page loads
window.addEventListener('load', renderCarousel);
})(jQuery);


