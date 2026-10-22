```javascript
// ======================================
// GORIDE RIDER REGISTRATION
// ======================================


// ======================================
// GET FORM
// ======================================

const riderForm =
    document.getElementById("riderFormElement");


// ======================================
// FORM SUBMISSION
// ======================================

if (riderForm) {

    riderForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // ==================================
        // GET FORM VALUES
        // ==================================

        const riderName =
            document.getElementById("riderName").value.trim();

        const riderPhone =
            document.getElementById("riderPhone").value.trim();

        const riderEmail =
            document.getElementById("riderEmail").value.trim();

        const riderCity =
            document.getElementById("riderCity").value.trim();

        const riderExperience =
            document.getElementById("riderExperience").value;

        const bikeInfo =
            document.getElementById("bikeInfo").value.trim();

        const licenseNumber =
            document.getElementById("licenseNumber").value.trim();

        const plateNumber =
            document.getElementById("plateNumber").value.trim();

        const riderAddress =
            document.getElementById("riderAddress").value.trim();

        const riderTerms =
            document.getElementById("riderTerms");


        // ==================================
        // VALIDATION
        // ==================================

        if (riderName === "") {

            alert("Please enter your full name.");
            return;

        }


        if (riderPhone === "") {

            alert("Please enter your phone number.");
            return;

        }


        if (riderEmail === "") {

            alert("Please enter your email address.");
            return;

        }


        if (riderCity === "") {

            alert("Please enter your city.");
            return;

        }


        if (riderExperience === "") {

            alert("Please select your riding experience.");
            return;

        }


        if (bikeInfo === "") {

            alert("Please enter your bike information.");
            return;

        }


        if (licenseNumber === "") {

            alert("Please enter your driver's license number.");
            return;

        }


        if (plateNumber === "") {

            alert("Please enter your bike plate number.");
            return;

        }


        if (riderAddress === "") {

            alert("Please enter your residential address.");
            return;

        }


        if (!riderTerms.checked) {

            alert(
                "Please agree to GoRide's Terms & Conditions and Privacy Policy."
            );

            return;

        }


        // ==================================
        // CREATE RIDER PROFILE
        // ==================================

        const riderProfile = {

            name: riderName,

            phone: riderPhone,

            email: riderEmail,

            city: riderCity,

            experience: riderExperience,

            bike: bikeInfo,

            license: licenseNumber,

            plate: plateNumber,

            address: riderAddress,

            rating: "5.0",

            registeredAt: new Date().toISOString()

        };


        // ==================================
        // SAVE RIDER PROFILE
        // ==================================

        localStorage.setItem(
            "goRideRiderProfile",
            JSON.stringify(riderProfile)
        );


        // ==================================
        // SET INITIAL RIDER STATUS
        // ==================================

        localStorage.setItem(
            "goRideRiderStatus",
            "offline"
        );


        // ==================================
        // CREATE EMPTY RIDER DELIVERY LIST
        // ==================================

        const existingDeliveries =
            localStorage.getItem(
                "goRideRiderDeliveries"
            );


        if (!existingDeliveries) {

            localStorage.setItem(
                "goRideRiderDeliveries",
                JSON.stringify([])
            );

        }


        // ==================================
        // SUCCESS MESSAGE
        // ==================================

        alert(
            "Rider registration successful! Welcome to GoRide."
        );


        // ==================================
        // GO TO RIDER DASHBOARD
        // ==================================

        window.location.href =
            "rider-dashboard.html";

    });

}
```
