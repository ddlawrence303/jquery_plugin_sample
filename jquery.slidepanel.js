;(function ( $, window, document, undefined ) {
    
    var defaults = {
        orientation: 'left',
        mode: 'push',
        //static: true
        static: false
    };

    // The actual plugin constructor
    function Slidepanel( $element, options ) {
        this.$element = $element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;//console.log(this);
        this.init();

		//console.log($('#slidepanel'));
    }

    Slidepanel.prototype.init = function () { console.log('init');
        
        var base = this;
        if($('#slidepanel').length == 0){
            /*var panel_html = '<div id="slidepanel" class="cb_slide_panel">' +
			'<div class="wrapper"> <a href="#" class="close">Close</a>' + 
            '<div class="inner">' +
			'<div class="wrapper">' +
			'<p>123123131231313123</p>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>'; */

//setting panel content		
			var panel_html = '';
			panel_html += '<div id="slidepanel" >';
			panel_html +='<div class="wrapper"> <a href="#" class="close" style="background-color:#666">Close</a>';
            panel_html +='<div class="inner">';
			panel_html +='<div class="wrapper">';
			// main panel content add here
			
		/*	panel_html += '<div class="sideMenuBox">';

    panel_html += '<ul>';
      panel_html += '<li class="taobao">';
        panel_html += '<a href="#">淘寶購</a>';
        panel_html += '<ul>';
          panel_html += '<li><a href="#">淘寶合購中</a></li>';
          panel_html += '<li><a href="#">團購進度</a></li>';
          panel_html += '<li><a href="#">詢價列表</a></li> ';         
        panel_html += '</ul>';
      panel_html += '</li>';
      
      panel_html += '<li class="recommend"><a href="#">網友推薦</a></li>';
      panel_html += '<li class="photo"><a href="#">穿搭實拍</a></li>';
      panel_html += '<li class="events"><a href="#">限時好康</a></li>';

      panel_html += '<li class="members">';
        panel_html += '<a href="#">會員專區</a>';
        panel_html += '<ul>';
          panel_html += '<li><a href="#">我的信箱<em class="no">13</em></a></li>';
          panel_html += '<li><a href="#">會員資料</a></li>';
       panel_html += '   <li><a href="#">我的喜歡</a></li>';
       panel_html += '   <li><a href="#">我的實拍</a></li>';
       panel_html += '   <li><a href="#">求團紀錄</a></li>';
       panel_html += '   <li><a href="#">跟團紀錄</a></li>';
       panel_html += '   <li><a href="#">我的勸敗點<em class="no">4512</em></a></li>';
       panel_html += '   <li><a href="#">活動專區</a></li> ';     
       panel_html += ' </ul>';
      panel_html += '</li>';

     panel_html += ' <li><a href="#">登入/登出</a></li>';
    panel_html += '</ul>';
  panel_html += '</div>';*/
			panel_html +='<p>123123131231313123</p>';
			
			
			panel_html +='</div>';
			panel_html +='</div>';
			panel_html +='</div>';
			panel_html +='</div>';
			
			
            $(panel_html).hide().appendTo($('body'));    
        }

        this.$panel = $('#slidepanel');console.log(this.$panel.width());
        this.$body = $('body');
        this.$body_position = this.$body.css('position');

        //hide the panel and set orientation class for display
        this.$panel.hide().addClass('panel_' + this.options.orientation);
        
        //set current trigger link to false for the current panel
        this.$panel.data('slidepanel-current', false);
        this.$panel.data('slidepanel-loaded', false);
        

        //reset any defined a positions
        this.$panel.css('left', '').css('right', '').css('top', '').css('bottom', '');

        //set a default top value for left and right orientations
        //and set the starting position based on element width
        if(this.options.orientation == 'left' || this.options.orientation == 'right') {
            var options = {};
            options['top'] = 0;
            options[this.options.orientation] = -this.$panel.width();
            this.$panel.css(options);
        }

        //set a default left value for top and bottom orientations
        //and set the starting position based on element height
        /*if(this.options.orientation == 'top' || this.options.orientation == 'bottom') {
            var options = {};
            options['left'] = 0;
            options[this.options.orientation] = -this.$panel.height();
            this.$panel.css(options);
        }*/

        //bind click event to trigger ajax load of html content
        //and panel display to any elements that have the attribute rel="panel"
		
        $(this.$element).on('click', function(e) {
            e.preventDefault();console.log(base.options);
             //console.log(this.$element);
            //if the request mode is static
            if(base.options.static) { 
                //show the panel
                base.expand();
                console.log('open slide');
            }
            // if the reques mode is ajax 
            else {
                //load the external html
                base.load();
                console.log('close slide');
            };
        });

        //listen for a click on the close buttons for this panel
        $('.close', this.$panel).click(function(e) {
            e.preventDefault();
            base.collapse();
        });
        
    };

    Slidepanel.prototype.load = function() {
            var base = this;
            //if the current trigger element is the element that just triggered a load
            if(this.$panel.data('slidepanel-current') == this.$element) {
                //collapse the current panel
                this.collapse();
                return;
            } else {
                //show the slide panel
                this.expand();
                //get the target url
                var href = $(this.$element).attr('href');

                //prevent an ajax request if the current URL is the the target URL
                if(this.$panel.data('slidepanel-loaded') !== href){
                    //load the content from the target url, and update the panel html
                    $('.inner .wrapper', this.$panel).html('').load(href, function() {
                        //remove the loading indicator
                        base.$panel.removeClass('loading');
                        //set the current loaded URL to the target URL
                        base.$panel.data('slidepanel-loaded', href);
                    });
                //  the current URL is already loaded
                } else {
                    //remove the loading indicator
                    this.$panel.removeClass('loading');
                }
            }
            //set the current source element to this element that triggered the load
            this.$panel.data('slidepanel-current', this.$element);
    };


    Slidepanel.prototype.expand = function() {console.log('expand');
        var base = this;
                //set the css properties to animatate

        var panel_options = {};
        var body_options = {};
        panel_options.visible = 'show';
        panel_options[this.options.orientation] = 0;
        //body_options[this.options.orientation] = (this.options.orientation == 'top' || this.options.orientation == 'bottom') ? this.$panel.height() : this.$panel.width();
        //body_options[this.options.orientation] = (this.options.orientation == 'left' || this.options.orientation == 'right') ? this.$panel.height() : this.$panel.width();
        body_options[this.options.orientation] = (this.options.orientation == 'left' || this.options.orientation == 'right') ? this.$panel.width() : this.$panel.width();

        //if the animation mode is set to push, we move the body in relation to the panel
        //else the panel is overlayed on top of the body
        if(this.options.mode == 'push'){
            //animate the body position in relation to the panel dimensions
            //this.$body.css('position', 'absolute').animate(body_options, 250);
            this.$body.css('position', 'absolute').animate(body_options, this.$panel.width()); console.log(this.$body);
        }

        //animate the panel into view
        //this.$panel.addClass('loading').animate(panel_options, 250, function() {
        this.$panel.addClass('loading').animate(panel_options, this.$panel.width(), function() {
            //show the panel's close button
            //$('.close', base.$panel).fadeIn(250);
            $('.close', base.$panel).fadeIn(250);
            
        });
    };

    Slidepanel.prototype.collapse = function() {console.log('collapse');
        //hide the close button for this panel
        //$('.close', this.$panel).hide();

        //set the css properties to animatate
        var panel_options = {};
        var body_options = {};
        panel_options.visible = 'hide';
        //panel_options[this.options.orientation] = -(this.$panel.width() + 40);
        //panel_options[this.options.orientation] = -(this.$panel.width() + 80);
        panel_options[this.options.orientation] = -(this.$panel.width() + 250);
        body_options[this.options.orientation] = 0;console.log('456456');console.log(panel_options, body_options);
        
        //if the animation mode is push, move the document body back to it's original position
        if(this.options.mode == 'push'){
            //this.$body.css('position', this.$body_position).animate(body_options, 250);
            this.$body.css('position', this.$body_position).animate(body_options, 150);
        }
        //animate the panel out of view
        //this.$panel.animate(panel_options, 250).data('slidepanel-current', false);
        //this.$panel.animate(panel_options, 30).data('slidepanel-current', false);
		    this.$panel.animate(panel_options, 150).data('slidepanel-current', false);
    };

    //$.fn['slidepanel'] = function ( options ) {
    $.fn.slidepanel = function ( options ) { console.log(options);
        return this.each(function () {
            if (!$.data(this, 'plugin_slidepanel')) {
                $.data(this, 'plugin_slidepanel', new Slidepanel( this, options ));
            }
        });
    }

})(jQuery, window);
