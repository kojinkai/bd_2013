// Our main JS file
(function($) {
	$('.navbar .navigation').scrollover();
	$('.waypoint').backfill({
		marginTop: $('.navbar').height() + 160
	});
})(jQuery);