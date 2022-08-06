// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
    require('./assets/templates/layouts/contacts.html');
    require('./assets/templates/layouts/about.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Popup = require('_modules/popup');
var Slider = require('_modules/slider');
require('../node_modules/sweetalert2/dist/sweetalert2');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function () {
    new Forms();
    new Popup();
    new Slider();

    setTimeout(function () {
        $('body').trigger('scroll');
        $(window).trigger('resize');
    }, 100);

    // search

    $('.header-search__btn').click(function () {
        $(this).closest('.header-search').addClass('active');
    });

    $('.header-search__close').click(function () {
        $(this).closest('.header-search').removeClass('active');
    });

    // first screen img move

    $('.main-pic').mousemove(function(e){
        var $this = $(this),
            winWidth = window.innerWidth,
            winHeight = window.innerHeight,
            relativeX = e.pageX / (winWidth / 20) + 'px',
            relativeY = e.pageY / (winHeight / 20) + 'px';
        $this.css('transform', 'translate(calc(-50% + ' + relativeX + '), calc(-50% + ' + relativeY + '))');
    });

    // slider elements position

    setTimeout(function () {
        var pos = $('.info-pos'),
        offset = pos.offset().left - pos.closest('.container-lg').offset().left;

        $('.slider-pos').each(function (){
            $(this).css('left', offset);
        });
    }, 1000);

    $('.slider').on("beforeChange", function(event, slick, currentSlide, nextSlide) {
        $(".slick-list").addClass("do-tans");
    }).on("afterChange", function() {
            $(".slick-list").removeClass("do-tans");
        });

    // mobile menu

    var touch = $('.mobile-menu__btn');

    var toggles = document.querySelectorAll('.mobile-menu__btn');

    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    }

    function toggleHandler(toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
        });
    }

    $(touch).click(function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-opened');
        return false;
    });

    $(document).on('click', '.mobile-menu__btn', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.mobile-menu__wrapper', function (e) {
        e.stopPropagation();
    });

    // lazy load
    var lazyload = function () {
        var scroll = $(window).scrollTop() + $(window).height() * 3;

        $('.lazy').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('src', $(this).data('original'));
            }
        });
        $('.lazy-web').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('srcset', $(this).data('original'));
            }
        });
    };
    $(window).scroll(lazyload);
});
