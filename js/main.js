$(document).ready(function() {
    initCycle(false);
    initBackground();
    addListeners();
    initCycle(true);
    loop();
});

var width, height, header, canvas, intro;
var cycleDivs, cycleCount;

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

  canvas = document.getElementById('background');
  canvas.width = header.offsetWidth;
  canvas.height = header.offsetHeight;

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

    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight;

    offset = height/2 - (greeting.offsetHeight+10)/2;
    if(offset > 0) {
      greeting.style.marginTop = offset+'px';
    } else {
      greeting.style.marginTop = 0;
    }
}

function loop() {
  //TODO: Animation

  //cycle and repeat
  cycleDivs.eq(cycleCount).fadeIn(400).delay(1000).fadeOut(400, loop);
  cycleCount = ++cycleCount % cycleDivs.length;
}
