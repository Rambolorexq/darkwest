$(document).ready(function(){
	

	const utils = new Utils();

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

    $('.inputFieldContainer input, .inputFieldWrapper-textarea textarea').focus(function() {
        $(this).closest('.inputFieldContainer').removeClass('invalidInput');
	})

	function closeModal() {
		$('body').removeClass('isModaled');
		$('.modalWrap').each(function(index) {
			$(this).removeClass('visibleModal');
		});
		history.pushState("", document.title, window.location.href.substr(0, window.location.href.indexOf('#')));
	}

	function clearInputVal(el) {
		if($(window).width() < 768)  el.val('');
	}
    
	/* REGISTRATION SEND */
	
