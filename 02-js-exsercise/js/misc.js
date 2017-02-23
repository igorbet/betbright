var betbright = betbright || {};

betbright.getImages = function(el) {
    var obj = this;
    obj.elements = el;
    obj.result = document.getElementById('response');

    obj.init = function() {

        for(i=0; i<obj.elements.length; i++) {

            obj.elements[i].addEventListener('click', function(){
                obj.ajax(this.dataset.animal);
            });

        }

    };

    obj.ajax = function(tag) {

        if (typeof tag != 'undefined') {

            $jsonp.send('https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=returnJson&tags=' + tag, {
                callbackName: 'returnJson',
                onSuccess: function(data) {

                    if (data.items.length) {
                        obj.displayImages(data.items);
                    } else { 
                        console.log('Error');
                    }

                }

            });

        } else {

            console.log('Error');

        }

    };

    obj.displayImages = function(images) {

        var limit = 5,
            i = 0;

        obj.result.innerHTML = '';

        if(images.length < 5) {
            limit = images.length;
        }

        (function loadImageArrayAsync() {

            img = new Image();

            img.onload = function () {
                obj.result.appendChild(img);
                if (i++ < limit - 1) loadImageArrayAsync();
            }

            img.src = images[i].media.m;
        })();

    }

    obj.init();
}

var $jsonp = (function(){

    var that = {};

    that.send = function(src, options) {

        var callback_name = options.callbackName || 'callback',
        on_success = options.onSuccess || function() {};

        window[callback_name] = function(data) {
            on_success(data);
        }

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = src;

        document.getElementsByTagName('head')[0].appendChild(script);
    }

    return that;
})();

document.addEventListener('DOMContentLoaded', function(event) { 

    var buttons = document.querySelectorAll('.js-flickr');

    if(buttons.length) {
        new betbright.getImages(buttons);
    }

});
