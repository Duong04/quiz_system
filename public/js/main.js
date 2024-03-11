document.addEventListener("DOMContentLoaded", function() {
    const dot = document.querySelector(".mouse-trail");
  
    document.addEventListener("mousemove", function(e) {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
    });
  });