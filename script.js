/* =========================================================
   GUY-OLIVIER NIBIMPA
   PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   HEADER AU SCROLL
========================================================= */

const header =
  document.querySelector(
    ".site-header"
  );


window.addEventListener(
  "scroll",
  () => {

    if (!header) {
      return;
    }


    header.classList.toggle(

      "scrolled",

      window.scrollY > 15

    );

  }
);


/* =========================================================
   MENU MOBILE
========================================================= */

const menuButton =
  document.querySelector(
    ".menu-button"
  );


const navigation =
  document.querySelector(
    ".navigation"
  );


if (
  menuButton &&
  navigation
) {


  menuButton.addEventListener(
    "click",
    () => {


      const menuOpen =
        navigation.classList.toggle(
          "open"
        );


      menuButton.setAttribute(

        "aria-expanded",

        menuOpen

      );


      document.body.classList.toggle(

        "menu-open",

        menuOpen

      );


    }
  );

}


/* =========================================================
   FERMER LE MENU APRÈS UN CLIC
========================================================= */

const navigationLinks =
  document.querySelectorAll(
    ".navigation a"
  );


navigationLinks.forEach(
  link => {


    link.addEventListener(
      "click",
      () => {


        if (navigation) {

          navigation.classList.remove(
            "open"
          );

        }


        if (menuButton) {

          menuButton.setAttribute(

            "aria-expanded",

            "false"

          );

        }


        document.body.classList.remove(
          "menu-open"
        );


      }
    );


  }
);


/* =========================================================
   ANIMATION DES ÉLÉMENTS
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


const observer =
  new IntersectionObserver(

    entries => {


      entries.forEach(
        entry => {


          if (
            entry.isIntersecting
          ) {


            entry.target.classList.add(
              "visible"
            );


          }


        }
      );


    },

    {

      threshold:
        0.12

    }

  );


revealElements.forEach(
  element => {

    observer.observe(
      element
    );

  }
);


/* =========================================================
   ANNÉE AUTOMATIQUE FOOTER
========================================================= */

const year =
  document.getElementById(
    "year"
  );


if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* =========================================================
   NAVIGATION ACTIVE
========================================================= */

const sections =
  document.querySelectorAll(
    "section[id]"
  );


const sectionObserver =
  new IntersectionObserver(

    entries => {


      entries.forEach(
        entry => {


          if (
            !entry.isIntersecting
          ) {

            return;

          }


          navigationLinks.forEach(
            link => {


              const target =
                link.getAttribute(
                  "href"
                );


              link.classList.toggle(

                "active",

                target ===
                "#" +
                entry.target.id

              );


            }
          );


        }
      );


    },

    {

      rootMargin:
        "-35% 0px -55% 0px",

      threshold:
        0

    }

  );


sections.forEach(
  section => {

    sectionObserver.observe(
      section
    );

  }
);
