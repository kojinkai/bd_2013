// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
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
    // regularly referenced in your plugin).

    // Create the defaults once
    var dropmenu = 'dropmenu',
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the 
        // contents of two or more objects, storing the 
        // result in the first object. The first object 
        // is generally empty because we don't want to alter 
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = dropmenu;
        
        this.init();
    }

    Plugin.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element 
        // and this.options
        console.log("innit, mate", this);
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[dropmenu] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + dropmenu)) {
                $.data(this, 'plugin_' + dropmenu, 
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );;;(function($){
   
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

})(jQuery);;// Our main JS file
(function($) {
	$('.navbar .nav').scrollover().dropmenu();
})(jQuery);