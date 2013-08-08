var BD = BD || {
    init: function(callback) {

      // Call these plugins
      // On all devices

      // Backfill
      $('.waypoint').backfill({
          offset: BD.getNavbarHeight()
      });

      // The design Carousel
      $(".fade").simplefade({
        interval: 3000
      });

      if ( typeof callback === 'function' ) {
        callback();
      }
                 
    },
    enhance: function(callback) {
      // call these plugins for desktop only
      
      // The menu scroll plugin 
      $('.navigation').scrollover();

      // The scrollTo plugin
      $(document).on('click.scrollTo.data-api', '[data-scroll-target]', function (e) {
          
          e.preventDefault();

          var $this = $(this),
              target = $this.dataAttr('scroll-target');

          $.scrollTo(target, {
              
            offset: { top: -BD.getNavbarHeight(), left: 0 },
            duration: 800
          });
      });      

      if ( typeof callback === 'function' ) {
        callback();
      }

    },
    isMobile: function() {
      // test for mobile
      var ua = navigator.userAgent;

      if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(ua) ) {
        return true;
      }
      else {
        return false;
      }
    },
    getNavbarHeight: function() {
      var offset = $(window).width();
      
      if ( offset >= 979 ) {
        return $('.navbar').height();
      }

      return 0;
    },

    triggerLoad: function() {
      $(window).trigger('load', function(e) {
      });
    },

    unstage: function() {
      $('#page-wrap').removeClass('unstaged');
    }
};/* ==========================================================
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
      },
      count = 0;

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
      count++;
      if (this.interval) {
        clearInterval(this.interval);
      }
      if ( this.options.interval ) {
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
          var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
          if ( $nextIndicator ) {
            $nextIndicator.addClass('active');            
          }
        });
      }


      if ( this.transitionType ) {
        
        $(this.element).trigger(e);

        $next.addClass(type);
        $active.one( this.transitionType, function () {
          
          // when transition ends, cleanup transitioning classes
          $next.removeClass([type, direction].join(' ')).addClass('active');
          $active.removeClass(['active', direction].join(' '));
          $next.addClass('active');
          that.fading = false;
          
          $(that.element).trigger('faded');
        });
        $active.removeClass('active');
      }

      else {
       

       // Fallback to jQuery
        $(this.element).trigger(e);
        // $active.removeClass('active');
        // $next.addClass('active');
        this.fading = false;
        $(this.element).trigger('faded');
        $active.fadeOut(250, function() {
          $active.removeClass('active');
          $next.fadeIn(250);
        });

      }
        this.cycle();
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

})( jQuery, window, document );/*
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


})( jQuery, window, document );