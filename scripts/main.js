yepnope({
  test: BD.isMobile(),
  // is this desktop?
  nope: {
    'jQ_asyncPlugins': 'assets/js/desktop.min.js'
  },
  callback: function (url, result, key) {
    
    BD.enhance(BD.unstage());

  },
  complete: function() {
    BD.unstage();
  }
});