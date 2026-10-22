```javascript
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // GET FORM ELEMENTS
    // =========================

    const packageForm =
        document.getElementById("packageFormElement");

    const requestType =
        document.getElementById("requestType");

    const packageName =
        document.getElementById("packageName");

    const packagePhone =
        document.getElementById("packagePhone");

    const packageEmail =
        document.getElementById("packageEmail");

    const receiverName =
        document.getElementById("receiverName");

    const receiverPhone =
        document.getElementById("receiverPhone");

    const pickupLocation =
        document.getElementById("pickupLocation");

    const deliveryLocation =
        document.getElementById("deliveryLocation");

    const packageType =
        document.getElementById("packageType");

    const packageWeight =
        document.getElementById("packageWeight");

    const deliverySpeed =
        document.getElementById("deliverySpeed");

    const packageDescription =
        document.getElementById("packageDescription");

    const packagePhoto =
        document.getElementById("packagePhoto");

    const scheduleFields =
        document.getElementById("scheduleFields");

    const deliveryDate =
        document.getElementById("deliveryDate");

    const deliveryTime =
        document.getElementById("deliveryTime");

    const farePreview =
        document.getElementById("farePreview");

    const estimatedFare =
        document.getElementById("estimatedFare");

    const deliverySummary =
        document.getElementById("deliverySummary");


    // =========================
    // MOBILE MENU
    // =========================

    const menuBtn =
        document.getElementById("menuBtn");

    const navbar =
        document.querySelector(".navbar");


    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", function () {

            navbar.classList.toggle("mobile-open");

        });

    }


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


    // =========================
    // GET DELIVERY TYPE FROM URL
    // =========================

    const urlParams =
        new URLSearchParams(window.location.search);

    const urlType =
        urlParams.get("type");


    const validTypes = [
        "food",
        "document",
        "parcel",
        "ecommerce",
        "pharmacy",
        "bulk",
        "other"
    ];


    if (
        requestType &&
        urlType &&
        validTypes.includes(urlType)
    ) {

        requestType.value = urlType;

    }


    // =========================
    // SET TODAY AS MINIMUM DATE
    // =========================

    if (deliveryDate) {

        const today =
            new Date().toISOString().split("T")[0];

        deliveryDate.min = today;

    }


    // =========================
    // DELIVERY TIMING
    // =========================

    const timingOptions =
        document.querySelectorAll(
            'input[name="deliveryTiming"]'
        );


    function updateScheduleFields() {

        const selected =
            document.querySelector(
                'input[name="deliveryTiming"]:checked'
            );


        if (!selected) {
            return;
        }


        if (selected.value === "schedule") {

            if (scheduleFields) {

                scheduleFields.style.display =
                    "block";

            }

            if (deliveryDate) {
                deliveryDate.required = true;
            }

            if (deliveryTime) {
                deliveryTime.required = true;
            }

        } else {

            if (scheduleFields) {

                scheduleFields.style.display =
                    "none";

            }

            if (deliveryDate) {
                deliveryDate.required = false;
            }

            if (deliveryTime) {
                deliveryTime.required = false;
            }

        }

    }


    timingOptions.forEach(function (option) {

        option.addEventListener(
            "change",
            updateScheduleFields
        );

    });


    updateScheduleFields();


    // =========================
    // PACKAGE PHOTO
    // =========================

    if (packagePhoto) {

        packagePhoto.addEventListener(
            "change",
            function () {

                if (packagePhoto.files.length > 0) {

                    const fileName =
                        packagePhoto.files[0].name;

                    const uploadText =
                        document.querySelector(
                            ".file-upload span"
                        );

                    if (uploadText) {

                        uploadText.textContent =
                            fileName;

                    }

                }

            }
        );

    }


    // =========================
    // FARE CALCULATION
    // =========================

    const BASE_FARE = 500;

    const PACKAGE_FEES = {

        document: 200,

        small: 400,

        medium: 700,

        large: 1200

    };


    const EXPRESS_FEE = 500;

    const EXTRA_WEIGHT_FEE = 100;

    const DISTANCE_FEE = 1000;


    function calculateFare() {

        let fare =
            BASE_FARE;

        let packageFee =
            PACKAGE_FEES[packageType?.value] || 0;


        fare += packageFee;


        // Demo distance fee
        fare += DISTANCE_FEE;


        // Extra weight charge
        const weight =
            Number(packageWeight?.value) || 0;


        if (weight > 2) {

            const extraWeight =
                Math.ceil(weight - 2);

            fare +=
                extraWeight * EXTRA_WEIGHT_FEE;

        }


        // Express delivery
        if (
            deliverySpeed &&
            deliverySpeed.value === "express"
        ) {

            fare += EXPRESS_FEE;

        }


        return fare;

    }


    function updateFare() {

        const fare =
            calculateFare();


        if (estimatedFare) {

            estimatedFare.textContent =
                "₦" + fare.toLocaleString();

        }


        if (farePreview) {

            farePreview.style.display =
                "block";

        }


        return fare;

    }


    if (packageType) {

        packageType.addEventListener(
            "change",
            updateFare
        );

    }


    if (packageWeight) {

        packageWeight.addEventListener(
            "input",
            updateFare
        );

    }


    if (deliverySpeed) {

        deliverySpeed.addEventListener(
            "change",
            updateFare
        );

    }


    updateFare();


    // =========================
    // FORM SUBMISSION
    // =========================

    if (packageForm) {

        packageForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                // Validate request type
                if (
                    !requestType ||
                    !requestType.value
                ) {

                    alert(
                        "Please select a delivery type."
                    );

                    return;

                }


                // Validate sender
                if (
                    !packageName ||
                    !packageName.value.trim()
                ) {

                    alert(
                        "Please enter the sender's name."
                    );

                    packageName.focus();

                    return;

                }


                if (
                    !packagePhone ||
                    !packagePhone.value.trim()
                ) {

                    alert(
                        "Please enter the sender's phone number."
                    );

                    packagePhone.focus();

                    return;

                }


                // Validate receiver
                if (
                    !receiverName ||
                    !receiverName.value.trim()
                ) {

                    alert(
                        "Please enter the receiver's name."
                    );

                    receiverName.focus();

                    return;

                }


                if (
                    !receiverPhone ||
                    !receiverPhone.value.trim()
                ) {

                    alert(
                        "Please enter the receiver's phone number."
                    );

                    receiverPhone.focus();

                    return;

                }


                // Validate locations
                if (
                    !pickupLocation ||
                    !pickupLocation.value.trim()
                ) {

                    alert(
                        "Please enter the pickup location."
                    );

                    pickupLocation.focus();

                    return;

                }


                if (
                    !deliveryLocation ||
                    !deliveryLocation.value.trim()
                ) {

                    alert(
                        "Please enter the delivery location."
                    );

                    deliveryLocation.focus();

                    return;

                }


                // Validate package
                if (
                    !packageType ||
                    !packageType.value
                ) {

                    alert(
                        "Please select a package size."
                    );

                    packageType.focus();

                    return;

                }


                if (
                    !packageWeight ||
                    !packageWeight.value
                ) {

                    alert(
                        "Please enter the package weight."
                    );

                    packageWeight.focus();

                    return;

                }


                if (
                    !packageDescription ||
                    !packageDescription.value.trim()
                ) {

                    alert(
                        "Please describe the package."
                    );

                    packageDescription.focus();

                    return;

                }


                // =========================
                // DELIVERY TIMING
                // =========================

                const selectedTiming =
                    document.querySelector(
                        'input[name="deliveryTiming"]:checked'
                    );


                if (!selectedTiming) {

                    alert(
                        "Please select when you want the delivery."
                    );

                    return;

                }


                if (
                    selectedTiming.value === "schedule"
                ) {

                    if (
                        !deliveryDate ||
                        !deliveryDate.value
                    ) {

                        alert(
                            "Please select a delivery date."
                        );

                        deliveryDate.focus();

                        return;

                    }


                    if (
                        !deliveryTime ||
                        !deliveryTime.value
                    ) {

                        alert(
                            "Please select a delivery time."
                        );

                        deliveryTime.focus();

                        return;

                    }

                }


                // =========================
                // CALCULATE FINAL FARE
                // =========================

                const finalFare =
                    calculateFare();


                // =========================
                // CREATE URL
                // =========================

                const confirmationUrl =
                    new URL(
                        "confirm-delivery.html",
                        window.location.href
                    );


                confirmationUrl.searchParams.set(
                    "type",
                    requestType.value
                );


                confirmationUrl.searchParams.set(
                    "timing",
                    selectedTiming.value
                );


                confirmationUrl.searchParams.set(
                    "sender",
                    packageName.value.trim()
                );


                confirmationUrl.searchParams.set(
                    "phone",
                    packagePhone.value.trim()
                );


                confirmationUrl.searchParams.set(
                    "receiver",
                    receiverName.value.trim()
                );


                confirmationUrl.searchParams.set(
                    "receiverPhone",
                    receiverPhone.value.trim()
                );


                confirmationUrl.searchParams.set(
                    "pickup",
                    pickupLocation.value.trim()
                );


                confirmationUrl.searchParams.set(
                    "destination",
                    deliveryLocation.value.trim()
                );


                // Package information
                const selectedPackage =
                    packageType.options[
                        packageType.selectedIndex
                    ];


                const packageNameText =
                    selectedPackage
                        ? selectedPackage.text
                        : packageType.value;


                const packageDetails =
                    packageNameText +
                    " - " +
                    packageWeight.value +
                    " kg";


                confirmationUrl.searchParams.set(
                    "package",
                    packageDetails
                );


                confirmationUrl.searchParams.set(
                    "fare",
                    finalFare
                );


                // Scheduled delivery
                if (
                    selectedTiming.value === "schedule"
                ) {

                    confirmationUrl.searchParams.set(
                        "date",
                        deliveryDate.value
                    );


                    confirmationUrl.searchParams.set(
                        "time",
                        deliveryTime.value
                    );

                }


                // Optional email
                if (
                    packageEmail &&
                    packageEmail.value.trim()
                ) {

                    confirmationUrl.searchParams.set(
                        "email",
                        packageEmail.value.trim()
                    );

                }


                // =========================
                // GO TO CONFIRMATION PAGE
                // =========================

                window.location.href =
                    confirmationUrl.toString();

            }
        );

    }

});
```
