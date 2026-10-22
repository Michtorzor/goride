```javascript
// ======================================
// GORIDE RIDER DASHBOARD
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

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navbar) {
            navbar.classList.remove("mobile-open");
        }

    });

});

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
// GET HTML ELEMENTS
// ======================================

const riderNameHero =
    document.getElementById("riderNameHero");

const riderStatus =
    document.getElementById("riderStatus");

const statusToggle =
    document.getElementById("statusToggle");

const assignedCount =
    document.getElementById("assignedCount");

const completedCount =
    document.getElementById("completedCount");

const totalEarnings =
    document.getElementById("totalEarnings");

const riderRating =
    document.getElementById("riderRating");

const deliveriesList =
    document.getElementById("deliveriesList");

const emptyDeliveries =
    document.getElementById("emptyDeliveries");

const refreshDeliveriesBtn =
    document.getElementById("refreshDeliveriesBtn");

const todayEarnings =
    document.getElementById("todayEarnings");

const weekEarnings =
    document.getElementById("weekEarnings");

const monthEarnings =
    document.getElementById("monthEarnings");

const profileName =
    document.getElementById("profileName");

const profilePhone =
    document.getElementById("profilePhone");

const profileEmail =
    document.getElementById("profileEmail");

const profileCity =
    document.getElementById("profileCity");

const profileBike =
    document.getElementById("profileBike");

const profileExperience =
    document.getElementById("profileExperience");

const logoutBtn =
    document.getElementById("logoutBtn");


// ======================================
// RIDER PROFILE
// ======================================

const defaultRider = {

    name: "GoRide Rider",
    phone: "Not provided",
    email: "Not provided",
    city: "Not provided",
    bike: "Not provided",
    experience: "Not provided",
    rating: "5.0"

};


function getRiderProfile() {

    const savedRider =
        localStorage.getItem(
            "goRideRiderProfile"
        );

    if (!savedRider) {
        return defaultRider;
    }

    try {

        return JSON.parse(savedRider);

    } catch (error) {

        return defaultRider;

    }

}


function displayRiderProfile() {

    const rider =
        getRiderProfile();


    if (riderNameHero) {
        riderNameHero.textContent =
            rider.name || "GoRide Rider";
    }


    if (profileName) {
        profileName.textContent =
            rider.name || "Not provided";
    }


    if (profilePhone) {
        profilePhone.textContent =
            rider.phone || "Not provided";
    }


    if (profileEmail) {
        profileEmail.textContent =
            rider.email || "Not provided";
    }


    if (profileCity) {
        profileCity.textContent =
            rider.city || "Not provided";
    }


    if (profileBike) {
        profileBike.textContent =
            rider.bike || "Not provided";
    }


    if (profileExperience) {
        profileExperience.textContent =
            rider.experience || "Not provided";
    }


    if (riderRating) {
        riderRating.textContent =
            rider.rating || "5.0";
    }

}


// ======================================
// RIDER ONLINE / OFFLINE
// ======================================

let riderIsOnline = true;

const savedStatus =
    localStorage.getItem(
        "goRideRiderStatus"
    );

if (savedStatus === "offline") {
    riderIsOnline = false;
}


function updateRiderStatus() {

    if (!riderStatus || !statusToggle) {
        return;
    }


    if (riderIsOnline) {

        riderStatus.textContent =
            "Online";

        statusToggle.textContent =
            "Go Offline";

    } else {

        riderStatus.textContent =
            "Offline";

        statusToggle.textContent =
            "Go Online";

    }

}


if (statusToggle) {

    statusToggle.addEventListener(
        "click",
        function () {

            riderIsOnline =
                !riderIsOnline;


            localStorage.setItem(
                "goRideRiderStatus",
                riderIsOnline
                    ? "online"
                    : "offline"
            );


            updateRiderStatus();

        }
    );

}


// ======================================
// GET RIDER DELIVERIES
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
// SAVE RIDER DELIVERIES
// ======================================

function saveRiderDeliveries(
    deliveries
) {

    localStorage.setItem(
        "goRideRiderDeliveries",
        JSON.stringify(deliveries)
    );

}


// ======================================
// UPDATE CUSTOMER DELIVERY
// ======================================

function updateCustomerDelivery(
    updatedDelivery
) {

    // Update current delivery

    const currentDelivery =
        localStorage.getItem(
            "goRideCurrentDelivery"
        );


    if (currentDelivery) {

        try {

            const current =
                JSON.parse(currentDelivery);


            if (
                current.trackingId ===
                updatedDelivery.trackingId
            ) {

                localStorage.setItem(
                    "goRideCurrentDelivery",
                    JSON.stringify(
                        updatedDelivery
                    )
                );

            }

        } catch (error) {

            console.log(
                "Unable to update current delivery."
            );

        }

    }


    // Update delivery history

    const savedHistory =
        localStorage.getItem(
            "goRideDeliveryHistory"
        );


    if (!savedHistory) {
        return;
    }


    try {

        const history =
            JSON.parse(savedHistory);


        if (!Array.isArray(history)) {
            return;
        }


        const updatedHistory =
            history.map(function (delivery) {

                if (
                    delivery.trackingId ===
                    updatedDelivery.trackingId
                ) {

                    return updatedDelivery;

                }

                return delivery;

            });


        localStorage.setItem(
            "goRideDeliveryHistory",
            JSON.stringify(
                updatedHistory
            )
        );

    } catch (error) {

        console.log(
            "Unable to update delivery history."
        );

    }

}


// ======================================
// MONEY
// ======================================

function getFareNumber(fare) {

    if (!fare) {
        return 0;
    }


    const cleanedFare =
        String(fare)
            .replace("₦", "")
            .replace(/,/g, "")
            .trim();


    const number =
        Number(cleanedFare);


    if (isNaN(number)) {
        return 0;
    }


    return number;

}


function formatMoney(amount) {

    return "₦" +
        Number(amount || 0)
            .toLocaleString();

}


// ======================================
// DISPLAY DELIVERIES
// ======================================

function displayDeliveries() {

    if (!deliveriesList ||
        !emptyDeliveries) {

        return;

    }


    const deliveries =
        getRiderDeliveries();


    deliveriesList.innerHTML = "";


    if (deliveries.length === 0) {

        emptyDeliveries.style.display =
            "block";

        updateDashboardNumbers(
            deliveries
        );

        return;

    }


    emptyDeliveries.style.display =
        "none";


    deliveries.forEach(
        function (delivery, index) {

            const card =
                document.createElement("div");

            card.className =
                "delivery-card";


            const status =
                delivery.status ||
                "Assigned";


            let buttons = "";


            // Assigned

            if (status === "Assigned") {

                buttons = `

                    <button
                        type="button"
                        class="accept-btn"
                        data-action="accept"
                        data-index="${index}"
                    >
                        Accept Delivery
                    </button>

                    <button
                        type="button"
                        class="reject-btn"
                        data-action="reject"
                        data-index="${index}"
                    >
                        Reject
                    </button>

                `;

            }


            // Accepted

            else if (status === "Accepted") {

                buttons = `

                    <button
                        type="button"
                        class="complete-btn"
                        data-action="pickup"
                        data-index="${index}"
                    >
                        Pick Up Package
                    </button>

                `;

            }


            // Picked Up

            else if (status === "Picked Up") {

                buttons = `

                    <button
                        type="button"
                        class="accept-btn"
                        data-action="onway"
                        data-index="${index}"
                    >
                        Start Delivery
                    </button>

                `;

            }


            // On the Way

            else if (status === "On the Way") {

                buttons = `

                    <button
                        type="button"
                        class="complete-btn"
                        data-action="delivered"
                        data-index="${index}"
                    >
                        Mark as Delivered
                    </button>

                `;

            }


            // Delivered

            else if (status === "Delivered") {

                buttons = `

                    <span>
                        Delivery Completed
                    </span>

                `;

            }


            // Rejected

            else if (status === "Rejected") {

                buttons = `

                    <span>
                        Delivery Rejected
                    </span>

                `;

            }


            card.innerHTML = `

                <div class="delivery-card-header">

                    <div>

                        <h3>
                            ${delivery.type || "Delivery"}
                        </h3>

                        <p class="tracking-number">

                            Tracking Number:

                            <strong>
                                ${delivery.trackingId || "N/A"}
                            </strong>

                        </p>

                    </div>


                    <span class="delivery-status">

                        ${status}

                    </span>

                </div>


                <div class="delivery-info">

                    <div class="delivery-info-item">

                        <span>
                            Pickup
                        </span>

                        <strong>
                            ${delivery.pickup || "Not provided"}
                        </strong>

                    </div>


                    <div class="delivery-info-item">

                        <span>
                            Destination
                        </span>

                        <strong>
                            ${delivery.destination || "Not provided"}
                        </strong>

                    </div>


                    <div class="delivery-info-item">

                        <span>
                            Fare
                        </span>

                        <strong>
                            ${delivery.fare || "₦0"}
                        </strong>

                    </div>

                </div>


                <div class="delivery-actions">

                    ${buttons}

                </div>

            `;


            deliveriesList.appendChild(card);

        }
    );


    addDeliveryActions();


    updateDashboardNumbers(
        deliveries
    );

}


// ======================================
// DELIVERY ACTIONS
// ======================================

function addDeliveryActions() {

    const buttons =
        document.querySelectorAll(
            "[data-action]"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const action =
                        button.getAttribute(
                            "data-action"
                        );


                    const index =
                        Number(
                            button.getAttribute(
                                "data-index"
                            )
                        );


                    handleDeliveryAction(
                        action,
                        index
                    );

                }
            );

        }
    );

}


// ======================================
// HANDLE DELIVERY STATUS
// ======================================

function handleDeliveryAction(
    action,
    index
) {

    const deliveries =
        getRiderDeliveries();


    if (!deliveries[index]) {
        return;
    }


    const delivery =
        deliveries[index];


    if (action === "accept") {

        delivery.status =
            "Accepted";

    }


    if (action === "pickup") {

        delivery.status =
            "Picked Up";

    }


    if (action === "onway") {

        delivery.status =
            "On the Way";

    }


    if (action === "delivered") {

        delivery.status =
            "Delivered";

        delivery.completedAt =
            new Date().toISOString();

    }


    if (action === "reject") {

        delivery.status =
            "Rejected";

    }


    delivery.updatedAt =
        new Date().toISOString();


    saveRiderDeliveries(
        deliveries
    );


    // Send updated status
    // to customer tracking

    updateCustomerDelivery(
        delivery
    );


    displayDeliveries();

}


// ======================================
// DASHBOARD NUMBERS
// ======================================

function updateDashboardNumbers(
    deliveries
) {

    let completed = 0;

    let totalEarningsValue = 0;


    deliveries.forEach(
        function (delivery) {

            if (
                delivery.status ===
                "Delivered"
            ) {

                completed++;

                totalEarningsValue +=
                    getFareNumber(
                        delivery.fare
                    );

            }

        }
    );


    if (assignedCount) {

        assignedCount.textContent =
            deliveries.filter(
                function (delivery) {

                    return (
                        delivery.status !==
                        "Delivered" &&
                        delivery.status !==
                        "Rejected"
                    );

                }
            ).length;

    }


    if (completedCount) {

        completedCount.textContent =
            completed;

    }


    if (totalEarnings) {

        totalEarnings.textContent =
            formatMoney(
                totalEarningsValue
            );

    }


    if (todayEarnings) {

        todayEarnings.textContent =
            formatMoney(
                totalEarningsValue
            );

    }


    if (weekEarnings) {

        weekEarnings.textContent =
            formatMoney(
                totalEarningsValue
            );

    }


    if (monthEarnings) {

        monthEarnings.textContent =
            formatMoney(
                totalEarningsValue
            );

    }

}


// ======================================
// REFRESH
// ======================================

if (refreshDeliveriesBtn) {

    refreshDeliveriesBtn.addEventListener(
        "click",
        function () {

            displayDeliveries();

        }
    );

}


// ======================================
// LOGOUT
// ======================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {
                return;
            }


            localStorage.removeItem(
                "goRideRiderStatus"
            );


            window.location.href =
                "login.html";

        }
    );

}


// ======================================
// START DASHBOARD
// ======================================

displayRiderProfile();

updateRiderStatus();

displayDeliveries();
```
