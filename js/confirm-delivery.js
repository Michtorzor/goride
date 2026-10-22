```javascript
// ======================================
// GORIDE CONFIRM DELIVERY
// ======================================


// ======================================
// MOBILE MENU
// ======================================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");

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


// Close menu when clicking outside

document.addEventListener("click", function (event) {

    if (!menuBtn || !navbar) {

        return;

    }


    const clickedMenu =
        menuBtn.contains(event.target);

    const clickedNavbar =
        navbar.contains(event.target);


    if (!clickedMenu && !clickedNavbar) {

        navbar.classList.remove("mobile-open");

    }

});


// ======================================
// GET URL INFORMATION
// ======================================

const urlParams =
    new URLSearchParams(window.location.search);


const deliveryType =
    urlParams.get("type") || "other";

const timing =
    urlParams.get("timing") || "now";

const pickup =
    urlParams.get("pickup") || "Not provided";

const destination =
    urlParams.get("destination") || "Not provided";

const packageInfo =
    urlParams.get("package") || "Not provided";

const sender =
    urlParams.get("sender") || "Not provided";

const phone =
    urlParams.get("phone") || "Not provided";

const receiver =
    urlParams.get("receiver") || "Not provided";

const receiverPhone =
    urlParams.get("receiverPhone") || "Not provided";

const fare =
    urlParams.get("fare") || "₦0";

const email =
    urlParams.get("email") || "";

const deliveryDate =
    urlParams.get("date") || "";

const deliveryTime =
    urlParams.get("time") || "";


// ======================================
// DELIVERY TYPE NAMES
// ======================================

const deliveryTypes = {

    food: "Food & Grocery",

    document: "Documents",

    parcel: "Parcels & Packages",

    ecommerce: "E-commerce Orders",

    pharmacy: "Pharmacy Items",

    bulk: "Bulk Delivery",

    other: "Other"

};


// ======================================
// GET HTML ELEMENTS
// ======================================

const confirmType =
    document.getElementById("confirmType");

const confirmTiming =
    document.getElementById("confirmTiming");

const confirmPickup =
    document.getElementById("confirmPickup");

const confirmDestination =
    document.getElementById("confirmDestination");

const confirmPackage =
    document.getElementById("confirmPackage");

const confirmSender =
    document.getElementById("confirmSender");

const confirmPhone =
    document.getElementById("confirmPhone");

const confirmReceiver =
    document.getElementById("confirmReceiver");

const confirmReceiverPhone =
    document.getElementById("confirmReceiverPhone");

const confirmFare =
    document.getElementById("confirmFare");

const confirmDeliveryBtn =
    document.getElementById("confirmDeliveryBtn");

const successCard =
    document.getElementById("successCard");

const trackingNumberElement =
    document.getElementById("trackingNumber");

const trackDeliveryBtn =
    document.getElementById("trackDeliveryBtn");


// ======================================
// DISPLAY DELIVERY INFORMATION
// ======================================

if (confirmType) {

    confirmType.textContent =
        deliveryTypes[deliveryType] || "Other";

}


if (confirmTiming) {

    if (timing === "schedule") {

        let scheduledText =
            "Scheduled Delivery";

        if (deliveryDate) {

            scheduledText +=
                " - " + deliveryDate;

        }

        if (deliveryTime) {

            scheduledText +=
                " at " + deliveryTime;

        }

        confirmTiming.textContent =
            scheduledText;

    } else {

        confirmTiming.textContent =
            "Deliver Now";

    }

}


if (confirmPickup) {

    confirmPickup.textContent =
        pickup;

}


if (confirmDestination) {

    confirmDestination.textContent =
        destination;

}


if (confirmPackage) {

    confirmPackage.textContent =
        packageInfo;

}


if (confirmSender) {

    confirmSender.textContent =
        sender;

}


if (confirmPhone) {

    confirmPhone.textContent =
        phone;

}


if (confirmReceiver) {

    confirmReceiver.textContent =
        receiver;

}


if (confirmReceiverPhone) {

    confirmReceiverPhone.textContent =
        receiverPhone;

}


if (confirmFare) {

    confirmFare.textContent =
        fare;

}


// ======================================
// GENERATE TRACKING NUMBER
// ======================================

function generateTrackingNumber() {

    const randomNumber =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return "GR-2026-" + randomNumber;

}


// ======================================
// GET EXISTING RIDER DELIVERIES
// ======================================

function getRiderDeliveries() {

    const savedDeliveries =
        localStorage.getItem(
            "goRideRiderDeliveries"
        );


    if (!savedDeliveries) {

        return [];

    }


    try {

        const deliveries =
            JSON.parse(savedDeliveries);


        if (Array.isArray(deliveries)) {

            return deliveries;

        }

    } catch (error) {

        console.log(
            "Unable to read rider deliveries."
        );

    }


    return [];

}


// ======================================
// SAVE RIDER DELIVERY
// ======================================

function saveDeliveryForRider(delivery) {

    const deliveries =
        getRiderDeliveries();


    deliveries.push(delivery);


    localStorage.setItem(
        "goRideRiderDeliveries",
        JSON.stringify(deliveries)
    );

}


// ======================================
// SAVE DELIVERY HISTORY
// ======================================

function saveDeliveryToHistory(delivery) {

    const savedHistory =
        localStorage.getItem(
            "goRideDeliveryHistory"
        );


    let history = [];


    if (savedHistory) {

        try {

            history =
                JSON.parse(savedHistory);

        } catch (error) {

            history = [];

        }

    }


    if (!Array.isArray(history)) {

        history = [];

    }


    history.push(delivery);


    localStorage.setItem(
        "goRideDeliveryHistory",
        JSON.stringify(history)
    );

}


// ======================================
// CONFIRM DELIVERY
// ======================================

if (confirmDeliveryBtn) {

    confirmDeliveryBtn.addEventListener(
        "click",
        function () {


            // Prevent duplicate confirmation

            if (
                confirmDeliveryBtn.disabled
            ) {

                return;

            }


            // Generate tracking number

            const trackingNumber =
                generateTrackingNumber();


            // ==================================
            // CREATE DELIVERY OBJECT
            // ==================================

            const delivery = {

                trackingId:
                    trackingNumber,

                type:
                    deliveryTypes[deliveryType] ||
                    "Other",

                typeCode:
                    deliveryType,

                timing:
                    timing,

                pickup:
                    pickup,

                destination:
                    destination,

                package:
                    packageInfo,

                sender:
                    sender,

                phone:
                    phone,

                email:
                    email,

                receiver:
                    receiver,

                receiverPhone:
                    receiverPhone,

                fare:
                    fare,

                date:
                    deliveryDate,

                time:
                    deliveryTime,

                status:
                    "Assigned",

                createdAt:
                    new Date().toISOString()

            };


            // ==================================
            // SAVE CURRENT DELIVERY
            // ==================================

            localStorage.setItem(
                "goRideCurrentDelivery",
                JSON.stringify(delivery)
            );


            // ==================================
            // SAVE TO DELIVERY HISTORY
            // ==================================

            saveDeliveryToHistory(
                delivery
            );


            // ==================================
            // SEND DELIVERY TO RIDER DASHBOARD
            // ==================================

            saveDeliveryForRider(
                delivery
            );


            // ==================================
            // SHOW TRACKING NUMBER
            // ==================================

            if (trackingNumberElement) {

                trackingNumberElement.textContent =
                    trackingNumber;

            }


            // ==================================
            // UPDATE TRACK DELIVERY BUTTON
            // ==================================

            if (trackDeliveryBtn) {

                trackDeliveryBtn.href =
                    "track-delivery.html?tracking=" +
                    encodeURIComponent(
                        trackingNumber
                    );

            }


            // ==================================
            // SHOW SUCCESS CARD
            // ==================================

            if (successCard) {

                successCard.style.display =
                    "block";

            }


            // ==================================
            // DISABLE CONFIRM BUTTON
            // ==================================

            confirmDeliveryBtn.disabled =
                true;


            confirmDeliveryBtn.textContent =
                "Delivery Confirmed";


            // ==================================
            // SCROLL TO SUCCESS
            // ==================================

            if (successCard) {

                successCard.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }
    );

}
```
