$(() => {
	// Календарь
	$('.date_input').datepicker({
		autoClose: true
	})


	// Текст со спойлером
	$('.text_block + .spoler_btn').click(function (e) {
		e.preventDefault()

		$(this).hasClass('active')
			? $(this).toggleClass('active').prev().removeClass('show')
			: $(this).toggleClass('active').prev().addClass('show')
	})


	// Награды
	masonryInit()

	$('.awards .item .spoler_btn').click(function (e) {
		e.preventDefault()

		$(this).hasClass('active')
			? $(this).toggleClass('active').prev().removeClass('show')
			: $(this).toggleClass('active').prev().addClass('show')

		masonryInit()
	})


	// Боковая колонка - Категории
	$('aside .categories .category .name.sub_link').click(function (e) {
		e.preventDefault()

		!$(this).hasClass('active')
			? $(this).addClass('active').next().slideDown(300)
			: $(this).removeClass('active').next().slideUp(200)
	})


	// Боковая колонка - Ссылки
	$('aside > .links a.sub_link').click(function (e) {
		e.preventDefault()

		!$(this).hasClass('active')
			? $(this).addClass('active').next().slideDown(300)
			: $(this).removeClass('active').next().slideUp(200)
	})

	$('aside > .links .more_btn').click(function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			$(this).addClass('active')
			$('aside > .links .hide').slideDown(300)
		} else {
			$(this).removeClass('active')
			$('aside > .links .hide').slideUp(200)
		}
	})


	// Боковая колонка - ссылки
	$('aside .mob_links_btn').click(function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			$(this).addClass('active')
			$('aside > .links').slideDown(300)
		} else {
			$(this).removeClass('active')
			$('aside > .links').slideUp(200)
		}
	})


	// Боковая колонка - фильтр
	$('aside .mob_filter_btn').click(function (e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			$(this).addClass('active')
			$('.filter').slideDown(300)
		} else {
			$(this).removeClass('active')
			$('.filter').slideUp(200)
		}
	})

	const priceRange = $('.filter #price_range').ionRangeSlider({
		type: 'double',
		min: 0,
		max: 150000,
		from: 2500,
		to: 150000,
		step: 100,
		onChange: data => {
			$('.filter .price_range input.from').val(data.from.toLocaleString())
			$('.filter .price_range input.to').val(data.to.toLocaleString())
		}
	}).data("ionRangeSlider")

	$('.filter .price_range .input').keyup(() => {
		priceRange.update({
			from: parseFloat($('.filter .price_range input.from').val().replace(/\s+/g, '')),
			to: parseFloat($('.filter .price_range input.to').val().replace(/\s+/g, ''))
		})
	})

	$('.filter .reset_btn').click(function () {
		$('.filter input').removeAttr('checked')

		$priceRange.reset()
	})


	// Страница товара
	if ($('.product_info .images').length) {
		const productSlider = new Swiper('.product_info .big .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			on: {
				slideChange: swiper => {
					console.log(swiper)
					setTimeout(() => {
						$('.product_info .images .thumbs button').removeClass('active')
						$('.product_info .images .thumbs button').eq(swiper.activeIndex).addClass('active')
					})
				}
			}
		})

		$('.product_info .images .thumbs button').click(function (e) {
			e.preventDefault()

			productSlider.slideTo($(this).data('slide-index'), 500)
		})
	}


	// Товары
	if ($('.content .products .swiper-container').length) {
		new Swiper('.content .products .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.carousel-swiper-button-next',
				prevEl: '.carousel-swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 24,
					slidesPerView: 1
				},
				480: {
					spaceBetween: 24,
					slidesPerView: 2
				},
				768: {
					spaceBetween: 0,
					slidesPerView: 3
				}
			},
			on: {
				init: swiper => {
					setTimeout(() => {
						productHeight($(swiper.$el), swiper.slides.length)
					})
				},
				resize: swiper => {
					setTimeout(() => {
						productHeight($(swiper.$el), swiper.slides.length)
					})
				}
			}
		})
	}


	// Слайдер на главной
	if ($('.main_slider .swiper-container').length) {
		new Swiper('.main_slider .swiper-container', {
			loop: true,
			speed: 750,
			spaceBetween: 0,
			slidesPerView: 1,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// Поиск
	$('.search form .input').keydown(function () {
		let _self = $(this)

		setTimeout(() => {
			_self.val().length > 1
				? _self.addClass('active')
				: _self.removeClass('active')
		})
	})

	$('.search form  .reset_btn').click(function () {
		$('.search form .input').removeClass('active')
	})


	// Регистрация во всплывашке
	$('#register_modal form').submit(function (e) {
		e.preventDefault()

		$('#register_modal form').hide()
		$('#register_modal .success_text').fadeIn(300)
	})


	// Оформление заказа
	$('.checkout_info .form .delivery_method label').click(function () {
		let methodIndex = $(this).data('index')

		$('.checkout_info .form .delivery_price b').hide()
		$('.checkout_info .form .delivery_price b.method' + methodIndex).fadeIn(300)

		$('.checkout_info .form .delivery_method .method_info').hide()
		$('.checkout_info .form .delivery_method .method' + methodIndex + '_info').fadeIn(300)
	})


	// Корзина
	$('.cart_info .data .share .btn').click(function (e) {
		$('.cart_info .data .share .url').fadeIn(300)
	})


	// Шапка - Личный кабинет
	$('.account a.user').click(function (e) {
		if ($(this).hasClass('first_click')) {
			e.preventDefault()

			$(this).removeClass('first_click')
			$('.account .dropdown').fadeIn(300)

			if (is_touch_device()) $('body').css('cursor', 'pointer')
		}
	})

	$(document).click((e) => {
		if ($(e.target).closest('.account').length === 0) {
			$('.account a.user').addClass('first_click')
			$('.account .dropdown').fadeOut(200)

			if (is_touch_device()) $('body').css('cursor', 'default')
		}
	})


	// Подвал
	$('footer .links .title').click(function (e) {
		if ($(window).width() < 1024) {
			if ($(this).hasClass('active')) {
				$(this).removeClass('active').next().slideUp(200)
			} else {
				$('footer .links .title').removeClass('active')
				$('footer .links .list').slideUp(200)

				$(this).addClass('active').next().slideDown(300)
			}
		}
	})
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.press_center .row').each(function () {
		pressCenterHeight($(this), parseInt($(this).css('--press_center_count')))
	})

	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})


	// Фикс. шапка
	headerInit = true,
		headerHeight = $('header').outerHeight()

	$('header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')


	// Фикс. моб. шапка
	mobHeaderInit = true,
		mobHeaderHeight = $('.mob_header').outerHeight()

	$('.mob_header').wrap('<div class="mob_header_wrap"></div>')
	$('.mob_header_wrap').height(mobHeaderHeight)

	mobHeaderInit && $(window).scrollTop() > 0
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



$(window).resize(() => {
	// Фикс. шапка
	headerInit = false
	$('.header_wrap').height('auto')

	setTimeout(() => {
		headerInit = true
		headerHeight = $('header').outerHeight()

		$('.header_wrap').height(headerHeight)

		headerInit && $(window).scrollTop() > headerHeight
			? $('header').addClass('fixed')
			: $('header').removeClass('fixed')
	}, 100)


	// Фикс. моб. шапка
	mobHeaderInit = false
	$('.mob_header_wrap').height('auto')

	setTimeout(() => {
		mobHeaderInit = true
		mobHeaderHeight = $('.mob_header').outerHeight()

		$('.mob_header_wrap').height(mobHeaderHeight)

		mobHeaderInit && $(window).scrollTop() > 0
			? $('.mob_header').addClass('fixed')
			: $('.mob_header').removeClass('fixed')
	}, 100)


	// Выравнивание элементов в сетке
	$('.press_center .row').each(function () {
		pressCenterHeight($(this), parseInt($(this).css('--press_center_count')))
	})

	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})


	// Награды
	masonryInit()
})



$(window).scroll(() => {
	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')


	// Фикс. моб. шапка
	typeof mobHeaderInit !== 'undefined' && mobHeaderInit && $(window).scrollTop() > 0
		? $('.mob_header').addClass('fixed')
		: $('.mob_header').removeClass('fixed')
})



// Выравнивание статей
function pressCenterHeight(context, step) {
	let start = 0,
		finish = step,
		$items = context.find('.article')

	$items.find('.name, .desc').height('auto')

	console.log($items)
	$items.each(function () {
		setHeight($items.slice(start, finish).find('.name'))
		setHeight($items.slice(start, finish).find('.desc'))

		start = start + step
		finish = finish + step
	})
}


// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product')

	$products.find('.name, .desc').height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish).find('.name'))
		setHeight($products.slice(start, finish).find('.desc'))

		start = start + step
		finish = finish + step
	})
}


const masonryInit = () => {
	$('.awards .row').each(function () {
		let masonryEl = $(this),
			masonryGutter = parseInt(masonryEl.css('--masonry_gutter'))

		masonry = masonryEl.masonry({
			percentPosition: true,
			gutter: masonryGutter,
			itemSelector: '.item',
			columnWidth: masonryEl.find('.item').width()
		})
	})
}