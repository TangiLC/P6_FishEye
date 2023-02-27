

// Open the Modal
function openLightbox() {
    document.getElementById("lightbox-Modal").style.display = "block";
    document.getElementsById("closeLightbox").focus({focusVisible: true});
  }
  
  // Close the Modal
  function closeLightbox() {
    document.getElementById("lightbox-Modal").style.display = "none";
  }
  
  let slideNb = 0;
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
    
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {slideNb = 1}
    if (n < 1) {slideNb = slides.length}
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideNb-1].style.display = "block";
    
  }


