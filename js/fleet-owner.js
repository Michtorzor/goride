
document.addEventListener("DOMContentLoaded", function () {
    // Registration form elements
    const fleetOwnerForm = document.getElementById("fleetOwnerForm");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const terms = document.getElementById("terms");

    // Success modal elements
    const successModal = document.getElementById("successModal");
    const goDashboardBtn = document.getElementById("goDashboardBtn");

    // Dashboard page: both HTML files are inside the pages folder
    const dashboardURL = "rider-dashboard.html";

    // Check that the required elements exist
    if (!fleetOwnerForm) {
        console.error("Fleet owner registration form was not found.");
        return;
    }

    // Set password requirements
    if (password) {
        password.minLength = 6;
    }

    if (confirmPassword) {
        confirmPassword.minLength = 6;
    }

    // Confirm that both passwords match
    function checkPasswords() {
        if (!password || !confirmPassword) {
            return true;
        }

        if (confirmPassword.value && password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
            return false;
        }

        confirmPassword.setCustomValidity("");
        return true;
    }

    if (password && confirmPassword) {
        password.addEventListener("input", checkPasswords);
        confirmPassword.addEventListener("input", checkPasswords);
    }

    // Handle form submission
    fleetOwnerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Validate password confirmation
        if (!checkPasswords()) {
            confirmPassword.reportValidity();
            return;
        }

        // Validate terms acceptance
        if (terms && !terms.checked) {
            terms.setCustomValidity("Please accept the Terms and Conditions.");
            terms.reportValidity();
            terms.setCustomValidity("");
            return;
        }

        // Check all browser-required fields
        if (!fleetOwnerForm.checkValidity()) {
            fleetOwnerForm.reportValidity();
            return;
        }

        // Display the success modal
        if (successModal) {
            successModal.classList.add("active");
            successModal.style.display = "flex";
            successModal.setAttribute("aria-hidden", "false");
        } else {
            alert("Your form passed validation. Registration has not been saved to a server.");
        }
    });

    // Navigate to the rider dashboard
    if (goDashboardBtn) {
        goDashboardBtn.addEventListener("click", function () {
            window.location.href = dashboardURL;
        });
    }

    // Close the success modal when clicking outside the box
    if (successModal) {
        successModal.addEventListener("click", function (event) {
            if (event.target === successModal) {
                successModal.classList.remove("active");
                successModal.style.display = "none";
                successModal.setAttribute("aria-hidden", "true");
            }
        });
    }
});
