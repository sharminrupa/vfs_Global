/**
 * Plugin SlidePanel.
 * This plugin is insired by the sliiide plugin which seems to be unmaintained for many years.
 * That is the reason why i redeveloped it using the options required for my case.
 * Follow me at : 
 * 
 * No guarantee is applicable with this plugin, you use it at your own risks.
 *
 * Current version : 1.1
 * 
 * 1.1 : Adding reference to the HTML being called by the toggle element. With this reference you can perform more actions when this is required.
 * 
 * Auteur : Jérôme Perciot (jperciot01@gmail.com)
 * Apache 2.0 Licence
 */
(function ($) {

    //get IE version if browser is IE
    var ie = (function detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        return false;
    })();

    $.fn.SlidePanel = function (options) {

        var settings = $.extend({
            toggle: "#sliderpanel-toggle",
            exit_selector: ".slider-exit",
            animation_duration: "0.5s",
            place: "right",
            animation_curve: "cubic-bezier(0.54, 0.01, 0.57, 1.03)",
            body_slide: true,
            no_scroll: false,
            auto_close: false,
            title_selector: '',
            close_selector: undefined,
            content_selector: undefined,
            onSlideOpening: function (callback) {
                if (callback !== undefined) {
                    callback.call(this);
                }
            },
            onSlideOpened: function (callback) {
                if (callback !== undefined) {
                    callback.call(this);
                }
            },
            onSlideClosing: function (callback) {
                if (callback !== undefined) {
                    callback.call(this);
                }
            },
            onSlideClosed: function (callback) {
                if (callback !== undefined) {
                    callback.call(this);
                }
            }
        }, options);

        var newSize;
        var clicked = false;
        var $sliderpanel = $(this);
        var $toggle = $(settings.toggle);
        var $exit = $(settings.exit_selector);
        var $body = $('body');
        var bodySlideDistance;

        var bodyResetProp = {
            transform: '',
            'overflow-x': '',
            transition: '',
            position: ''
        };

        var sliderpanelResetProp = {
            transform: '',
            transition: '',
            width: '',
            height: '',
            left: '',
            top: '',
            bottom: '',
            right: ''
        };

        var prepareProperties = {
            visibility: 'hidden',
            transition: 'transform ' + settings.animation_duration + ' ' + settings.animation_curve,
            position: 'fixed'
        };

        var bodyChildrenProp = {
            transition: 'transform ' + settings.animation_duration + ' ' + settings.animation_curve
        };

        var htmlProp = {
            'overflow-x': 'hidden'
        };

        var bodySlidePrepare = {
            position: 'relative', // to make overflow-x hidden work with mobile browsers
            'overflow-x': 'hidden',
        };


        var bodySlideProp = {

            setleft: function (distance) {
                this.left.activateAnimation.transform = 'translateX(' + distance + 'px)';
                this.left.deactivateAnimation.transform = 'translateX(0px)';
            },
            setright: function (distance) {
                this.right.activateAnimation.transform = 'translateX(-' + distance + 'px)';
                this.right.deactivateAnimation.transform = 'translateX(0px)';
            },
            setbottom: function (distance) {
                this.bottom.activateAnimation.transform = 'translateY(-' + distance + 'px)';
                this.bottom.deactivateAnimation.transform = 'translateY(0px)';
            },
            settop: function (distance) {
                this.top.activateAnimation.transform = 'translateY(' + distance + 'px)';
                this.top.deactivateAnimation.transform = 'translateY(0px)';
            },
            left: {
                activateAnimation: { transform: '' },
                deactivateAnimation: { transform: '' }
            },
            right: {
                activateAnimation: { transform: '' },
                deactivateAnimation: { transform: '' }
            },
            top: {
                activateAnimation: { transform: '' },
                deactivateAnimation: { transform: '' }
            },
            bottom: {
                activateAnimation: { transform: '' },
                deactivateAnimation: { transform: '' }
            }
        };

        var Prop = {

            left: {
                properties: function () {
                    var left = '-' + $sliderpanel.width() + 'px';
                    return { top: '0', left: left };
                },
                activateAnimation: { transform: 'translateX(100%)' },
                deactivateAnimation: { transform: 'translateX(0)' },
                size: function (wHeight, wWidth) {
                    return { height: wHeight };
                }
            },

            right: {
                properties: function () {
                    var right = '-' + $sliderpanel.width() + 'px';
                    return { top: '0', right: right };
                },
                activateAnimation: { transform: 'translateX(-100%)' },
                deactivateAnimation: { transform: 'translateX(0)' },
                size: function (wHeight, wWidth) {
                    return { height: wHeight };
                }

            },

            top: {
                properties: function () {
                    var top = '-' + $sliderpanel.height() + 'px';
                    return { left: '0', right: '0', top: top };
                },
                activateAnimation: { transform: 'translateY(100%)' },
                deactivateAnimation: { transform: 'translateY(0)' },
                size: function (wHeight, wWidth) {
                    return { width: wWidth };
                }
            },

            bottom: {
                properties: function () {
                    var bottom = '-' + $sliderpanel.height() + 'px';
                    return { left: 0, right: 0, bottom: bottom };
                },
                activateAnimation: { transform: 'translateY(-100%)' },
                deactivateAnimation: { transform: 'translateY(0)' },
                size: function (wHeight, wWidth) {
                    return { width: wWidth };
                }
            }
        };

        var prefixCSS = function (cssProp) {
            $.each(cssProp, function (k, v) {
                if (k === 'transition') {
                    var trnsCSS = {};
                    var trnsProp = v.split(' ', 1)[0];
                    var trnsAttr = v.split(' '); trnsAttr.shift(); trnsAttr = trnsAttr.join(' ');
                    trnsCSS['-webkit-' + k] = '-webkit-' + trnsProp + ' ' + trnsAttr;
                    trnsCSS['-ms-' + k] = '-ms-' + trnsProp + ' ' + trnsAttr;
                    $.extend(cssProp, trnsCSS);
                }
                else if (k === 'transform') {
                    var trnsfCSS = {};
                    trnsfCSS['-webkit-' + k] = v;
                    trnsfCSS['-ms-' + k] = v;
                }
            });

            return cssProp;
        };

        var sizeFunction = function () {
            var windowSize = {};
            var scroll = getScrollBarWidth();
            windowSize.height = $(window).height();
            windowSize.width = $(window).width() + scroll;
            newSize = Prop[settings.place].size(windowSize.height, windowSize.width);
            $sliderpanel.css(newSize);
            $sliderpanel.css(prefixCSS(Prop[settings.place].properties()));
            setSlideDistance();
        };

        var setSlideDistance = function () {
            if (settings.body_slide) {
                if (settings.place === 'right' || settings.place === 'left') {
                    bodySlideDistance = $sliderpanel.width();
                }
                else {
                    bodySlideDistance = $sliderpanel.height();
                }
                bodySlideProp['set' + settings.place](bodySlideDistance);
            }
        };

        var prepare = function () {
            $sliderpanel.css(prefixCSS(prepareProperties));
            $sliderpanel.css(prefixCSS(Prop[settings.place].properties()));
            setSlideDistance();
        };

        var getScrollBarWidth = function () {
            var inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";

            var outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);

            document.body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 === w2) { w2 = outer.clientWidth; }

            document.body.removeChild(outer);

            return (w1 - w2);
        };

        // v1.1 => element is the HTML element that is attached as the related parent which has raised this event !
        var activate = function (element) {
            if (settings.onSlideOpening !== undefined) {
                settings.onSlideOpening(element);
            }

            sizeFunction(); //sets the size of the slider menu and the distance the body will travel on sliding
            $sliderpanel.css('visibility', 'visible');
            if (settings.body_slide) {
                $body.css(prefixCSS(bodySlidePrepare));
                $('html').css(htmlProp);
                $body.children().css(prefixCSS(bodyChildrenProp));
                $body.children().css(prefixCSS(bodySlideProp[settings.place].activateAnimation));
                if ((ie !== false) && (ie <= 11)) {
                    $sliderpanel.css(prefixCSS(Prop[settings.place].activateAnimation));
                }
            }

            else {
                $sliderpanel.css(prefixCSS(Prop[settings.place].activateAnimation));
            }

            if (settings.no_scroll) {
                disable_scroll();
            }

            clicked = true;

            if (settings.onSlideOpened !== undefined) {
                settings.onSlideOpened();
            }
        };

        var hideSlider = function (e) {
            $sliderpanel.css('visibility', 'hidden');
            $body.css(bodyResetProp);
            $('html').css(bodyResetProp);
            $body.unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', hideSlider);
            prepare();
        };

        function setTitle(title) {
            if (settings.title_selector !== undefined && settings.title_selector !== '') {
                $sliderpanel.find(settings.title_selector).html(title);
            }
        }

        function setContent(content) {
            if (settings.content_selector !== undefined && settings.content_selector !== '') {
                $sliderpanel.find(settings.content_selector).html(content);
            }
        }

        // v1.1 => element is the HTML element that is attached as the related parent which has raised this event !
        function deactivate(element) {
            if (settings.onSlideClosing !== undefined) {
                settings.onSlideClosing(element);
            }

            $body.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', hideSlider);

            if (settings.body_slide) {
                $body.children().css(prefixCSS(bodySlideProp[settings.place].deactivateAnimation));
                if ((ie !== false) && (ie <= 11)) { $sliderpanel.css(prefixCSS(Prop[settings.place].deactivateAnimation)); }
            }

            else {
                $sliderpanel.css(prefixCSS(Prop[settings.place].deactivateAnimation));
            }

            if (settings.no_scroll) {
                enable_scroll();
            }

            clicked = false;

            if (settings.onSlideClosed !== undefined) {
                settings.onSlideClosed();
            }
        }

        sizeFunction();
        prepare();
        $(window).resize(sizeFunction);
        $sliderpanel.resize(sizeFunction);

        // v1.1 => element is the HTML element that is attached as the related parent which has raised this event !
        var handleToggle = function (element) {
            if (!clicked) { activate(element); }
            else { deactivate(element); }
        };

        $toggle.click(handleToggle);
        if (settings.auto_close && settings.close_selector !== undefined) {
            $sliderpanel.find(settings.close_selector).on('click', function () { deactivate(); });
        } else if (settings.auto_close) {
            $sliderpanel.find('a').on('click', function () { deactivate(); });
        }
        $exit.on('click', function () { deactivate(); });

        var deleteProp = function () {
            $body.css(bodyResetProp);
            $sliderpanel.css(sliderpanelResetProp);
            $(window).off('resize', sizeFunction);
            $toggle.off('click', handleToggle);
        };


        var menu = {
            reset: function (name) {
                $body.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', deleteProp);
                deactivate();
            },
            deactivate: function () { deactivate(); },
            activate: function () { activate(); },
            setTitle: function (title) { setTitle(title); },
            setContent: function (content) { setContent(content); }
        };

        return menu;
    };

    //enable and disable scroll
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disable_scroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove = preventDefault; // mobile
        document.onkeydown = preventDefaultForScrollKeys;
    }

    function enable_scroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

}(jQuery));
