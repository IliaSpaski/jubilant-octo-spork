function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove('active-content');
        tabcontent[i].classList.add('hidden-content');


      tabcontent[i].style.display = "none";
    }
   
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    const activeContent = document.getElementById(cityName);
    activeContent.style.display = "block";

      activeContent.classList.remove('hidden-content');

      setTimeout(() => {
        activeContent.classList.add('active-content');
      },300)
     

    evt.currentTarget.className += " active";
  }

  AOS.init();


 // preloader
  window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
    }, 500);
  }

var toggle = document.getElementById("theme-toggle");
var body = document.getElementsByTagName("body")[0];

toggle.addEventListener('change', function() {
  if (this.checked) {
    body.setAttribute('data-theme', 'dark');
  } else {
    body.setAttribute('data-theme', 'light');
  }
});