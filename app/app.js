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
var Slider = require('_modules/slider');
require('../node_modules/sweetalert2/dist/sweetalert2');
require('../node_modules/mark.js/dist/jquery.mark.min');
require('../node_modules/ez-plus/src/jquery.ez-plus');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function () {
    new Slider();

    setTimeout(function () {
        $('body').trigger('scroll');
        $(window).trigger('resize');
    }, 100);

    setTimeout(function () {
        $('header, footer, main, .menu-catalog').removeAttr('style');
    }, 1000);

    // animations

    setTimeout(function () {
        $('.line1').addClass('animated');
    }, 1200);

    setTimeout(function () {
        $('.line2').addClass('animated');
    }, 1400);

    setTimeout(function () {
        $('.line3').addClass('animated');
    }, 1600);

    setTimeout(function () {
        $('.line4').addClass('animated');
    }, 1800);

    setTimeout(function () {
        $('.main-text').addClass('animated');
        //$('body').removeClass('overflow');
    }, 2400);

    setTimeout(function () {
        $('.main-pic__wrapper').addClass('animated');
        //$('body').removeClass('overflow');
    }, 3000);

    var $horizontal_left = $('.line2'),
        $horizontal_right = $('.line3');
    $(window).scroll(function () {
        var wScroll = $(this).scrollTop(),
            h = $(this).height();
        if ($(window).width() > 1249) {
            $horizontal_left.css({left: "-" + wScroll / 4 + "%"});
            $horizontal_right.css({right: "-" + wScroll / 4 + "%"});
        }
        //$('.sticky-content').css({top: "calc(" + wScroll + 716 + "px)"});
        /*if (wScroll > h*1.4){
            $('.sticky-content').addClass('scrolled');
        }
        else{
            $('.sticky-content').removeClass('scrolled');
        }*/
    });
    /*$(window).scroll(function () {
        var s = $(this).scrollTop(),
            d = $(document).height(),
            c = $(this).height(),
            scrollPercent = (s / (d - c));

        var position_left = (scrollPercent * ($(document).width()*3 - $horizontal_left.width()));
        var position_right = (scrollPercent * ($(document).width()*3 - $horizontal_right.width()));
        if (s > 0){
            $horizontal_left.css({
                'right': position_left
            });

            $horizontal_right.css({
                'left': position_right
            });
        }
    });*/

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

    if($('.main-pic__wrapper').length){
        function imgMove(){
            var zoomConfig = {zoomType: 'inner', borderSize: 0, lenszoom: false, tint: true, easing: true};
            var image = $('.main-pic__wrapper');
            var zoomImage = $('.main-pic');

            zoomImage.ezPlus(zoomConfig);

            setTimeout(function () {
                $($('.zoomContainer').detach()).appendTo(image);
            }, 1000);
        }
        imgMove();
        $(window).resize(function (){
            imgMove();
        });
    }

    // second screen img color

    if($('.info-pic').length){
        if ($(window).width() > 1024) {
            $('.info-pic').on('hover mouseover', function (){
                $(this).addClass('hover');
            });
        }
        setTimeout(function () {
            var pos = $('.info-pic').offset().top - $('.info-pic').height();
            if ($(window).width() <= 1024) {
                $(window).scroll(function () {
                    var scrolled = $(window).scrollTop();
                    //console.log(scrolled, pos);
                    if (scrolled > pos) {
                        $('.info-pic').addClass('hover');
                    }
                });
            }
        }, 1000);
    }

    // second screen text animation*

    setTimeout(function () {
        var screen_pos = $('.info-section').offset().top;
        var wScroll = $(this).scrollTop();
        if (wScroll >= screen_pos - 500){
            setTimeout(function () {
                $('.info-subtitle').addClass('animated');
            }, 500);
            setTimeout(function () {
                $('.info-title').addClass('animated');
            }, 1200);
            setTimeout(function () {
                $('.info-text').addClass('animated');
            }, 1900);
        }
        $(window).scroll(function () {
            var wScroll = $(this).scrollTop();
            if (wScroll >= screen_pos - 500){
                setTimeout(function () {
                    $('.info-subtitle').addClass('animated');
                }, 500);
                setTimeout(function () {
                    $('.info-title').addClass('animated');
                }, 1200);
                setTimeout(function () {
                    $('.info-text').addClass('animated');
                }, 1900);
            }
        });
    }, 1000);

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

    $('.slider .col').each(function (){
        $(this).on('mouseover', function (e){
            e.preventDefault();
            $(this).addClass('visible').siblings().removeClass('visible');
        });
    });

    $('.slider').each(function (){
        var $slider = $(this);
        $slider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
            $('.slider .slick-slider:not(.slick-current) .col-lg').addClass('visible').siblings().removeClass('visible');
        });
    });
    $('.slider').on('mouseover', function (){
        $('.slick-dots button').addClass('pause');
    });
    $('.slider').on('mouseleave', function (){
        $('.slick-dots button').removeClass('pause');
    });

    $(window).resize(function (){
        setTimeout(function () {
            $('.slider').slick('setPosition');
        }, 500);
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
        $('.header-btn__cat').toggleClass('active');
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
            //console.log(top, parent_top, bottom, parent_bottom);
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
