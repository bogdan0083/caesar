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

  // media breakpoints
  var screenXs = 460;
  var screenSm = 880;
  var screenMd = 1170;
  var screenLg = 1375;

  // AOS.js
  AOS.init();

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

  $circleItems.hover(function (e) {
    var width = $(this).width();
    var height = $(this).height();
    console.log(width);
  }, function (e) {

  });
});
