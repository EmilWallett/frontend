(function($) {

  var isBuilder = $('html').hasClass('is-builder');

  $.extend($.easing, {
    easeInOutCubic: function(x, t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
  });

  $.fn.outerFind = function(selector) {
    return this.find(selector).addBack(selector);
  };

  (function($, sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function(func, threshold, execAsap) {
      var timeout;

      return function debounced() {
        var obj = this,
          args = arguments;

        function delayed() {
          if (!execAsap) func.apply(obj, args);
          timeout = null;
        }

        if (timeout) clearTimeout(timeout);
        else if (execAsap) func.apply(obj, args);

        timeout = setTimeout(delayed, threshold || 100);
      };
    };
    // smartresize
    jQuery.fn[sr] = function(fn) {
      return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };

  })(jQuery, 'smartresize');

  $.isMobile = function(type) {
    var reg = [];
    var any = {
      blackberry: 'BlackBerry',
      android: 'Android',
      windows: 'IEMobile',
      opera: 'Opera Mini',
      ios: 'iPhone|iPad|iPod'
    };
    type = 'undefined' == $.type(type) ? '*' : type.toLowerCase();
    if ('*' == type) reg = $.map(any, function(v) {
      return v;
    });
    else if (type in any) reg.push(any[type]);
    return !!(reg.length && navigator.userAgent.match(new RegExp(reg.join('|'), 'i')));
  };

  var isSupportViewportUnits = (function() {
    // modernizr implementation
    var $elem = $('<div style="height: 50vh; position: absolute; top: -1000px; left: -1000px;">').appendTo('body');
    var elem = $elem[0];
    var height = parseInt(window.innerHeight / 2, 10);
    var compStyle = parseInt((window.getComputedStyle ? getComputedStyle(elem, null) : elem.currentStyle)['height'], 10);
    $elem.remove();
    return compStyle == height;
  }());

  $(function() {

    $('html').addClass($.isMobile() ? 'mobile' : 'desktop');

    if ($.isMobile() && navigator.userAgent.match(/Chrome/i)) { // simple fix for Chrome's scrolling
      (function(width, height) {
        var deviceSize = [width, width];
        deviceSize[height > width ? 0 : 1] = height;
        $(window).smartresize(function() {
          var windowHeight = $(window).height();
          if ($.inArray(windowHeight, deviceSize) < 0)
            windowHeight = deviceSize[$(window).width() > windowHeight ? 1 : 0];
          $('.mbr-section--full-height').css('height', windowHeight + 'px');
        });
      })($(window).width(), $(window).height());
    } else if (!isSupportViewportUnits) { // fallback for .mbr-section--full-height
      $(window).smartresize(function() {
        $('.mbr-section--full-height').css('height', $(window).height() + 'px');
      });
      $(document).on('add.cards', function(event) {
        if ($('html').hasClass('mbr-site-loaded') && $(event.target).outerFind('.mbr-section--full-height').length)
          $(window).resize();
      });
    }

    // .mbr-section--16by9 (16 by 9 blocks autoheight)
    function calculate16by9() {
      $(this).css('height', $(this).parent().width() * 9 / 16);
    }
    $(window).smartresize(function() {
      $('.mbr-section--16by9').each(calculate16by9);
    });
    $(document).on('add.cards changeParameter.cards', function(event) {
      var enabled = $(event.target).outerFind('.mbr-section--16by9');
      if (enabled.length) {
        enabled
          .attr('data-16by9', 'true')
          .each(calculate16by9);
      } else {
        $(event.target).outerFind('[data-16by9]')
          .css('height', '')
          .removeAttr('data-16by9');
      }
    });

    // .mbr-parallax-background

    if ($.fn.jarallax && !$.isMobile()) {
      $(window).on('update.parallax', function(event) {
        setTimeout(function() {
          var $jarallax = $('.mbr-parallax-background');

          $jarallax.jarallax('coverImage');
          $jarallax.jarallax('clipContainer');
          $jarallax.jarallax('onScroll');
        }, 0);
      });

      if (isBuilder) {
        $(document).on('add.cards', function(event) {
          initParallax(event.target);
          $(window).trigger('update.parallax');
        });

        $(document).on('changeParameter.cards', function(event, paramName, value, key) {
          if (paramName === 'bg') {
            destroyParallax(event.target);

            switch (key) {
              case 'type':
                if (value.parallax === true) {
                  initParallax(event.target);
                }
                break;
              case 'value':
                if (value.type === 'image' && value.parallax === true) {
                  initParallax(event.target);
                }
                break;
              case 'parallax':
                if (value.parallax === true) {
                  initParallax(event.target);
                }
            }
          }

          $(window).trigger('update.parallax');
        });
      } else {
        initParallax(document.body);
      }

      // for Tabs
      $(window).on('shown.bs.tab', function(e) {
        $(window).trigger('update.parallax');
      });
    }

    // init
    if (!isBuilder) {
      $('body > *:not(style, script)').trigger('add.cards');
    }
    $('html').addClass('mbr-site-loaded');
    $(window).resize().scroll();

    // init the same height columns
    $('.cols-same-height .mbr-figure').each(function() {
      var $imageCont = $(this);
      var $img = $imageCont.children('img');
      var $cont = $imageCont.parent();
      var imgW = $img[0].width;
      var imgH = $img[0].height;

      function setNewSize() {
        $img.css({
          width: '',
          maxWidth: '',
          marginLeft: ''
        });

        if (imgH && imgW) {
          var aspectRatio = imgH / imgW;

          $imageCont.addClass({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          });

          // change image size
          var contAspectRatio = $cont.height() / $cont.width();
          if (contAspectRatio > aspectRatio) {
            var percent = 100 * (contAspectRatio - aspectRatio) / aspectRatio;
            $img.css({
              width: percent + 100 + '%',
              maxWidth: percent + 100 + '%',
              marginLeft: (-percent / 2) + '%'
            });
          }
        }
      }

      $img.one('load', function() {
        imgW = $img[0].width;
        imgH = $img[0].height;
        setNewSize();
      });

      $(window).on('resize', setNewSize);
      setNewSize();
    });
  });


  if (!isBuilder) {
    $(document).on('add.cards', function(event) {
      if ($(event.target).hasClass('mbr-reveal')) {
        $(event.target).footerReveal();
      }
    });

    $(document).ready(function() {
      // disable animation on scroll on mobiles
      if ($.isMobile()) {
        return;
        // enable animation on scroll
      } else if ($('input[name=animation]').length) {
        $('input[name=animation]').remove();

        var $animatedElements = $('p, h1, h2, h3, h4, h5, a, button, small, img, li, blockquote, .mbr-author-name, em, label, input, textarea, .input-group, .iconbox, .btn-social, .mbr-figure, .mbr-map, .mbr-testimonial .card-block, .mbr-price-value, .mbr-price-figure, .dataTable, .dataTables_info').not(function() {
          return $(this).parents().is('.navbar, .mbr-arrow, footer, .iconbox, .mbr-slider, .mbr-gallery, .mbr-testimonial .card-block, #cookiesdirective, .mbr-wowslider, .accordion, .tab-content, .engine, #scrollToTop');
        }).addClass('hidden animated');

        function getElementOffset(element) {
          var top = 0;
          do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
          } while (element);

          return top;
        }

        function checkIfInView() {
          var window_height = window.innerHeight;
          var window_top_position = document.documentElement.scrollTop || document.body.scrollTop;
          var window_bottom_position = window_top_position + window_height - 50;

          $.each($animatedElements, function() {
            var $element = $(this);
            var element = $element[0];
            var element_height = element.offsetHeight;
            var element_top_position = getElementOffset(element);
            var element_bottom_position = (element_top_position + element_height);

            // check to see if this current element is within viewport
            if ((element_bottom_position >= window_top_position) &&
              (element_top_position <= window_bottom_position) &&
              ($element.hasClass('hidden'))) {
              $element.removeClass('hidden').addClass('fadeInUp')
                .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                  $element.removeClass('animated fadeInUp');
                });
            }
          });
        }

        var $window = $(window);
        $window.on('scroll resize', checkIfInView);
        $window.trigger('scroll');
      }
    });
  }

  function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return true;
    }

    return false;
  }

  // fixes for IE
  if (!isBuilder && isIE()) {
    $(document).on('add.cards', function(event) {
      var $eventTarget = $(event.target);

      if ($eventTarget.hasClass('mbr-fullscreen')) {
        $(window).on('load resize', function() {
          $eventTarget.css('height', 'auto');

          if ($eventTarget.outerHeight() <= $(window).height()) {
            $eventTarget.css('height', '1px');
          }
        });
      }

      if ($eventTarget.hasClass('mbr-slider') || $eventTarget.hasClass('mbr-gallery')) {
        $eventTarget.find('.carousel-indicators').addClass('ie-fix').find('li').css({
          display: 'inline-block',
          width: '30px'
        });

        if ($eventTarget.hasClass('mbr-slider')) {
          $eventTarget.find('.full-screen .slider-fullscreen-image').css('height', '1px');
        }
      }
    });
  }

})(jQuery);