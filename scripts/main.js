yepnope({
  test: BD.isMobile,
  // is this desktop?
  nope: {
    'jQ_asyncPlugins': '/assets/js/desktop.min.js'
  },
  callback: function (url, result, key) {
    
    // If its desktop, and we're on the main page
    // load our scrolly powered menu
    $.ajax({
      url: BD.isMainPage ? "/ajax/main-menu.html" : "/ajax/page-menu.html",
      cache: false
    }).done(function( html ) {
      $('body').css('paddingTop', '90px').addClass('enhanced');
      $("#page-wrap").prepend(html);
      BD.enhance(BD.unstage);
    });    
    

  },
  complete: function() {
    $(document).ready(function() {
      // BD.unstage();
    });
  }
});