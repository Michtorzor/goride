// =====================================
    // SIGN UP FORM
    // =====================================

    if (signupForm) {

        signupForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const requiredFields =
                    signupForm.querySelectorAll(
                        "input[required], select[required]"
                    );

                let formIsValid = true;

                requiredFields.forEach(
                    function (input) {

                        if (
                            input.type ===
                            "checkbox"
                        ) {

                            if (!input.checked) {
                                formIsValid = false;
                            }

                        } else {

                            if (
                                input.value
                                    .trim() === ""
                            ) {

                                formIsValid =
                                    false;

                            }

                        }

                    }
                );

                if (!formIsValid) {

                    alert(
                        "Please complete all required fields."
                    );

                    return;
                }


                // Check password confirmation

                const passwordInputs =
                    signupForm.querySelectorAll(
                        'input[type="password"]'
                    );

                if (
                    passwordInputs.length >= 2
                ) {

                    const password =
                        passwordInputs[0].value;

                    const confirmPassword =
                        passwordInputs[1].value;

                    if (
                        password !==
                        confirmPassword
                    ) {

                        alert(
                            "Passwords do not match."
                        );

                        return;
                    }

                }


                alert(
                    "Account created successfully!"
                );

                signupForm.reset();

                closeModal(signupModal);

            }
        );

    }
