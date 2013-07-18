// Our main JS file
(function($) {
	$('.navbar .navigation').scrollover();
	$('.waypoint').backfill({
		offset: $( '.navbar').height()
	});
  // add class to fixed navbar
  $('.navbar .navigation').scrollover();

  // stretch each panel to full screen
  $('.waypoint').backfill({
    offset: $( '.navbar').height()
  });
  var $paneTarget = $('#page-wrap');
  $('a[href="#intro"]').click(function(){
    console.log('shitknacker: ', $paneTarget);
    var target = $paneTarget.find('#design');
    $paneTarget.stop().scrollTo( target );
  });
})(jQuery);