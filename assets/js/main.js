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

			// This is the updated line. It selects all gallery links EXCEPT the multi-image ones.
			var $gallery = $('.gallery a:not(.multi-image-link)');

			$gallery.poptrox({
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#000000',
				overlayOpacity: 0.9,/*Full image mode overlay opacity*/
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


/* --- START: UNIVERSAL CAROUSEL LOGIC --- */

const gameProjects = [
    {
        title: 'UNSEAL',
        titleFont: "'Cinzel Decorative', cursive", 
        desktopImage: './images/games/GameProject_01.jpg',
        mobileImage: './images/games/GameProject_01_mobile.jpg',
        webUrl: 'https://unseal.fr/',
        steamUrl: 'https://store.steampowered.com/app/YOUR_APP_ID/',
        playStoreUrl: null,
    },
    {
        title: 'Incoming Project',
        titleFont: "'Source Sans Pro', sans-serif", 
        desktopImage: 'https://placehold.co/1920x1080/5a5a5a/FFFFFF?text=Incoming+Project',
        mobileImage: 'https://placehold.co/1080x1920/5a5a5a/FFFFFF',
        webUrl: null,
        steamUrl: null,
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.example.projectb',
    }
];

const assetProjects = [
    {
        title: 'Kerosene Lamps', 
        titleFont:  "'system-ui', sans-serif", 
        desktopImage: './images/assets/Asset_01.png',
        mobileImage: './images/assets/Asset_01_mobile.png',
        webUrl: 'https://fab.com/s/389a8bc7dafd',
        steamUrl: null,
        playStoreUrl: null,
    },
    {
        title: "19th Century furniture VOL.1 - Child's Bedroom",
        titleFont:  "'system-ui', sans-serif",  
        desktopImage: './images/assets/Asset_02.png',
        mobileImage: './images/assets/Asset_02_mobile.png',
        webUrl: null,
        steamUrl: null,
        playStoreUrl: null,
    }
];

function initializeCarousel(projects, prefix = "") {
    const trackId = prefix === 'asset' ? 'assetTrack' : 'carouselTrack';
    const carouselTrack = document.getElementById(trackId);
    
    const prevBtn = document.getElementById(prefix ? prefix + 'PrevBtn' : 'prevBtn');
    const nextBtn = document.getElementById(prefix ? prefix + 'NextBtn' : 'nextBtn');
    const websiteLink = document.getElementById(prefix ? prefix + 'WebLink' : 'websiteLink');
    const platformLink = document.getElementById(prefix ? prefix + 'PlatformLink' : 'platformLink');
    const platformIcon = document.getElementById(prefix ? prefix + 'PlatformIcon' : 'platformIcon');
    const platformText = document.getElementById(prefix ? prefix + 'PlatformText' : 'platformText');

    let currentProjectIndex = 0; // KEEP THIS ONE

    function renderCarousel() {
        if (!carouselTrack) return;
        carouselTrack.innerHTML = '';
        const isMobile = window.innerWidth <= 736;

        projects.forEach((project) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            const imageUrl = isMobile ? project.mobileImage : project.desktopImage;
            slide.style.backgroundImage = `url('${imageUrl}')`;

            const shouldShowTitle = isMobile || (prefix === 'asset');
            if (project.title && shouldShowTitle) {
                const mobileTitle = document.createElement('h3');
                mobileTitle.className = 'carousel-item-title'; 
                mobileTitle.textContent = project.title;
                if (project.titleFont) {
                    mobileTitle.style.setProperty('--mobile-font', project.titleFont);
                }
                slide.appendChild(mobileTitle);
            }
            carouselTrack.appendChild(slide);
        });
        updateCarouselPosition();
        updateLinks();
    }
        
    function updateCarouselPosition() {
        if (!carouselTrack) return;
        carouselTrack.style.transform = `translateX(${-currentProjectIndex * 100}%)`;
    }

    function updateLinks() {
        const currentProject = projects[currentProjectIndex];
        if (!currentProject) return;
        if (websiteLink) websiteLink.style.display = 'none';
        if (platformLink) platformLink.style.display = 'none';

        if (platformLink) {
            let hasPlatform = false;
            if (currentProject.playStoreUrl) {
                platformLink.href = currentProject.playStoreUrl;
                if (platformIcon) platformIcon.className = 'fab fa-google-play';
                if (platformText) platformText.textContent = 'Play Store';
                hasPlatform = true;
            } else if (currentProject.steamUrl) {
                platformLink.href = currentProject.steamUrl;
                if (platformIcon) platformIcon.className = prefix === 'asset' ? 'fab fa-unity' : 'fab fa-steam';
                if (platformText) platformText.textContent = prefix === 'asset' ? 'Unity Store' : 'Steam Page';
                hasPlatform = true;
            }
            if (hasPlatform) platformLink.style.display = 'inline-flex';
        }

        if (websiteLink && currentProject.webUrl) {
            websiteLink.href = currentProject.webUrl;
            websiteLink.style.display = 'inline-flex';
        }
    }

    // --- HELPER FUNCTIONS ---
    const showNext = () => {
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        updateCarouselPosition();
        updateLinks();
    };

    const showPrev = () => {
        currentProjectIndex = (currentProjectIndex > 0) ? currentProjectIndex - 1 : projects.length - 1;
        updateCarouselPosition();
        updateLinks();
    };

    // --- BUTTON LISTENERS ---
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    // --- SWIPE LOGIC ---
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchEndX - touchStartX;
            if (swipeDistance > swipeThreshold) showPrev();
            else if (swipeDistance < -swipeThreshold) showNext();
        }, { passive: true });
    }
    
    renderCarousel();
}
	
	
// Function to shuffle any array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
	
window.addEventListener('load', () => {
    // Keeps games in the order you wrote them
    initializeCarousel(gameProjects, '');      
    
    // Shuffles assets so they appear in a different order every refresh
    initializeCarousel(shuffleArray(assetProjects), 'asset'); 
});
	
/* --- END: UNIVERSAL CAROUSEL LOGIC --- */

/* --- START: Custom Multi-Image/Video Gallery --- */

// 1. Define your projects with their media files and types
const multiImageProjects = {
    '01': {
        title: 'Chess Club',
        media: [
            { type: 'image', src: '01.jpg' },
            { type: 'image', src: '01a.jpg' },
            { type: 'image', src: '01b.jpg' },
			{ type: 'image', src: '01c.jpg' },
            { type: 'video', src: 'https://www.youtube.com/embed/8MDtOFpxA0c?si=oFBE7I695ms-VKzG' } 
        ]
    },
    '02': {
        title: 'Secret Cave',
        media: [
            { type: 'image', src: '02.jpg' },
        ]
    },
	'03': {
        title: 'A place at Guadeloupe',
        media: [
            { type: 'image', src: '03.jpg' },
			{ type: 'image', src: '03a.jpg' },
            { type: 'image', src: '03b.jpg' },
			{ type: 'image', src: '03c.jpg' },
            { type: 'video', src: 'https://www.youtube.com/embed/y1WwJR0QAJ8?si=lHKz8OG5jADqlSVr' }
        ]
    },
	'04': {
        title: 'Winter River',
        media: [
            { type: 'image', src: '04.jpg' },
            { type: 'video', src: 'https://www.youtube.com/embed/JN-j4ae9CZQ?si=KEvZVOhpIwKJ3kfI' }
        ]
    },
	'05': {
        title: 'Abandoned Greenhouse',
        media: [
            { type: 'image', src: '05.jpg' },
            { type: 'video', src: 'https://www.youtube.com/embed/OcHgZU1qIEY?si=GeeMsrEYJy7slenG' }
        ]
    },
	'06': {
        title: 'Village Of The Great Flamboyant',
        media: [
            { type: 'image', src: '06.jpg' },
			{ type: 'image', src: '06a.jpg' },
            { type: 'image', src: '06b.jpg' },
			{ type: 'image', src: '06c.jpg' },
			{ type: 'image', src: '06d.jpg' },
            { type: 'video', src: 'https://www.youtube.com/embed/Sj5YnWxvWac?si=INO87d4eVyHMCtqs' }
        ]
    },
	'07': {
        title: 'Neo Tokyo',
        media: [
            { type: 'image', src: '07.jpg' },
			{ type: 'image', src: '07a.jpg' },
            { type: 'image', src: '07b.jpg' },
			{ type: 'image', src: '07c.jpg' },
			{ type: 'image', src: '07d.jpg' },
			{ type: 'image', src: '07e.jpg' },
            { type: 'video', src: 'https://www.youtube.com/embed/tib_5W6__zY?si=nR0wqzJAI39gb0I9' }
        ]
    },
	'08': {
        title: 'Endless Peony Flower',
        media: [
            { type: 'image', src: '08.jpg' },
            { type: 'video', src: 'https://www.youtube.com/embed/_ANqFyTytVc?si=U4M4RxE7pBNGdHZB' }
        ]
    },
	'09': {
        title: 'Nevalyashka doll',
        media: [
            { type: 'image', src: '09.jpg' },
			 { type: 'video', src: 'https://www.youtube.com/embed/tc1Kjwll_qo?si=opjDUGenkRmuk45L' }
        ]
    },
	
	
    // Add other projects using their corresponding numbers
};

// 2. Get the necessary DOM elements for the new modal
const multiImageLinks = document.querySelectorAll('.multi-image-link');
const multiImageModal = document.getElementById('multi-image-modal');
const scrollContainer = multiImageModal.querySelector('.scroll-container');
const closeCustomButton = multiImageModal.querySelector('.custom-close-button');
const customModalTitle = document.getElementById('custom-modal-title'); // ADDED THIS LINE

// 3. Add event listeners to each multi-image link
multiImageLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const projectData = multiImageProjects[this.getAttribute('data-project')];
        
        if (projectData) {
            // Set the modal title from the data
            customModalTitle.textContent = projectData.title;
            scrollContainer.innerHTML = ''; // Clear previous content
            
            projectData.media.forEach(media => {
                if (media.type === 'image') {
                    const imgElement = document.createElement('img');
                    imgElement.src = `images/fulls/${media.src}`;
                    scrollContainer.appendChild(imgElement);
                } else if (media.type === 'video') {
                    const videoWrapper = document.createElement('div');
                    videoWrapper.className = 'video-wrapper';
                    const iframeElement = document.createElement('iframe');
                    iframeElement.src = media.src;
                    iframeElement.setAttribute('frameborder', '0');
                    iframeElement.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
                    iframeElement.setAttribute('allowfullscreen', '');
                    videoWrapper.appendChild(iframeElement);
                    scrollContainer.appendChild(videoWrapper);
                }
            });
            multiImageModal.style.display = 'block';
        }
    });
});

// 4. Add functionality to close the modal
closeCustomButton.onclick = function() {
    multiImageModal.style.display = 'none';
};
window.onclick = function(event) {
    if (event.target === multiImageModal) {
        multiImageModal.style.display = 'none';
    }
};

/* --- END: Custom Multi-Image/Video Gallery --- */


})(jQuery);


/* Color Theme Switch */

const body = document.body;
const hour = new Date().getHours();

// Auto-switch by time: Light mode between 7 AM and 7 PM
if (hour >= 7 && hour < 19) {
    body.classList.add('light-theme');
}

// Function to toggle manually via button
function toggleTheme() {
    body.classList.toggle('light-theme');
}


/* Auto update legal info */
document.getElementById('current-year').textContent = new Date().getFullYear();


/*
	Origin Template Design by HTML5 UP
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/


















































