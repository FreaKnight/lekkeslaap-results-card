(($) => {
	const starRating = $('.tgcsa');

	for (let i = 0; i < 5; i++) {
		starRating.append('<li></li>');
	}
	
	const details = {
		features: {
			heading: 'Features',
			items: ['Swimming Pool', 'Secure Parking']
		},
		activities: {
			heading: 'Activities',
			items: ['Bird Watching', 'Swimming']
		},
		facilities: {
			heading: 'Facilities',
			items:[
				'24 Hour Reception',
				'Swimming Pool',
				'Guest Lounge',
				'Restaurant On Premises',
				'Satellite TV',
				'Wine Cellar',
				'Airport Transfers By Arrangement',
				'Concierge',
				'Laundry Service',
				'Personal Safe',
				'Serviced Daily'
			]
		},
		languages: {
			heading: 'Languages',
			items: ['Afrikaans', 'English', 'Xhosa']
		},
		meals: {
			heading: 'Meals Offered',
			items: [
				'24 Hour Room Service',
				'Breakfast',
				'Lunch',
				'Picnic Lunch',
				'Room Service',
				'Dinner',
				'Picnic Baskets By Arrangement',
				'Teas'
			]
		},
		parking: {
			heading: 'Parking Facilities',
			items: ['Secure Parking']
		}
	};
	
	Object.keys(details).forEach(id => {
		const detail = details[id];
		let domElem = `<header>${detail.heading}<img class="chevron rotate" src="assets/chevron-arrow.svg" /></header>`;
		let items = '';
		detail.items.forEach(item => {
			items += `<span class="item"><img class="check" src="assets/correct-symbol.svg" /><div>${item}</div></span>`;
		});
		domElem += `<div class="itemsContainer collapsed">${items}</div>`;
		$(`#${id}`).append(domElem);
	});

	const accordianHead = $('.accordian header');
	if (accordianHead.length !== 0) {
		accordianHead.on('click', evt => {
			const chevron = $(evt.currentTarget).find('.chevron');
			const itemsContainer = $(evt.currentTarget).parent().find('.itemsContainer');
			if (chevron.hasClass('rotate')) { 
				chevron.removeClass('rotate').addClass('unrotate');
			}
			else {
				chevron.removeClass('unrotate').addClass('rotate');
			}
			if (itemsContainer.hasClass('collapsed')) {
				itemsContainer.removeClass('collapsed').addClass('expanded');
			}
			else {
				itemsContainer.removeClass('expanded').addClass('collapsed');
			}
		});
	}

	const carouselImg = $('#carousel img');
	const carousel = $('#carousel');
	const carouselControls = $('#carouselControls');
	let cycle = 0;
	let timeout;
	let paused = false;

	const startCycle = () => {
		timeout = window.setTimeout(() => carouselTimer(carousel, carouselImg), 5000);
	};
	const switchImage = (idx) => {
		const fadeOutImage = carousel.find('img:visible');
		if (fadeOutImage.length !== 0) {
			fadeOutImage.fadeOut('slow');
		}
		idx = idx === undefined ? cycle : idx;
		$(carouselImg[idx % carouselImg.length]).fadeIn();
		cycle++;
	};
	
	const carouselTimer = () => {
		switchImage();
		startCycle();
	};

	if (carouselImg.length > 0) {
		carouselTimer();
	}

	const dotOnClick = evt => {
		const newActiveDot = $(evt.currentTarget);
		const imgIdx = newActiveDot.attr('id');

		newActiveDot.parent().find('.active').removeClass('active');
		newActiveDot.addClass('active');
		cycle = imgIdx;

		switchImage(imgIdx);
	};

	const toggleControls = () => {
		const tut = $('#tut');
		if (paused) {
			tut.hide();
			const numImgs = carouselImg.length;
			const activeIdx = (cycle - 1) % numImgs;
			let dots = [];
			for (let idx = 0; idx < numImgs; idx++)  {
				const activeClass = idx === activeIdx ? 'class="active"' : '';
				const dot = $(`<span id="${idx}" ${activeClass}></span>`).bind('click', dotOnClick);
				dots.push(dot);
			};
			carouselControls.append(dots);
		}
		else {
			carouselControls.find('span').not('#tut').remove();
			tut.show();
		}
	}

	carousel.on('click', evt => {
		if (paused) {
			paused = false;
			toggleControls();
			startCycle(carousel, carouselImg);
		}
		else {
			paused = true;
			toggleControls();
			window.clearTimeout(timeout);
		}
	});
})(jQuery);