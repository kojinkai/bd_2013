yepnope({
  test: BD.isMobile,
  // is this desktop?
  nope: {
    'jQ_asyncPlugins': 'assets/js/desktop.min.js'
  },
  callback: function (url, result, key) {
    
    // If its desktop
    // load our scrolly powered menu
    $.ajax({
      url: "/ajax/menu.html",
      cache: false
    }).done(function( html ) {
      $('body').css('paddingTop', 0);
      $("#page-wrap").prepend(html);
    });    
    
    BD.enhance(BD.unstage());

  },
  complete: function() {
    $(document).ready(function() {
      BD.unstage();
    });
  }
});