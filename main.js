//////////// TARIFS ////////////

const slides = document.querySelectorAll(".tarifs-slide");
const types = document.querySelectorAll(".tarif-type");
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("hidden", i !== index);
  });
  types.forEach((type, i) => {
    type.classList.toggle("glass-card", i === index);
    type.classList.toggle("font-white", i === index);
    type.classList.toggle("non-selected-tarif", i !== index);
  });
}

types.forEach((type, i) => {
  type.addEventListener("click", () => {
    currentIndex = i;
    showSlide(currentIndex);
  });
});

showSlide(currentIndex);