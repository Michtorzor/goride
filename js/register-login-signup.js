// =====================================================
// GoRide Authentication & Registration JavaScript
// Handles:
// 1. Register
// 2. Login
// 3. Sign Up
// 4. Forgot Password
// 5. Password Show/Hide
// =====================================================


// =====================================================
// PAGE ELEMENTS
// =====================================================

const registerBox = document.getElementById("registerBox");

const packageForm = document.getElementById("packageForm");
const riderForm = document.getElementById("riderForm");
const fleetForm = document.getElementById("fleetForm");

const loginBox = document.getElementById("loginBox");
const signupBox = document.getElementById("signupBox");
const forgotBox = document.getElementById("forgotBox");


// =====================================================
// GENERAL FUNCTION TO SHOW A BOX
// =====================================================

function showBox(box) {

    if (!box) return;

    box.classList.remove("hidden");

    box.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// =====================================================
// GENERAL FUNCTION TO HIDE A BOX
// =====================================================

function hideBox(box) {

    if (!box) return;

    box.classList.add("hidden");
}


// =====================================================
// REGISTER OPTIONS
// =====================================================

const packageRegisterBtn =
    document.getElementById("packageRegisterBtn");

const riderRegisterBtn =
    document.getElementById("riderRegisterBtn");

const fleetRegisterBtn =
    document.getElementById("fleetRegisterBtn");


// Send a Package
if (packageRegisterBtn) {

    packageRegisterBtn.addEventListener("click", function () {

        hideBox(riderForm);
        hideBox(fleetForm);

        showBox(packageForm);

    });
}


// Professional Rider
if (riderRegisterBtn) {

    riderRegisterBtn.addEventListener("click", function () {

        hideBox(packageForm);
        hideBox(fleetForm);

        showBox(riderForm);

    });
}


// Fleet Owner
if (fleetRegisterBtn) {

    fleetRegisterBtn.addEventListener("click", function () {

        hideBox(packageForm);
        hideBox(riderForm);

        showBox(fleetForm);

    });
}


// =====================================================
// PACKAGE REGISTRATION
// =====================================================

const packageFormElement =
    document.getElementById("packageFormElement");

if (packageFormElement) {

    packageFormElement.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("packageName")?.value.trim();

        const phone =
            document.getElementById("packagePhone")?.value.trim();

        const email =
            document.getElementById("packageEmail")?.value.trim();

        const pickup =
            document.getElementById("pickupLocation")?.value.trim();

        const delivery =
            document.getElementById("deliveryLocation")?.value.trim();

        const description =
            document.getElementById("packageDescription")?.value.trim();

        const photo =
            document.getElementById("packagePhoto");

        // Check required fields
        if (!name || !phone || !pickup || !delivery || !description) {

            alert("Please fill in all required package information.");

            return;
        }


        // Check package photo
        if (photo && photo.files.length === 0) {

            alert("Please upload or take a picture of your package.");

            return;
        }


        // Simple estimated fare
        const baseFare = 150;
        const distanceFare = 100;

        const estimatedFare = baseFare + distanceFare;


        alert(
            "Package registration successful!\n\n" +
            "Customer: " + name + "\n" +
            "Pickup: " + pickup + "\n" +
            "Delivery: " + delivery + "\n\n" +
            "Estimated Delivery Fare: ₦" +
            estimatedFare.toLocaleString() +
            "\n\n" +
            "A GoRide rider will be assigned to your delivery."
        );


        packageFormElement.reset();

    });
}


// =====================================================
// PROFESSIONAL RIDER REGISTRATION
// =====================================================

const riderFormElement =
    document.getElementById("riderFormElement");

if (riderFormElement) {

    riderFormElement.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("riderName")?.value.trim();

        const phone =
            document.getElementById("riderPhone")?.value.trim();

        const email =
            document.getElementById("riderEmail")?.value.trim();

        const city =
            document.getElementById("riderCity")?.value.trim();

        const experience =
            document.getElementById("riderExperience")?.value;

        const bike =
            document.getElementById("bikeInfo")?.value.trim();

        const license =
            document.getElementById("licenseNumber")?.value.trim();

        const plate =
            document.getElementById("plateNumber")?.value.trim();

        const address =
            document.getElementById("riderAddress")?.value.trim();

        const terms =
            document.getElementById("riderTerms");


        if (
            !name ||
            !phone ||
            !email ||
            !city ||
            !experience ||
            !bike ||
            !license ||
            !plate ||
            !address
        ) {

            alert("Please complete all required rider information.");

            return;
        }


        if (terms && !terms.checked) {

            alert("Please agree to the GoRide Rider Terms and Conditions.");

            return;
        }


        alert(
            "Rider registration submitted successfully!\n\n" +
            "Welcome to GoRide, " + name + ".\n\n" +
            "Your application will be reviewed by our team."
        );


        riderFormElement.reset();

    });
}


// =====================================================
// FLEET OWNER REGISTRATION
// =====================================================

const fleetFormElement =
    document.getElementById("fleetFormElement");

if (fleetFormElement) {

    fleetFormElement.addEventListener("submit", function (event) {

        event.preventDefault();


        const ownerName =
            document.getElementById("fleetOwnerName")?.value.trim();

        const phone =
            document.getElementById("fleetPhone")?.value.trim();

        const email =
            document.getElementById("fleetEmail")?.value.trim();

        const company =
            document.getElementById("companyName")?.value.trim();

        const city =
            document.getElementById("fleetCity")?.value.trim();

        const fleetSize =
            document.getElementById("fleetSize")?.value;

        const address =
            document.getElementById("fleetAddress")?.value.trim();

        const description =
            document.getElementById("fleetDescription")?.value.trim();

        const terms =
            document.getElementById("fleetTerms");


        if (
            !ownerName ||
            !phone ||
            !email ||
            !company ||
            !city ||
            !fleetSize ||
            !address ||
            !description
        ) {

            alert("Please complete all required fleet information.");

            return;
        }


        if (terms && !terms.checked) {

            alert("Please agree to the GoRide Fleet Terms and Conditions.");

            return;
        }


        alert(
            "Fleet registration submitted successfully!\n\n" +
            "Company: " + company + "\n" +
            "Owner: " + ownerName + "\n\n" +
            "Your fleet application has been received."
        );


        fleetFormElement.reset();

    });
}


// =====================================================
// LOGIN
// =====================================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail")?.value.trim();

        const password =
            document.getElementById("loginPassword")?.value;

        const rememberMe =
            document.getElementById("rememberMe");


        if (!email || !password) {

            alert("Please enter your email and password.");

            return;
        }


        // Remember email
        if (rememberMe && rememberMe.checked) {

            localStorage.setItem(
                "goRideRememberedEmail",
                email
            );

        } else {

            localStorage.removeItem(
                "goRideRememberedEmail"
            );
        }


        // Demo login
        alert(
            "Login successful!\n\n" +
            "Welcome back to GoRide."
        );


        // Go to homepage/dashboard
        window.location.href = "index.html";

    });
}


// =====================================================
// LOAD REMEMBERED EMAIL
// =====================================================

const loginEmail =
    document.getElementById("loginEmail");

if (loginEmail) {

    const rememberedEmail =
        localStorage.getItem("goRideRememberedEmail");

    if (rememberedEmail) {

        loginEmail.value = rememberedEmail;

        const rememberMe =
            document.getElementById("rememberMe");

        if (rememberMe) {

            rememberMe.checked = true;

        }
    }
}


// =====================================================
// SIGN UP
// =====================================================

const signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("signupName")?.value.trim();

        const email =
            document.getElementById("signupEmail")?.value.trim();

        const phone =
            document.getElementById("signupPhone")?.value.trim();

        const password =
            document.getElementById("signupPassword")?.value;

        const confirmPassword =
            document.getElementById("confirmPassword")?.value;

        const terms =
            document.getElementById("signupTerms");


        // Check fields
        if (
            !name ||
            !email ||
            !phone ||
            !password ||
            !confirmPassword
        ) {

            alert("Please complete all required fields.");

            return;
        }


        // Check password length
        if (password.length < 6) {

            alert(
                "Password must contain at least 6 characters."
            );

            return;
        }


        // Check password match
        if (password !== confirmPassword) {

            alert(
                "Passwords do not match."
            );

            return;
        }


        // Check terms
        if (terms && !terms.checked) {

            alert(
                "Please agree to the GoRide Terms and Privacy Policy."
            );

            return;
        }


        // Save basic signup information
        localStorage.setItem(
            "goRideUserName",
            name
        );

        localStorage.setItem(
            "goRideUserEmail",
            email
        );

        localStorage.setItem(
            "goRideUserPhone",
            phone
        );


        alert(
            "Account created successfully!\n\n" +
            "Welcome to GoRide, " + name + "!"
        );


        // Send user to login page
        window.location.href = "login.html";

    });
}


document.addEventListener("DOMContentLoaded", function () {

    console.log("GoRide Login JS is working");


    // =========================================
    // FORGOT PASSWORD
    // =========================================

    const forgotPassword = document.getElementById("forgotPassword");
    const forgotModal = document.getElementById("forgotModal");
    const forgotClose = document.getElementById("forgotClose");
    const backToLogin = document.getElementById("backToLogin");
    const forgotForm = document.getElementById("forgotForm");
    const forgotMessage = document.getElementById("forgotMessage");


    console.log("Forgot link:", forgotPassword);
    console.log("Forgot modal:", forgotModal);


    // OPEN POPUP
    if (forgotPassword) {

        forgotPassword.addEventListener("click", function (event) {

            event.preventDefault();

            console.log("Forgot Password clicked");

            forgotModal.classList.add("active");

        });

    }


    // CLOSE X
    if (forgotClose) {

        forgotClose.addEventListener("click", function () {

            forgotModal.classList.remove("active");

        });

    }


    // BACK TO LOGIN
    if (backToLogin) {

        backToLogin.addEventListener("click", function (event) {

            event.preventDefault();

            forgotModal.classList.remove("active");

        });

    }


    // CLICK OUTSIDE POPUP
    if (forgotModal) {

        forgotModal.addEventListener("click", function (event) {

            if (event.target === forgotModal) {

                forgotModal.classList.remove("active");

            }

        });

    }


    // SUBMIT FORM
    if (forgotForm) {

        forgotForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email =
                document.getElementById("forgotEmail").value.trim();


            if (email === "") {

                forgotMessage.textContent =
                    "Please enter your email address.";

                forgotMessage.className =
                    "forgot-message error";

                return;

            }


            forgotMessage.textContent =
                "Password reset instructions have been sent to your email.";

            forgotMessage.className =
                "forgot-message success";

        });

    }

});

// =========================================
// GO FROM LOGIN TO SIGN UP PAGE
// =========================================

const openSignup = document.getElementById("openSignup");

if (openSignup) {

    openSignup.addEventListener("click", function (event) {

        event.preventDefault();

        window.location.href = "sign-up.html";

    });

}

// =========================================
// GO FROM LOGIN TO REGISTER PAGE
// =========================================

const openRegister = document.getElementById("openRegister");

if (openRegister) {

    openRegister.addEventListener("click", function (event) {

        event.preventDefault();

        window.location.href = "register.html";

    });

}

document.addEventListener("DOMContentLoaded", function () {

    const signupLoginBtn = document.getElementById("signupLoginBtn");

    if (signupLoginBtn) {
        signupLoginBtn.addEventListener("click", function () {
            window.location.href = "./login.html";
        });
    }

});


/* =========================================
   GORIDE REGISTRATION PAGE
   Handles the close button and service links
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const registerBox = document.getElementById("registerBox");
    const registerClose = document.getElementById("registerClose");

    // Close registration page and return home
    if (registerClose) {
        registerClose.addEventListener("click", function () {
            window.location.href = "../index.html";
        });
    }

    // Close registration page with Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && registerBox) {
            window.location.href = "../index.html";
        }

    });

    // Check registration service links
    const registerOptions = document.querySelectorAll(".register-option");

    registerOptions.forEach(function (option) {

        option.addEventListener("click", function (event) {

            const destination = option.getAttribute("href");

            if (!destination || destination === "#") {
                event.preventDefault();
                alert("This GoRide service page has not been linked yet.");
            }

        });

    });

    console.log("GoRide registration page is ready.");

});
