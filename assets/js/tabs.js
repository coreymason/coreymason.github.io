(function($) {

    $.tabs = function(el, options) {

        var base = this;
        base.$el = $(el);
        base.$nav = base.$el.find("#nav");
        base.$buttons = base.$el.find("#nav-buttons");

        base.init = function() {

            base.options = $.extend({},$.tabs.defaultOptions, options);

            // Accessible hiding fix
            $(".hide").css({
                "position": "relative",
                "top": 0,
                "left": 0,
                "display": "none"
            });

            base.$buttons.delegate("li > a.button", "click", function() {
              var curList = base.$el.find("li.active > a").attr("href").substring(1);
              var listID = $(this).attr("href").substring(1);
              var $newList = base.$el.find("#"+listID+"-tab");

              $("html, body").animate({ scrollTop: $("#header").offset().top }, "slow");

              base.$el.find("#"+curList).fadeOut(base.options.speed, function() {
                  // Fade in new list on callback
                  base.$el.find("#"+listID).fadeIn(base.options.speed);

                  // Remove highlighting - Add to just-clicked tab
                  base.$el.find("#nav li").removeClass("active");
                  $newList.parent().addClass("active");
              });

              return false;
            });

            base.$nav.delegate("li > a.tab", "click", function() {

                // Figure out current list via CSS class
                var curList = base.$el.find("li.active > a").attr("href").substring(1);

                // List moving to
                var $newList = $(this);

                // Figure out ID of new list
                var listID = $newList.attr("href").substring(1);

                // Set outer wrapper height to (static) height of current inner list
                // $allListWrap = base.$el.find(".list-wrap"),
                // curListHeight = $allListWrap.height();
                // $allListWrap.height(curListHeight);

                if ((listID != curList) && ( base.$el.find(":animated").length == 0)) {

                    // Fade out current list
                    base.$el.find("#"+curList).fadeOut(base.options.speed, function() {

                        // Fade in new list on callback
                        base.$el.find("#"+listID).fadeIn(base.options.speed);

                        // Adjust outer wrapper to fit new list snuggly
                        // var newHeight = base.$el.find("#"+listID).height();
                        // $allListWrap.animate({
                        //     height: newHeight
                        // });

                        // Remove highlighting - Add to just-clicked tab
                        base.$el.find("#nav li").removeClass("active");
                        $newList.parent().addClass("active");

                    });

                }

                // Don't behave like a regular link
                // Stop propegation and bubbling
                return false;
            });

        };
        base.init();
    };

    $.tabs.defaultOptions = {
        "speed": 300
    };

    $.fn.tabs = function(options) {
        return this.each(function() {
            (new $.tabs(this, options));
        });
    };

    $("#wrapper").tabs({speed: 200});

})(jQuery);
