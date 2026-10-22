
/* =====================================================
   GORIDE FLEET SERVICES
   COMPLETE JAVASCRIPT
   8 POP-UPS + FLEET MANAGEMENT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* =========================================
       1. STORAGE
    ========================================= */

    const STORAGE_KEY = "gorideFleetServicesData";

    let fleetData = {
        bikes: [],
        riders: [],
        assignments: [],
        deliveries: []
    };

    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {
            const parsedData = JSON.parse(savedData);

            fleetData.bikes = Array.isArray(parsedData.bikes)
                ? parsedData.bikes : [];

            fleetData.riders = Array.isArray(parsedData.riders)
                ? parsedData.riders : [];

            fleetData.assignments = Array.isArray(parsedData.assignments)
                ? parsedData.assignments : [];

            fleetData.deliveries = Array.isArray(parsedData.deliveries)
                ? parsedData.deliveries : [];
        }
    } catch (error) {
        console.error("Could not load GoRide fleet data:", error);
    }

    function saveData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(fleetData));
        } catch (error) {
            console.error("Could not save GoRide fleet data:", error);
            alert("Your data could not be saved in this browser.");
        }
    }

    function createId() {
        return Date.now().toString(36) +
            Math.random().toString(36).slice(2, 8);
    }

    function getValue(id) {
        const element = document.getElementById(id);
        return element ? element.value.trim() : "";
    }

    function getElement(id) {
        return document.getElementById(id);
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (char) {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[char];
        });
    }

    function formatMoney(amount) {
        return "₦" + Number(amount || 0).toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function showMessage(message) {
        alert(message);
    }

    /* =========================================
       2. OPEN AND CLOSE ALL EIGHT POP-UPS
    ========================================= */

    const modalIds = [
        "dashboardModal",
        "bikeModal",
        "riderModal",
        "manageBikesModal",
        "manageRidersModal",
        "assignmentModal",
        "deliveriesModal",
        "earningsModal"
    ];

    function openModal(modalId) {
        const modal = getElement(modalId);

        if (!modal) {
            console.error(
                "GoRide pop-up not found. Check this HTML ID:",
                modalId
            );
            return;
        }

        modal.classList.add("active");
        document.body.style.overflow = "hidden";

        refreshAll();
    }

    function closeModal(modal) {
        if (!modal) return;

        modal.classList.remove("active");

        if (!document.querySelector(".modal.active")) {
            document.body.style.overflow = "";
        }
    }

    // Seven buttons using data-modal
    document.querySelectorAll("[data-modal]").forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const modalId = button.getAttribute("data-modal");
            openModal(modalId);
        });
    });

    // Fleet Dashboard button
    const dashboardButton = getElement("openDashboard");

    if (dashboardButton) {
        dashboardButton.addEventListener("click", function (event) {
            event.preventDefault();
            openModal("dashboardModal");
        });
    }

    // Close buttons
    document.querySelectorAll(".close-modal").forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            closeModal(button.closest(".modal"));
        });
    });

    // Close when the user clicks outside the modal content
    modalIds.forEach(function (modalId) {
        const modal = getElement(modalId);

        if (modal) {
            modal.addEventListener("click", function (event) {
                if (event.target === modal) {
                    closeModal(modal);
                }
            });
        }
    });

    // Close with Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            document.querySelectorAll(".modal.active").forEach(closeModal);
        }
    });

    /* =========================================
       3. REGISTER A BIKE
    ========================================= */

    const bikeForm = getElement("bikeForm");

    if (bikeForm) {
        bikeForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = getValue("bikeName");
            const plate = getValue("bikePlate");
            const color = getValue("bikeColor");
            const status = getValue("bikeStatus") || "Available";

            if (!name || !plate) {
                showMessage("Please enter the bike name and plate number.");
                return;
            }

            const duplicate = fleetData.bikes.some(function (bike) {
                return bike.plate.toLowerCase() === plate.toLowerCase();
            });

            if (duplicate) {
                showMessage("This bike plate number is already registered.");
                return;
            }

            fleetData.bikes.push({
                id: createId(),
                name: name,
                plate: plate,
                color: color,
                status: status
            });

            saveData();
            bikeForm.reset();
            refreshAll();

            showMessage("Bike registered successfully!");
        });
    }

    /* =========================================
       4. REGISTER A RIDER
    ========================================= */

    const riderForm = getElement("riderForm");

    if (riderForm) {
        riderForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = getValue("riderName");
            const phone = getValue("riderPhone");
            const email = getValue("riderEmail");
            const license = getValue("riderLicense");

            if (!name || !phone) {
                showMessage("Please enter the rider's name and phone number.");
                return;
            }

            const duplicatePhone = fleetData.riders.some(function (rider) {
                return rider.phone === phone;
            });

            if (duplicatePhone) {
                showMessage("This phone number is already registered.");
                return;
            }

            fleetData.riders.push({
                id: createId(),
                name: name,
                phone: phone,
                email: email,
                license: license,
                status: "Available"
            });

            saveData();
            riderForm.reset();
            refreshAll();

            showMessage("Rider registered successfully!");
        });
    }

    /* =========================================
       5. ASSIGN A RIDER TO A BIKE
    ========================================= */

    const assignmentForm = getElement("assignmentForm");

    if (assignmentForm) {
        assignmentForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const riderId = getValue("assignmentRider");
            const bikeId = getValue("assignmentBike");

            if (!riderId || !bikeId) {
                showMessage("Please select both a rider and a bike.");
                return;
            }

            const rider = fleetData.riders.find(function (item) {
                return item.id === riderId;
            });

            const bike = fleetData.bikes.find(function (item) {
                return item.id === bikeId;
            });

            if (!rider || !bike) {
                showMessage("The selected rider or bike could not be found.");
                return;
            }

            if (bike.status !== "Available") {
                showMessage("This bike is not available for assignment.");
                return;
            }

            const existingAssignment = fleetData.assignments.find(function (item) {
                return item.riderId === riderId && item.active;
            });

            if (existingAssignment) {
                showMessage("This rider already has an active bike assignment.");
                return;
            }

            fleetData.assignments.push({
                id: createId(),
                riderId: riderId,
                bikeId: bikeId,
                date: new Date().toLocaleDateString(),
                active: true
            });

            bike.status = "Assigned";
            rider.status = "Assigned";

            saveData();
            assignmentForm.reset();
            refreshAll();

            showMessage("Rider assigned to bike successfully!");
        });
    }

    /* =========================================
       6. REGISTER A DELIVERY
    ========================================= */

    const deliveryForm = getElement("deliveryForm");

    if (deliveryForm) {
        deliveryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const reference = getValue("deliveryReference");
            const destination = getValue("deliveryDestination");
            const riderId = getValue("deliveryRider");
            const status = getValue("deliveryStatus") || "Pending";
            const amountText = getValue("deliveryAmount");
            const amount = Number(amountText);

            if (!reference || !destination || amountText === "") {
                showMessage(
                    "Please enter the delivery reference, destination and amount."
                );
                return;
            }

            if (!Number.isFinite(amount) || amount < 0) {
                showMessage("Please enter a valid delivery amount.");
                return;
            }

            const duplicate = fleetData.deliveries.some(function (delivery) {
                return delivery.reference.toLowerCase() ===
                    reference.toLowerCase();
            });

            if (duplicate) {
                showMessage("This delivery reference already exists.");
                return;
            }

            if (riderId && !fleetData.riders.some(function (rider) {
                return rider.id === riderId;
            })) {
                showMessage("Please select a valid rider.");
                return;
            }

            fleetData.deliveries.push({
                id: createId(),
                reference: reference,
                destination: destination,
                riderId: riderId,
                status: status,
                amount: amount,
                date: new Date().toLocaleDateString()
            });

            saveData();
            deliveryForm.reset();
            refreshAll();

            showMessage("Delivery added successfully!");
        });
    }

    /* =========================================
       7. UPDATE DASHBOARD TOTALS
    ========================================= */

    function updateText(id, value) {
        const element = getElement(id);

        if (element) {
            element.textContent = value;
        }
    }

    function updateDashboard() {
        const totalEarnings = fleetData.deliveries
            .filter(function (delivery) {
                return delivery.status === "Delivered";
            })
            .reduce(function (total, delivery) {
                return total + Number(delivery.amount || 0);
            }, 0);

        updateText("totalBikes", fleetData.bikes.length);
        updateText("totalRiders", fleetData.riders.length);
        updateText("totalDeliveries", fleetData.deliveries.length);
        updateText("totalEarnings", formatMoney(totalEarnings));
        updateText("earningsTotal", formatMoney(totalEarnings));
    }

    /* =========================================
       8. DISPLAY REGISTERED BIKES
    ========================================= */

    function renderBikes() {
        const tbody = getElement("bikesTableBody");

        if (!tbody) return;

        if (fleetData.bikes.length === 0) {
            tbody.innerHTML =
                '<tr><td colspan="5">No bikes registered yet.</td></tr>';
            return;
        }

        tbody.innerHTML = fleetData.bikes.map(function (bike) {
            return `
                <tr>
                    <td>${escapeHTML(bike.name)}</td>
                    <td>${escapeHTML(bike.plate)}</td>
                    <td>${escapeHTML(bike.color || "Not specified")}</td>
                    <td>${escapeHTML(bike.status)}</td>
                    <td>
                        <button type="button"
                            class="fleet-delete-btn"
                            data-delete-bike="${escapeHTML(bike.id)}">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }).join("");
    }

    /* =========================================
       9. DISPLAY REGISTERED RIDERS
    ========================================= */

    function renderRiders() {
        const tbody = getElement("ridersTableBody");

        if (!tbody) return;

        if (fleetData.riders.length === 0) {
            tbody.innerHTML =
                '<tr><td colspan="5">No riders registered yet.</td></tr>';
            return;
        }

        tbody.innerHTML = fleetData.riders.map(function (rider) {
            return `
                <tr>
                    <td>${escapeHTML(rider.name)}</td>
                    <td>${escapeHTML(rider.phone)}</td>
                    <td>${escapeHTML(rider.email || "Not provided")}</td>
                    <td>${escapeHTML(rider.license || "Not provided")}</td>
                    <td>
                        ${escapeHTML(rider.status)}
                        <button type="button"
                            class="fleet-delete-btn"
                            data-delete-rider="${escapeHTML(rider.id)}">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }).join("");
    }

    /* =========================================
       10. POPULATE RIDER AND BIKE SELECT BOXES
    ========================================= */

    function populateSelect(id, items, getLabel, placeholder) {
        const select = getElement(id);

        if (!select) return;

        const previousValue = select.value;

        select.innerHTML =
            `<option value="">${escapeHTML(placeholder)}</option>`;

        items.forEach(function (item) {
            const option = document.createElement("option");
            option.value = item.id;
            option.textContent = getLabel(item);
            select.appendChild(option);
        });

        if (items.some(function (item) {
            return item.id === previousValue;
        })) {
            select.value = previousValue;
        }
    }

    function updateSelectBoxes() {
        populateSelect(
            "assignmentRider",
            fleetData.riders.filter(function (rider) {
                return !fleetData.assignments.some(function (assignment) {
                    return assignment.riderId === rider.id && assignment.active;
                });
            }),
            function (rider) {
                return rider.name + " (" + rider.phone + ")";
            },
            "Select a rider"
        );

        populateSelect(
            "assignmentBike",
            fleetData.bikes.filter(function (bike) {
                return bike.status === "Available";
            }),
            function (bike) {
                return bike.name + " - " + bike.plate;
            },
            "Select an available bike"
        );

        populateSelect(
            "deliveryRider",
            fleetData.riders,
            function (rider) {
                return rider.name;
            },
            "Select a rider (optional)"
        );
    }

    /* =========================================
       11. DISPLAY ASSIGNMENTS
    ========================================= */

    function renderAssignments() {
        const tbody = getElement("assignmentsTableBody");

        if (!tbody) return;

        if (fleetData.assignments.length === 0) {
            tbody.innerHTML =
                '<tr><td colspan="4">No rider assignments yet.</td></tr>';
            return;
        }

        tbody.innerHTML = fleetData.assignments.map(function (assignment) {
            const rider = fleetData.riders.find(function (item) {
                return item.id === assignment.riderId;
            });

            const bike = fleetData.bikes.find(function (item) {
                return item.id === assignment.bikeId;
            });

            return `
                <tr>
                    <td>${escapeHTML(rider ? rider.name : "Rider removed")}</td>
                    <td>${escapeHTML(bike ? bike.name : "Bike removed")}</td>
                    <td>${escapeHTML(bike ? bike.plate : "—")}</td>
                    <td>
                        ${assignment.active ? "Active" : "Ended"}
                        ${assignment.active ? `
                            <button type="button"
                                class="fleet-delete-btn"
                                data-end-assignment="${escapeHTML(assignment.id)}">
                                End Assignment
                            </button>
                        ` : ""}
                    </td>
                </tr>
            `;
        }).join("");
    }

    /* =========================================
       12. DISPLAY DELIVERIES
    ========================================= */

    function renderDeliveries() {
        const tbody = getElement("deliveriesTableBody");

        if (!tbody) return;

        if (fleetData.deliveries.length === 0) {
            tbody.innerHTML =
                '<tr><td colspan="6">No deliveries recorded yet.</td></tr>';
            return;
        }

        tbody.innerHTML = fleetData.deliveries.map(function (delivery) {
            const rider = fleetData.riders.find(function (item) {
                return item.id === delivery.riderId;
            });

            return `
                <tr>
                    <td>${escapeHTML(delivery.reference)}</td>
                    <td>${escapeHTML(delivery.destination)}</td>
                    <td>${escapeHTML(rider ? rider.name : "Not assigned")}</td>
                    <td>${escapeHTML(delivery.status)}</td>
                    <td>${formatMoney(delivery.amount)}</td>
                    <td>
                        <button type="button"
                            class="fleet-delete-btn"
                            data-delete-delivery="${escapeHTML(delivery.id)}">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }).join("");
    }

    /* =========================================
       13. DISPLAY EARNINGS
    ========================================= */

    function renderEarnings() {
        const tbody = getElement("earningsTableBody");

        if (!tbody) return;

        const completedDeliveries = fleetData.deliveries.filter(
            function (delivery) {
                return delivery.status === "Delivered";
            }
        );

        if (completedDeliveries.length === 0) {
            tbody.innerHTML =
                '<tr><td colspan="4">No completed delivery earnings yet.</td></tr>';
            return;
        }

        tbody.innerHTML = completedDeliveries.map(function (delivery) {
            const rider = fleetData.riders.find(function (item) {
                return item.id === delivery.riderId;
            });

            return `
                <tr>
                    <td>${escapeHTML(delivery.reference)}</td>
                    <td>${escapeHTML(rider ? rider.name : "Not assigned")}</td>
                    <td>${escapeHTML(delivery.date)}</td>
                    <td>${formatMoney(delivery.amount)}</td>
                </tr>
            `;
        }).join("");
    }

    /* =========================================
       14. DELETE AND MANAGE RECORDS
    ========================================= */

    document.addEventListener("click", function (event) {
        const button = event.target.closest("button");

        if (!button) return;

        // Delete a bike
        if (button.hasAttribute("data-delete-bike")) {
            const id = button.getAttribute("data-delete-bike");

            const assigned = fleetData.assignments.some(function (item) {
                return item.bikeId === id && item.active;
            });

            if (assigned) {
                showMessage("End this bike's active assignment before deleting it.");
                return;
            }

            if (confirm("Are you sure you want to delete this bike?")) {
                fleetData.bikes = fleetData.bikes.filter(
                    function (bike) {
                        return bike.id !== id;
                    }
                );

                fleetData.assignments = fleetData.assignments.filter(
                    function (item) {
                        return item.bikeId !== id;
                    }
                );

                saveData();
                refreshAll();
            }
        }

        // Delete a rider
        if (button.hasAttribute("data-delete-rider")) {
            const id = button.getAttribute("data-delete-rider");

            const assigned = fleetData.assignments.some(function (item) {
                return item.riderId === id && item.active;
            });

            if (assigned) {
                showMessage("End this rider's active assignment before deleting them.");
                return;
            }

            if (confirm("Are you sure you want to delete this rider?")) {
                fleetData.riders = fleetData.riders.filter(
                    function (rider) {
                        return rider.id !== id;
                    }
                );

                fleetData.assignments = fleetData.assignments.filter(
                    function (item) {
                        return item.riderId !== id;
                    }
                );

                saveData();
                refreshAll();
            }
        }

        // End an assignment
        if (button.hasAttribute("data-end-assignment")) {
            const id = button.getAttribute("data-end-assignment");

            const assignment = fleetData.assignments.find(
                function (item) {
                    return item.id === id;
                }
            );

            if (assignment && confirm("End this bike assignment?")) {
                assignment.active = false;

                const bike = fleetData.bikes.find(function (item) {
                    return item.id === assignment.bikeId;
                });

                const rider = fleetData.riders.find(function (item) {
                    return item.id === assignment.riderId;
                });

                if (bike) bike.status = "Available";

                if (rider) rider.status = "Available";

                saveData();
                refreshAll();
            }
        }

        // Delete a delivery
        if (button.hasAttribute("data-delete-delivery")) {
            const id = button.getAttribute("data-delete-delivery");

            if (confirm("Are you sure you want to delete this delivery?")) {
                fleetData.deliveries = fleetData.deliveries.filter(
                    function (delivery) {
                        return delivery.id !== id;
                    }
                );

                saveData();
                refreshAll();
            }
        }
    });

    /* =========================================
       15. REFRESH ALL FLEET INFORMATION
    ========================================= */

    function refreshAll() {
        updateDashboard();
        renderBikes();
        renderRiders();
        updateSelectBoxes();
        renderAssignments();
        renderDeliveries();
        renderEarnings();
    }

    /* =========================================
       16. START THE APPLICATION
    ========================================= */

    refreshAll();

    console.log("GoRide Fleet Services JavaScript loaded successfully.");

});
