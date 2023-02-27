// Open the Modal
function openLightbox() {
    document.getElementById("lightbox-Modal").style.display = "block";
  }
  
  // Close the Modal
  function closeLightbox() {
    document.getElementById("lightbox-Modal").style.display = "none";
  }
  
  var slideNb = 0;
  showSlides(slideNb);
  
  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideNb += n);
  }
  
  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideNb = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {slideNb = 1}
    if (n < 0) {slideNb = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideNb-1].style.display = "block";
    dots[slideNb-1].className += " active";
    captionText.innerHTML = dots[slideNb-1].alt;
  }


