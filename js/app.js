$("#header").headroom(),
$(window).scroll(function() {
    var o = $(window).scrollTop();
    o >= 5 ? $("header").removeClass("nav-root") : 6 >= o && $("header").addClass("nav-root")
});
