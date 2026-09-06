/* ============================================================
   Dr. K. Michael Mahesh
   Premium Light AI Research Website
   Interactive JavaScript
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------------------------------------
       CURRENT YEAR
    --------------------------------------------------------- */

    document.querySelectorAll("[data-year], #current-year").forEach(el => {
        el.textContent = new Date().getFullYear();
    });


    /* ---------------------------------------------------------
       MOBILE NAVIGATION
    --------------------------------------------------------- */

    const menuBtn =
        document.querySelector(".menu-btn") ||
        document.querySelector(".menu-toggle");

    const nav =
        document.querySelector(".nav-links") ||
        document.querySelector(".nav-menu");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            const open = nav.classList.toggle("show");

            menuBtn.classList.toggle("active", open);

            menuBtn.setAttribute(
                "aria-expanded",
                String(open)
            );

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("show");
                nav.classList.remove("open");

                menuBtn.classList.remove("active");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        document.addEventListener("click", event => {

            if (
                nav.classList.contains("show") &&
                !nav.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {

                nav.classList.remove("show");
                menuBtn.classList.remove("active");

            }

        });

    }


    /* ---------------------------------------------------------
       SMOOTH SCROLL
    --------------------------------------------------------- */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const id = link.getAttribute("href");

            if (!id || id === "#") return;

            const target = document.querySelector(id);

            if (!target) return;

            event.preventDefault();

            const header =
                document.querySelector(".site-header") ||
                document.querySelector(".navbar");

            const offset =
                header ? header.offsetHeight + 20 : 20;

            const position =
                target.getBoundingClientRect().top +
                window.scrollY -
                offset;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });

        });

    });


    /* ---------------------------------------------------------
       NAVBAR SCROLL EFFECT
    --------------------------------------------------------- */

    const header =
        document.querySelector(".site-header") ||
        document.querySelector(".navbar");

    const updateHeader = () => {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    };

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* ---------------------------------------------------------
       SCROLL REVEAL
    --------------------------------------------------------- */

    const revealElements = document.querySelectorAll(`
        section,
        .section-header,
        .domain-card,
        .article-card,
        .project-card,
        .learning-item,
        .resource-card,
        .publication-item,
        .metric-item,
        .academic-panel,
        .contact-item
    `);

    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        entry.target.classList.add(
                            "is-visible"
                        );

                        obs.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin: "0px 0px -60px 0px"
                }
            );

        revealElements.forEach((element, index) => {

            element.classList.add("reveal");

            element.style.setProperty(
                "--delay",
                `${Math.min(index % 6, 5) * 70}ms`
            );

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

    }


    /* ---------------------------------------------------------
       ACTIVE NAVIGATION
    --------------------------------------------------------- */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    if (sections.length && navLinks.length) {

        const updateActiveNav = () => {

            const scrollPosition =
                window.scrollY + 180;

            let current = "";

            sections.forEach(section => {

                const top = section.offsetTop;
                const height = section.offsetHeight;

                if (
                    scrollPosition >= top &&
                    scrollPosition < top + height
                ) {

                    current =
                        section.getAttribute("id");

                }

            });


            navLinks.forEach(link => {

                const href =
                    link.getAttribute("href");

                link.classList.toggle(
                    "active",
                    href === `#${current}`
                );

            });

        };


        window.addEventListener(
            "scroll",
            updateActiveNav,
            { passive: true }
        );

        updateActiveNav();

    }


    /* ---------------------------------------------------------
       ANIMATED COUNTERS
    --------------------------------------------------------- */

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );

    if (
        "IntersectionObserver" in window &&
        counters.length
    ) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        const element =
                            entry.target;

                        const target =
                            parseInt(
                                element.dataset.count,
                                10
                            );

                        if (Number.isNaN(target)) return;

                        animateCounter(
                            element,
                            target
                        );

                        counterObserver.unobserve(
                            element
                        );

                    });

                },
                {
                    threshold: 0.7
                }
            );


        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    }


    function animateCounter(element, target) {

        const duration = 1000;
        const start = performance.now();

        const update = currentTime => {

            const progress =
                Math.min(
                    (currentTime - start) / duration,
                    1
                );

            const eased =
                1 - Math.pow(1 - progress, 3);

            const value =
                Math.floor(target * eased);

            element.textContent = value;

            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                element.textContent = target;

            }

        };

        requestAnimationFrame(update);

    }


    /* ---------------------------------------------------------
       CARD TILT — VERY SUBTLE
    --------------------------------------------------------- */

    const interactiveCards =
        document.querySelectorAll(`
            .domain-card,
            .project-card,
            .resource-card,
            .article-card
        `);

    interactiveCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5) * -2;

                const rotateY =
                    ((x / rect.width) - 0.5) * 2;

                card.style.transform =
                    `translateY(-5px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* ---------------------------------------------------------
       BUTTON PRESS MICRO INTERACTION
    --------------------------------------------------------- */

    document
        .querySelectorAll(
            "a, button"
        )
        .forEach(element => {

            element.addEventListener(
                "mousedown",
                () => {

                    element.classList.add(
                        "pressed"
                    );

                }
            );


            element.addEventListener(
                "mouseup",
                () => {

                    element.classList.remove(
                        "pressed"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.classList.remove(
                        "pressed"
                    );

                }
            );

        });


    /* ---------------------------------------------------------
       FLASH NEWS ROTATION
    --------------------------------------------------------- */

    const flashItems =
        document.querySelectorAll(
            "[data-flash-news]"
        );

    if (flashItems.length > 1) {

        let current = 0;

        flashItems.forEach(
            (item, index) => {

                item.classList.toggle(
                    "active",
                    index === 0
                );

            }
        );


        setInterval(() => {

            flashItems[current]
                .classList.remove("active");

            current =
                (current + 1) %
                flashItems.length;

            flashItems[current]
                .classList.add("active");

        }, 4500);

    }


    /* ---------------------------------------------------------
       IMAGE LAZY LOADING
    --------------------------------------------------------- */

    document
        .querySelectorAll("img")
        .forEach(image => {

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


    /* ---------------------------------------------------------
       BACK TO TOP
    --------------------------------------------------------- */

    let backTop =
        document.querySelector(
            ".back-to-top"
        );

    if (!backTop) {

        backTop =
            document.createElement(
                "button"
            );

        backTop.className =
            "back-to-top";

        backTop.type =
            "button";

        backTop.setAttribute(
            "aria-label",
            "Back to top"
        );

        backTop.innerHTML =
            "↑";

        document.body.appendChild(
            backTop
        );

    }


    window.addEventListener(
        "scroll",
        () => {

            backTop.classList.toggle(
                "show",
                window.scrollY > 600
            );

        },
        { passive: true }
    );


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* ---------------------------------------------------------
       EXTERNAL LINKS
    --------------------------------------------------------- */

    document
        .querySelectorAll(
            'a[href^="http"]'
        )
        .forEach(link => {

            try {

                const url =
                    new URL(link.href);

                if (
                    url.hostname !==
                    window.location.hostname
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

                // Ignore invalid links

            }

        });


    /* ---------------------------------------------------------
       REDUCED MOTION
    --------------------------------------------------------- */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document.documentElement
            .classList.add(
                "reduce-motion"
            );

    }


    /* ---------------------------------------------------------
       CONSOLE MESSAGE
    --------------------------------------------------------- */

    console.log(
        "%cDr. K. Michael Mahesh",
        "font-size:18px;font-weight:700;"
    );

    console.log(
        "%cAI • Deep Learning • Computer Vision",
        "font-size:13px;"
    );

});
