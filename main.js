//////////// NAVBAR ////////////

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

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

//////////// OPEN / SOON / CLOSED ////////////

const schedule = {
  0: [{ open: 14, close: 17 }],
  3: [{ open: 14, close: 17 }],
  5: [{ open: 21, close: 23.999 }],
  6: [
    { open: 14, close: 17 },
    { open: 21, close: 23.999 }
  ]
};

function getOpeningStatus() {
  const now = new Date();
  const day = now.getDay();
  
  const currentTime = now.getHours() + now.getMinutes() / 60;

  const today = schedule[day];

  if (!today || today.length === 0) {
    return { text: "Fermé", class: "closed" };
  }

  for (const slot of today) {
    if (currentTime >= slot.open && currentTime < slot.close) {
      
      if (currentTime >= slot.close - 0.5) {
        return { text: "Ferme bientôt", class: "soon" };
      }

      return { text: "Ouvert", class: "open" };
    }
  }

  return { text: "Fermé", class: "closed" };
}

function displayStatus() {
  const status = getOpeningStatus();

  const container = document.querySelector("#status");
  const dot = container.querySelector(".dot");
  const text = container.querySelector(".text");

  dot.className = "dot " + status.class;
  text.textContent = status.text;

  const time_dot = document.querySelector(".time-dot");
  time_dot.className = "time-dot dot " + status.class;
}

displayStatus();

// mise à jour toutes les 10 minutes
setInterval(displayStatus, 10 * 60 * 1000);


//////////// ANIMATIONS ////////////

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('.animate-on-scroll');
      children.forEach((child, i) => {
        child.style.animationDelay = `${i * 0.3}s`; 
        child.classList.add('visible');
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 }); 

document.querySelectorAll('.scroll-section').forEach(section => {
  observer.observe(section);
});