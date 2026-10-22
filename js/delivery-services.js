```javascript
// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");


// Open and close mobile menu

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", function () {

        navbar.classList.toggle("mobile-open");

    });

}


// Close menu when navigation link is clicked

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navbar) {

            navbar.classList.remove("mobile-open");

        }

    });

});


// Close menu when clicking outside

document.addEventListener("click", function (event) {

    if (!menuBtn || !navbar) {

        return;

    }

    const clickedNavbar =
        navbar.contains(event.target);

    const clickedMenuButton =
        menuBtn.contains(event.target);


    if (!clickedNavbar && !clickedMenuButton) {

        navbar.classList.remove("mobile-open");

    }

});
```
