// Our main JS file
$(document).ready(function() {

  // doc ready here because grunt concat is not managing
  // dependencies so calls to non-existent functions are
  // breaking the shit. Get require.js going at some point

    var $navbar = $('.navbar'),
        navOffset = $navbar.height(),
        
        $waypoints = $('.waypoint'),
        $lastWaypoint = $('[data-scroll-target]').last();

    // The menu scroll plugin 
    $('.navigation').scrollover();

    // The backstretch plugin
    $('.waypoint').backfill({
        offset: navOffset
    });

    // The design Carousel
    $(".design-carousel").caroufredsel({
      circular: false,
      infinite: false,
      auto  : false,
      pagination  : "#design_pag"
    });    

    $(document).on('click.scrollTo.data-api', '[data-scroll-target]', function (e) {
        
        e.preventDefault();

        var t = this,
            target = $(t).dataAttr('scroll-target');

        $.scrollTo(target, {
            
          offset: { top: -navOffset, left: 0 },
          duration: 800
        });
    });

    $('#page-wrap').removeClass('unstaged');

});