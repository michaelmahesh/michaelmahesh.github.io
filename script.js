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
  ".profile-link, .highlight-card, .course-card, .info-card, .list-card, .journal-list div, .research-impact div, .blog-card"
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

// Automatically load Medium blog posts
const blogContainer = document.getElementById("blogPosts");

const mediumRSS =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@michaelmahesh";

async function loadMediumPosts() {
  try {
    const response = await fetch(mediumRSS);
    const data = await response.json();

    blogContainer.innerHTML = "";

    // Change this number if you want more or fewer posts
    const postsToShow = data.items.slice(0, 6);

    postsToShow.forEach(post => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = post.description;

      const plainText = tempDiv.textContent || tempDiv.innerText || "";
      const shortDescription = plainText.substring(0, 140) + "...";

      const publishedDate = new Date(post.pubDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });

      const blogCard = document.createElement("article");
      blogCard.className = "blog-card hidden-item";

      blogCard.innerHTML = `
        <span class="blog-tag">Medium Article</span>
        <h3>${post.title}</h3>
        <span class="blog-date">Published: ${publishedDate}</span>
        <p>${shortDescription}</p>
        <a href="${post.link}" target="_blank" class="blog-btn">Read More</a>
      `;

      blogContainer.appendChild(blogCard);
    });

    // Add animation to loaded blog cards
    document.querySelectorAll(".blog-card").forEach(item => {
      observer.observe(item);
    });

  } catch (error) {
    blogContainer.innerHTML = `
      <p class="blog-loading">
        Unable to load blog posts now. Please visit my Medium profile.
      </p>
    `;
  }
}

if (blogContainer) {
  loadMediumPosts();
}
