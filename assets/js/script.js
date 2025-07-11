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

$(document).ready(function () {
  const projectSlider = $("#project-slider");

  // Apply tilt classes on init
  projectSlider.on("initialized.owl.carousel", function (event) {
    const $items = $(this).find(".owl-item");
    const centerIndex = $items.index($items.filter(".center"));

    $items.removeClass("left-item right-item");
    $items.each(function (i) {
      if (i < centerIndex) {
        $(this).addClass("left-item");
      } else if (i > centerIndex) {
        $(this).addClass("right-item");
      }
    });
  });

  // Initialize Owl Carousel
  projectSlider.owlCarousel({
    items: 3,
    loop: true,
    center: true,
    margin: 32,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  });

  // Apply tilt classes on slide change
  projectSlider.on("changed.owl.carousel", function (event) {
    const $items = $(this).find(".owl-item");
    const centerIndex = event.item.index + Math.floor(event.page.size / 2);

    $items.removeClass("left-item right-item");
    $items.each(function (index) {
      if (index < centerIndex) {
        $(this).addClass("left-item");
      } else if (index > centerIndex) {
        $(this).addClass("right-item");
      }
    });
  });

  // Stop autoplay if arrow is clicked inside center tile
  $(".project-prev, .project-next").on("click", function () {
    const $arrow = $(this);
    const $centerTile = projectSlider.find(".owl-item.center");

    // Check if arrow is inside the center tile
    if ($centerTile.has($arrow).length > 0) {
      projectSlider.trigger("stop.owl.autoplay");
    }

    // Move carousel
    if ($arrow.hasClass("project-prev")) {
      projectSlider.trigger("prev.owl.carousel");
    } else {
      projectSlider.trigger("next.owl.carousel");
    }
  });

  // Stop autoplay on clicking PDF links
  $("#project-slider").on("click", '.project-card a[href$=".pdf"]', function () {
    projectSlider.trigger("stop.owl.autoplay");
  });
});


