$(document).ready(function() {
    initCycle(false);
    initBackground();
    addListeners();
    initCycle(true);
    initParticles();
    loop();
});

var width, height, header, particles, intro;
var cycleDivs, cycleCount;
var ratio = Math.sqrt($(window).width() * $(window).height()) / 1120.0;

function initCycle(ready) {
  if(ready) {
    cycleDivs.eq(cycleCount).hide().css('visibility','visible');
  } else {
    cycleCount = 0
    cycleDivs = $('h2[id^="cycle"]').hide();
    cycleDivs.eq(cycleCount).css('visibility','hidden').show();
  }
}

//still need to address the change in header div heightwhen text takes more than one line
//the canvas doesn't update and ideally this header div shouldn't have to change size at all
function initBackground() {
  width = window.innerWidth;
  height = window.innerHeight;

  header = document.getElementById('header');
  header.style.minHeight = height+'px';

  particles = document.getElementById('particles-js');
  particles.width = header.offsetWidth;
  particles.height = header.offsetHeight;

  greeting = document.getElementById('greeting');
  offset = height/2 - (greeting.offsetHeight+10)/2;
  if(offset > 0) {
    greeting.style.marginTop = offset+'px';
  } else {
    greeting.style.marginTop = 0;
  }
}

function addListeners() {
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
}

function scrollCheck() {

}

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    header.style.minHeight = height+'px';

    particles.width = header.offsetWidth;
    particles.height = header.offsetHeight;

    offset = height/2 - (greeting.offsetHeight+10)/2;
    if(offset > 0) {
      greeting.style.marginTop = offset+'px';
    } else {
      greeting.style.marginTop = 0;
    }
}

function loop() {
  cycleDivs.eq(cycleCount).fadeIn(400).delay(1000).fadeOut(400, loop);
  cycleCount = ++cycleCount % cycleDivs.length;
}

function initParticles() {
  // number of particles
  var MAX_PARTICLES = 150;
  // distances needed to form a line
  var MAX_DISTANCE = 100;
  var MAX_MOUSE_DISTANCE = 300;
  // size of particles
  var MAX_SIZE = 3;
  // speed
  var MAX_SPEED = 3;

  particlesJS('particles-js', {
    particles: {
      color: '#fff',
      color_random: false,
      shape: 'circle', // "circle", "edge" or "triangle"
      opacity: {
        opacity: 1,
        anim: {
          enable: true,
          speed: Math.floor(ratio * MAX_SPEED),
          opacity_min: 0,
          sync: false
        }
      },
      size: Math.floor(ratio * MAX_SIZE),
      size_random: true,
      nb: Math.floor(ratio * MAX_PARTICLES),
      line_linked: {
        enable_auto: true,
        distance: Math.floor(ratio * MAX_DISTANCE),
        color: '#fff',
        opacity: 1,
        width: 1,
        condensed_mode: {
          enable: false,
          rotateX: 600,
          rotateY: 600
        }
      },
      anim: {
        enable: true,
        speed: 1
      }
    },
    interactivity: {
      enable: true,
      mouse: {
        distance: Math.floor(ratio * MAX_MOUSE_DISTANCE)
      },
      detect_on: 'window', // "canvas" or "window"
      mode: 'grab', // "grab" of false
      line_linked: {
        opacity: .5
      },
      events: {
        onclick: {
          enable: true,
          mode: 'push', // "push" or "remove"
          nb: Math.floor(ratio * MAX_SIZE)
        },
        onresize: {
          enable: true,
          mode: 'out', // "out" or "bounce"
          density_auto: false,
          density_area: 100 // nb_particles = particles.nb * (canvas width *  canvas height / 1000) / density_area
        }
      }
    },
    /* Retina Display Support */
    retina_detect: true
  });
}
