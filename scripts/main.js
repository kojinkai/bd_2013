// Our main JS file
(function($) {
    
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

    $(document).on('click.scrollTo.data-api', '[data-scroll-target]', function (e) {
        
        e.preventDefault();

        var t = this,
            target = $(t).dataAttr('scroll-target');

        $.scrollTo(target, {
            
          offset: { top: -navOffset, left: 0 },
          duration: 800
        });
    });
})(jQuery);