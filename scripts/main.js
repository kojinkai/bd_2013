// Our main JS file
(function($) {
	$('.navbar .navigation').scrollover();
	$('.waypoint').backfill({
		offset: $( '.navbar').height()
	});
})(jQuery);