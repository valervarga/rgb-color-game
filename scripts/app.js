// ==========  VARIABLES  ========== //
var box = document.querySelectorAll('.box'),
    boxHolder = document.querySelector('.box-holder'),
    titleColor = document.querySelector('span'),
    restart = document.querySelector('.restart'),
    easy = document.querySelector('.easy'),
    hard = document.querySelector('.hard'),
    close = document.querySelector('.close'),
    rules = document.querySelector('.rules'),
    info = document.querySelector('.info'),
    levels = document.querySelector('.levels'),
    header = document.querySelector('header'),
    colors = [];

// ==========  FUNCTIONS  ========== //
var removeClass = function(elem, style) {
  elem.classList.remove(style);
}
var addClass = function(elem, style) {
  elem.classList.add(style);
}

// blurs the bacgkround when the info is opened
var blur = function(elem) {
  elem(boxHolder, 'blur');
  elem(levels, 'blur');
  elem(header, 'blur');
}

var generateColor = function(num) {
  // return random value from 0 - 255, and generates color
  for (var i = 0; i < num; i++) {
    var R = Math.floor(Math.random() * 255);
    var G = Math.floor(Math.random() * 255);
    var B = Math.floor(Math.random() * 255);
    var bgColor = [R, G, B];

    // pushes randomly generated colors to the 'colors' array
    colors.push(bgColor);

    // paint boxes with randomly generated colors
    var thergb = 'rgb(' + [R, G, B].join(', ') + ')';
    box[i].style.backgroundColor = thergb;
  }
}

var generateTitleName = function(num) {
  // Takes a random values from 'colors' array and writes it out to the header
  var randColor = colors[Math.floor(Math.random() * num)]
  titleColor.innerText = randColor[0] +', '+ randColor[1] +', '+ randColor[2];
}

var colorizeBoxes = function() {
  // takes the rgb code from title, and colorize each box with the required color
  // resets the inner text of wrong matched colors
  var titleColorValue = titleColor.parentNode.innerText.toLowerCase();
  for (var i = 0; i < box.length; i++) {
    box[i].style.backgroundColor = titleColorValue;
    box[i].innerText = '';
    removeClass(box[i], 'hide');
  }
}

var removeHideClass = function() {
  // removes class 'hide' from all the wrong guessed boxes, which are faded
  for (var i = 0; i < box.length; i++) {
    removeClass(box[i], 'hide');
    box[i].innerText = '';
  }
}

var easyGame = function() {
  // takes the last half of the boxes and hides them
  for (var i = (box.length / 2 ); i < box.length; i++) {
    addClass(box[i], 'delete');
    box[i - 3].innerText = '';
  }
}
var hardGame = function() {
  // takes the previusly hidden boxes and shows them
  for (var i = (box.length / 2 ); i < box.length; i++) {
    removeClass(box[i], 'delete');
    box[i - 3].innerText = '';
    box[i].innerText = '';
  }
}

var correctBox = function() {
  var titleColorValue = titleColor.parentNode.innerText.toLowerCase();
  // iterate through each box
  for (var i = 0; i < box.length; i++) {
    box[i].addEventListener('click', function() {
      // take the color value of clicked box
      var clickedBox = this.style.backgroundColor;

      // if the value of clicked box matches with the required value
      // paint each box to required color
      if (clickedBox == titleColorValue) {
        colorizeBoxes();
      }
      // if the value of clicked box doesn't match with the required value
      // fade the wrong match and write out its rgb code
      else {
        addClass(this, 'hide');
        this.innerText = clickedBox;
      }
    });
  }
}

// set up the page
var init = function() {
  if (easy.classList.contains('active')) {
    num = box.length / 2;
  } else {
    num = box.length;
  }
  colors = [];
  generateColor(num);
  generateTitleName(num);
  correctBox();
  removeHideClass();
}

init();

// set up click listeners
restart.addEventListener('click', function() {
  init();
});
easy.addEventListener('click', function() {
  addClass(easy, 'active');
  removeClass(hard, 'active');
  easyGame();
  init();
});
hard.addEventListener('click', function() {
  removeClass(easy, 'active');
  addClass(hard, 'active');
  hardGame();
  init();
});
close.addEventListener('click', function() {
  addClass(info, 'delete');
  blur(removeClass)
})
rules.addEventListener('click', function() {
  removeClass(info, 'delete');
  blur(addClass);
})
