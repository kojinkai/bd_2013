var BD = BD || {
    init: function(callback) {

      // Call these plugins
      // On all devices
      BD.isMobileTest();
      
      // Backfill
      if ( $(window).width() > 600 || !BD.isMobile ) {
        $('.waypoint').backfill({
            offset: BD.isMobile ? 0 : 90
        });
      }

      // The design Carousel
      $("#design .fade").simplefade({
        interval: 3000
      });

      // The Ethos Carousel
      $("#ethos .fade").simplefade({
        interval: 3000
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