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

})( jQuery, window, document );