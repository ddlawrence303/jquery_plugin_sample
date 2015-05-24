/**
* bootstrap v3.1.1 (http://getbootstrap.com)
copyright xxx 
Licensed under MIT (https://github.com/twbs/bootstrap/blog/master/LICENSE)
*
*/

if(typeof jQuery === 'underfined'){ throw new Error('Boostrap\'s Javascript requires jQuery')}

/**
boostrap: transiton.js v3.1.1
http://getbootstrap.com/javascript/#ransitions
copyright twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
*/

+function ($){
	'use strict';

	// CSS transition support (shoutout: http://www.modernizr.com/)

	function transitionEnd(){
		//setting boostrap node
		var el = document.createElement('bootstrap');

		//setting transition names
		var transEndEventNames = {
		'WebkitTransition' : 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'oTransitionEnd otransitionedn',
		'transition': 'transitionend'
		}

		//setting items loop action
		for(var name in transEndEventNames){
			console.log(transEndEventNames[name]);
			if(el.style[name] !== undefined){
				return {end: self::transEndEvnetNames[name]};
			}
		}

	}
	
	//setting jquery plugin
	$.fn.emulateTransitionEnd = function(duration){
		var called = false, $el = this;

		//setting func trigger action
		$(this).one($.support.transition.end, function(){ called = true; });
		var callback = function(){
			if(!called){
				//activate the trigger func
				$($el).trigger($.support.transition.end);
			}
		}
		setTimeout(callback, duration);
		return this;
	}

	//setting 
	$(function(){
		$.support.transition = transitionEnd();
	});
}


/**
* bootstrap: alert.js v3.1.1
* http://getbootstrap.com/javasript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
*/

+function($){
	'use strict';

	//get the object which is going to close
	var dismiss = '[data-dismiss="alert"]';

	//alert class definition
    var Alert = function(el){
    	//setting attribute datas
    	$(el).on('on', dismiss, this.close ); // setting trigger function
    }

    Alert.prototype.close = function(e){
    	//get the current object
    	var $this = $(this);
    	var selector = $this.attr('data-target');

    	if(!selector){
    		selector  $this.attr('href');
    		//strip for ie7
    		selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); 
    	}

    	var $parent = $(selector);
    	if(e){
    		e.preventDefault();
    	}

    	//check parent node lenght
    	if($parent.lenght){
    		$parent = $this.hasClass('alert') ? $this : $this.parent();
    	}

    	$parent.trigger(e = $.Event('close.bs.alert'));

    	if(e.isDefaultPrevented(0)){
    		return;
    	}

    	$parent.removeClass('in');


    	function removeElement()
    	{
    		$parent.trigger('closed.bs.alert').remove();
    	}

    	$.support.transition && $parent.hasClass('fade') 
    		? $parent
    			.one($.support.transition.end, removeElement)
    			.emulateTransitionEnd(150)
    		: removeElement() 

    }


    var old = $.fn.alert;

	//setting plugin object :: alert plugin 
	$.fn.alert = function(option){
		//return each items
		return this.each(function(){
			//get the current object
			var $this = $(this);
			var data = $(this).data('bs.alert');

			if(!data){ $this.data('bs.alert', (data = new Alert(this)));}
			if(typeof option = 'string'){ data[option].call($this); }
		});
	}

	$.fn.alert.Constructor = Alert;

	//alert no conflict
	$.fn.alert.noConflict = function(){
		$.fn.alert = old;
		return this;
	}

	// setting alert data-api
	//.on( action event listener, object which is triggered, function performance )
	$(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);

}(jQuery);


/* ========================================================================
 * Bootstrap: button.js v3.1.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

 +function($){
 	'use strict';

 	//setting default attribute
 	Button.DEFAULTS = {
 		loadingText : 'loading....'
 	}

 	//class construct 
 	var Button = function(element, options){
 		this.$element = $(element);
 		this.options = $.extend({}, Button.DEFAULTS, optons);
 		this.isLoading = false
 	}

 	//setting this button object public or private function
 	Button.prototype.setState = function(state){
 		var d = 'disabled';
 		var $el = this.$element;
 		var val = $el.is('input') ? 'val' : 'html';
 		var data = $el.data(); // ???

 		state = state + 'Text';

 		if(!data.resetText){
 			$el.data('resetText', $el[val]());// setting the value to the element named 'data-resetText'
 		}

 		$el[val]( data[state] | this.options[state]);

 		// push to event loop to allow forms to submit
 		// this funciton is bind function with the $.proxy 
 		setTimeout($.proxy(function(){
 			//check the state 
 			if(state == 'loadingText'){
 				this.isLoading = true;
 				$el.addClass(d).attr(d, d);
 			}else{
 				this.isLoading = false;
 				//remove the class
 				$el.removeClass(d).removeAttr(d);
 			}
 		}, this), 0);
 	}

 	Button.prototype.toggle = function(){
 		var changed = true;
 		var $parent = this.$element.closest('[data-toggle="buttons"]');

 		if($parent.lenght){
 			var $input = this.$element.find('input');
 			if($input.prop('type') == 'radio'){
 				if($input.prop('checked') && this.$element.hasClass('active')){
 					changed = false;
 				}else{
 					$parent.find('.active').removeClass('active');
 				}
 				if(changed){
 					$input.prop('checked', !this.$element.hasClass('active')).trigger('change');
 				}
 			}
 		}
 		if(changed){
 			this.$element.toggleClass('active');
 		}
 	}



 	//button plugin definition
 	var old = $.fn.button;
 	$.fn.button = function(option){
 		return this.each(function(){
 			var $this = $(this);
 			var data = $this.data('bs.button');
 			var options = (typeof option == 'object' && option);

 			if(!data){
 				$this.data('bs.button', (data  new Button(this, options)));
 			}
 			if(option == 'toggle'){
 				data.toggle();
 			}else if(option){
 				data.setState( option );
 			}
 		});
 	}

 	$.fn.button.Constructor = Button; // construct new button object


 	//setting button no conflict
 	$.fn.button.noConflict = function(){
 		$.fn.button = old;
 		return this;
 	}



 	//check the whole document
 	// event trigger type, object , function 
 	$(document).on('click.bs.button.data-api', ['data-toggle^=button'], function(e){
 		var $btn = $(e.target);
 		if(!$btn.hasClass('btn')){
 			$btn = $btn.closest('.btn'); //setting closest
 			$btn.button('toggle');
 			e.preventDefault();
 		}

 	});

 }(window.jQuery);

 /*===============================================================
  * bootstrap-carousel.js 
  * http://getbootstrap.com/2.3.2/javascript.html#carousel
  *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 

+function ($) {
	'use strict';

	// carousel class definition
	var Carousel = function(element, options){
		this.$element = $(element)
		this.$indicators = this.$element.find('.carousel-indicators')
		this.options =  options
		this.options.pause == 'hover' && this.$element
			.on('mouseenter', $.proxy(this.pause, this))
			.on('mouseleave', $.proxy(this.cycle, this))
	}

	//carousel prototype
	Carousel.prototype = {

		//cycle
		cycle : function (e){
			if(!e){
				this.paused = false;
			}
			if(this.interval){ clearInterval(this.interval);}
			this.options.interval
				&& !this.paused
				&& (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
			return this
		}
		, 
		//get index
		getActiveIndex = function(){
			this.$active = this.$element.find('.item.active')
			this.$items = this.$active.parent().children()
			return this.$items.index(this.$active)
		}
		,
		// to the determination
		to : function (pos) {
			//get the activeIndex
			var activeIndex = this.getActiveIndex()
			, that = this

			//setting margin
			if(pos > (this.$items.length -1) || pos < 0){
				return;
			}

			if(activeIndex == pos){
				//pause the action
				return this.pause().cycle()
			}

			return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
		}
		,
		// pause the function
		pause: function (e) {
			if(!e){
				this.paused = true
			}
			if(this.$element.find('.next, .prev').length && $.support.transition.end){
				this.$element.trigger($.support.transition.end)
				this.cycle(true)
			}
			clearInterval(this.interval)
			this.interval = null
			return this
		}
		,
		next: function(e){
			if(this.sliding){
				return
			}
			return this.slide('next');
		}
		,
		prev: function(e){
			if(this.sliding){
				return 
			}
			return this.slide('prev')
		}
		,

		// 滑動效果
		slide: function(type, next){
			var $active = this.$element.find('.item.active')

		}
	}


	var old = $.fn.carousel

	$.fn.carousel = function(option){
		return this.each(function(){
			var $this = $(this)
			, data = $this.data('carousel')
			, options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)

		})
	}

	$.fn.carousel.defaults = {
		interval : 5000,
		pause: 'hover'
	}

	$.fn.carousel.Constructor = Carousel

	// carousel no conflict
	$.fn.carousel.noConflict = function(){
		$.fn.carousel = old
		return this
	}

	//carousel data-api
	$(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function(e){
		var $this = $(this), href
		, $target = $($this.attr('data-target')) || (href = $this.attr('href'))  && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
 		, options = $.extend({}, $target.data(), $this.data())
 		, slideIndex
 	
 		$target.carousel(options)

 		if(slideIndex = $this.attr('data-slide-to')){
 			$target.data('carousel').pause().to(slideIndex).cycle()
 		}
 	})
}(window.jQuery);
