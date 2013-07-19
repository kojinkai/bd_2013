// Our main JS file
(function($) {
    var $navbar = $('.navbar'),
        navOffset = $navbar.height();

    $('.navigation').scrollover();
    $('.waypoint').backfill({
        offset: navOffset
    });

    $(document).on('click.scrollTo.data-api', '[data-scroll-target]', function (e) {
        var $t = $(this);
        $.scrollTo($t.dataAttr('scroll-target'), {
            offset: { top: -navOffset, left: 0 },
            duration: 800
        });
    });
})(jQuery);