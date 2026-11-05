
/* =====================================================
   CARLA HOPPENSTEDT — PORTFOLIO
   Libro interactivo y navegación
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =================================================
       01. ELEMENTOS PRINCIPALES
    ================================================= */

    const navbar = document.getElementById("mainNavbar");
    const bookScene = document.getElementById("bookScene");
    const bookCover = document.getElementById("bookCover");
    const openBookButton = document.getElementById("openBook");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(
        "#navMenu .nav-link"
    );

    const sections = document.querySelectorAll(
        "header[id], section[id]"
    );


    /* =================================================
       02. APERTURA Y CIERRE DEL LIBRO
    ================================================= */

    let bookIsOpen = false;
    function openBook() {

        if (!bookScene || bookIsOpen) return;

        // Activar animación de apertura
        bookScene.classList.add("open");

        bookIsOpen = true;

        // Actualizar accesibilidad
        if (openBookButton) {

            openBookButton.setAttribute(
                "aria-expanded",
                "true"
            );

            openBookButton.innerHTML =
                '<i class="bi bi-book"></i> Cerrar mi libro';

        }

        console.log("El libro se ha abierto.");

    }


    function closeBook() {

        if (!bookScene || !bookIsOpen) return;

        // Activar animación de cierre
        bookScene.classList.remove("open");

        bookIsOpen = false;

        if (openBookButton) {

            openBookButton.setAttribute(
                "aria-expanded",
                "false"
            );

            openBookButton.innerHTML =
                '<i class="bi bi-book-half"></i> Abrir mi historia';

        }

        console.log("El libro se ha cerrado.");

    }


    // BOTÓN PRINCIPAL

    if (openBookButton && bookScene) {

        openBookButton.setAttribute(
            "aria-expanded",
            "false"
        );

        openBookButton.addEventListener(
            "click",
            function(event) {

                // Evitar que la página salte al capítulo siguiente
                event.preventDefault();

                // Alternar apertura y cierre
                if (bookIsOpen) {

                    closeBook();

                } else {

                    openBook();

                }

            }
        );

    }


    // CERRAR EL LIBRO AL PULSAR LA PORTADA

    if (bookCover) {

        bookCover.addEventListener(
            "click",
            function() {

                if (bookIsOpen) {

                    closeBook();

                }

            }
        );

    }


    /* =================================================
       03. NAVBAR AL DESPLAZARSE
    ================================================= */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("navbar-scrolled");

        } else {

            navbar.classList.remove("navbar-scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =================================================
       04. IDENTIFICAR EL CAPÍTULO ACTIVO
    ================================================= */

    function activateNavLink(sectionId) {

        navLinks.forEach(function(link) {

            const target = link.getAttribute("href");

            link.classList.remove("active");

            if (target === "#" + sectionId) {

                link.classList.add("active");

            }

        });

    }


    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(

            function(entries) {

                entries.forEach(function(entry) {

                    if (entry.isIntersecting) {

                        activateNavLink(entry.target.id);

                    }

                });

            },

            {

                root: null,

                rootMargin: "-25% 0px -60% 0px",

                threshold: 0

            }

        );


        sections.forEach(function(section) {

            sectionObserver.observe(section);

        });

    }


    /* =================================================
       05. MENÚ DE NAVEGACIÓN MÓVIL
    ================================================= */

    navLinks.forEach(function(link) {

        link.addEventListener("click", function() {

            if (
                navMenu &&
                navMenu.classList.contains("show") &&
                typeof bootstrap !== "undefined"
            ) {

                const collapse =
                    bootstrap.Collapse.getInstance(navMenu);

                if (collapse) {

                    collapse.hide();

                }

            }

        });

    });


    /* =================================================
       06. ANIMACIONES DE APARICIÓN
    ================================================= */

    const animatedElements = document.querySelectorAll(

        ".chapter-heading, " +
        ".book-page, " +
        ".skill-book, " +
        ".project-card, " +
        ".education-card"

    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            function(entries, observer) {

                entries.forEach(function(entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {

                threshold: 0.12

            }

        );


        animatedElements.forEach(function(element) {

            revealObserver.observe(element);

        });

    } else {

        animatedElements.forEach(function(element) {

            element.classList.add("is-visible");

        });

    }


    /* =================================================
       07. INTERACCIÓN CON LOS LIBROS DE HABILIDADES
    ================================================= */

    const skillBooks = document.querySelectorAll(".skill-book");


    skillBooks.forEach(function(book) {

        book.addEventListener("mouseenter", function() {

            book.classList.add("book-hover");

        });


        book.addEventListener("mouseleave", function() {

            book.classList.remove("book-hover");

        });

    });


    /* =================================================
       08. AÑO AUTOMÁTICO DEL FOOTER
    ================================================= */

    const footer = document.querySelector(".portfolio-footer");


    if (footer) {

        const footerParagraph = footer.querySelector("p");

        if (footerParagraph) {

            footerParagraph.textContent =
                "© " + new Date().getFullYear() +
                " Carla Hoppenstedt";

        }

    }


    /* =================================================
       09. COMPROBACIÓN DE IMÁGENES
    ================================================= */

    const images = document.querySelectorAll("img");


    images.forEach(function(image) {

        image.addEventListener("error", function() {

            console.warn(
                "No se pudo cargar la imagen:",
                image.src
            );

        });

    });


    /* =================================================
       10. INICIALIZACIÓN
    ================================================= */

    console.log(
        "Portfolio de Carla Hoppenstedt inicializado correctamente."
    );

    console.log(
        "Libro interactivo preparado."
    );

});
