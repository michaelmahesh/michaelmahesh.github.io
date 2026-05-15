// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth reveal animation
const revealItems = document.querySelectorAll(
  ".profile-link, .highlight-card, .course-card, .info-card, .list-card, .journal-list div, .research-impact div"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-item");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealItems.forEach(item => {
  item.classList.add("hidden-item");
  observer.observe(item);
});
