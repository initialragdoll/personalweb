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
// We will use a single button for the platform link.
const platformLink = document.getElementById('platformLink');
const websiteLink = document.getElementById('websiteLink');

// This array holds the data for your game projects.
const projects = [
    {
        desktopImage: './images/games/GameProject_01.jpg',
        mobileImage: './images/games/GameProject_01_mobile.jpg',
        webUrl: 'https://unseal.fr/',
        steamUrl: 'https://store.steampowered.com/app/YOUR_APP_ID/',
        playStoreUrl: null, // Add this line for mobile games
    },
    {
        desktopImage: 'https://placehold.co/1920x1080/000000/FFFFFF?text=Project+B',
        mobileImage: 'https://placehold.co/1080x1920/000000/FFFFFF?text=Mobile+Project+B',
        webUrl: 'https://www.google.com/',
        steamUrl: null, // This project is not on Steam
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.example.projectb', // Add the Play Store URL
    }
];

let currentProjectIndex = 0;

/**
 * Renders the carousel slides and updates the links.
 */
function renderCarousel() {
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
    // Use the new, single function to update all links
    updatePlatformLink();
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
 * Updates the web link to the URL of the current project.
 */
function updateWebLink() {
    if (projects[currentProjectIndex] && websiteLink) {
        websiteLink.href = projects[currentProjectIndex].webUrl;
    }
}

/**
 * Updates the platform button (Steam or Play Store) dynamically.
 */
function updatePlatformLink() {
    const currentProject = projects[currentProjectIndex];

    // Get the elements for the dynamic button
    const platformIcon = document.getElementById('platformIcon');
    const platformText = document.getElementById('platformText');

    if (currentProject.playStoreUrl) {
        // If it's a mobile game, show the Play Store button.
        platformLink.style.display = 'inline-flex'; // Show the button
        platformLink.href = currentProject.playStoreUrl;
        platformIcon.className = 'fab fa-google-play';
        platformText.textContent = 'Play Store';
    } else if (currentProject.steamUrl) {
        // If there's a Steam URL, show the Steam button.
        platformLink.style.display = 'inline-flex'; // Show the button
        platformLink.href = currentProject.steamUrl;
        platformIcon.className = 'fab fa-steam';
        platformText.textContent = 'Steam Page';
    } else {
        // If neither exists, hide the button entirely.
        platformLink.style.display = 'none';
    }
}

/**
 * Moves to the next project in the carousel.
 */
function nextProject() {
    if (currentProjectIndex < projects.length - 1) {
        currentProjectIndex++;
    } else {
        currentProjectIndex = 0;
    }
    updateCarouselPosition();
    // Call the new, consolidated function
    updatePlatformLink();
    updateWebLink();
}

/**
 * Moves to the previous project in the carousel.
 */
function prevProject() {
    if (currentProjectIndex > 0) {
        currentProjectIndex--;
    } else {
        currentProjectIndex = projects.length - 1;
    }
    updateCarouselPosition();
    // Call the new, consolidated function
    updatePlatformLink();
    updateWebLink();
}

// Event listeners for navigation buttons
prevBtn.addEventListener('click', prevProject);
nextBtn.addEventListener('click', nextProject);

// Initial render when the page loads
window.addEventListener('load', renderCarousel);
