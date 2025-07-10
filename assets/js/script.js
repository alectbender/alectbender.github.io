 // Function to set the theme and update UI
 function setTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    var switchThemeBtn = document.getElementById('switchTheme');
    if (switchThemeBtn) {
        switchThemeBtn.innerHTML = theme === 'dark' ?  '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
    }
    //console.log(`Switched to ${theme} theme`);
}

var currentTheme = localStorage.getItem('theme') || 'dark';
setTheme(currentTheme);

// Event listener for the switch theme button
var switchThemeBtn = document.getElementById('switchTheme');
if (switchThemeBtn) {
    switchThemeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });
}

//AOS Initiliaze
AOS.init();

// Fixed Header & back to top button on Scroll
window.addEventListener('scroll', () => {
    // fixed header
    const header = document.getElementById('header');
    if (window.scrollY > 30 && !header.classList.contains('fixed-top')) {
        header.classList.add('fixed-top');
        document.getElementById('offcanvasNavbar').classList.add('fixedHeaderNavbar');
    } else if (window.scrollY <= 30 && header.classList.contains('fixed-top')) {
        header.classList.remove('fixed-top');
        document.getElementById('offcanvasNavbar').classList.remove('fixedHeaderNavbar');
    }

    //backtotop
    const backToTopButton = document.getElementById("backToTopButton");
    if (window.scrollY > 400 && backToTopButton.style.display === 'none') {
        backToTopButton.style.display = 'block';
    } else if (window.scrollY <= 400 && backToTopButton.style.display === 'block') {
        backToTopButton.style.display = 'none';
    }
});


//jumping to top function
function scrollToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


$(document).ready(function(){
  const projectSlider = $("#project-slider");

  // Initialize the carousel
  projectSlider.owlCarousel({
    items: 3,
    loop: true,
    center: true,
    margin: 32,
    nav: false, // nav false because you are using custom arrows
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  });

  // Rotation logic
  projectSlider.on('changed.owl.carousel', function(event) {
    $('.owl-item').removeClass('left-item right-item');

    const center = event.item.index + Math.floor(event.page.size / 2);
    $('.owl-item').each(function(index) {
      if (index < center) {
        $(this).addClass('left-item');
      } else if (index > center) {
        $(this).addClass('right-item');
      }
    });
  });

  // ⛔ Stop autoplay on arrow click
  $('.project-prev, .project-next').on('click', function() {
    projectSlider.trigger('stop.owl.autoplay');
    // Then move carousel
    if ($(this).hasClass('project-prev')) {
      projectSlider.trigger('prev.owl.carousel');
    } else {
      projectSlider.trigger('next.owl.carousel');
    }
  });
});






