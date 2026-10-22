```javascript
/* =========================================
   GORIDE SERVICES PAGE JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");


if (menuBtn && navbar) {

    menuBtn.addEventListener("click", function () {

        navbar.classList.toggle("mobile-open");

    });

}


/* =========================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
========================================= */

const navLinks = document.querySelectorAll(".navbar a");


navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("mobile-open");

    });

});


/* =========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", function (event) {

    if (!menuBtn || !navbar) {
        return;
    }


    const clickedInsideNavbar =
        navbar.contains(event.target);

    const clickedMenuButton =
        menuBtn.contains(event.target);


    if (!clickedInsideNavbar && !clickedMenuButton) {

        navbar.classList.remove("mobile-open");

    }

});
```
