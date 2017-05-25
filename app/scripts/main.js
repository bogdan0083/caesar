$(document).ready(function () {

  // variables ---------------------
  var $w = $(window);
  var windowWidth = $w.width();

  // promo section
  var $promo = $('.promo');
  var $promoHeading = $('.promo-heading');
  var $promoCell = $('.promo-cell');
  var $promoItem = $('.promo-item');
  var $promoBackgrounds = $('.js-promo-background');
  var $frontpageNav = $('.frontpage-nav');
  var $mouseIcon = $('.mouse');
  var hoverReadyClass = 'js-hover-ready';
  var $anchors = $('[data-anchor]');
  var $circleItems = $('.circle-item');
  var $tabs = $('.js-tab-pane');

  // media breakpoints
  var screenXs = 460;
  var screenSm = 880;
  var screenMd = 1170;
  var screenLg = 1375;

  // AOS.js
  AOS.init({
    offset: 200
  });

  // mobile navigation trigger (burger menu)
  $('.nav-trigger-wrapper').on('click', function(e) {
    e.preventDefault();
    $(this).find('span').toggleClass('js-active');
    $('.mobile-menu').toggleClass('active');
    $('.out').toggleClass('js-active');
    $('.out').addClass('js-overlay');
  });

  // remove overlay when mobile menu is active
  $('body').on('click', '.js-overlay', function (e) {
    e.stopPropagation();
    e.stopImmediatePropagation();

    if ($(e.target).hasClass('js-overlay')) {
      $('.js-overlay').removeClass('js-overlay');
      $('.mobile-menu').removeClass('active');
      $('.out').removeClass('js-active');
    }

  });

  function onPromoItemIn(e) {
    var idx = $promoItem.index( $(this) );
    $(this).addClass('js-hovered');
    $promoHeading.addClass('hidden');
    $promoItem.addClass('hidden');
    $(this).removeClass('hidden');
    $promoBackgrounds.eq(idx).addClass('visible');
    $frontpageNav.addClass('hidden');
    $mouseIcon.addClass('hidden');
   }

  function onPromoItemOut(e) {
    var idx = $promoItem.index( $(this) );
    console.log('hovered out');
    $(this).removeClass('js-hovered');
    $promoHeading.removeClass('hidden');
    $promoItem.removeClass('hidden');
    $promoBackgrounds.eq(idx).removeClass('visible');
    $frontpageNav.removeClass('hidden');
    $mouseIcon.removeClass('hidden');
  }

  // Fires when clicking the tab pane
  function onTabPaneClick(e) {
    e.preventDefault();
    var $target = $(this);
    var idx = $target.index();
    var $parent = $target.parent();
    var $tabs = $parent.find('.js-tab-pane');
    var $slider = $( $parent.data('slider') );
    $tabs.removeClass('js-active');
    $target.addClass('js-active');
    $slider.slick('slickGoTo', idx);
  }
  // animate frontpage block on hover
  if ($promo.length > 0 && windowWidth > screenSm) {
    // allow hovering on promo items only after 1 second
    setTimeout(function () {
      $promoItem.addClass(hoverReadyClass);
      $promoItem.hover(onPromoItemIn, onPromoItemOut);
    }, 1700)
  }

  $anchors.click(function (e) {
    e.preventDefault();
    var $anchor = $(this);
    var id = $anchor.attr('href');
    $('body, html').animate({
      'scrollTop': $(id).offset().top
    });
  });

  // Tabs event handler
  $tabs.click(onTabPaneClick);

  // SLIDERS -------------------------

  // about object slider
  var $aboutObjectSlider = $('.about-object-slider');

  $aboutObjectSlider.on('init', function (slick) {
    AOS.refresh();
    Waypoint.refreshAll();
  });

  $aboutObjectSlider.slick({
    autoplay: false,
    swipe: false,
    infinite: false,
    arrows: false,
    dots: false,
    adaptiveHeight: true
  });

  // offers slider
  var $offersSlider = $('.offers-slider');

  $offersSlider.on('init', function (slick) {
    AOS.refresh();
  });

  $offersSlider.slick({
    autoplay: false,
    swipe: false,
    infinite: false,
    arrows: false,
    dots: false,
    adaptiveHeight: true
  });

  // gallery slider
  var $gallery = $('.gallery-slider .wrapper');

  $gallery.on('init', function (slick) {
    AOS.refresh();
    Waypoint.refreshAll();
  });

  $gallery.slick({
    autoplay: true,
    infinite: true,
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    prevArrow: $('.gallery-slider .arr-left'),
    nextArrow: $('.gallery-slider .arr-right'),
    mobileFirst: true,
    responsive: [
    {
      breakpoint: 880,
      settings: {
        slidesToShow: 2
      }

    }
    ]
  });

  // features slider
  var $featuresSlider = $('.object-features-slider .wrapper');

  $featuresSlider.on('beforeChange', function(_, slick, current, next) {
    var $currentSlide = $(slick.$slides[current]);
    var $nextSlide = $(slick.$slides[next]);
    $('.object-features-slider .from').text( next + 1 );
  });

  $featuresSlider.on('init', function (slick) {
    AOS.refresh();
    Waypoint.refreshAll();
  });

  $featuresSlider.slick({
    autoplay: true,
    infinite: true,
    arrows: true,
    dots: false,
    adaptiveHeight: true,
    prevArrow: $('.object-features-slider .arr-left'),
    nextArrow: $('.object-features-slider .arr-right'),
    mobileFirst: true,
    adaptiveHeight: true,
    centerMode: true,
    autoplaySpeed: 6000,
    focusOnSelect: true,
    responsive: [
    {
      breakpoint: screenSm,
      settings: {
        centerMode: true,
        autoplaySpeed: 6000,
        slidesToShow: 3
      }

    },
    {
      breakpoint: screenLg,
      settings: {
        centerMode: true,
        autoplaySpeed: 6000,
        slidesToShow: 5
      }

    }
    ]
  });
  // END SLIDERS ---------------------
  //
  function isInt(n){
    return Number(n) === n && n % 1 === 0;
  }

  function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
  }

  function animateNumbers() {
    // animate numbers in object-distance section
    var $distanceItem = $('.distance-item');

    $distanceItem.each(function (idx, item) {
      var $item = $(item);
      var $numElem = $item.find('.num');
      var from = $numElem.data('from');
      var to = $numElem.data('to');
      // if number is integer, animate it like int
      if ( isInt(from) ) {

        $numElem.prop('number', parseInt(from)).animateNumber({
          number: parseInt(to),
          easing: 'easeOutQuad'
        }, 3000)

      } else if ( isFloat(from) ) {
        // if number is float, animate it like float
        var decimal_places = 1;
        var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);

        $numElem.prop('number', parseFloat(from))
          .animateNumber({
            number: parseFloat(to) * decimal_factor,
            easing: 'easeOutQuad',
            numberStep: function(now, tween) {
              var floored_number = Math.floor(now) / decimal_factor,
              target = $(tween.elem);

              if (decimal_places > 0) {
                // force decimal places even if they are 0
                floored_number = floored_number.toFixed(decimal_places);
              }

              target.text(floored_number);
            }
          }, 3000)
      }
    });
  }

  if ($('.object-distance').length > 0) {

    var waypoints = new Waypoint({
      element: document.querySelector( '.object-distance' ),
      handler: function () {
        animateNumbers();
        this.destroy();
      },
      offset: '100%'
    })

  }

  var $markerTrigger = $('.js-marker-trigger');

  $markerTrigger.click(function (e) {
    e.preventDefault();
    var $marker = $(this);
    $objectLocationContent = $('.object-location-content');
    $marker.toggleClass( 'active' );

    if (!$objectLocationContent.hasClass( 'hidden' )) {

      $objectLocationContent.addClass('hidden');

      setTimeout(function () {
        $objectLocationContent.css('z-index', 0);
      }, 410);
    } else {
      $objectLocationContent.css('z-index', 10);

      setTimeout(function () {
        $objectLocationContent.removeClass('hidden');
      }, 100);

    }

  });

  // magnificPopup
  $('.popup-link').magnificPopup({type: 'inline', showCloseBtn: false, removalDelay: 300, mainClass: 'mfp-move-horizontal'});

  $('.input-block :input').focus(function () {
    $(this).closest('.input-block').addClass('selected');
  });

  $('.input-block :input').blur(function () {
    $(this).closest('.input-block').removeClass('selected');
  });

  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

  (function initMap() {
    if ($('.google-map').length > 0) {

      var myLatLng = {
        lat: 55.777056,
        lng: 37.527264
      }

      var map = new google.maps.Map(document.querySelector('.google-map'), {
        center: myLatLng,
        zoom: 15,
        styles: [
        {
          "elementType": "geometry",
          "stylers": [
          {
            "color": "#f5f5f5"
          }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
          {
            "visibility": "off"
          }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
          {
            "color": "#616161"
          }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
          {
            "color": "#f5f5f5"
          }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
          {
            "color": "#bdbdbd"
          }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
          {
            "color": "#eeeeee"
          }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
          {
            "color": "#757575"
          }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
          {
            "color": "#e5e5e5"
          }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
          {
            "color": "#9e9e9e"
          }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
          {
            "color": "#ffffff"
          }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
          {
            "color": "#757575"
          }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
          {
            "color": "#dadada"
          }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
          {
            "color": "#d5bea4"
          }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
          {
            "color": "#616161"
          }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
          {
            "color": "#9e9e9e"
          }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
          {
            "color": "#e5e5e5"
          }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
          {
            "color": "#eeeeee"
          }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
          {
            "color": "#c9c9c9"
          }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
          {
            "color": "#9e9e9e"
          }
          ]
        }
        ]
      });
      var marker = new google.maps.Marker({position: myLatLng, title: "Hello World!", icon: 'images/logo-shadow.png'});
      marker.setMap(map);

    }
  })();
});
