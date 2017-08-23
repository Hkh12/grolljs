(function() {
    'use strict';
    var _version = '1.0.0',
    errorstart = 'Groll(' + _version + '): ';
    function $error(str) {
        throw new Error(errorstart + str);
    }
    $.fn.getGrolled = function (k) {
        return k.scollTop()
    };
    $.fn.getGrolledPerc = function (k) {
        var a = k.getGrolled(),
        b = k.height(),
        c = (a / b) * 100;
        return c;
    };
    $.fn.grollEvent = function(p) {
        var el = $(this);
        if (arguments.length < 1) {
            $error('grollEvent method needs at least 1 argument.')
        } else if ( p && typeof p === 'object' && arguments.length === 1 ){
            if ( !('offset' in p) || !(typeof p.offset === 'number') ) {
                $error('offset is required for grollEvent method (number)')
            } else {
                $(window).scroll(function () {
                    if ($(this).getGrolled() >= p.offset ){
                        el.removeClass( p.removeClass );
                        el.addClass( p.addClass );
                        if ( p.func && typeof p.func === 'function' ) {
                            p.func()
                        }
                    } else {
                        el.addClass( p.removeClass );
                        el.removeClass( p.addClass );
                    }
                })
            }
        }
    };
    $.fn.grollTranslate3d = function (depth) {
        var el = $(this),
        d = arguments.length === 0 ? 3 : depth;
        $(window).scroll(function () {
            var s = $(this).getGrolled();
            el.css({
                'transform': 'translate3d(0, ' + s/d + 'px, 0)'
            })
        })
    };
    $.fn.grollLiveEffect = function (func) {
        var el = $(this);
        if (arguments.length !== 1){
            $error('grollLiveEffect needs 1 arguments. (function)')
        }
        $(window).scroll(function () {
            var t = $(this);
            var e = t.getGrolled();
            func(e)
        })
    };
    $.fn.grollProgress = function(func) {
        if (arguments.length !== 1 || typeof func !== 'function' ) {
            $error('grollProgress method needs 1 argument. (function)')
        }
        var el = $(this),
        a = el.getGrolledPerc();
        $(window).scroll(function () {
            func(a)
        })
    };
}());
