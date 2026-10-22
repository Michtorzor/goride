```javascript
// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", function () {
        navbar.classList.toggle("mobile-open");
    });
}


// Close mobile menu when a navigation link is clicked

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (navbar) {
            navbar.classList.remove("mobile-open");
        }
    });
});


// Close mobile menu when clicking outside

document.addEventListener("click", function (event) {

    if (!menuBtn || !navbar) {
        return;
    }

    if (
        !navbar.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {
        navbar.classList.remove("mobile-open");
    }

});


// ===============================
// DELIVERY DATE
// ===============================

const deliveryDate = document.getElementById("deliveryDate");

if (deliveryDate) {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    const todayDate =
        year + "-" + month + "-" + day;

    deliveryDate.min = todayDate;
}


// ===============================
// SCHEDULE FORM
// ===============================

const scheduleForm =
    document.getElementById("scheduleForm");

const resultSection =
    document.getElementById("resultSection");


if (scheduleForm) {

    scheduleForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get form values

        const pickup =
            document.getElementById("pickup").value.trim();

        const destination =
            document.getElementById("destination").value.trim();

        const date =
            document.getElementById("deliveryDate").value;

        const time =
            document.getElementById("deliveryTime").value;

        const packageType =
            document.getElementById("packageType").value;

        const deliverySpeed =
            document.getElementById("deliverySpeed").value;

        const weight =
            document.getElementById("weight").value;

        const description =
            document.getElementById("description").value.trim();


        // ===============================
        // VALIDATION
        // ===============================

        if (
            pickup === "" ||
            destination === "" ||
            date === "" ||
            time === "" ||
            packageType === "" ||
            deliverySpeed === "" ||
            weight === "" ||
            description === ""
        ) {

            alert("Please complete all required fields.");

            return;
        }


        // ===============================
        // BOOKING REFERENCE
        // ===============================

        const randomNumber =
            Math.floor(
                100000 + Math.random() * 900000
            );

        const bookingReference =
            "GR-SCH-" + randomNumber;


        // ===============================
        // FORMAT DATE
        // ===============================

        const selectedDate =
            new Date(date + "T00:00:00");

        const formattedDate =
            selectedDate.toLocaleDateString(
                "en-NG",
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );


        // ===============================
        // FORMAT TIME
        // ===============================

        const timeParts = time.split(":");

        let hours =
            parseInt(timeParts[0], 10);

        const minutes =
            timeParts[1];

        const period =
            hours >= 12 ? "PM" : "AM";

        hours =
            hours % 12 || 12;

        const formattedTime =
            hours + ":" + minutes + " " + period;


        // ===============================
        // DISPLAY RESULT
        // ===============================

        const bookingReferenceElement =
            document.getElementById("bookingReference");

        const resultPickup =
            document.getElementById("resultPickup");

        const resultDestination =
            document.getElementById("resultDestination");

        const resultDate =
            document.getElementById("resultDate");

        const resultTime =
            document.getElementById("resultTime");

        const resultPackage =
            document.getElementById("resultPackage");

        const resultSpeed =
            document.getElementById("resultSpeed");


        if (bookingReferenceElement) {
            bookingReferenceElement.textContent =
                bookingReference;
        }

        if (resultPickup) {
            resultPickup.textContent =
                pickup;
        }

        if (resultDestination) {
            resultDestination.textContent =
                destination;
        }

        if (resultDate) {
            resultDate.textContent =
                formattedDate;
        }

        if (resultTime) {
            resultTime.textContent =
                formattedTime;
        }

        if (resultPackage) {
            resultPackage.textContent =
                packageType + " (" + weight + " kg)";
        }

        if (resultSpeed) {
            resultSpeed.textContent =
                deliverySpeed;
        }


        // ===============================
        // SHOW RESULT
        // ===============================

        if (resultSection) {

            resultSection.style.display = "block";

            resultSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

}
```
