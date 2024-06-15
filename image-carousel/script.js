const btnLeft = document.querySelector('.left-btn');
const btnRight = document.querySelector('.right-btn');
const frame = document.querySelector('.frame');
const dots = document.querySelectorAll('.dot');

let activeImage = 0;

const updateSlider = function () {
  dots.forEach((dot) => dot.classList.remove('active'));
  dots[activeImage].classList.add('active');
  frame.scrollLeft = activeImage * 400; // Image width
};

btnLeft.addEventListener('click', () => {
  if (activeImage > 0) {
    activeImage--;
    updateSlider();
  }
});

btnRight.addEventListener('click', () => {
  // Total images
  if (activeImage < 4) {
    activeImage++;
    updateSlider();
  }
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    activeImage = index;
    updateSlider();
  });
});

updateSlider();
