document.addEventListener("DOMContentLoaded", function() {
    const dot = document.querySelector(".mouse-trail");
  
    document.addEventListener("mousemove", function(e) {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
    });
});


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