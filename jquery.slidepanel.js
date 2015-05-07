;(function ( $, window, document, undefined ) {

    //setting defaults datas
    var defaults = {
        orientation: 'left',
        mode: 'push',
        static: true,
        url: '',
        //info: ''//get user info
    };

    // The actual plugin constructor
    function Slidepanel( $element, options ) {
        this.$element = $element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this.init();
    }

    //setting plugin init
    Slidepanel.prototype.init = function () {
        var url = this.options.url;//setting host
        var base = this;
console.log(this.options);
        //create slide panel object
        if($('#slidepanel').length == 0){
            //setting panel content
            var panel_html = '';
            panel_html += '<div id="slidepanel" style="width:80%; overflow-y: scroll;">';
            //panel_html += '<div id="slidepanel" style="width:350px; overflow-y: scroll;">';
            panel_html += '<div class="">'; //sideMenuBox
            panel_html += '<ul>';
            panel_html += '<li class="taobao">';
            panel_html += '<a href="'+ url +'taobao">購物</a>';
            panel_html += '<ul>';
            panel_html += '<li><a href="'+ url +'taobao/tuango_list">合購中</a></li>';
            panel_html += '<li><a href="'+ url +'taobao/tuango_progress">團購</a></li>';
            panel_html += '<li><a href="'+ url +'taobao/free_choice_list">詢價</a></li> ';
            panel_html += '</ul>';
            panel_html += '</li>';
            panel_html += '<li class="recommend"><a href="'+ url +'taobao/usr_submit_list" title="推薦">推薦</a></li>';
            panel_html += '<li class="photo"><a href="'+ url +'gallery" title="實拍">實拍</a></li>';
            panel_html += '<li class="events"><a href="'+ url +'product" title="限時">限時</a></li>';
            panel_html += '<li class="members">';
            panel_html += '<a href="#" title="會員">會員</a>';
            panel_html += '<ul>';
            panel_html += '<li><a href="'+ url +'member/support">信箱';
            panel_html += '<em class="no">13</em></a></li>';
            panel_html += '<li><a href="'+ url +'member/basic" title="會員資料">會員資料</a></li>';
            panel_html += '   <li><a href="'+ url +'member/love/" title="我的喜歡">我的喜歡</a></li>';
            panel_html += '   <li><a href="'+ url +'member/gallery/" title="實拍">實拍</a></li>';
            panel_html += '   <li><a href="'+ url +'member/submit/" title="求團">求團</a></li>';
            panel_html += '   <li><a href="'+ url +'member/transactions/" title="跟團">跟團</a></li>';
            panel_html += '   <li><a href="'+ url +'member/event/" title="活動">活動</a></li> ';
            panel_html += ' </ul>';
            panel_html += '</li>';
            panel_html += ' <li><a href="#">登入/登出</a></li>';
            panel_html += '</ul>';
            panel_html += '</div>';
            panel_html +='</div>';

            $(panel_html).hide().appendTo($('body'));
        }

        this.$panel = $('#slidepanel');
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
        if(this.options.orientation == 'left' || this.options.orientation == 'right') {
            var options = {};
            options['top'] = 0;
            options[this.options.orientation] = -this.$panel.width();
            this.$panel.css(options);
        }

        //create scrollbar.
        this.$scrollbar = $('<div class="' + 'sp-' + 'scrollbar"/>');
        this.$thumb = $('<div class="' + 'sp-' + 'thumb"/>');

        //wrap element's ccontent and add scrollbar.
        this.$panel
        .addClass('sp-' + 'host')
        .wrapInner('<div class="' + 'sp-' + 'viewport"><div class="' + 'sp-' + 'container"/></div>')
        .append(this.$scrollbar);

        //get reference
        this.$viewport = this.$panel.find('> .' + 'sp-' + 'viewport');
        this.$container = this.$panel.find('> .' + 'sp-' + 'container');

        // setting viewport base style
        this.$viewport
        .css({
            paddingRight: this.$scrollbar.outerWidth(true),
            overflow: 'hidden'
        });
        //setting conainer base style
        this.$container
        .css({
            overflow: 'hidden'
        });
        //setting scrollbar base style
        this.$scrollbar
        .css({
            position: 'absolute',
            top: 0,
            right: 0,
            overflow: 'hidden'
        });

        //setting scrollbar thumb
        this.$thumb
        .css({
            position: 'absolute',
            left: 0,
            width: '100%'
        });

        $(this.$element).on('click', function(e) {
            e.preventDefault();
            //if the request mode is static
            if(base.options.static) {
                //show the panel
                base.expand();
            }
            else {
                //do nothing
            };
        });

        var $main_body = $(this.$body).find(":not('#slidepanel')").addClass('close');

        $( $main_body, this.$panel).click(function(e) {
            e.preventDefault();
            base.collapse();
            //removeClass 
        });
    };

    Slidepanel.prototype.expand = function() {
        var base = this;

        this.$panel.addClass('sideMenuBox');
        //this.$panel.style.opacity  = '0.0';
        //this.$panel.css({'opacity' : 0});
        //set the css properties to animatate
        var panel_options = {};
        var body_options = {};
        panel_options.visible = 'show';
        panel_options[this.options.orientation] = 0;
        body_options[this.options.orientation] = (this.options.orientation == 'left' || this.options.orientation == 'right') ? this.$panel.width() : this.$panel.width();
        //setting style
        body_options[this.options.orientation] = 0;

        if(this.options.mode == 'push'){//todo: modify animation
            this.$body.css('position', 'absolute').animate(body_options, 400);
        }

        //animate the panel into view
        this.$panel.addClass('loading').animate(panel_options, this.$panel.width(), function() {console.log('panel into view');
            $(base.$panel).fadeIn(0);
        });
        //add close class 
        //$(document).find(":not('#slidepanel')").addClass('close');
};

Slidepanel.prototype.collapse = function() {

    //set the css properties to animatate
    var panel_options = {};
    var body_options = {};
    panel_options.visible = 'hide';
    //panel_options[this.options.orientation] = -(this.$panel.width() + 250);
    body_options[this.options.orientation] = 0;
    //if the animation mode is push, move the document body back to it's original position
    if(this.options.mode == 'push'){//todo: modify animation
        this.$body.css('position', this.$body_position).animate(body_options, 400);
    }

    //animate the panel out of view
    this.$panel.animate(panel_options, 250 ).data('slidepanel-current', false);
};

//setting func caller
$.fn['slidepanel'] = function (options) {
    return this.each(function () {
        if (!$.data(this, 'plugin_slidepanel')) {
            $.data(this, 'plugin_slidepanel', new Slidepanel(this, options));
        }
    });
}

})(jQuery, window);
