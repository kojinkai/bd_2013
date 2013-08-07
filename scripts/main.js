yepnope({
  test: !Modernizr.touch,
  // is desktop (basically)
  yep: {
    'jQ_asyncPlugins': 'assets/js/no-touch.min.js'
  },
  // is touch enabled
  nope: {

  },
  both:  {
    'jQ_basicPlugins': 'assets/js/basic.min.js'
  },
  complete: function () {

    // Our main JS file
    $(document).ready(function() {
      alert('the plan is complete');
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
        $(window).trigger('load', function(e) {
          console.log(e);
        });

        // The design Carousel
        $(".fade").simplefade({
          interval: 3000
        });    
        console.log('plugins bum');
        $(document).on('click.scrollTo.data-api', '[data-scroll-target]', function (e) {
            
            e.preventDefault();

            var t = this,
                target = $(t).dataAttr('scroll-target');

            $.scrollTo(target, {
                
              offset: { top: -navOffset(), left: 0 },
              duration: 800
            });
        }) ;

        $('#page-wrap').removeClass('unstaged');

    });    
  },
  callback: {
    'rstyles': function (url, result, key) {
      alert('This is the regular styles!');
    },
    'mstyles': function (url, result, key) {
      alert('This is the modified styles!');
    },
    'geopoly': function (url, result, key) {
      alert('This is the geolocation polyfill!');
    }
  }  
});