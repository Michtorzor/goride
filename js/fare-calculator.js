
// =========================================================
// GoRide Fare Calculator
// File: js/fare-calculator.js
// Demo estimates only — not live delivery prices.
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
    // ---------- 1. MOBILE NAVIGATION ----------

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", function () {
            const isOpen = navbar.classList.toggle("active");

            menuBtn.setAttribute("aria-expanded", String(isOpen));
            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-times", isOpen);
            }
        });

        // Close the mobile menu when a navigation link is selected.
        navbar.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navbar.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Open navigation menu");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            });
        });

        // Close the menu when switching back to desktop width.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 820) {
                navbar.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }

    // ---------- 2. FIND THE FORM ELEMENTS ----------

    const fareForm = document.getElementById("fareForm");

    if (!fareForm) {
        return;
    }

    const pickupInput = document.getElementById("pickup");
    const dropoffInput = document.getElementById("dropoff");
    const packageTypeInput = document.getElementById("packageType");
    const weightInput = document.getElementById("weight");

    const baseFareOutput = document.getElementById("baseFare");
    const distanceFeeOutput = document.getElementById("distanceFee");
    const packageFeeOutput = document.getElementById("packageFee");
    const deliveryFeeOutput = document.getElementById("deliveryFee");
    const totalFareOutput = document.getElementById("totalFare");

    const fareResult = document.getElementById("fareResult");

    // ---------- 3. DEMO PRICING IN NAIRA ----------

    // These are sample prices for project demonstration.
    // They are not official GoRide prices.

    const PRICES = {
        baseFare: 1000,
        estimatedRatePerKm: 150,
        expressSurcharge: 1000,
        extraWeightPerKg: 100,

        packageFees: {
            document: 0,
            small: 500,
            medium: 1000,
            large: 1800
        }
    };

    // Format amounts as Nigerian naira.
    function formatNaira(amount) {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0
        }).format(amount);
    }

    // ---------- 4. DISTANCE ESTIMATE ----------

    /*
       IMPORTANT:
       This project version does not use a map or GPS API.
       The distance below is only a placeholder calculated
       from the text entered by the user.

       Connect a mapping/routing API in the future to obtain
       actual road distance between pickup and drop-off.
    */

    function estimateDistance(pickup, dropoff) {
        const combinedText = (pickup + " " + dropoff).toLowerCase();

        let textScore = 0;

        for (let i = 0; i < combinedText.length; i++) {
            textScore += combinedText.charCodeAt(i);
        }

        // Returns a demo estimate between 2 km and 25 km.
        return 2 + (textScore % 24);
    }

    // ---------- 5. GET DELIVERY SPEED ----------

    function getDeliverySpeed() {
        const selectedSpeed = fareForm.querySelector(
            'input[name="deliverySpeed"]:checked'
        );

        return selectedSpeed ? selectedSpeed.value : "standard";
    }

    // ---------- 6. FEEDBACK MESSAGE ----------

    let messageElement = fareForm.querySelector(".form-message");

    if (!messageElement) {
        messageElement = document.createElement("p");
        messageElement.className = "form-message";
        messageElement.setAttribute("role", "alert");
        messageElement.setAttribute("aria-live", "polite");
        messageElement.hidden = true;

        fareForm.appendChild(messageElement);
    }

    function showMessage(message, type) {
        messageElement.textContent = message;
        messageElement.className = "form-message " + type;
        messageElement.hidden = false;
    }

    function clearMessage() {
        messageElement.textContent = "";
        messageElement.hidden = true;
        messageElement.className = "form-message";
    }

    fareForm.addEventListener("input", clearMessage);
    fareForm.addEventListener("change", clearMessage);

    // ---------- 7. CALCULATE FARE ----------

    fareForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearMessage();

        // Read the user's entries.
        const pickup = pickupInput ? pickupInput.value.trim() : "";
        const dropoff = dropoffInput ? dropoffInput.value.trim() : "";
        const packageType = packageTypeInput
            ? packageTypeInput.value
            : "";

        const weight = weightInput
            ? Number(weightInput.value)
            : 1;

        const deliverySpeed = getDeliverySpeed();

        // Validate pickup.
        if (!pickup) {
            showMessage("Please enter your pickup location.", "error-message");

            if (pickupInput) {
                pickupInput.focus();
            }

            return;
        }

        // Validate drop-off.
        if (!dropoff) {
            showMessage("Please enter your drop-off location.", "error-message");

            if (dropoffInput) {
                dropoffInput.focus();
            }

            return;
        }

        // Pickup and drop-off should not be identical.
        if (pickup.toLowerCase() === dropoff.toLowerCase()) {
            showMessage(
                "Pickup and drop-off locations must be different.",
                "error-message"
            );

            if (dropoffInput) {
                dropoffInput.focus();
            }

            return;
        }

        // Validate package type.
        if (
            !Object.prototype.hasOwnProperty.call(
                PRICES.packageFees,
                packageType
            )
        ) {
            showMessage("Please select a valid package type.", "error-message");

            if (packageTypeInput) {
                packageTypeInput.focus();
            }

            return;
        }

        // Validate package weight.
        if (!Number.isFinite(weight) || weight <= 0 || weight > 100) {
            showMessage(
                "Please enter a package weight greater than 0 kg and no more than 100 kg.",
                "error-message"
            );

            if (weightInput) {
                weightInput.focus();
            }

            return;
        }

        // Validate delivery speed.
        if (!["standard", "express"].includes(deliverySpeed)) {
            showMessage("Please select a valid delivery speed.", "error-message");
            return;
        }

        // Estimate distance using the placeholder function.
        const estimatedDistance = estimateDistance(pickup, dropoff);

        // Calculate the estimated distance charge.
        const distanceFee =
            estimatedDistance * PRICES.estimatedRatePerKm;

        // Package-size fee.
        const packageFee = PRICES.packageFees[packageType];

        // Charge for weight above the first kilogram.
        const extraWeight = Math.max(0, Math.ceil(weight - 1));

        const weightFee =
            extraWeight * PRICES.extraWeightPerKg;

        // Express delivery surcharge.
        const expressFee =
            deliverySpeed === "express"
                ? PRICES.expressSurcharge
                : 0;

        // Combine weight and express charges.
        const deliveryFee = weightFee + expressFee;

        // Calculate total estimated fare.
        const totalFare =
            PRICES.baseFare +
            distanceFee +
            packageFee +
            deliveryFee;

        // ---------- 8. DISPLAY RESULTS ----------

        if (baseFareOutput) {
            baseFareOutput.textContent = formatNaira(PRICES.baseFare);
        }

        if (distanceFeeOutput) {
            distanceFeeOutput.textContent = formatNaira(distanceFee);
        }

        if (packageFeeOutput) {
            packageFeeOutput.textContent = formatNaira(packageFee);
        }

        if (deliveryFeeOutput) {
            deliveryFeeOutput.textContent = formatNaira(deliveryFee);
        }

        if (totalFareOutput) {
            totalFareOutput.textContent = formatNaira(totalFare);
        }

        // Reveal the results if the HTML initially hides them.
        if (fareResult) {
            fareResult.hidden = false;
            fareResult.style.display = "";

            const description =
                fareResult.querySelector(".result-description");

            if (description) {
                description.textContent =
                    "Estimated route distance: " +
                    estimatedDistance +
                    " km. This is a demonstration estimate, not an actual road-distance measurement.";
            }

            fareResult.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }

        showMessage(
            "Your estimated fare has been calculated successfully.",
            "success-message"
        );
    });

    // ---------- 9. INITIAL RESULT FORMATTING ----------

    if (baseFareOutput) {
        baseFareOutput.textContent = formatNaira(0);
    }

    if (distanceFeeOutput) {
        distanceFeeOutput.textContent = formatNaira(0);
    }

    if (packageFeeOutput) {
        packageFeeOutput.textContent = formatNaira(0);
    }

    if (deliveryFeeOutput) {
        deliveryFeeOutput.textContent = formatNaira(0);
    }

    if (totalFareOutput) {
        totalFareOutput.textContent = formatNaira(0);
    }
});
