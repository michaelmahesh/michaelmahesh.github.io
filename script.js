/* =========================================================
   DR. K. MICHAEL MAHESH – ACADEMIC PORTFOLIO
   COMPLETE JAVASCRIPT
========================================================= */


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // Close mobile menu after clicking a navigation link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
}


/* =========================
   CURRENT YEAR IN FOOTER
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealItems = document.querySelectorAll(`
  .profile-link,
  .highlight-card,
  .college-image-card,
  .info-card,
  .list-card,
  .journal-list > div,
  .research-impact > div,
  .material-card,
  .teaching-note,
  .medium-blog-card,
  .contact-details
`);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-item");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealItems.forEach((item) => {
  item.classList.add("hidden-item");
  observer.observe(item);
});


/* =========================
   MEDIUM BLOG AUTO LOADER
========================= */

const blogContainer = document.getElementById("blogPosts");

/*
  Medium RSS feed through RSS2JSON
*/
const mediumRSS =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@michaelmahesh";


/* =========================
   GET FIRST IMAGE
========================= */

function getFirstImageFromHTML(html) {
  const tempDiv = document.createElement("div");

  tempDiv.innerHTML = html || "";

  const img = tempDiv.querySelector("img");

  return img
    ? img.src
    : "https://miro.medium.com/v2/resize:fit:720/format:webp/1*Qy7B6XJfXw4Q2JqLxYbWAA.jpeg";
}


/* =========================
   CLEAN BLOG DESCRIPTION
========================= */

function getPlainDescription(html) {
  const tempDiv = document.createElement("div");

  tempDiv.innerHTML = html || "";

  const plainText =
    tempDiv.textContent ||
    tempDiv.innerText ||
    "";

  const cleanedText = plainText.replace(/\s+/g, " ").trim();

  return cleanedText.length > 180
    ? cleanedText.substring(0, 180) + "..."
    : cleanedText;
}


/* =========================
   FORMAT DATE
========================= */

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}


/* =========================
   LOAD MEDIUM POSTS
========================= */

async function loadMediumPosts() {

  if (!blogContainer) return;

  try {

    const response = await fetch(mediumRSS);

    if (!response.ok) {
      throw new Error("Unable to load Medium posts.");
    }

    const data = await response.json();


    if (
      !data ||
      data.status !== "ok" ||
      !Array.isArray(data.items)
    ) {
      throw new Error("Invalid Medium feed.");
    }


    /* Clear loading message */

    blogContainer.innerHTML = "";


    /* Show all posts */

    const postsToShow = data.items;


    postsToShow.forEach((post) => {

      const imageUrl =
        getFirstImageFromHTML(post.description);

      const shortDescription =
        getPlainDescription(post.description);

      const publishedDate =
        formatDate(post.pubDate);


      /* Create blog card */

      const blogCard =
        document.createElement("a");

      blogCard.className =
        "medium-blog-card hidden-item";

      blogCard.href =
        post.link;

      blogCard.target =
        "_blank";

      blogCard.rel =
        "noopener noreferrer";


      /* Blog card content */

      blogCard.innerHTML = `

        <div class="medium-blog-content">

          <div class="medium-author">

            <span class="medium-avatar">
              M
            </span>

            <span class="medium-author-name">
              Michael Mahesh K
            </span>

            ${
              publishedDate
                ? `<span class="medium-date">
                    · ${publishedDate}
                  </span>`
                : ""
            }

          </div>


          <h3>
            ${post.title || "Untitled Article"}
          </h3>


          <p>
            ${shortDescription}
          </p>


          <div class="medium-blog-actions">

            <span class="medium-clap">
              👏
            </span>

            <span class="medium-read-text">
              Read on Medium
            </span>

            <span class="medium-save">
              ♡
            </span>

          </div>

        </div>


        <img
          src="${imageUrl}"
          alt="${post.title || "Medium article"}"
          class="medium-blog-image"
          loading="lazy"
        >

      `;


      /* Add card */

      blogContainer.appendChild(blogCard);


      /* Reveal animation */

      observer.observe(blogCard);

    });

  } catch (error) {

    console.error(
      "Medium posts could not be loaded:",
      error
    );


    /* Fallback message */

    blogContainer.innerHTML = `

      <div class="blog-loading">

        <p>
          Unable to load the latest articles at the moment.
        </p>

        <br>

        <a
          href="https://medium.com/@michaelmahesh"
          target="_blank"
          rel="noopener noreferrer"
          class="btn primary"
        >
          Visit My Medium Profile
        </a>

      </div>

    `;

  }

}


/* =========================
   INITIALIZE BLOG LOADING
========================= */

loadMediumPosts();
