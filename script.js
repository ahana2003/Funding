/* ------------------------------
   NAVIGATION MENU TOGGLE WITH FADE-IN/OUT
------------------------------ */
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const navLinks = document.querySelectorAll("[data-nav-link]");

navOpenBtn.addEventListener("click", () => {
  navbar.classList.add("active");
  navLinks.forEach((link, i) => {
    link.style.animation = `fadeIn 0.3s ease forwards ${i * 0.1}s`;
  });
});

navCloseBtn.addEventListener("click", () => {
  navLinks.forEach((link, i) => {
    link.style.animation = `fadeOut 0.2s ease forwards`;
  });
  setTimeout(() => navbar.classList.remove("active"), 200);
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach((link, i) => {
      link.style.animation = `fadeOut 0.2s ease forwards`;
    });
    setTimeout(() => navbar.classList.remove("active"), 200);
  });
});

/* ------------------------------
   TAB SWITCHING WITH FADE EFFECT
------------------------------ */
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContent = document.querySelector(".tab-content p.section-text");

const tabContents = [
  `But I must explain to you how all this mistaken denouncing pleasure and praising pain was born and I will give you a complete account of the system expoundmaster.`,
  `Our vision is to create a safe, green, and sustainable world for all animals through global awareness and community support.`,
  `Next plan includes expanding our reach, launching new rescue projects, and partnering with more global organizations.`
];

tabBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    tabContent.classList.remove("fadeIn");
    tabContent.classList.add("fadeOut");

    setTimeout(() => {
      tabContent.textContent = tabContents[index];
      tabContent.classList.remove("fadeOut");
      tabContent.classList.add("fadeIn");
    }, 300);
  });
});

/* ------------------------------
   DONATION PROGRESS BAR WITH COUNT-UP
------------------------------ */
const progressBoxes = document.querySelectorAll(".progress-box");

progressBoxes.forEach(box => {
  const progressBar = box.querySelector(".progress");
  const progressValue = parseInt(box.previousElementSibling.querySelector(".progress-value").value);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        progressBar.style.width = progressValue + "%";

        // Count-up animation
        let count = 0;
        const counter = setInterval(() => {
          if(count < progressValue){
            count++;
            progressBar.textContent = count + "%";
          } else {
            clearInterval(counter);
          }
        }, 15);

        observer.unobserve(box);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(box);
});

/* ------------------------------
   STICKY HEADER WITH SLIDE-DOWN
------------------------------ */
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if(window.scrollY > 50){
    if(!header.classList.contains("sticky")){
      header.classList.add("sticky");
      header.style.transform = "translateY(-20px)";
      header.style.transition = "transform 0.3s ease";
      setTimeout(() => header.style.transform = "translateY(0)", 50);
    }
  } else {
    header.classList.remove("sticky");
    header.style.transform = "";
  }
});

/* ------------------------------
   SCROLL EFFECTS: FADE IN + SCALE + ROTATE
------------------------------ */
const faders = document.querySelectorAll(".section, .features-item, .service-card, .donate-card, .testi-card, .event-card, .insta-post-item");

faders.forEach(fader => {
  fader.style.opacity = 0;
  fader.style.transform = "scale(0.95) rotate(-2deg)";
  fader.style.transition = "all 0.6s ease-out";
});

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("appear");
      entry.target.style.opacity = 1;
      entry.target.style.transform = "scale(1) rotate(0deg)";
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

/* ------------------------------
   KEYFRAMES FOR FADE IN/OUT
------------------------------ */
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px);}
  to { opacity: 1; transform: translateY(0);}
}
@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0);}
  to { opacity: 0; transform: translateY(10px);}
}
.fadeIn { animation: fadeIn 0.4s ease forwards; }
.fadeOut { animation: fadeOut 0.3s ease forwards; }
`;
document.head.appendChild(style);