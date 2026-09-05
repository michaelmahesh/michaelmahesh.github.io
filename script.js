/* =========================================================
   Dr. K. Michael Mahesh — AI & Computer Vision Platform
   Phase 1 — Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. CURRENT YEAR
       ===================================================== */

    const yearElements = document.querySelectorAll("[data-year], #current-year");

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       2. MOBILE NAVIGATION
       ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("show");

            menuBtn.classList.toggle("active", isOpen);
            menuBtn.setAttribute("aria-expanded", isOpen);

        });


        // Close menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("show");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");

            });

        });


        // Close menu when clicking outside
        document.addEventListener("click", (event) => {

            if (
                navLinks.classList.contains("show") &&
                !navLinks.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                navLinks.classList.remove("show");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");

            }

        });

    }


    /* =====================================================
       3. ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if (sections.length && navigationLinks.length) {

        const updateActiveNavigation = () => {

            const scrollPosition = window.scrollY + 140;

            let currentSection = "";

            sections.forEach((section) => {

                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionTop + sectionHeight
                ) {
                    currentSection = section.getAttribute("id");
                }

            });

            navigationLinks.forEach((link) => {

                link.classList.remove("active");

                const href = link.getAttribute("href");

                if (href === `#${currentSection}`) {
                    link.classList.add("active");
                }

            });

        };

        window.addEventListener(
            "scroll",
            updateActiveNavigation,
            { passive: true }
        );

        updateActiveNavigation();

    }


    /* =====================================================
       4. SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbar = document.querySelector(".navbar");

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       5. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        `
        .reveal,
        .section-header,
        .stat-card,
        .research-stat,
        .topic-card,
        .article-card,
        .tutorial-card,
        .research-card,
        .project-card,
        .learning-card,
        .publication-card,
        .profile-card,
        .about-card,
        .code-card,
        .method-box,
        .result-box,
        .note-box,
        .warning-box
        `
    );

    if ("IntersectionObserver" in window && revealElements.length) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element, index) => {

            element.classList.add("reveal");

            // Small stagger effect
            const delay = Math.min(index % 6, 5) * 70;

            element.style.setProperty(
                "--reveal-delay",
                `${delay}ms`
            );

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       6. NAVBAR SHADOW ON SCROLL
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        const updateNavbar = () => {

            if (window.scrollY > 20) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        };

        window.addEventListener(
            "scroll",
            updateNavbar,
            { passive: true }
        );

        updateNavbar();

    }


    /* =====================================================
       7. BACK TO TOP BUTTON
       ===================================================== */

    let backToTop = document.querySelector(".back-to-top");

    if (!backToTop) {

        backToTop = document.createElement("button");

        backToTop.className = "back-to-top";
        backToTop.type = "button";
        backToTop.setAttribute(
            "aria-label",
            "Back to top"
        );

        backToTop.innerHTML = "↑";

        document.body.appendChild(backToTop);

    }

    const updateBackToTop = () => {

        if (window.scrollY > 600) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    };

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       8. COPY CODE BUTTONS
       ===================================================== */

    document.querySelectorAll(".code-block").forEach((codeBlock) => {

        const wrapper = codeBlock.closest(".code-card") || codeBlock.parentElement;

        if (!wrapper) {
            return;
        }

        if (wrapper.querySelector(".copy-code-btn")) {
            return;
        }

        const button = document.createElement("button");

        button.className = "copy-code-btn";
        button.type = "button";
        button.textContent = "Copy";

        wrapper.style.position = "relative";

        wrapper.appendChild(button);

        button.addEventListener("click", async () => {

            const code = codeBlock.innerText;

            try {

                await navigator.clipboard.writeText(code);

                button.textContent = "Copied!";

                setTimeout(() => {
                    button.textContent = "Copy";
                }, 1800);

            } catch (error) {

                // Fallback for older browsers
                const textarea =
                    document.createElement("textarea");

                textarea.value = code;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";

                document.body.appendChild(textarea);

                textarea.select();

                try {
                    document.execCommand("copy");
                    button.textContent = "Copied!";
                } catch (copyError) {
                    button.textContent = "Select & Copy";
                }

                document.body.removeChild(textarea);

                setTimeout(() => {
                    button.textContent = "Copy";
                }, 1800);

            }

        });

    });


    /* =====================================================
       9. EXTERNAL LINKS
       ===================================================== */

    document
        .querySelectorAll('a[href^="http"]')
        .forEach((link) => {

            const currentHost = window.location.hostname;

            try {

                const linkHost =
                    new URL(link.href).hostname;

                if (
                    linkHost &&
                    linkHost !== currentHost
                ) {

                    link.setAttribute(
                        "target",
                        "_blank"
                    );

                    link.setAttribute(
                        "rel",
                        "noopener noreferrer"
                    );

                }

            } catch (error) {
                // Ignore invalid URLs
            }

        });


    /* =====================================================
       10. IMAGE LAZY LOADING
       ===================================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            if (!image.hasAttribute("loading")) {
                image.setAttribute(
                    "loading",
                    "lazy"
                );
            }

            if (!image.hasAttribute("decoding")) {
                image.setAttribute(
                    "decoding",
                    "async"
                );
            }

        });


    /* =====================================================
       11. CARD KEYBOARD ACCESSIBILITY
       ===================================================== */

    document
        .querySelectorAll(
            ".topic-card, .article-card, .project-card, .learning-card"
        )
        .forEach((card) => {

            if (card.tagName.toLowerCase() === "a") {

                card.addEventListener("keydown", (event) => {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();
                        card.click();

                    }

                });

            }

        });


    /* =====================================================
       12. EXTERNAL ARTICLE FILTER
       ===================================================== */

    const articleFilter = document.querySelector(
        "#article-filter"
    );

    const articleCards = document.querySelectorAll(
        "[data-category]"
    );

    if (articleFilter && articleCards.length) {

        articleFilter.addEventListener(
            "change",
            () => {

                const selected =
                    articleFilter.value;

                articleCards.forEach((card) => {

                    const category =
                        card.dataset.category;

                    if (
                        selected === "all" ||
                        category === selected
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";

                    }

                });

            }
        );

    }


    /* =====================================================
       13. SIMPLE SEARCH
       ===================================================== */

    const searchInput = document.querySelector(
        "#site-search"
    );

    const searchableItems = document.querySelectorAll(
        `
        .topic-card,
        .article-card,
        .tutorial-card,
        .research-card,
        .project-card,
        .publication-card
        `
    );

    if (searchInput && searchableItems.length) {

        searchInput.addEventListener(
            "input",
            () => {

                const query =
                    searchInput.value
                        .trim()
                        .toLowerCase();

                searchableItems.forEach((item) => {

                    const text =
                        item.textContent
                            .toLowerCase();

                    if (
                        !query ||
                        text.includes(query)
                    ) {

                        item.style.display = "";

                    } else {

                        item.style.display = "none";

                    }

                });

            }
        );

    }


    /* =====================================================
       14. PUBLICATION YEAR FILTER
       ===================================================== */

    const publicationFilter =
        document.querySelector(
            "#publication-year"
        );

    const publicationItems =
        document.querySelectorAll(
            "[data-publication-year]"
        );

    if (
        publicationFilter &&
        publicationItems.length
    ) {

        publicationFilter.addEventListener(
            "change",
            () => {

                const selected =
                    publicationFilter.value;

                publicationItems.forEach((item) => {

                    const year =
                        item.dataset.publicationYear;

                    if (
                        selected === "all" ||
                        year === selected
                    ) {

                        item.style.display = "";

                    } else {

                        item.style.display = "none";

                    }

                });

            }
        );

    }


    /* =====================================================
       15. RESEARCH TAG INTERACTION
       ===================================================== */

    document
        .querySelectorAll(".research-tag")
        .forEach((tag) => {

            tag.addEventListener("click", () => {

                const value =
                    tag.dataset.tag;

                if (!value) {
                    return;
                }

                const search =
                    document.querySelector(
                        "#site-search"
                    );

                if (search) {

                    search.value = value;

                    search.dispatchEvent(
                        new Event("input")
                    );

                    search.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

            });

        });


    /* =====================================================
       16. YEAR IN PUBLICATIONS
       ===================================================== */

    document
        .querySelectorAll("[data-auto-year]")
        .forEach((element) => {

            const year =
                element.dataset.autoYear;

            if (year) {
                element.textContent = year;
            }

        });


    /* =====================================================
       17. REDUCE MOTION SUPPORT
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (prefersReducedMotion.matches) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }


    /* =====================================================
       18. CONSOLE BRANDING
       ===================================================== */

    console.log(
        "%cDr. K. Michael Mahesh",
        "font-size:18px;font-weight:bold;"
    );

    console.log(
        "%cArtificial Intelligence • Computer Vision • Deep Learning",
        "font-size:13px;"
    );

});
