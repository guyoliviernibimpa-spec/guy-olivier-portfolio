/* =========================================================
   GUY-OLIVIER NIBIMPA — PORTFOLIO
   script.js
========================================================= */


/* =========================================================
   01. ELEMENTS PRINCIPAUX
========================================================= */

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".navigation");
const navLinks = document.querySelectorAll(".navigation a");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");
const yearElement = document.getElementById("year");


/* =========================================================
   02. HEADER AU SCROLL
========================================================= */

function updateHeader() {

  if (!header) return;

  header.classList.toggle(
    "scrolled",
    window.scrollY > 15
  );

}


updateHeader();

window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true
  }
);


/* =========================================================
   03. MENU MOBILE
========================================================= */

function openMenu() {

  if (!menuButton || !navigation) return;

  navigation.classList.add("open");

  menuButton.setAttribute(
    "aria-expanded",
    "true"
  );

  menuButton.setAttribute(
    "aria-label",
    "Fermer le menu"
  );

  document.body.classList.add(
    "menu-open"
  );

}


function closeMenu() {

  if (!menuButton || !navigation) return;

  navigation.classList.remove("open");

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.setAttribute(
    "aria-label",
    "Ouvrir le menu"
  );

  document.body.classList.remove(
    "menu-open"
  );

}


function toggleMenu() {

  if (!navigation) return;

  const menuIsOpen =
    navigation.classList.contains("open");

  if (menuIsOpen) {

    closeMenu();

  } else {

    openMenu();

  }

}


if (menuButton) {

  menuButton.addEventListener(
    "click",
    toggleMenu
  );

}


/* =========================================================
   04. FERMER LE MENU APRÈS UN CLIC
========================================================= */

navLinks.forEach(link => {

  link.addEventListener(
    "click",
    () => {

      closeMenu();

    }
  );

});


/* =========================================================
   05. FERMER LE MENU AVEC ÉCHAP
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeMenu();

    }

  }
);


/* =========================================================
   06. RESET MENU SI ON REPASSE SUR DESKTOP
========================================================= */

window.addEventListener(
  "resize",
  () => {

    if (window.innerWidth > 900) {

      closeMenu();

    }

  }
);


/* =========================================================
   07. ANIMATIONS AU SCROLL
========================================================= */

if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

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
        threshold: 0.12,
        rootMargin:
          "0px 0px -40px 0px"
      }

    );


  revealElements.forEach(element => {

    revealObserver.observe(
      element
    );

  });

} else {

  /*
    Sécurité pour les anciens navigateurs :
    le contenu reste visible même si
    IntersectionObserver n'est pas disponible.
  */

  revealElements.forEach(element => {

    element.classList.add(
      "visible"
    );

  });

}


/* =========================================================
   08. LIEN ACTIF DANS LA NAVIGATION
========================================================= */

if (
  "IntersectionObserver" in window &&
  sections.length > 0
) {

  const sectionObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          const currentId =
            entry.target.getAttribute("id");


          navLinks.forEach(link => {

            const linkTarget =
              link.getAttribute("href");


            link.classList.toggle(

              "active",

              linkTarget ===
              `#${currentId}`

            );

          });

        });

      },

      {
        rootMargin:
          "-35% 0px -55% 0px",

        threshold: 0
      }

    );


  sections.forEach(section => {

    sectionObserver.observe(
      section
    );

  });

}


/* =========================================================
   09. ANNÉE AUTOMATIQUE
========================================================= */

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}


/* =========================================================
   10. SCROLL PROPRE POUR LES ANCRES
========================================================= */

document.querySelectorAll(
  'a[href^="#"]'
).forEach(anchor => {

  anchor.addEventListener(
    "click",
    event => {

      const targetId =
        anchor.getAttribute("href");


      if (
        !targetId ||
        targetId === "#"
      ) {

        return;

      }


      const target =
        document.querySelector(
          targetId
        );


      if (!target) return;


      event.preventDefault();


      const headerHeight =
        header
          ? header.offsetHeight
          : 0;


      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        15;


      window.scrollTo({

        top: targetPosition,

        behavior: "smooth"

      });

    }

  );

});


/* =========================================================
   11. CHARGEMENT INITIAL
========================================================= */

window.addEventListener(
  "load",
  () => {

    /*
      Rend immédiatement visibles
      les éléments déjà présents
      dans la zone visible au chargement.
    */

    revealElements.forEach(element => {

      const rect =
        element.getBoundingClientRect();


      if (
        rect.top <
        window.innerHeight * 0.95
      ) {

        element.classList.add(
          "visible"
        );

      }

    });

  }
);
