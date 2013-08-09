yepnope({
  test: BD.isMobile(),

  // is this desktop?
  nope: {
    'jQ_asyncPlugins': 'assets/js/desktop.min.js'
  },
  callback: function (url, result, key) {
    console.log('url iZZZ: ', url, "\nresult iz: ", result, "\nkey iz: ", key);

    if (result) {
      console.log("foo");
      BD.unstage();
    }

    else {
      BD.enhance(BD.unstage());
    }

    // Our main JS file
    $(document).ready(function() {
      // doc ready here because grunt concat is not managing
      // dependencies so calls to non-existent functions are
      // breaking the shit. Get require.js going at some point
      // BD.init();

    });    
  }
});