window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})


window.switchOutput = function(element, index, coupleId) {
  // 移除所有subject container的active类
  const subjectContainers = element.parentElement.getElementsByClassName('subject-container');
  for (let container of subjectContainers) {
    container.classList.remove('active');
  }
  
  // 为当前点击的subject container添加active类
  element.classList.add('active');
  
  // 获取对应的image-container
  const card = element.closest('.card');
  const imageContainer = card.querySelector('.image-container:not(.subject-container)');
  
  // 获取所有hover-image
  const hoverImages = imageContainer.querySelectorAll('.hover-image'); //有两个hoverImages, 一个active, 另一个非active
  
  // 隐藏所有hover-image
  hoverImages.forEach(img => {
    img.style.display = 'none';
    img.classList.remove('active');
  });

  // 根据id来确定要显示的hover-image, 例如id为couple1_1的话， index=1, coupleId=couple1
  const selectedOutput = imageContainer.querySelector(`.hover-image[id^='${coupleId}_${index}']`);
  if (selectedOutput) {
    selectedOutput.style.display = 'block';
    selectedOutput.classList.add('active');
  }
}
