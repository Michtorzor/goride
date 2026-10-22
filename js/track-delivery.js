```javascript
const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");


// Mobile menu
if (menuBtn && navbar) {
    menuBtn.addEventListener("click", function () {
        navbar.classList.toggle("mobile-open");
    });
}


// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        if (navbar) {
            navbar.classList.remove("mobile-open");
        }
    });
});


// Tracking form
const trackingForm = document.getElementById("trackingForm");
const trackingInput = document.getElementById("trackingId");
const deliveryResult = document.getElementById("deliveryResult");


// Search for delivery
function searchDelivery(trackingNumber) {

    const currentDelivery =
        localStorage.getItem("goRideCurrentDelivery");

    if (!currentDelivery) {
        showMessage("No delivery found.");
        return;
    }

    const delivery =
        JSON.parse(currentDelivery);

    if (
        delivery.trackingId &&
        delivery.trackingId.toUpperCase() ===
        trackingNumber.toUpperCase()
    ) {

        showDelivery(delivery);

    } else {

        showMessage("Delivery not found.");
    }
}


// Display delivery
function showDelivery(delivery) {

    if (!deliveryResult) {
        return;
    }

    deliveryResult.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = "Delivery Found";

    const tracking = document.createElement("p");
    tracking.textContent =
        "Tracking Number: " +
        delivery.trackingId;

    const status = document.createElement("p");
    status.textContent =
        "Status: " +
        (delivery.status || "Assigned");

    const pickup = document.createElement("p");
    pickup.textContent =
        "Pickup: " +
        (delivery.pickup || "Not provided");

    const destination = document.createElement("p");
    destination.textContent =
        "Destination: " +
        (delivery.destination || "Not provided");

    const sender = document.createElement("p");
    sender.textContent =
        "Sender: " +
        (delivery.sender || "Not provided");

    const receiver = document.createElement("p");
    receiver.textContent =
        "Receiver: " +
        (delivery.receiver || "Not provided");

    const packageInfo = document.createElement("p");
    packageInfo.textContent =
        "Package: " +
        (delivery.package || "Not provided");

    const fare = document.createElement("p");
    fare.textContent =
        "Fare: " +
        (delivery.fare || "₦0");


    deliveryResult.appendChild(title);
    deliveryResult.appendChild(tracking);
    deliveryResult.appendChild(status);
    deliveryResult.appendChild(pickup);
    deliveryResult.appendChild(destination);
    deliveryResult.appendChild(sender);
    deliveryResult.appendChild(receiver);
    deliveryResult.appendChild(packageInfo);
    deliveryResult.appendChild(fare);
}


// Show message
function showMessage(message) {

    if (!deliveryResult) {
        return;
    }

    deliveryResult.innerHTML = "";

    const paragraph =
        document.createElement("p");

    paragraph.textContent = message;

    deliveryResult.appendChild(paragraph);
}


// Submit tracking form
if (trackingForm) {

    trackingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const trackingNumber =
                trackingInput.value.trim();

            if (trackingNumber === "") {

                showMessage(
                    "Please enter your tracking number."
                );

                return;
            }

            searchDelivery(trackingNumber);
        }
    );
}


// Automatically load the delivery from the URL
const urlParams =
    new URLSearchParams(
        window.location.search
    );

const trackingFromUrl =
    urlParams.get("tracking");


if (
    trackingFromUrl &&
    trackingInput
) {

    trackingInput.value =
        trackingFromUrl;

    searchDelivery(
        trackingFromUrl
    );
}
```
