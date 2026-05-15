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
  ".profile-link, .highlight-card, .course-card, .info-card, .list-card, .journal-list div, .research-impact div, .medium-blog-card"
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

// Automatically load Medium blog posts in Medium-style layout
const blogContainer = document.getElementById("blogPosts");

const mediumRSS =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@michaelmahesh";

function getFirstImageFromHTML(html) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const img = tempDiv.querySelector("img");
  return img ? img.src : "https://miro.medium.com/v2/resize:fit:720/format:webp/1*Qy7B6XJfXw4Q2JqLxYbWAA.jpeg";
}

function getPlainDescription(html) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const plainText = tempDiv.textContent || tempDiv.innerText || "";
  return plainText.length > 160
    ? plainText.substring(0, 160) + "..."
    : plainText;
}

async function loadMediumPosts() {
  if (!blogContainer) return;

  try {
    const response = await fetch(mediumRSS);
    const data = await response.json();

    blogContainer.innerHTML = "";

    // Show all posts automatically
    const postsToShow = data.items;

    postsToShow.forEach(post => {
      const imageUrl = getFirstImageFromHTML(post.description);
      const shortDescription = getPlainDescription(post.description);

      const publishedDate = new Date(post.pubDate).toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      const blogCard = document.createElement("a");
      blogCard.className = "medium-blog-card hidden-item";
      blogCard.href = post.link;
      blogCard.target = "_blank";
      blogCard.rel = "noopener noreferrer";
      
      blogCard.innerHTML = `
      <div class="medium-blog-content">
        <div class="medium-author">
          <span class="medium-avatar">M</span>
          <span class="medium-author-name">Michael Mahesh K</span>
          <span class="medium-date">· ${publishedDate}</span>
        </div>

        <h3>${post.title}</h3>

        <p>${shortDescription}</p>

        <div class="medium-blog-actions">
          <span class="medium-clap">👏</span>
          <span class="medium-read-text">Read on Medium</span>
          <span class="medium-save">♡</span>
        </div>
      </div>

      <img src="${imageUrl}" alt="${post.title}" class="medium-blog-image">
    `;

      blogContainer.appendChild(blogCard);
    });

    // Add reveal animation to loaded blog cards
    document.querySelectorAll(".medium-blog-card").forEach(item => {
      if (typeof observer !== "undefined") {
        observer.observe(item);
      }
    });

  } catch (error) {
    blogContainer.innerHTML = `
      <p class="blog-loading">
        Unable to load blog posts now. Please visit my Medium profile.
      </p>
    `;
  }
}

loadMediumPosts();
