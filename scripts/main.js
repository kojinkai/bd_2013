yepnope({
  test: BD.isMobile(),
  // is desktop (basically)
  yep: {
  },
  // is mobile enabled
  nope: {
    'jQ_asyncPlugins': 'assets/js/desktop.min.js'
  },
  both:  {
    'jQ_basicPlugins': 'assets/js/basic.min.js'
  },
  callback: function (url, result, key) {
    console.log('url is: ', url, "\nresult is: ", result, "\nkey is: ", key);
    // Our main JS file
    $(document).ready(function() {
      // doc ready here because grunt concat is not managing
      // dependencies so calls to non-existent functions are
      // breaking the shit. Get require.js going at some point
      // BD.init();

    });    
  }
});