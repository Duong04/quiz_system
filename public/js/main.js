// -----------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const dot = document.querySelector(".mouse-trail");
  
    document.addEventListener("mousemove", function(e) {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
    });
});

// -----------------------------------

const headerMain = document.querySelector('header');
const linkChange = document.querySelector('.link-change');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    headerMain.classList.add('header-fixed');
    linkChange.style.display = 'block';
    headerMain.style.top = '0';
} else if (window.scrollY < 200) {
    headerMain.classList.remove('header-fixed');
    linkChange.style.display = 'none';
    headerMain.style.top = '-100px';
}
});

// ------------------------------------

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


// -----------------------------------

const collapse = document.querySelectorAll('.collapses');
collapse.forEach( item => {
  item.addEventListener('click', () => {
    const ariaExpanded = item.getAttribute('aria-expanded');
    if (ariaExpanded == 'true') {
      item.classList.add('bg-primary-c');
      item.querySelector('.bi').className = 'bi bi-arrow-down-circle-fill fs-4';
    }else {
      item.classList.remove('bg-primary-c');
      item.querySelector('.bi').className = 'bi bi-arrow-right-circle-fill fs-4 text-primary';
    }
  })
})

// ------------------------------------

new WOW().init();

// ----------------------------------

$('.slider-quiz').slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow:"<button type='button' class='slick-prev pull-left'><i class='bi bi-chevron-left'></i></button>",
  nextArrow:"<button type='button' class='slick-next pull-right'><i class='bi bi-chevron-right'></i></button>"
});