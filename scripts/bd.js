var BD = BD || {
    init: function(callback) {

      var wrap = document.getElementById('page-wrap'),
          // the last element node in the set
          wrapNodes = wrap.childNodes,
          // Get the last waypoint element
          lastEl = [].slice.call(wrapNodes, wrapNodes.length-2, wrapNodes.length-1);

      BD.windowWidth = $(window).width();
      // Call these plugins
      // On all devices
      BD.isMobileTest();
      BD.isMainPagetest();
      
      // Backfill
      if ( BD.windowWidth > 639 || !BD.isMobile ) {
        $('.waypoint').backfill({
            offset: BD.isMobile ? 0 : 90
        });
      }

      function callSimplefade(el, dur) {
        $(el).simplefade({
          interval: dur
        });
      }
      
      callSimplefade("#design .fade", 3000);
      callSimplefade("#ethos .fade", 6000);   

      // Backfill is causing a nasty looking FOUC
      // on tablet, so we are polling to see if
      // the last element has finished re-sizing before
      // triggering our unstage function.  Bit nasty, yeah.
      // Its on the list.
      (function pollHeight() {
        if ( (lastEl[0].style.height !== "" && BD.isMobile) || BD.handHeld ) {
          BD.unstage();
        }
        else {
          setTimeout(function() {
            pollHeight();
          }, 500);
        }
      })();
                 
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
        if ( BD.windowWidth < 639 ) {
          BD.handHeld = true;
        }
      }
      else {
        BD.isMobile = false;
      }
    },

    isMainPagetest: function() {
      // this is terribly hacky - is there a better way?
      BD.isMainPage = $('#about').length ? true : false;
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