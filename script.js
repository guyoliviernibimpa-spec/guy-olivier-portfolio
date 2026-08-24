/* =========================================================
   GUY-OLIVIER NIBIMPA — PREMIUM PORTFOLIO V3
========================================================= */


const body = document.body;

const header =
  document.querySelector(".site-header");

const menuToggle =
  document.querySelector(".menu-toggle");

const mobileMenu =
  document.querySelector(".mobile-menu");

const navLinks =
  document.querySelectorAll(
    '.desktop-nav a[href^="#"], .mobile-menu a[href^="#"]'
  );

const revealElements =
  document.querySelectorAll(".reveal");

const progressBar =
  document.getElementById("scrollProgress");

const year =
  document.getElementById("year");


const reduceMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;



/* =========================================================
   01. HEADER + BARRE DE PROGRESSION
========================================================= */

function onScroll() {

  const y =
    window.scrollY;


  /* HEADER */

  if (header) {

    header.classList.toggle(
      "scrolled",
      y > 20
    );

  }


  /* PROGRESSION */

  if (progressBar) {

    const maxScroll =
      document.documentElement.scrollHeight
      - window.innerHeight;


    const progress =
      maxScroll > 0
        ? Math.min(
            100,
            (y / maxScroll) * 100
          )
        : 0;


    progressBar.style.width =
      `${progress}%`;

  }

}


onScroll();


window.addEventListener(
  "scroll",
  onScroll,
  {
    passive: true
  }
);



/* =========================================================
   02. MENU MOBILE
========================================================= */

function closeMenu() {

  if (
    !menuToggle ||
    !mobileMenu
  ) {

    return;

  }


  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );


  menuToggle.setAttribute(
    "aria-label",
    "Ouvrir le menu"
  );


  mobileMenu.classList.remove(
    "open"
  );


  body.classList.remove(
    "menu-open"
  );

}



function toggleMenu() {

  if (
    !menuToggle ||
    !mobileMenu
  ) {

    return;

  }


  const isOpen =
    mobileMenu.classList.toggle(
      "open"
    );


  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );


  menuToggle.setAttribute(

    "aria-label",

    isOpen
      ? "Fermer le menu"
      : "Ouvrir le menu"

  );


  body.classList.toggle(
    "menu-open",
    isOpen
  );

}



if (menuToggle) {

  menuToggle.addEventListener(
    "click",
    toggleMenu
  );

}



if (mobileMenu) {

  mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        closeMenu
      );

    });

}



/* =========================================================
   03. FERMER LE MENU AVEC ESC
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeMenu();

    }

  }
);



/* =========================================================
   04. RESET DU MENU EN DESKTOP
========================================================= */

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth > 900
    ) {

      closeMenu();

    }

  }
);



/* =========================================================
   05. ANIMATIONS REVEAL
========================================================= */

if (
  reduceMotion ||
  !("IntersectionObserver" in window)
) {


  revealElements.forEach(
    element => {

      element.classList.add(
        "visible"
      );

    }
  );


} else {


  const revealObserver =
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


              revealObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },

      {

        threshold: 0.1,

        rootMargin:
          "0px 0px -50px 0px"

      }

    );


  revealElements.forEach(
    element => {

      revealObserver.observe(
        element
      );

    }
  );

}



/* =========================================================
   06. NAVIGATION ACTIVE
========================================================= */

const navSections = [

  ...document.querySelectorAll(
    "main section[id]"
  )

].filter(

  section =>

    [
      "profil",
      "experience",
      "projets",
      "recherche",
      "contact"
    ].includes(
      section.id
    )

);



if (
  "IntersectionObserver" in window
) {


  const sectionObserver =
    new IntersectionObserver(

      entries => {


        const visible =
          entries

            .filter(
              entry =>
                entry.isIntersecting
            )

            .sort(
              (a, b) =>
                b.intersectionRatio
                - a.intersectionRatio
            )[0];


        if (!visible) {

          return;

        }


        navLinks.forEach(
          link => {


            link.classList.toggle(

              "active",

              link.getAttribute(
                "href"
              ) ===
              `#${visible.target.id}`

            );

          }
        );

      },

      {

        rootMargin:
          "-35% 0px -55% 0px",

        threshold:
          [
            0,
            0.1,
            0.25,
            0.5
          ]

      }

    );


  navSections.forEach(
    section => {

      sectionObserver.observe(
        section
      );

    }
  );

}



/* =========================================================
   07. SCROLL FLUIDE AVEC OFFSET DU HEADER
========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(
    anchor => {


      anchor.addEventListener(

        "click",

        event => {


          const href =
            anchor.getAttribute(
              "href"
            );


          if (
            !href ||
            href === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              href
            );


          if (!target) {

            return;

          }


          event.preventDefault();


          const offset =
            (
              header
                ? header.offsetHeight
                : 0
            )
            + 14;


          const top =
            target
              .getBoundingClientRect()
              .top
            +
            window.scrollY
            -
            offset;


          window.scrollTo({

            top,

            behavior:
              reduceMotion
                ? "auto"
                : "smooth"

          });

        }

      );

    }

  );



/* =========================================================
   08. LIGHTBOX / AGRANDISSEMENT DES PROJETS
========================================================= */

const lightbox =
  document.getElementById(
    "lightbox"
  );

const lightboxImage =
  document.getElementById(
    "lightboxImage"
  );

const lightboxClose =
  document.querySelector(
    ".lightbox-close"
  );



function openLightbox(
  src,
  alt
) {


  if (
    !lightbox ||
    !lightboxImage ||
    !src
  ) {

    return;

  }


  lightboxImage.src =
    src;


  lightboxImage.alt =
    alt ||
    "Aperçu du projet";


  if (
    typeof lightbox.showModal
    === "function"
  ) {


    lightbox.showModal();


  } else {


    lightbox.setAttribute(
      "open",
      ""
    );

  }

}



function closeLightbox() {


  if (!lightbox) {

    return;

  }


  if (

    typeof lightbox.close
      === "function"

    &&

    lightbox.open

  ) {


    lightbox.close();


  } else {


    lightbox.removeAttribute(
      "open"
    );

  }


  if (lightboxImage) {

    lightboxImage.src =
      "";


    lightboxImage.alt =
      "";

  }

}



/* OUVERTURE */

document
  .querySelectorAll(
    ".lightbox-trigger"
  )
  .forEach(
    trigger => {


      trigger.addEventListener(

        "click",

        () => {


          const src =

            trigger.dataset.full

            ||

            trigger
              .querySelector("img")
              ?.src;


          const alt =

            trigger
              .querySelector("img")
              ?.alt;


          openLightbox(
            src,
            alt
          );

        }

      );

    }

  );



/* BOUTON FERMER */

if (lightboxClose) {

  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );

}



/* CLIC À L'EXTÉRIEUR */

if (lightbox) {

  lightbox.addEventListener(

    "click",

    event => {


      if (
        event.target
        === lightbox
      ) {

        closeLightbox();

      }

    }

  );

}



/* ESC */

document.addEventListener(

  "keydown",

  event => {


    if (

      event.key ===
        "Escape"

      &&

      lightbox
      ?.open

    ) {

      closeLightbox();

    }

  }

);



/* =========================================================
   09. DÉTECTION DES IMAGES MANQUANTES
========================================================= */

document
  .querySelectorAll("img")
  .forEach(
    image => {


      image.addEventListener(

        "error",

        () => {


          const parent =
            image.closest(

              "button, figure, article, .portrait-frame"

            );


          if (parent) {

            parent.classList.add(
              "image-error"
            );

          }


          console.warn(

            "Image introuvable :",

            image.getAttribute(
              "src"
            )

          );

        }

      );

    }

  );



/* =========================================================
   10. ANNÉE AUTOMATIQUE
========================================================= */

if (year) {

  year.textContent =
    new Date()
      .getFullYear();

}



/* =========================================================
   11. SECURITE AU CHARGEMENT
========================================================= */

window.addEventListener(

  "load",

  () => {


    /*
      Si certains éléments sont déjà visibles
      au chargement, on les affiche directement.
    */


    revealElements.forEach(
      element => {


        const rect =
          element.getBoundingClientRect();


        if (

          rect.top
          <
          window.innerHeight
          * 0.95

        ) {

          element.classList.add(
            "visible"
          );

        }

      }

    );

  }

);
