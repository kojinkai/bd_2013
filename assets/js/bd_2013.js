/*
 * backfill.js
 * 
 *
 * Copyright (c) 2013 Lewis Nixon
 * Licensed under the MIT license.
 */

// see http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
// that are not closed properly.
;(function ( $, window, document, undefined ) {

  // Create the defaults once
  var backfill = 'backfill',
      defaults = {
        offset: false
      };

  // The actual Backfill constructor
  function Backfill( element, options ) {

    this.element = element;

    // jQuery has an extend method that merges the 
    // contents of two or more objects, storing the 
    // result in the first object. The first object 
    // is generally empty because we don't want to alter 
    // the default options for future instances of the Backmenu
    this.options = $.extend( {}, defaults, options) ;
    
    this._defaults = defaults;
    this._name = backfill;
    
    this.init();
  }

  Backfill.prototype = {

    init: function() {
      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element 
      // and this.options

      // get and set the window width minus any offsets
      var options = this.options,
          userOffset = this.options.offset,
          
          // Our number matching Regex
          r = /\d+/,

          // Grab padding top and padding bottom CSS value, pull out the numbers and parse as numbers
          paddingTop = parseInt( $(this.element).css("paddingTop").match(r)[0], 10),
          paddingBottom = parseInt( $(this.element).css("paddingBottom").match(r)[0], 10),

          // Now cast as numbers, we can total up the padding of each div..
          totalPadding = this.sum( paddingTop, paddingBottom );

          // And the total offset
          userOffset += totalPadding;


      var that = this;

      $(window).on( "load resize", function () {
        var window_height = $(window).height() - userOffset;
        that.resize(that.element, window_height);
      });
    },

    resize: function (element, height) {
      $(element).height(height);
    },

    sum: function() {
      var i = 0,
        args = arguments,
        total = 0;

      for ( i; i < args.length; i++ ) {
        if ( isNumber(args[i]) ) {
          total += args[i];
        }
      }
      return total;

      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
    },

    hasOptions: function() {
      var key,
        o = this.options;

      for ( key in o ) {
        if ( o[key] ) {
          return true;
        }
      }
      return false;
    }
  };

  $.fn[backfill] = function ( options ) {
    return this.each(function () {
      new Backfill( this, options );
    });
  };

})( jQuery, window, document );// see http://coding.smashingmagazine.com/2011/10/11/essential-jquery-Dropmenu-patterns/
// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other Dropmenus 
// that are not closed properly.
;(function ( $, window, document, undefined ) {
  
  // undefined is used here as the undefined global 
  // variable in ECMAScript 3 and is mutable (i.e. it can 
  // be changed by someone else). undefined isn't really 
  // being passed in so we can ensure that its value is 
  // truly undefined. In ES5, undefined can no longer be 
  // modified.
  
  // window and document are passed through as local 
  // variables rather than as globals, because this (slightly) 
  // quickens the resolution process and can be more 
  // efficiently minified (especially when both are 
  // regularly referenced in your Dropmenu).

  // Create the defaults once
  var dropmenu = 'dropmenu',
      defaults = {
        propertyName: "value"
      };

  // The actual Dropmenu constructor
  function Dropmenu( element, options ) {

    this.element = element;

    // jQuery has an extend method that merges the 
    // contents of two or more objects, storing the 
    // result in the first object. The first object 
    // is generally empty because we don't want to alter 
    // the default options for future instances of the Dropmenu
    this.options = $.extend( {}, defaults, options) ;
    
    this._defaults = defaults;
    this._name = dropmenu;
    
    this.init();
    this.toggle();
  }

  Dropmenu.prototype = {
    
    init: function () {
      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element 
      // and this.options

      // Grab our child menu, at the moment its hardcoded
      // attach it's height to the main object

      this.child = $(this.element).find('.navigation');
      this.child.height = this.getHeight(this.child);
    },
    
    getHeight: function (el) {
      if (el) {
        return $(el).height();
      }
    },

    toggle: function () {
      this[$(this.element).hasClass( this.options.toggle ) ? 'show' : 'hide']();      
    },

    hide: function () {
      $(this.element).addClass( this.options.toggle ).height(0);      
    },

    show: function () {
      $(this.element).removeClass( this.options.toggle ).height( this.child.height );    
    }
  };

  $.fn[dropmenu] = function ( options ) {
    return this.each(function () {
      new Dropmenu( this, options );
    });
  };


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.dropmenu.data-api', '[data-toggle=collapsed]', function (e) {
  
    var $this = $(this), 
    href,

    // regex strip for ie7
    target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''),
    option = $this.data();
    // $(target).toggleClass(option.toggle);
    $(target).dropmenu(option);
  });


})( jQuery, window, document );;(function($){
   
    $.fn.scrollover = function( options ) {

      var defaults = {
        
        // Our Settings.
        classname:        "scrolled",
        onScrollStart:    function() {}

      };

      var settings = $.extend( defaults, options );


      // Begin plugin code
      
      // Cache $(this)
      var $this = $(this);

      // Instance variables
      var nav_height = $this.height(),
          offset = $this.scrollTop();


      function scrolled_switch() {
        if ( offset > 0 ) {
          $this.addClass( defaults.classname );
        }

        else {
          $this.removeClass( defaults.classname );
        }
      }

      $(window).on("scroll", function() {
        defaults.onScrollStart();
        
        // Update our scrollTop value
        offset = $(this).scrollTop();

        // switch our state, if needed
        scrolled_switch();

      });

      
      // Just return this object for now.
      // We're not gonna be applying this to
      // a jQuery set so no need to return this.each()
      return this;
   };

})(jQuery);/* ==========================================================
 * Borrowed heavily from:
 * bootstrap-carousel.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 *
 * ========================================================== */


;(function ( $, window, document, undefined ) {

  // Create the defaults once
  var simplefade = 'simplefade',
      defaults = {
        interval: 5000,
        startsWith: 0
      };

  function testTransition() {
    var t,
        el = document.createElement('fakeelement');
    
    var transitions = {
      'transition':'transitionend',
      'OTransition':'otransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };

    for ( t in transitions ) {
          if ( el.style[t] !== undefined ) {
            return transitions[t];
        }
      }
      return false;
    }

  function SimpleFade(element, options) {
    this.element = element;

    // Merge defaults and uder options
    this.options = $.extend( {}, defaults, options);
    
    this.$indicators = $(this.element).siblings('.fade-controls');

    this._defaults = defaults;
    this._name = simplefade;
    
    this.init();
  }

  SimpleFade.prototype = {
    
    init: function() {
      // $(this.element).css('position', 'relative').children().css({'position': 'absolute', 'left': 0, 'right': 0});
      $(this.element).children().eq(this.options.startsWith).addClass('active');
      this.cycle();
    },

    transitionType: testTransition(),

    getActiveIndex: function () {
      this.$active = $(this.element).find('.active');
      this.$items = this.$active.parent().children();
      return this.$items.index(this.$active);

    },

    cycle: function() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      if ( this.options.interval && !this.paused ) {
        this.interval = setInterval($.proxy(this.next, this), this.options.interval);
      }
      return this;
    },
    
    next: function () {
      if (this.fading) {
        return;
      }
      return this.fade('next');
    },
    
    prev: function () {
      if (this.sliding) {
        return;
      }
      return this.fade('prev');
    },

    fade: function (type, next) {
      var $active = $(this.element).children('.active'),
          $next = next || $active[type](),
          // isCycling = this.interval,
          direction = type === 'next' ? 'left' : 'right',
          that = this,
          e;

      // switch to fading state
      this.fading = true;
      
      // if we are at the last slide (e.g. no .next()) then fallback to beginning
      $next = $next.length ? $next : $(this.element).children().first();

      e = $.Event('fade', {
        relatedTarget: $next[0],
        direction: direction
      });

      if ( this.$indicators.length ) {
        this.$indicators.find('.active').removeClass('active');
        $(this.element).one('faded', function () {
          console.log("faded shits");
          var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
          if ( $nextIndicator ) {
            $nextIndicator.addClass('active');            
          }
        });
      }


      if ( this.transitionType ) {
        console.log("transition type is: ", this.transitionType, 'direction: ', direction, 'type: ', type);
        
        $(this.element).trigger(e);

        $next.addClass(type);
        $active.addClass(direction);
        $next.addClass(direction);

        $active.one( this.transitionType, function () {
          console.log("the active element is ", $active);
          // when transition ends, cleanup transitioning classes
          $next.removeClass([type, direction].join(' ')).addClass('active');
          $active.removeClass(['active', direction].join(' '));
          that.sliding = false;
          
          $(that.element).trigger('faded');

        });
      }

      else {
       
        $(this.element).trigger(e);
        $active.removeClass('active');
        $next.addClass('active');
        this.fading = false;
        $(this.element).trigger('faded');
      }

    }
  };

  $.fn[simplefade] = function ( options ) {
    return this.each(function () {
      new SimpleFade( this, options );
    });
  };  

 /* simpleFade DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
  
    var $this = $(this), 
    href,

    // regex strip for ie7
    target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''),
    option = $this.data();
    $(target).simplefade(option);
  }); 

})( jQuery, window, document );// Our main JS file
$(document).ready(function() {

  // doc ready here because grunt concat is not managing
  // dependencies so calls to non-existent functions are
  // breaking the shit. Get require.js going at some point

    var $navbar = $('.navbar'),
        $navbarHeight = $navbar.height(),
        
        navOffset = function() {
          var offset = $(window).width();
          if ( offset >= 979 ) {
            return $navbarHeight; 
          }
          return 0;
        },
        
        $waypoints = $('.waypoint'),
        $lastWaypoint = $('[data-scroll-target]').last();

    // The menu scroll plugin 
    $('.navigation').scrollover();

    // The backstretch plugin
    $('.waypoint').backfill({
        offset: $navbarHeight
    });

    // The design Carousel
    $(".fade").simplefade({
      interval: 3000
    });    

    $(document).on('click.scrollTo.data-api', '[data-scroll-target]', function (e) {
        
        e.preventDefault();

        var t = this,
            target = $(t).dataAttr('scroll-target');

        $.scrollTo(target, {
            
          offset: { top: -navOffset(), left: 0 },
          duration: 800
        });
    });

    $('#page-wrap').removeClass('unstaged');

});/*! http://git.io/jcda v1.0.0 by @mathias */
;jQuery.fn.dataAttr=function(a,b){return b?this.attr("data-"+a,b):this.attr("data-"+a)};/*!
 * jQuery.ScrollTo
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * @author Ariel Flesler
 * @version 1.4.6
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 *		- A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *		- The string 'max' for go-to-end. 
 * @param {Number, Function} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number, Function} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @desc Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @desc Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */

;(function( $ ){
	
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
		limit:true
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window)._scrollable();
	};

	// Hack, hack, hack :)
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn._scrollable = function(){
		return this.map(function(){
			var elem = this,
				isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if( !isWin )
					return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
			
			return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ?
				doc.body : 
				doc.documentElement;
		});
	};

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		if( target == 'max' )
			target = 9e9;
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );

		return this._scrollable().each(function(){
			// Null target yields nothing, just like jQuery does
			if (target == null) return;

			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');

			switch( typeof targ ){
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ) ){
						targ = both( targ );
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ,this);
					if (!targ.length) return;
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			}
			$.each( settings.axis.split(''), function( i, axis ){
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					max = $scrollTo.max(elem, axis);

				if( toff ){// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin ){
						attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
					}
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
				}else{ 
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) == '%' ? 
						parseFloat(val) / 100 * max
						: val;
				}

				// Number or 'number'
				if( settings.limit && /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

				// Queueing axes
				if( !i && settings.queue ){
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});

			animate( settings.onAfter );			

			function animate( callback ){
				$elem.animate( attr, duration, settings.easing, callback && function(){
					callback.call(this, targ, settings);
				});
			};

		}).end();
	};
	
	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function( elem, axis ){
		var Dim = axis == 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;
		
		if( !$(elem).is('html,body') )
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		
		var size = 'client' + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;

		return Math.max( html[scroll], body[scroll] ) 
			 - Math.min( html[size]  , body[size]   );
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};

})( jQuery );