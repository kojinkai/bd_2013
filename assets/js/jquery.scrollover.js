;(function($){
   
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

})(jQuery);