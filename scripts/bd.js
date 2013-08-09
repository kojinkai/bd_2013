var BD = BD || {
    init: function(callback) {

      // Call these plugins
      // On all devices

      // Backfill
      $('.waypoint').backfill({
          offset: BD.getNavbarHeight()
      });

      // The design Carousel
      $(".fade").simplefade({
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
              
            offset: { top: -BD.getNavbarHeight(), left: 0 },
            duration: 800
          });
      });      

      if ( typeof callback === 'function' ) {
        callback();
      }

    },
    isMobile: function() {
      // test for mobile
      var ua = navigator.userAgent;

      if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(ua) ) {
        return true;
      }
      else {
        return false;
      }
    },
    getNavbarHeight: function() {
      var offset = $(window).width();
      
      if ( offset >= 979 ) {
        return $('.navbar').height();
      }

      return 0;
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