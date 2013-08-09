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

  }
});