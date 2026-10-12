/* =====================================================
           CHATBOT
        ====================================================== */

        const chatbot =
            document.getElementById(
                "chatbot"
            );


        const chatAvatar =
            document.getElementById(
                "chatAvatar"
            );


        const chatClose =
            document.getElementById(
                "chatClose"
            );


        const chatInput =
            document.getElementById(
                "chatInput"
            );


        const chatSend =
            document.getElementById(
                "chatSend"
            );


        const chatBody =
            document.getElementById(
                "chatBody"
            );


        chatAvatar.addEventListener(
            "click",
            () => {

                chatbot.classList.toggle(
                    "active"
                );

                chatbot.classList.add(
                    "open"
                );

                document.querySelector(
                    ".chat-message"
                ).style.display = "none";

            }
        );


        chatClose.addEventListener(
            "click",
            () => {

                chatbot.classList.remove(
                    "active"
                );

                chatbot.classList.remove(
                    "open"
                );

            }
        );



        /* =====================================================
           CHAT RESPONSES
        ====================================================== */

        function getBotResponse(
            question
        ) {

            const q =
                question.toLowerCase();


            if (
                q.includes("project") ||
                q.includes("facemorph")
            ) {

                return `
                    The featured project on this
                    website is <strong>FaceMorph</strong>,
                    a Computer Vision project using
                    Python, OpenCV and MediaPipe.
                `;
            }


            if (
                q.includes("research") ||
                q.includes("area")
            ) {

                return `
                    The research areas include
                    Artificial Intelligence, Deep Learning,
                    Computer Vision, Medical Imaging,
                    Image Processing and intelligent
                    transportation.
                `;
            }


            if (
                q.includes("learn") ||
                q.includes("course") ||
                q.includes("python")
            ) {

                return `
                    The Learning Hub covers Python,
                    Machine Learning, Deep Learning,
                    Digital Image Processing,
                    Computer Vision, Object Detection,
                    Generative AI and ADAS.
                `;
            }


            if (
                q.includes("publication") ||
                q.includes("paper")
            ) {

                return `
                    You can explore selected publications
                    covering medical imaging, ADAS,
                    computer vision and deep learning
                    in the Publications section.
                `;
            }


            if (
                q.includes("blog")
            ) {

                return `
                    The AI Blog contains practical articles
                    on Ensemble Learning, Transformers,
                    YOLO, Vision Transformers, Generative AI,
                    Deepfakes and more.
                `;
            }


            if (
                q.includes("contact") ||
                q.includes("email")
            ) {

                return `
                    Please use the Contact page from
                    the navigation menu to get in touch.
                `;
            }


            return `
                I can help you explore the website.
                Try asking about research, projects,
                FaceMorph, publications, blog or learning.
            `;
        }



        function addMessage(
            message,
            type
        ) {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                type === "user"
                    ? "user-message"
                    : "bot-message";

            div.innerHTML =
                message;

            chatBody.appendChild(
                div
            );

            chatBody.scrollTop =
                chatBody.scrollHeight;
        }



        function sendChat() {

            const question =
                chatInput.value.trim();


            if (!question) return;


            addMessage(
                question,
                "user"
            );


            chatInput.value = "";


            setTimeout(
                () => {

                    addMessage(
                        getBotResponse(
                            question
                        ),
                        "bot"
                    );

                },
                450
            );
        }


        chatSend.addEventListener(
            "click",
            sendChat
        );


        chatInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {

                    sendChat();

                }

            }
        );



        /* =====================================================
           MOBILE CHAT
        ====================================================== */

        document.addEventListener(
            "click",
            event => {

                if (
                    !chatbot.contains(
                        event.target
                    )
                ) {

                    chatbot.classList.remove(
                        "active"
                    );

                }

            }
        );



    /* =========================================================

       MOBILE NAVIGATION

       ========================================================= */

    const menuToggle =

      document.getElementById("menuToggle");

    const navLinks =

      document.getElementById("navLinks");



    if (menuToggle && navLinks) {



      menuToggle.addEventListener(

        "click",

        () => {

          const isOpen =

            navLinks.classList.toggle("open");



          menuToggle.setAttribute(

            "aria-expanded",

            String(isOpen)

          );



          menuToggle.setAttribute(

            "aria-label",

            isOpen

              ? "Close navigation"

              : "Open navigation"

          );



          menuToggle.textContent =

            isOpen

              ? "×"

              : "☰";

        }

      );



      navLinks

        .querySelectorAll("a")

        .forEach(link => {

          link.addEventListener(

            "click",

            () => {

              navLinks.classList.remove(

                "open"

              );



              menuToggle.setAttribute(

                "aria-expanded",

                "false"

              );



              menuToggle.setAttribute(

                "aria-label",

                "Open navigation"

              );



              menuToggle.textContent =

                "☰";

            }

          );

        });

    }



    /* =========================================================

       SCROLL REVEAL

       ONLY OPACITY — NO POSITION MOVEMENT

       ========================================================= */

    const revealElements =

      document.querySelectorAll(".reveal");



    if (

      "IntersectionObserver"

      in window

    ) {



      const revealObserver =

        new IntersectionObserver(

          entries => {

            entries.forEach(entry => {

              if (

                entry.isIntersecting

              ) {

                entry.target.classList.add(

                  "visible"

                );



                revealObserver.unobserve(

                  entry.target

                );

              }

            });

          },

          {

            threshold: 0.10

          }

        );



      revealElements.forEach(

        element => {

          revealObserver.observe(

            element

          );

        }

      );



    } else {

      /* Fallback for older browsers */

      revealElements.forEach(

        element => {

          element.classList.add(

            "visible"

          );

        }

      );

    }



    /* =========================================================

       CURRENT YEAR

       ========================================================= */

    const yearElement =

      document.getElementById("year");



    if (yearElement) {

      yearElement.textContent =

        new Date().getFullYear();

    }



    /* =========================================================

       ACTIVE NAVIGATION

       ========================================================= */

    const currentPage =

      window.location.pathname

        .split("/")

        .pop() || "index.html";



    document

      .querySelectorAll(".nav-links a")

      .forEach(link => {

        const href =

          link.getAttribute("href");



        if (

          href === currentPage

        ) {

          link.classList.add(

            "active"

          );

        }

      });



    /* =========================================================

       ESCAPE KEY CLOSES MOBILE MENU

       ========================================================= */

    document.addEventListener(

      "keydown",

      event => {

        if (

          event.key === "Escape"

          &&

          navLinks

        ) {

          navLinks.classList.remove(

            "open"

          );



          menuToggle?.setAttribute(

            "aria-expanded",

            "false"

          );



          menuToggle?.setAttribute(

            "aria-label",

            "Open navigation"

          );



          if (menuToggle) {

            menuToggle.textContent =

              "☰";

          }

        }

      }

    );



    /* =========================================================

       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE

       ========================================================= */

    document.addEventListener(

      "click",

      event => {

        if (

          !navLinks ||

          !menuToggle

        ) {

          return;

        }



        const clickedInsideNav =

          navLinks.contains(event.target);



        const clickedButton =

          menuToggle.contains(event.target);



        if (

          !clickedInsideNav &&

          !clickedButton

        ) {

          navLinks.classList.remove(

            "open"

          );



          menuToggle.setAttribute(

            "aria-expanded",

            "false"

          );



          menuToggle.setAttribute(

            "aria-label",

            "Open navigation"

          );



          menuToggle.textContent =

            "☰";

        }

      }

    );

/* =====================================================
   SELECTED PUBLICATIONS — NEWEST YEAR FIRST
   Keeps the homepage publication cards in descending
   chronological order whenever the page loads.
====================================================== */
(function sortSelectedPublicationsNewestFirst() {
  const publicationList = document.querySelector('.publication-list');
  if (!publicationList) return;

  const cards = Array.from(publicationList.querySelectorAll(':scope > .publication'));
  cards.sort((a, b) => {
    const yearA = Number(a.querySelector('.publication-year')?.textContent.trim()) || 0;
    const yearB = Number(b.querySelector('.publication-year')?.textContent.trim()) || 0;
    return yearB - yearA;
  });

  cards.forEach(card => publicationList.appendChild(card));
})();
