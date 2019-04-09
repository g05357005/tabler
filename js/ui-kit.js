var uikit = {
    colorVariation: function (color, variation) {
        var colorValue = this.colors[color];


        if (colorValue) {
            switch (variation) {
                case 'light':
                    return this.mixColors(colorValue, '#ffffff', 70);
                case 'lighten':
                    return this.mixColors(colorValue, '#ffffff', 30);
                case 'lightest':
                    return this.mixColors(colorValue, '#ffffff', 10);
                case 'dark':
                    return this.mixColors(colorValue, '#000000', 80);
                case 'darken':
                    return this.mixColors(colorValue, '#000000', 40);
                case 'darkest':
                    return this.mixColors(colorValue, '#000000', 20);
            }

            return colorValue;
        }

        throw new Error('Wrong color: ' + color);
    },

    hexToRgbA: function (hex, opacity) {
        var c;

        opacity = opacity || 1;

        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';
        }
        throw new Error('Bad Hex');
    },

    mixColors: function (color_1, color_2, weight) {
        color_1 = color_1.substr(1);
        color_2 = color_2.substr(1);

        function d2h(d) {
            return d.toString(16);
        }

        function h2d(h) {
            return parseInt(h, 16);
        }

        weight = (typeof(weight) !== 'undefined') ? weight : 50;

        var color = '#';

        for (var i = 0; i <= 5; i += 2) {
            var v1 = h2d(color_1.substr(i, 2)),
                v2 = h2d(color_2.substr(i, 2));

            var val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));

            while (val.length < 2) {
                val = '0' + val;
            }

            color += val;
        }

        return color;
    },

    toggleFullscreen: function (elem) {
        elem = elem || document.documentElement;
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }
};


$(document).ready(function () {
    var $body = $('body');

    $body.on('click', '[data-toggle="sidebar"]', function (e) {
        $body.toggleClass('sidebar-opened');

        e.preventDefault();
        return false;
    });
});

window.uikit = uikit;