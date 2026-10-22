
/* =========================================================
   GORIDE BUSINESS SERVICES
   Registration, Login, Dashboard and Delivery Requests
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* ================= 1. ELEMENTS ================= */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    const businessRegisterForm =
        document.getElementById("businessRegisterForm");

    const businessLoginForm =
        document.getElementById("businessLoginForm");

    const deliveryRequestForm =
        document.getElementById("deliveryRequestForm");

    const registerMessage =
        document.getElementById("registerMessage");

    const loginMessage =
        document.getElementById("loginMessage");

    const deliveryMessage =
        document.getElementById("deliveryMessage");

    const dashboard = document.getElementById("business-dashboard");
    const closeDashboardBtn = document.getElementById("closeDashboard");

    const dashboardBusinessName =
        document.getElementById("dashboardBusinessName");

    const dashboardBusinessDetails =
        document.getElementById("dashboardBusinessDetails");

    const totalRequestsElement =
        document.getElementById("totalRequests");

    const pendingRequestsElement =
        document.getElementById("pendingRequests");

    const completedRequestsElement =
        document.getElementById("completedRequests");

    const deliveryTableBody =
        document.getElementById("deliveryTableBody");

    const currentYear = document.getElementById("currentYear");


    /* ================= 2. STORAGE KEYS ================= */

    const BUSINESS_STORAGE_KEY = "goRideBusinessProfiles";
    const DELIVERY_STORAGE_KEY = "goRideBusinessDeliveries";
    const ACTIVE_BUSINESS_KEY = "goRideActiveBusiness";


    /* ================= 3. STORAGE HELPERS ================= */

    /*
       Read saved data safely.
       If storage is unavailable or the data is invalid,
       return an empty array or null as appropriate.
    */

    function readStorage(key, fallback) {
        try {
            const savedData = localStorage.getItem(key);

            if (savedData === null) {
                return fallback;
            }

            return JSON.parse(savedData);

        } catch (error) {
            console.error("Unable to read saved data:", error);
            return fallback;
        }
    }


    function saveStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;

        } catch (error) {
            console.error("Unable to save data:", error);
            return false;
        }
    }


    function getBusinesses() {
        const businesses = readStorage(BUSINESS_STORAGE_KEY, []);

        return Array.isArray(businesses) ? businesses : [];
    }


    function getDeliveries() {
        const deliveries = readStorage(DELIVERY_STORAGE_KEY, []);

        return Array.isArray(deliveries) ? deliveries : [];
    }


    function getActiveBusiness() {
        const email = readStorage(ACTIVE_BUSINESS_KEY, null);

        if (typeof email !== "string") {
            return null;
        }

        return getBusinesses().find(function (business) {
            return business.businessEmail === email;
        }) || null;
    }


    /* ================= 4. MESSAGE HELPERS ================= */

    function showMessage(element, message, type) {
        if (!element) return;

        element.textContent = message;
        element.classList.remove("success", "error");

        if (type) {
            element.classList.add(type);
        }
    }


    function clearMessage(element) {
        if (!element) return;

        element.textContent = "";
        element.classList.remove("success", "error");
    }


    /* ================= 5. SECTION NAVIGATION ================= */

    function goToSection(sectionId) {
        const section = document.getElementById(sectionId);

        if (!section) {
            console.warn("Section not found:", sectionId);
            return;
        }

        /*
           Open the target section if it is the dashboard.
           The other form sections remain available on the page.
        */

        if (sectionId === "business-dashboard") {
            section.hidden = false;
        }

        if (navbar && navbar.classList.contains("active")) {
            navbar.classList.remove("active");

            if (menuBtn) {
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                const menuIcon = menuBtn.querySelector("i");

                if (menuIcon) {
                    menuIcon.classList.remove("fa-xmark");
                    menuIcon.classList.add("fa-bars");
                }
            }
        }

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    /*
       Buttons with data-show automatically navigate to
       the matching registration, login or delivery section.
    */

    document.querySelectorAll("[data-show]").forEach(function (button) {

        button.addEventListener("click", function () {

            const targetId = button.getAttribute("data-show");

            if (targetId === "delivery-request" && !getActiveBusiness()) {
                showMessage(
                    loginMessage,
                    "Please log in with your registered business email before requesting a delivery.",
                    "error"
                );

                goToSection("business-login");
                return;
            }

            goToSection(targetId);

        });

    });


    /* ================= 6. MOBILE NAVIGATION ================= */

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", function () {

            const isOpen = navbar.classList.toggle("active");

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            const menuIcon = menuBtn.querySelector("i");

            if (menuIcon) {
                menuIcon.classList.toggle("fa-bars", !isOpen);
                menuIcon.classList.toggle("fa-xmark", isOpen);
            }

        });


        /*
           Close the mobile menu when a navigation link is clicked.
        */

        navbar.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navbar.classList.remove("active");

                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                const menuIcon = menuBtn.querySelector("i");

                if (menuIcon) {
                    menuIcon.classList.remove("fa-xmark");
                    menuIcon.classList.add("fa-bars");
                }

            });

        });


        /*
           Close the menu when the user clicks outside it.
        */

        document.addEventListener("click", function (event) {

            if (
                navbar.classList.contains("active") &&
                !navbar.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                navbar.classList.remove("active");

                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                const menuIcon = menuBtn.querySelector("i");

                if (menuIcon) {
                    menuIcon.classList.remove("fa-xmark");
                    menuIcon.classList.add("fa-bars");
                }
            }

        });

    }


    /* ================= 7. BUSINESS REGISTRATION ================= */

    if (businessRegisterForm) {

        businessRegisterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            clearMessage(registerMessage);

            /*
               Let the browser handle required fields,
               email validation and checkbox validation.
            */

            if (!businessRegisterForm.checkValidity()) {
                businessRegisterForm.reportValidity();
                return;
            }

            const businessName =
                document.getElementById("businessName").value.trim();

            const ownerName =
                document.getElementById("ownerName").value.trim();

            const businessPhone =
                document.getElementById("businessPhone").value.trim();

            const businessEmail =
                document.getElementById("businessEmail")
                    .value.trim().toLowerCase();

            const businessType =
                document.getElementById("businessType").value;

            const deliveryFrequency =
                document.getElementById("deliveryFrequency").value;

            const businessAddress =
                document.getElementById("businessAddress").value.trim();

            const businessNeeds =
                document.getElementById("businessNeeds").value.trim();


            if (
                !businessName ||
                !ownerName ||
                !businessPhone ||
                !businessEmail ||
                !businessType ||
                !deliveryFrequency ||
                !businessAddress
            ) {
                showMessage(
                    registerMessage,
                    "Please complete all required fields.",
                    "error"
                );

                return;
            }


            const businesses = getBusinesses();

            const existingBusiness = businesses.find(function (business) {
                return business.businessEmail === businessEmail;
            });


            if (existingBusiness) {

                showMessage(
                    registerMessage,
                    "This email is already registered. Please log in instead.",
                    "error"
                );

                return;
            }


            const newBusiness = {
                id: "BUS-" + Date.now().toString(36).toUpperCase(),

                businessName: businessName,
                ownerName: ownerName,
                businessPhone: businessPhone,
                businessEmail: businessEmail,
                businessType: businessType,
                deliveryFrequency: deliveryFrequency,
                businessAddress: businessAddress,
                businessNeeds: businessNeeds,

                registeredAt: new Date().toISOString()
            };


            businesses.push(newBusiness);


            if (!saveStorage(BUSINESS_STORAGE_KEY, businesses)) {

                showMessage(
                    registerMessage,
                    "Registration could not be saved. Check your browser storage and try again.",
                    "error"
                );

                return;
            }


            showMessage(
                registerMessage,
                "Registration successful! Please log in with your business email.",
                "success"
            );


            businessRegisterForm.reset();


            /*
               Pre-fill the login email for convenience.
            */

            const loginEmailInput =
                document.getElementById("loginEmail");

            if (loginEmailInput) {
                loginEmailInput.value = businessEmail;
            }


            setTimeout(function () {
                goToSection("business-login");
            }, 1200);

        });

    }


    /* ================= 8. BUSINESS LOGIN ================= */

    if (businessLoginForm) {

        businessLoginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            clearMessage(loginMessage);

            if (!businessLoginForm.checkValidity()) {
                businessLoginForm.reportValidity();
                return;
            }


            const loginEmail = document
                .getElementById("loginEmail")
                .value.trim()
                .toLowerCase();


            if (!loginEmail) {

                showMessage(
                    loginMessage,
                    "Please enter your registered business email.",
                    "error"
                );

                return;
            }


            const business = getBusinesses().find(function (item) {
                return item.businessEmail === loginEmail;
            });


            if (!business) {

                showMessage(
                    loginMessage,
                    "No business was found with that email. Please register first.",
                    "error"
                );

                return;
            }


            /*
               Demonstration login only.
               This stores the active email in the current browser.
               It does not authenticate a real user securely.
            */

            if (!saveStorage(ACTIVE_BUSINESS_KEY, loginEmail)) {

                showMessage(
                    loginMessage,
                    "Login could not be saved in this browser. Check your storage settings.",
                    "error"
                );

                return;
            }


            showMessage(
                loginMessage,
                "Login successful! Welcome to GoRide.",
                "success"
            );


            updateDashboard(business);


            setTimeout(function () {
                goToSection("business-dashboard");
            }, 500);

        });

    }


    /* ================= 9. UPDATE BUSINESS DASHBOARD ================= */

    function updateDashboard(business) {

        if (!business || !dashboard) return;

        dashboard.hidden = false;


        if (dashboardBusinessName) {
            dashboardBusinessName.textContent =
                business.businessName + " Dashboard";
        }


        if (dashboardBusinessDetails) {
            dashboardBusinessDetails.textContent =
                "Owner: " + business.ownerName +
                " | Email: " + business.businessEmail;
        }


        const businessDeliveries = getDeliveries().filter(function (delivery) {
            return delivery.businessEmail === business.businessEmail;
        });


        const total = businessDeliveries.length;

        const pending = businessDeliveries.filter(function (delivery) {
            return delivery.status === "Pending";
        }).length;

        const completed = businessDeliveries.filter(function (delivery) {
            return delivery.status === "Completed";
        }).length;


        if (totalRequestsElement) {
            totalRequestsElement.textContent = total;
        }

        if (pendingRequestsElement) {
            pendingRequestsElement.textContent = pending;
        }

        if (completedRequestsElement) {
            completedRequestsElement.textContent = completed;
        }


        renderDeliveryTable(businessDeliveries);

    }


    /* ================= 10. RENDER DELIVERY TABLE ================= */

    function renderDeliveryTable(deliveries) {

        if (!deliveryTableBody) return;

        /*
           Clear existing rows before creating updated rows.
        */

        deliveryTableBody.replaceChildren();


        if (deliveries.length === 0) {

            const row = document.createElement("tr");
            const cell = document.createElement("td");

            cell.colSpan = 6;
            cell.textContent = "No delivery requests yet.";

            row.appendChild(cell);
            deliveryTableBody.appendChild(row);

            return;
        }


        deliveries
            .slice()
            .sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .forEach(function (delivery) {

                const row = document.createElement("tr");


                const referenceCell = document.createElement("td");
                referenceCell.textContent = delivery.reference;


                const receiverCell = document.createElement("td");
                receiverCell.textContent = delivery.receiverName;


                const addressCell = document.createElement("td");
                addressCell.textContent = delivery.deliveryAddress;


                const packageCell = document.createElement("td");
                packageCell.textContent = delivery.packageType;


                const dateCell = document.createElement("td");

                const date = new Date(delivery.createdAt);

                dateCell.textContent = Number.isNaN(date.getTime())
                    ? "Date unavailable"
                    : date.toLocaleDateString();


                const statusCell = document.createElement("td");
                statusCell.textContent = delivery.status;


                row.appendChild(referenceCell);
                row.appendChild(receiverCell);
                row.appendChild(addressCell);
                row.appendChild(packageCell);
                row.appendChild(dateCell);
                row.appendChild(statusCell);

                deliveryTableBody.appendChild(row);

            });

    }


    /* ================= 11. SUBMIT DELIVERY REQUEST ================= */

    if (deliveryRequestForm) {

        deliveryRequestForm.addEventListener("submit", function (event) {

            event.preventDefault();

            clearMessage(deliveryMessage);


            if (!deliveryRequestForm.checkValidity()) {
                deliveryRequestForm.reportValidity();
                return;
            }


            const business = getActiveBusiness();


            if (!business) {

                showMessage(
                    deliveryMessage,
                    "Please log in to your business account before submitting a delivery request.",
                    "error"
                );

                goToSection("business-login");
                return;
            }


            const pickupName =
                document.getElementById("pickupName").value.trim();

            const pickupPhone =
                document.getElementById("pickupPhone").value.trim();

            const pickupAddress =
                document.getElementById("pickupAddress").value.trim();

            const receiverName =
                document.getElementById("receiverName").value.trim();

            const receiverPhone =
                document.getElementById("receiverPhone").value.trim();

            const deliveryAddress =
                document.getElementById("deliveryAddress").value.trim();

            const packageType =
                document.getElementById("packageType").value;

            const deliveryPreference =
                document.getElementById("deliveryPreference").value;

            const packageDescription =
                document.getElementById("packageDescription").value.trim();


            if (
                !pickupName ||
                !pickupPhone ||
                !pickupAddress ||
                !receiverName ||
                !receiverPhone ||
                !deliveryAddress ||
                !packageType ||
                !deliveryPreference
            ) {

                showMessage(
                    deliveryMessage,
                    "Please complete all required delivery fields.",
                    "error"
                );

                return;
            }


            const reference =
                "GR-" +
                Date.now().toString(36).toUpperCase() +
                "-" +
                Math.random().toString(36).slice(2, 6).toUpperCase();


            const newDelivery = {

                reference: reference,

                businessEmail: business.businessEmail,
                businessName: business.businessName,

                pickupName: pickupName,
                pickupPhone: pickupPhone,
                pickupAddress: pickupAddress,

                receiverName: receiverName,
                receiverPhone: receiverPhone,
                deliveryAddress: deliveryAddress,

                packageType: packageType,
                deliveryPreference: deliveryPreference,
                packageDescription: packageDescription,

                status: "Pending",

                createdAt: new Date().toISOString()

            };


            const deliveries = getDeliveries();

            deliveries.push(newDelivery);


            if (!saveStorage(DELIVERY_STORAGE_KEY, deliveries)) {

                showMessage(
                    deliveryMessage,
                    "Your delivery request could not be saved. Check your browser storage and try again.",
                    "error"
                );

                return;
            }


            showMessage(
                deliveryMessage,
                "Delivery request submitted successfully! Your reference is " +
                reference +
                ". Your request is currently pending.",
                "success"
            );


            deliveryRequestForm.reset();


            updateDashboard(business);


            /*
               Allow the user to read the confirmation before
               taking them to the updated dashboard.
            */

            setTimeout(function () {
                goToSection("business-dashboard");
            }, 1800);

        });

    }


    /* ================= 12. CLOSE DASHBOARD ================= */

    if (closeDashboardBtn && dashboard) {

        closeDashboardBtn.addEventListener("click", function () {

            dashboard.hidden = true;

            goToSection("business-login");

        });

    }


    /* ================= 13. AUTOMATIC COPYRIGHT YEAR ================= */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* ================= 14. INITIAL PAGE SETUP ================= */

    /*
       Keep the dashboard hidden until a business logs in.
       If a previously active business exists, restore its
       dashboard in this browser.
    */

    const activeBusiness = getActiveBusiness();

    if (activeBusiness) {
        updateDashboard(activeBusiness);
    } else if (dashboard) {
        dashboard.hidden = true;
    }


    console.log("GoRide Business Services JavaScript loaded successfully.");

});
