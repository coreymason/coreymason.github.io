$("#header").headroom(),
$(window).scroll(function() {
    var o = $(window).scrollTop();
    o >= 5 ? $("header").removeClass("nav-root") : 6 >= o && $("header").addClass("nav-root")
}),
particlesJS.load('particles-js', 'js/particles.json', function() {
  console.log('callback - particles.js config loaded');
});
