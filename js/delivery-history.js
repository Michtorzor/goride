```javascript
// ===============================
// GoRide Delivery History
// ===============================


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


// Close mobile menu when a link is clicked

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

    const clickedNavbar =
        navbar.contains(event.target);

    const clickedMenuButton =
        menuBtn.contains(event.target);

    if (!clickedNavbar && !clickedMenuButton) {

        navbar.classList.remove("mobile-open");

    }

});


// ===============================
// ELEMENTS
// ===============================

const deliveryHistory =
    document.getElementById("deliveryHistory");

const emptyHistory =
    document.getElementById("emptyHistory");


// ===============================
// DELIVERY TYPE
// ===============================

function getDeliveryType(type) {

    const types = {

        food: "Food & Grocery",

        document: "Documents",

        parcel: "Parcels & Packages",

        ecommerce: "E-commerce Orders",

        pharmacy: "Pharmacy Items",

        bulk: "Bulk Delivery",

        other: "Other"

    };

    return types[type] || type || "Delivery";

}


// ===============================
// GET DELIVERY HISTORY
// ===============================

function getDeliveries() {

    const savedHistory =
        localStorage.getItem("goRideDeliveryHistory");


    if (savedHistory) {

        try {

            const deliveries =
                JSON.parse(savedHistory);

            if (Array.isArray(deliveries)) {

                return deliveries;

            }

        } catch (error) {

            console.error(
                "Could not read delivery history:",
                error
            );

        }

    }


    // If there is no history yet,
    // check for the current delivery.

    const currentDelivery =
        localStorage.getItem(
            "goRideCurrentDelivery"
        );


    if (currentDelivery) {

        try {

            const delivery =
                JSON.parse(currentDelivery);

            if (delivery) {

                return [delivery];

            }

        } catch (error) {

            console.error(
                "Could not read current delivery:",
                error
            );

        }

    }


    return [];

}


// ===============================
// DISPLAY DELIVERY HISTORY
// ===============================

function displayHistory() {

    if (!deliveryHistory || !emptyHistory) {

        return;

    }


    const deliveries =
        getDeliveries();


    // No delivery history

    if (deliveries.length === 0) {

        deliveryHistory.innerHTML = "";

        emptyHistory.style.display = "block";

        return;

    }


    // Hide empty message

    emptyHistory.style.display = "none";


    // Clear existing cards

    deliveryHistory.innerHTML = "";


    // Create a card for every delivery

    deliveries.forEach(function (delivery, index) {

        const card =
            document.createElement("div");

        card.className = "history-card";


        const deliveryType =
            getDeliveryType(delivery.type);


        const status =
            delivery.status || "Order Confirmed";


        let timing = "Deliver Now";


        if (delivery.timing === "schedule") {

            timing = "Scheduled Delivery";

        }


        card.innerHTML = `

            <div class="history-card-header">

                <div>

                    <h3>
                        ${deliveryType}
                    </h3>

                    <p class="tracking-number">

                        Tracking Number:

                        <strong>
                            ${delivery.trackingId || "N/A"}
                        </strong>

                    </p>

                </div>


                <span class="history-status">

                    ${status}

                </span>

            </div>


            <div class="history-details">


                <div class="history-detail">

                    <span>
                        Delivery Type
                    </span>

                    <strong>
                        ${deliveryType}
                    </strong>

                </div>


                <div class="history-detail">

                    <span>
                        Timing
                    </span>

                    <strong>
                        ${timing}
                    </strong>

                </div>


                <div class="history-detail">

                    <span>
                        Package
                    </span>

                    <strong>
                        ${delivery.package || "N/A"}
                    </strong>

                </div>


                <div class="history-detail">

                    <span>
                        Fare
                    </span>

                    <strong>
                        ${delivery.fare || "N/A"}
                    </strong>

                </div>


            </div>


            <div class="history-locations">


                <div class="location-box">

                    <span>
                        Pickup
                    </span>

                    <strong>
                        📍 ${delivery.pickup || "Not provided"}
                    </strong>

                </div>


                <div class="location-box">

                    <span>
                        Destination
                    </span>

                    <strong>
                        📍 ${delivery.destination || "Not provided"}
                    </strong>

                </div>


            </div>


            <div class="history-actions-row">

                <a
                    href="track-delivery.html?tracking=${encodeURIComponent(
                        delivery.trackingId || ""
                    )}"
                    class="primary-btn"
                >
                    Track Delivery
                </a>


                <button
                    type="button"
                    class="secondary-btn view-details-btn"
                    data-index="${index}"
                >
                    View Details
                </button>

            </div>

        `;


        deliveryHistory.appendChild(card);

    });


    // ===============================
    // VIEW DETAILS BUTTONS
    // ===============================

    const viewButtons =
        document.querySelectorAll(
            ".view-details-btn"
        );


    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(
                        button.getAttribute("data-index")
                    );


                const deliveries =
                    getDeliveries();


                const selectedDelivery =
                    deliveries[index];


                showDeliveryDetails(
                    selectedDelivery
                );

            }
        );

    });

}


// ===============================
// VIEW DELIVERY DETAILS
// ===============================

function showDeliveryDetails(delivery) {

    if (!delivery) {

        return;

    }


    const deliveryType =
        getDeliveryType(delivery.type);


    let timing = "Deliver Now";


    if (delivery.timing === "schedule") {

        timing = "Scheduled Delivery";

    }


    alert(

        "GoRide Delivery Details\n\n" +

        "Tracking Number: " +
        (delivery.trackingId || "N/A") +

        "\n\nDelivery Type: " +
        deliveryType +

        "\n\nStatus: " +
        (delivery.status || "Order Confirmed") +

        "\n\nSender: " +
        (delivery.sender || "N/A") +

        "\n\nSender Phone: " +
        (delivery.phone || "N/A") +

        "\n\nReceiver: " +
        (delivery.receiver || "N/A") +

        "\n\nReceiver Phone: " +
        (delivery.receiverPhone || "N/A") +

        "\n\nPickup: " +
        (delivery.pickup || "N/A") +

        "\n\nDestination: " +
        (delivery.destination || "N/A") +

        "\n\nPackage: " +
        (delivery.package || "N/A") +

        "\n\nTiming: " +
        timing +

        "\n\nFare: " +
        (delivery.fare || "N/A")

    );

}


// ===============================
// LOAD HISTORY
// ===============================

displayHistory();
```
