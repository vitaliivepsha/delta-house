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
//require('../node_modules/ez-plus/src/jquery.ez-plus');

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

        $(window).resize(function (){
            var pos = $('.info-pos'),
                offset = pos.offset().left - pos.closest('.container-lg').offset().left;
            $('.slider-pos').each(function (){
                $(this).css('left', offset);
            });
        });

        $('.slider .slide a').each(function (){
            var lw = $(this).width(),
                ww = $(window).width();
            if(lw >= ww - 48 && ww < 399){
                $(this).find('span').css('flex-basis', 0);
            }
            if(lw >= ww - 32 && ww < 359){
                $(this).find('span').css('flex-basis', 0);
            }
        });
    }, 1000);

    $('.slider').on("beforeChange", function(event, slick, currentSlide, nextSlide) {
        $(".slick-list").addClass("do-tans");
    }).on("afterChange", function() {
            $(".slick-list").removeClass("do-tans");
        });

    // mobile menu

    $('.header-menu__btn').click(function () {
        $(this).toggleClass('active');
        $('body').toggleClass('menu-opened');
    });

    $(document).click(function () {
        $('.header-menu__btn').removeClass('active');
        $('body').removeClass('menu-opened');
    });

    $(document).on('click', '.header-menu__btn', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.header-menu', function (e) {
        e.stopPropagation();
    });

    // catalog menu

    $('.header-btn__cat').click(function () {
        $('.menu-catalog').toggleClass('active');
        $('body').toggleClass('cat-opened');
        setTimeout(function () {
            picPos();
        }, 1000);
    });

    $('.has-children').click(function () {
        $(this).toggleClass('opened').find('ul').slideToggle();
        $(this).closest('.menu-catalog__list').toggleClass('opened');
        setTimeout(function () {
            picPos();
        }, 100);
        $('.menu-catalog__main .container-lg').trigger('scroll');
    });

    function picPos(){
        $('.menu-catalog__pic').each(function (){
            var item = $(this),
                offset = item.offset().top,
                wh = $(window).height(),
                ih = item.height(),
                bottom = wh - offset - ih;
            console.log(bottom);
            //item.removeClass('fixed-bot').removeClass('fixed-top');
            if (offset <= 87) {
                item.addClass('fixed-top').removeClass('fixed-bot');
            }
            else if (bottom < 0) {
                item.addClass('fixed-bot').removeClass('fixed-top');
            }
            else{
                item.removeClass('fixed-bot').removeClass('fixed-top');
            }
        });
    }
    setTimeout(function () {
        picPos();
    }, 3000);

    $(window).on('resize', function (){
        setTimeout(function () {
            picPos();
        }, 1000);
    });

    $('.menu-catalog__main .container-lg').scroll(function (){
        setTimeout(function () {
            picPos();
        }, 1);
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
