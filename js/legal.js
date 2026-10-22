const menuBtn = document.getElementById("menuBtn");
        const navbar = document.getElementById("navbar");

        if (menuBtn && navbar) {
            menuBtn.addEventListener("click", function () {
                const isOpen = navbar.classList.toggle("active");

                menuBtn.setAttribute("aria-expanded", String(isOpen));
                menuBtn.textContent = isOpen ? "✕" : "☰";
            });

            navbar.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", function () {
                    navbar.classList.remove("active");
                    menuBtn.setAttribute("aria-expanded", "false");
                    menuBtn.textContent = "☰";
                });
            });
        }