var BD = BD || {
    init: function(callback) {

      // Call these plugins
      // On all devices
      BD.isMobileTest();
      
      console.log("the window width is: ", $(window).width() > 768);
      // Backfill
      if ( $(window).width() > 600 || !BD.isMobile ) {
        $('.waypoint').backfill({
            offset: BD.isMobile ? 0 : 90
        });
      }

      // The design Carousel
      $(".fade").simplefade({
        interval: 5000
      });

      if ( typeof callback === 'function' ) {
        callback();
      }
                 
    },
    enhance: function(callback) {
      // call these plugins for desktop only
      
      // The menu scroll plugin 
      $('.navigation').scrollover();

      // The scrollTo plugin
      $(document).on('click.scrollTo.data-api', '[data-scroll-target]', function (e) {
          
          e.preventDefault();

          var $this = $(this),
              target = $this.dataAttr('scroll-target');

          $.scrollTo(target, {
              
            offset: { top: BD.isMobile ? 0 : -90, left: 0 },
            duration: 800
          });
      });      

      if ( typeof callback === 'function' ) {
        callback();
      }

    },
    isMobileTest: function() {
      // test for mobile
      var ua = navigator.userAgent;

      if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(ua) ) {
        BD.isMobile = true;
      }
      else {
        BD.isMobile = false;
      }
    },

    triggerLoad: function() {
      $(window).trigger('load', function(e) {
      });
    },

    unstage: function() {
      $('#page-wrap').removeClass('unstaged');
    }
};

BD.init();