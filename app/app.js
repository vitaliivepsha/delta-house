// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
    require('./assets/templates/layouts/contacts.html');
    require('./assets/templates/layouts/about.html');
    require('./assets/templates/layouts/catalog.html');
    require('./assets/templates/layouts/404.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Popup = require('_modules/popup');
var Slider = require('_modules/slider');
require('../node_modules/sweetalert2/dist/sweetalert2');
require('../node_modules/mark.js/dist/jquery.mark.min');
import Typed from 'typed.js';

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

    setTimeout(function () {
        $('header, footer, main, .menu-catalog').removeAttr('style');
    }, 1000);

    // search

    $('.header-search__btn').click(function () {
        $(this).closest('.header-search').addClass('active');
    });

    $('.header-search__close').click(function () {
        $(this).closest('.header-search').removeClass('active');
    });

    $(document).click(function() {
        $('.header-search').removeClass('results').removeClass('show');
    });

    $(document).on('click', '.header-search', function(e) {
        e.stopPropagation();
    });

    var $input = $('.header-search__form > input'),
        $content = $('.header-search__form .search-results'),
        $results,
        currentIndex = 0;

    $input.on('input', function() {
        var searchVal = this.value;
        if (searchVal.length > 1){
            $(this).closest('.header-search').addClass('results');
        }
        else{
            $(this).closest('.header-search').removeClass('results');
        }
        $('.header-search__form .search-results li a').each(function() {
            $(this).bind('DOMSubtreeModified', function() {
                if ($(this).find('mark').length) {
                    $(this).closest('.header-search').addClass('show');
                    $(this).closest('li').addClass('show').closest('ul').addClass('highlighting-results');
                    $('.search-results__show').show();
                    $('.search-results__empty').hide();
                }
                else {
                    $(this).closest('.header-search').removeClass('show');
                    $(this).closest('li').removeClass('show').closest('ul').removeClass('highlighting-results');
                    $('.search-results__show').hide();
                    $('.search-results__empty').show();
                }
            });
        });

        $content.unmark({
            done: function() {
                $content.mark(searchVal, {
                    separateWordSearch: true,
                    done: function() {
                        $results = $content.find('mark');
                        currentIndex = 0;
                    }
                });
            }
        });
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

    if($('.slider-pos').length){
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
    }

    $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.slick-list').addClass('do-tans');
    }).on('afterChange', function() {
            $('.slick-list').removeClass('do-tans');
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
        if ($(window).width() > 991) {
            setTimeout(function () {
                picPos();
            }, 1500);
            $('.menu-catalog__main .container-lg').trigger('scroll');
        }
    });

    $('.has-children').click(function () {
        $(this).toggleClass('opened').find('ul').slideToggle();
        $(this).closest('.menu-catalog__list').toggleClass('opened');
        if ($(window).width() > 991) {
            setTimeout(function () {
                picPos();
            }, 1000);
            $('.menu-catalog__main .container-lg').trigger('scroll');
        }
    });

    function picPos(){
        $('.menu-catalog__pic').each(function (){
            var item = $(this),
                ih = item.height(),
                wh = $(window).height(),
                top = item.offset().top,
                bottom = wh - top - ih,
                ph = item.parent().height(),
                parent_top = item.parent().offset().top,
                parent_bottom = wh - parent_top - ph;
            console.log(top, parent_top, bottom, parent_bottom);
            //item.removeClass('fixed-bot').removeClass('fixed-top');
            if (parent_top <= (87 + ih / 2 - ph)) {
                item.addClass('fixed-top').removeClass('fixed-bot');
            }
            else if (parent_bottom <= (ih / 2 - ph)) {
                item.addClass('fixed-bot').removeClass('fixed-top');
            }
            else{
                item.removeClass('fixed-bot').removeClass('fixed-top');
            }
        });
    }

    if ($(window).width() > 991) {
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
    }

    // typing text

    if($('#typing_text').length) {
        var typed = new Typed('#typing_text', {

            strings: [
                'Fasades.',
                'Design.',
                'Curtain wall.',
                /*'Unitized facades.',
                'Rainscreen cladding.',
                'Sliding system.',
                'Wintergardens and domes.',
                'Inspect screening system.',
                'Sun protection systems.',
                'Parapets, canopies.',*/
                'Maintenance.',
                'Aluminum.',
                'Aluminum.',
                'Aluminum.'

            ],
            stringsElement: null,
            typeSpeed: 150,
            startDelay: 2500,
            backSpeed: 40,
            smartBackspace: true,
            shuffle: false,
            backDelay: 3000,
            fadeOut: false,
            fadeOutClass: 'typed-fade-out',
            fadeOutDelay: 700,
            loop: true,
            loopCount: Infinity,
            showCursor: false
        });
    }

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
