```javascript
// ==================================================
// GORIDE MOBILE MENU
// ==================================================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");


// Open and close mobile menu
if (menuBtn && navbar) {

    menuBtn.addEventListener("click", function () {

        navbar.classList.toggle("mobile-open");

        const isOpen =
            navbar.classList.contains("mobile-open");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

}


// Close menu when navigation link is clicked
const navLinks =
    document.querySelectorAll(".navbar a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navbar) {

            navbar.classList.remove(
                "mobile-open"
            );

        }

        if (menuBtn) {

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});


// Close menu when clicking outside
document.addEventListener(
    "click",
    function (event) {

        if (!menuBtn || !navbar) {
            return;
        }

        const clickedMenu =
            menuBtn.contains(event.target);

        const clickedNavbar =
            navbar.contains(event.target);

        if (
            !clickedMenu &&
            !clickedNavbar
        ) {

            navbar.classList.remove(
                "mobile-open"
            );

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);
```
