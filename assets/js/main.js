$(document).ready(function(){
	var scrollIsAnimated = false;
	

	
	const gallery = new Gallery();

	$(document).click(function(e) {
		$('body').removeClass('isSidedMenu');
		$('.accountPopupContainer').removeClass('accountPopupContainerIsVisible');
	})
	$('.checkAgreeContainer input').change(function(){
		console.log(123);
		$(this).closest('.checkAgreeContainer').removeClass('invalidInput')
	})

	$('input').attr('data-lpignore', 'true');

	function sideMenuScrollRefresh() {
		$('.sideMenuContainer').css({padding: '1px'});
		$('.sideMenuContainer').css({padding: '0'});
	}
	sideMenuScrollRefresh();
	positionBlur();


	function positionBlur() {
		if($(document).scrollTop() > 20) {
			$('body').addClass('header_scrolled');
		}
		else {
			$('body').removeClass('header_scrolled');
		};
	}
	
	let activeScrollData = 'aboutProjectBlock';
	function scrollLinkCheck() {
		if($(document).scrollTop() < ($('#welcomeBlock').height())) {
			$('.sideNavCircle').removeClass('sideNavCircle-active');
			$('.sideNavCircle').eq(0).addClass('sideNavCircle-active');
			activeScrollData = 'welcomeBlock';
		}
		else {
			$('.header-links .scrollLink').each(function(index) {
				if(
					$(document).scrollTop() > $('#' + $(this).attr('data-scrollto')).offset().top &&
					$(document).scrollTop() < ($('#' + $(this).attr('data-scrollto')).offset().top + $('#' + $(this).attr('data-scrollto')).height())
				) {
					if($(this).attr('data-scrollto') != '' && activeScrollData != $(this).attr('data-scrollto')) {
						activeScrollData = $(this).attr('data-scrollto');
						$('.headerNavigator').animate({
							width: $(this).find('span').width(),
							left: $(this).find('span').offset().left
						}, 200)
						$('.sideNavCircle').removeClass('sideNavCircle-active');
						$('.sideNavCircle').eq($('.header-links .scrollLink').index(this) + 1).addClass('sideNavCircle-active');
						
						$('.sideMenu-nav li').removeClass('sideMenu-nav_active');
						$('.sideMenu-nav li').eq(index).addClass('sideMenu-nav_active');
					}				
				}
			});
		}
	}
	function scrollEvent() {
		positionBlur();
		if(!scrollIsAnimated) scrollLinkCheck();
	}
	$(document).on('scroll', scrollEvent);
	$(document).on('resize', scrollEvent);



	$('.headerNavigator').css({
		'display': 'block',
		'left': $('.header-links .scrollLink').eq(0).offset().left,
		'width': $('.header-links .scrollLink').eq(0).width()
	})
	const scrollTo = (id) => {
		$('body').removeClass('isSidedMenu');
		let positionScroll = $('#' + id).offset().top;
		let headerHeight = $('.header').outerHeight();

		$("html, body").animate({ scrollTop: positionScroll - headerHeight}, {
			duration: 200,
			start: function() {
				scrollIsAnimated = true;
			},
			complete: function() {
				setTimeout(function() {
					scrollIsAnimated = false;
				}, 300)
			}
		});

		$('.headerNavigator').css({
			'left': id == 'welcomeBlock' ? $(".header-links .scrollLink").eq(0).offset().left : $(".header-links .scrollLink[data-scrollto='" + id + "']" ).offset().left,
			'width': id == 'welcomeBlock' ? $(".header-links .scrollLink").eq(0).width() : $(".header-links .scrollLink[data-scrollto='" + id + "']" ).width()
		})

		$('.sideMenu-nav li').removeClass('sideMenu-nav_active');
		if(id == 'welcomeBlock') $('.sideMenu-nav li').eq(0).addClass('sideMenu-nav_active')
		else $('.sideMenu-nav li[data-scrollto="' + id + '"]').addClass('sideMenu-nav_active');
		
	}
	$('.sideMenu').click(function(){
		event.stopPropagation();
	});
	$(".sideMenu-nav li" ).click(function( event ) {
		event.stopPropagation();
		scrollTo(this.getAttribute( 'data-scrollto' ));
		// $('.sideMenu-navigation .scrollLink').removeClass('sideMenu-navActive');
		// $('.sideMenu-navigation .scrollLink').eq($('.sideMenu-navigation .scrollLink').index(this)).addClass('sideMenu-navActive');

		
		// $('.headerNavigator').animate({
		// 	width: $('.header-links .scrollLink').eq($('.sideMenu-navigation .scrollLink').index(this)).find('span').width(),
		// 	left: $('.header-links .scrollLink').eq($('.sideMenu-navigation .scrollLink').index(this)).find('span').offset().left
		// }, 200)
	});
	$(".header-links .scrollLink" ).click(function( event ) {
		event.preventDefault();
		event.stopPropagation();
		scrollTo(this.getAttribute( 'data-scrollto' ));
		
		$('.sideNavCircle').removeClass('sideNavCircle-active');
		$('.sideNavCircle').eq($('.header-links .scrollLink').index(this) + 1).addClass('sideNavCircle-active');

		// $('.headerNavigator').animate({
		// 	width: $(this).find('span').width(),
		// 	left: $(this).find('span').offset().left
		// }, 200)

		// $('.sideMenu-navigationInner .scrollLink').removeClass('sideMenu-navActive');
		// $('.sideMenu-navigationInner .scrollLink').eq($('.header-links .scrollLink').index(this)).addClass('sideMenu-navActive');
	});
	$(".sideNavCircle" ).click(function( event ) {
		event.preventDefault();
		event.stopPropagation();
		scrollTo(this.getAttribute( 'data-scrollto' ));
		
		$('.sideNavCircle').removeClass('sideNavCircle-active');
		$(this).addClass('sideNavCircle-active');

		// $('.headerNavigator').animate({
		// 	width: $(this).find('span').width(),
		// 	left: $(this).find('span').offset().left
		// }, 200)

		// $('.sideMenu-navigationInner .scrollLink').removeClass('sideMenu-navActive');
		// $('.sideMenu-navigationInner .scrollLink').eq($('.header-links .scrollLink').index(this)).addClass('sideMenu-navActive');
	});
	$('.logo').click(function() {
		scrollTo(this.getAttribute( 'data-scrollto' ));
		// $('.sideMenu-navigation .scrollLink').removeClass('sideMenu-navActive');
		// $('.sideMenu-navigation .scrollLink').eq(0).addClass('sideMenu-navActive');
		$('.sideNavCircle').removeClass('sideNavCircle-active');
		$('.sideNavCircle').eq(0).addClass('sideNavCircle-active');

		// $('.headerNavigator').animate({
		// 	width: $('.header-links .scrollLink').eq(0).find('span').width(),
		// 	left: $('.header-links .scrollLink').eq(0).find('span').offset().left
		// }, 200)
	});


	if(window.location.hash && window.location.hash.replace('#', '') != 'modalImage') {
		const modalName = window.location.hash.replace('#', '')

		$('body').addClass('isModaled');
		$('.modalWrap').each(function(index) {
			$(this).removeClass('visibleModal');
		});
		$('.' + modalName).addClass('visibleModal');
	}
	const urlParams = new URLSearchParams(window.location.search);
	console.log(urlParams.get('recoveryCode'))
	const recoveryCode = urlParams.get('recoveryCode');
	if(recoveryCode) {
		$('body').addClass('isModaled');
		$('.modalWrap').each(function(index) {
			$(this).removeClass('visibleModal');
		});
		console.log(123)
		$('.modalRestorePasswordNew').addClass('visibleModal');
	}

	let prevModal = '';
	let currGallery = ''
	let currGalleryImageCount = 0;
	let activeFilterInGallery = ''
	/* MODAL WINDOW */
	$(".modalOpens").click(function( event ) {
		var clickedTag = this;
		event.preventDefault();

		if($(clickedTag).attr('data-modal_name') == 'modalImage') {	
			if($(clickedTag).hasClass('squareImage')) $('.modalImage_imageContainer').addClass('squareImage')
			else $('.modalImage_imageContainer').removeClass('squareImage')

			activeFilterInGallery = $('.galleryFilter-active').attr('data-galleryfilter');

			$('.modalImage_imageContainer').css('background-image', $(clickedTag).css('background-image'));
			if($(clickedTag).attr('data-is_video') == '1') {$('.modalImage_imageContainer').append('<iframe width="100%" height="100%" src="' + $(clickedTag).attr('data-video_src') + '?loop=0"></iframe>')}
			currGallery = $(clickedTag).parent().attr('data-images_container');
			if(currGallery == 'gallery') {
				if(activeFilterInGallery == '') {
					currGalleryImageCount = $('div[data-images_container="' + currGallery + '"] div').index(clickedTag);
				}
				else {
					currGalleryImageCount = $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + activeFilterInGallery + '"]').index(clickedTag);
				}
			}
			else if(currGallery != '' && currGallery != 'gallery') {
				currGalleryImageCount = $('div[data-images_container="' + currGallery + '"] div').index(clickedTag);
				console.log(currGalleryImageCount);
			}
		}

		$('body').addClass('isModaled');
		$('.modalWrap').each(function(index) {
			$(this).removeClass('visibleModal');
		});
		$('.' + $(clickedTag).data('modal_name')).addClass('visibleModal');
		prevModal = $(clickedTag).attr('data-prev_modal') || '';
		window.location.hash = $(clickedTag).data('modal_name');
		
		$('body').removeClass('isSidedMenu');
	});
	$(".crossIcon").click(function( event ) {
		event.preventDefault();
		closeModal();
	});
	function closeModal() {
		$('.modalWrap').each(function(index) {
			$(this).removeClass('visibleModal');
		});
		if(prevModal == '') {
			$('body').removeClass('isModaled');
			history.pushState("", document.title, window.location.href.substr(0, window.location.href.indexOf('#')));
		}
		else {
			$('.' + prevModal).addClass('visibleModal');
			window.location.hash = prevModal;
		}
		$('.modalImage_imageContainer').empty();
		prevModal = '';
	}

	$('.modalImageLeft').click(function(){
		currGalleryImageCount--;
		$('.modalImage_imageContainer').empty();
		
		if(currGalleryImageCount < 0) {
			if(currGallery == 'gallery') {
				if(activeFilterInGallery == '') {
					currGalleryImageCount = $('div[data-images_container="' + currGallery + '"] div').length - 1;
				}
				else {
					currGalleryImageCount = $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + activeFilterInGallery + '"]').length - 1;
				}
			}
			else if(currGallery != '' && currGallery != 'gallery') {
				currGalleryImageCount = $('div[data-images_container="' + currGallery + '"] div').length - 1;
			}
		}
		if(currGallery == 'gallery') {
			if(activeFilterInGallery == '') {
				$('.modalImage_imageContainer').css('background-image', $('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).css('background-image'));
				if($('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).attr('data-is_video') == '1') {
					$('.modalImage_imageContainer').append('<iframe width="100%" height="100%" src="' + $('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).attr('data-video_src') + '?loop=0"></iframe>')
				}
			}
			else {
				$('.modalImage_imageContainer').css('background-image', $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + activeFilterInGallery + '"]').eq(currGalleryImageCount).css('background-image'));
				if($('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + activeFilterInGallery + '"]').eq(currGalleryImageCount).attr('data-is_video') == '1') {
					$('.modalImage_imageContainer').append('<iframe width="100%" height="100%" src="' + $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + activeFilterInGallery + '"]').eq(currGalleryImageCount).attr('data-video_src') + '?loop=0"></iframe>')
				}
			}
		}
		else if(currGallery != '' && currGallery != 'gallery') {
			$('.modalImage_imageContainer').css('background-image', $('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).css('background-image'));
		}
	})
	$('.modalImageRight').click(function(){
		currGalleryImageCount++;
		$('.modalImage_imageContainer').empty();


		if(currGallery == 'gallery') {
			if(activeFilterInGallery == '') {
				if(currGalleryImageCount == $('div[data-images_container="' + currGallery + '"] div').length) currGalleryImageCount = 0;
			}
			else {
				if(currGalleryImageCount == $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + activeFilterInGallery + '"]').length) currGalleryImageCount = 0;
			}
		}
		else if(currGallery != '' && currGallery != 'gallery') {
			if(currGalleryImageCount > $('div[data-images_container="' + currGallery + '"] div').length - 1) {
				currGalleryImageCount = 0;
			}
		}
		if(currGallery == 'gallery') {
			if(activeFilterInGallery == '') {
				$('.modalImage_imageContainer').css('background-image', $('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).css('background-image'));
				if($('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).attr('data-is_video') == '1') {
					$('.modalImage_imageContainer').append('<iframe width="100%" height="100%" src="' + $('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).attr('data-video_src') + '?loop=0"></iframe>')
				}
			}
			else {
				$('.modalImage_imageContainer').css('background-image', $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + activeFilterInGallery + '"]').eq(currGalleryImageCount).css('background-image'));
				if($('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + activeFilterInGallery + '"]').eq(currGalleryImageCount).attr('data-is_video') == '1') {
					$('.modalImage_imageContainer').append('<iframe width="100%" height="100%" src="' + $('div[data-images_container="' + currGallery + '"] div[data-imagetype="' + activeFilterInGallery + '"]').eq(currGalleryImageCount).attr('data-video_src') + '?loop=0"></iframe>')
				}
			}
		}
		else if(currGallery != '' && currGallery != 'gallery') {
			$('.modalImage_imageContainer').css('background-image', $('div[data-images_container="' + currGallery + '"] div').eq(currGalleryImageCount).css('background-image'));
		}
	})


	$('.avatarContainer, .accountPopupContainer').click(function(e){
		e.stopPropagation();
		$('.accountPopupContainer').addClass('accountPopupContainerIsVisible');
	})

	/* MODAL INSTRUCTION NAVIGATION */
	let modalInstructionsStep = 0;
	let isDisabledMovingInstructions = false;
	function moveModalInstructions(newStep) {
		if(newStep >= 0 && newStep < 5 && !isDisabledMovingInstructions) {
			modalInstructionsStep = newStep;
			isDisabledMovingInstructions = true;

			$('.modalInstructions-circlesNavigation').removeClass('modalInstructions-circlesNavigation_active');
			$('.modalInstructions-circlesNavigation').eq(newStep).addClass('modalInstructions-circlesNavigation_active');

			$('.modalHeader-title span').text("Шаг " + (newStep + 1));

			$('.modalInstructions-arrowLeft').removeClass('modalInstructions-arrowDisabled');
			if(newStep == 0) $('.modalInstructions-arrowLeft').addClass('modalInstructions-arrowDisabled');

			if(newStep >= 4) {
				$('.modalFooter .modalInstructions-arrowRight span').text('ЗАВЕРШИТЬ');
				$('.modalFooter .modalInstructions-arrowRight img').css({display: 'none'});
				if($(window).width() <= 1280) {
					$('.modalFooter .modalInstructions-arrowRight span').css({display: 'block'});
					$('.modalInstructions-circlesNavigations').css({display: 'none'});
				}
			}
			else {
				$('.modalFooter .modalInstructions-arrowRight span').text('СЛЕДУЮЩИЙ ШАГ');
				$('.modalFooter .modalInstructions-arrowRight img').css({display: 'inline-block'});
				if($(window).width() <= 1280) {
					$('.modalFooter .modalInstructions-arrowRight span').css({display: 'none'});
					$('.modalInstructions-circlesNavigations').css({display: 'flex'});
				}
			}

			$('.modalInstructionsInner-gallery').animate({left: (-100 * newStep) + '%'}, {
				duration: 200,
				easing: 'linear',
				complete: function() {
					isDisabledMovingInstructions = false;
				}
			});
		}
	}
	$('.modalInstructions-circlesNavigation').click(function() {
		moveModalInstructions(parseInt($(this).text()) - 1);
	})
	$('.modalInstructions-arrowLeft').click(function() {
		moveModalInstructions(modalInstructionsStep - 1);
	})
	$('.modalInstructions-arrowRight').click(function() {
		if(modalInstructionsStep > 3) {
			closeModal();
		}
		else {
			moveModalInstructions(modalInstructionsStep + 1);
		}
	})

	/* PAYMENT DESCRIPTION ACTIVATOR */
	$('.modalPaymentInfoActivator').click(function(){
		if(!$('.modalPayment').hasClass('paymentIsDesced')) $('.modalPayment').addClass('paymentIsDesced');
	})
	$('.paymentDescBlock-return').click(function(){
		if($('.modalPayment').hasClass('paymentIsDesced')) $('.modalPayment').removeClass('paymentIsDesced');
	})

	/* CUSTOM SELECT */
	const runCustomSelect = function() {
		$('.customSelect').each(function(){
			var $this = $(this), numberOfOptions = $(this).children('option').length;
		
			$this.addClass('select-hidden'); 
			$this.wrap('<div class="select"></div>');
			$this.after('<div class="select-styled"></div>');
	
			var $styledSelect = $this.next('div.select-styled');
			$styledSelect.text($this.children('option').eq(0).text());
		
			var $list = $('<ul />', {
				'class': 'select-options'
			}).insertAfter($styledSelect);
		
			for (var i = 0; i < numberOfOptions; i++) {
				$('<li />', {
					text: $this.children('option').eq(i).text(),
					rel: $this.children('option').eq(i).val(),
					'data-galleryfilter': $this.children('option').eq(i).attr('data-galleryfilter')
				}).appendTo($list);
			}
		
			var $listItems = $list.children('li');
		
			$styledSelect.click(function(e) {
				e.stopPropagation();
				$('div.select-styled.active').not(this).each(function(){
					$(this).removeClass('active').next('ul.select-options').hide();
				});
				$(this).toggleClass('active').next('ul.select-options').toggle();

				$(this).closest('.customSelectContainer').removeClass('invalidInput')
			});
		
			$listItems.click(function(e) {
				e.stopPropagation();
				$styledSelect.text($(this).text()).removeClass('active');
				$this.val($(this).attr('rel'));
				if($this.hasClass('isGalleryFilter')) gallery.generateGallery($(this).attr('data-galleryfilter'));
				$list.hide();
			});
		
			$(document).click(function() {
				$styledSelect.removeClass('active');
				$list.hide();
			});
			$('.select-options').overlayScrollbars({}); 
		});
	}
	// runCustomSelect();


	/* SIDE MENU */
	$('.mobileActivator').click(function(e) {
		e.stopPropagation();
		$('body').addClass('isSidedMenu');
	})
	$('.mobileDisactivator').click(function(e) {
		e.stopPropagation();
		$('body').removeClass('isSidedMenu');
	})



	function shake(thing) {
		const interval = 5;
		const distance = 2;
		const times = 3;
	  
		for (var i = 0; i < (times + 1); i++) {
		  $(thing).animate({
			left:
			  (i % 2 == 0 ? distance : distance * -1)
		  }, interval);
		}
		$(thing).animate({
		  left: 0,
		  top: 0
		}, interval);
	}

	/* INPUT TITLE */
	$('.inputFieldWrapper input, .inputFieldWrapper textarea').focusin(function() {
		const that = this;
		if(!$(that).val()) {
			$(that).parent().addClass('inputFieldWrapper_active')
		}
	});
	$('.inputFieldWrapper input, .inputFieldWrapper textarea').focusout(function() {
		const that = this;
		if(!$(that).val()) {
			$(that).parent().removeClass('inputFieldWrapper_active')
		}
	});
	
	let imagesArr = [];
	/* UPLOAD IMAGES */
	function readURL(input) {
		console.log($('.uploaderImages')[0].files);

		fdSupport = new FormData();
        var files = $('.uploaderImages')[0].files;
		fdSupport.append('file',files);
		
        if (input.files && input.files[0]) {
			let imagesArr = [];
			let imagesTags = '';
			for (let i = 0; i < input.files.length; i++) {
				const reader = new FileReader();
				
				reader.onload = (e) => {
					imagesTags += '<div class="uploadImageContainer" style="background-image: url(' + e.target.result + ')" data-base_img="' + e.target.result + '"></div>';
					if(i == input.files.length - 1) {
						$('.uploadImages').append(imagesTags);
						$('.uploadImageContainer').click(function() {
							$(this).remove();
						})
					}
				}
				
				reader.readAsDataURL(input.files[i]);
			}
        }
	}

	$(".uploaderImages").change(function() {
	  readURL(this);
	});

	/* GET SERVER DATA */
	function getServers() {
		
			
			if($('.serverInput').text() == '') {
				let serversListData = '';
				serversListData += '<option value="">Bir sunucu seçin</option>';
				for (let i = 0; i < data.data.length; i++) {
					serversListData += '<option value="' + data.data[i].id + '">' + data.data[i].name + '</option>';
				}
				$('.serverInput').append(serversListData);
		
				runCustomSelect();
			
		};
	}
	getServers();
	setTimeout(() => { getServers();}, 30000);
});