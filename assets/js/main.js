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
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');

				// --- START: CUSTOM GAME PROJECT CAROUSEL LOGIC ---
				const carouselTrack = document.getElementById('carouselTrack');
				const prevBtn = document.getElementById('prevBtn');
				const nextBtn = document.getElementById('nextBtn');
				const steamLink = document.getElementById('steamLink');
				const websiteLink = document.getElementById('websiteLink');

				// This array holds the data for your game projects.
				const projects = [
					{
						image: './images/games/GameProject_01.jpg',
						webUrl: 'https://unseal.fr/',
						steamUrl: 'https://store.steampowered.com/app/1928980/Nightingale/',
					},
					{
						image: 'https://placehold.co/1920x1080/000000/FFFFFF?text=Project+B',
						webUrl: 'https://www.google.com/',
						steamUrl: 'https://store.steampowered.com/app/2',
					},
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
						slide.style.backgroundImage = `url('${project.image}')`;
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
				if (prevBtn) prevBtn.addEventListener('click', prevProject);
				if (nextBtn) nextBtn.addEventListener('click', nextProject);

				// Initial render when the page loads
				renderCarousel();
				// --- END: CUSTOM GAME PROJECT CAROUSEL LOGIC ---

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

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {
				return $header.height() + 10;
			}
		});

	// Poptrox.
		$window.on('load', function() {

			$('.gallery').poptrox({
				baseZIndex: 1000000,
				onSlideShowChange: function(index) { $all.addClass('is-covered'); },
				onSlideShowHide: function() { $all.removeClass('is-covered'); }
			});

		});

})(jQuery);


Once you have replaced the content of your `main.js` file with the code above, your website should be fully restored.
