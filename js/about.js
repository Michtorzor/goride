```javascript
/* ==================================================
   GORIDE ABOUT PAGE JAVASCRIPT
================================================== */


/* ==================================================
   MOBILE MENU
================================================== */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");


/* OPEN / CLOSE MOBILE MENU */

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", function () {

        navbar.classList.toggle("mobile-open");

    });

}


/* ==================================================
   CLOSE MENU AFTER CLICKING A NAVIGATION LINK
================================================== */

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navbar) {

            navbar.classList.remove("mobile-open");

        }

    });

});


/* ==================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
================================================== */

document.addEventListener("click", function (event) {

    if (!menuBtn || !navbar) {

        return;

    }

    if (
        !menuBtn.contains(event.target) &&
        !navbar.contains(event.target)
    ) {

        navbar.classList.remove("mobile-open");

    }

});


/* ==================================================
   CLOSE MENU WHEN SCREEN BECOMES DESKTOP SIZE
================================================== */

window.addEventListener("resize", function () {

    if (window.innerWidth > 900) {

        navbar.classList.remove("mobile-open");

    }

});
```
