
document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* ================= 1. STORAGE KEYS ================= */

    const STORAGE = {
        account: "goRideCustomerAccount",
        session: "goRideLoggedInCustomer",
        deliveries: "goRideCustomerDeliveries",
        supportRequests: "goRideCustomerSupportRequests",
        settings: "goRideCustomerSettings"
    };

    /* ================= 2. HELPER FUNCTIONS ================= */

    function getStoredData(key, fallback = null) {
        try {
            const stored = localStorage.getItem(key);
            return stored === null ? fallback : JSON.parse(stored);
        } catch (error) {
            console.error(`Unable to read ${key}:`, error);
            return fallback;
        }
    }

    function saveStoredData(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Unable to save ${key}:`, error);
            return false;
        }
    }

    function getElement(id) {
        return document.getElementById(id);
    }

    function showMessage(element, message, type = "success") {
        if (!element) return;

        element.textContent = message;
        element.classList.remove("success", "error");
        element.classList.add(type);
        element.setAttribute("role", "status");
    }

    function clearMessage(element) {
        if (!element) return;

        element.textContent = "";
        element.classList.remove("success", "error");
    }

    function getFormValue(form, fieldName) {
        const field = form.elements.namedItem(fieldName);
        return field ? field.value.trim() : "";
    }

    function getCurrentCustomer() {
        return getStoredData(STORAGE.session, null);
    }

    function getCustomerAccount() {
        return getStoredData(STORAGE.account, null);
    }

    function getSupportRequests() {
        return getStoredData(STORAGE.supportRequests, []);
    }

    function getDeliveryHistory() {
        return getStoredData(STORAGE.deliveries, []);
    }

    function getCustomerEmail() {
        const customer = getCurrentCustomer();
        return customer?.email?.toLowerCase() || "";
    }

    function createReference(prefix) {
        return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }

    function formatDate(dateValue) {
        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return "Not available";
        }

        return date.toLocaleDateString("en-NG", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[character]);
    }

    /* ================= 3. MOBILE NAVIGATION ================= */

    const menuBtn = getElement("menuBtn");
    const navbar = getElement("navbar");

    if (menuBtn && navbar) {
        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.addEventListener("click", () => {
            const isOpen = navbar.classList.toggle("active");

            menuBtn.setAttribute("aria-expanded", String(isOpen));
            menuBtn.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navbar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Open navigation menu");
            });
        });

        document.addEventListener("click", event => {
            if (
                navbar.classList.contains("active") &&
                !navbar.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                navbar.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Open navigation menu");
            }
        });
    }

    /* ================= 4. PAGE NAVIGATION BUTTONS ================= */

    document.querySelectorAll("[data-show]").forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.show;
            const target = getElement(targetId);

            if (!target) {
                console.warn(`GoRide: Section "${targetId}" was not found.`);
                return;
            }

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            if (navbar && menuBtn) {
                navbar.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
            }
        });
    });

    /* ================= 5. FAQ ACCORDION ================= */

    document.querySelectorAll("[data-faq-toggle]").forEach(question => {
        question.setAttribute("aria-expanded", "false");

        question.addEventListener("click", () => {
            const answerId =
                question.getAttribute("aria-controls") ||
                question.dataset.faqToggle;

            const answer = answerId ? getElement(answerId) : null;

            if (!answer) {
                console.warn("GoRide: FAQ answer element was not found.");
                return;
            }

            const shouldOpen =
                question.getAttribute("aria-expanded") !== "true";

            question.setAttribute("aria-expanded", String(shouldOpen));
            answer.hidden = !shouldOpen;
        });
    });

    /* ================= 6. CUSTOMER REGISTRATION ================= */

    const registerForm = getElement("customerRegisterForm");
    const registerMessage = getElement("registerMessage");

    if (registerForm) {
        registerForm.addEventListener("submit", event => {
            event.preventDefault();
            clearMessage(registerMessage);

            if (!registerForm.checkValidity()) {
                registerForm.reportValidity();
                return;
            }

            const name = getFormValue(registerForm, "customerName");
            const email = getFormValue(registerForm, "customerEmail")
                .toLowerCase();
            const phone = getFormValue(registerForm, "customerPhone");
            const address = getFormValue(registerForm, "customerAddress");
            const consent = registerForm.elements.namedItem("customerConsent");

            if (!name || !email || !phone || !address) {
                showMessage(
                    registerMessage,
                    "Please complete all required fields.",
                    "error"
                );
                return;
            }

            if (!consent || !consent.checked) {
                showMessage(
                    registerMessage,
                    "Please accept the required consent before registering.",
                    "error"
                );
                return;
            }

            const existingAccount = getCustomerAccount();

            if (
                existingAccount &&
                existingAccount.email.toLowerCase() === email
            ) {
                showMessage(
                    registerMessage,
                    "An account with this email already exists. Please log in.",
                    "error"
                );
                return;
            }

            const customer = {
                name,
                email,
                phone,
                address,
                accountStatus: "Active",
                createdAt: new Date().toISOString()
            };

            if (!saveStoredData(STORAGE.account, customer)) {
                showMessage(
                    registerMessage,
                    "Your account could not be saved. Please check your browser storage.",
                    "error"
                );
                return;
            }

            saveStoredData(STORAGE.session, customer);

            registerForm.reset();

            showMessage(
                registerMessage,
                "Registration successful! Your customer dashboard is ready."
            );

            openDashboard();
        });
    }

    /* ================= 7. CUSTOMER LOGIN ================= */

    const loginForm = getElement("customerLoginForm");
    const loginMessage = getElement("loginMessage");

    if (loginForm) {
        loginForm.addEventListener("submit", event => {
            event.preventDefault();
            clearMessage(loginMessage);

            if (!loginForm.checkValidity()) {
                loginForm.reportValidity();
                return;
            }

            const email = getFormValue(loginForm, "loginCustomerEmail")
                .toLowerCase();

            const account = getCustomerAccount();

            if (!account || account.email.toLowerCase() !== email) {
                showMessage(
                    loginMessage,
                    "No account was found with that email. Please register first or check your email.",
                    "error"
                );
                return;
            }

            /*
             * Demo login only.
             * A production login must verify credentials on a secure server.
             */
            if (!saveStoredData(STORAGE.session, account)) {
                showMessage(
                    loginMessage,
                    "Login could not be completed. Please try again.",
                    "error"
                );
                return;
            }

            loginForm.reset();

            showMessage(loginMessage, "Login successful. Welcome back!");

            openDashboard();
        });
    }

    /* ================= 8. OPEN CUSTOMER DASHBOARD ================= */

    const dashboard = getElement("customer-dashboard");

    function openDashboard() {
        const customer = getCurrentCustomer();

        if (!customer || !dashboard) return;

        dashboard.hidden = false;

        const nameDisplay = getElement("dashboardCustomerName");
        const emailDisplay = getElement("dashboardCustomerEmail");
        const statusDisplay = getElement("accountStatus");

        if (nameDisplay) {
            nameDisplay.textContent = customer.name;
        }

        if (emailDisplay) {
            emailDisplay.textContent = customer.email;
        }

        if (statusDisplay) {
            statusDisplay.textContent =
                customer.accountStatus || "Active";
        }

        populateProfile();
        populateSettings();
        refreshHistory();
        refreshSupportHistory();
        updateDashboardStats();

        dashboard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    /* ================= 9. DASHBOARD TABS ================= */

    const dashboardTabButtons =
        document.querySelectorAll("[data-dashboard-tab]");

    function showDashboardPanel(panelId) {
        dashboardTabButtons.forEach(button => {
            const isActive = button.dataset.dashboardTab === panelId;
            button.setAttribute("aria-pressed", String(isActive));
        });

        document.querySelectorAll(".dashboard-panel").forEach(panel => {
            panel.hidden = panel.id !== panelId;
        });

        const selectedPanel = getElement(panelId);

        if (selectedPanel) {
            selectedPanel.hidden = false;
        }
    }

    dashboardTabButtons.forEach(button => {
        button.addEventListener("click", () => {
            showDashboardPanel(button.dataset.dashboardTab);
        });
    });

    /* ================= 10. CUSTOMER PROFILE ================= */

    function populateProfile() {
        const customer = getCurrentCustomer();
        if (!customer) return;

        const profileName = getElement("profileName");
        const profilePhone = getElement("profilePhone");
        const profileAddress = getElement("profileAddress");

        if (profileName) profileName.value = customer.name || "";
        if (profilePhone) profilePhone.value = customer.phone || "";
        if (profileAddress) profileAddress.value = customer.address || "";
    }

    const profileForm = getElement("customerProfileForm");
    const profileMessage = getElement("profileMessage");

    if (profileForm) {
        profileForm.addEventListener("submit", event => {
            event.preventDefault();
            clearMessage(profileMessage);

            if (!profileForm.checkValidity()) {
                profileForm.reportValidity();
                return;
            }

            const account = getCustomerAccount();
            const session = getCurrentCustomer();

            if (!account || !session) {
                showMessage(
                    profileMessage,
                    "Please log in before updating your profile.",
                    "error"
                );
                return;
            }

            const updatedCustomer = {
                ...account,
                name: getFormValue(profileForm, "profileName"),
                phone: getFormValue(profileForm, "profilePhone"),
                address: getFormValue(profileForm, "profileAddress")
            };

            const accountSaved =
                saveStoredData(STORAGE.account, updatedCustomer);
            const sessionSaved =
                saveStoredData(STORAGE.session, updatedCustomer);

            if (!accountSaved || !sessionSaved) {
                showMessage(
                    profileMessage,
                    "Your changes could not be saved. Please try again.",
                    "error"
                );
                return;
            }

            showMessage(profileMessage, "Your profile has been updated.");
            openDashboardWithoutScroll();
        });
    }

    function openDashboardWithoutScroll() {
        const customer = getCurrentCustomer();
        if (!customer) return;

        const nameDisplay = getElement("dashboardCustomerName");
        const emailDisplay = getElement("dashboardCustomerEmail");

        if (nameDisplay) nameDisplay.textContent = customer.name;
        if (emailDisplay) emailDisplay.textContent = customer.email;
    }

    /* ================= 11. ACCOUNT SETTINGS ================= */

    const settingsForm = getElement("accountSettingsForm");
    const settingsMessage = getElement("settingsMessage");

    function populateSettings() {
        const settings = getStoredData(STORAGE.settings, {
            emailUpdates: true,
            smsUpdates: false
        });

        const emailUpdates = getElement("emailUpdates");
        const smsUpdates = getElement("smsUpdates");

        if (emailUpdates) {
            emailUpdates.checked = Boolean(settings.emailUpdates);
        }

        if (smsUpdates) {
            smsUpdates.checked = Boolean(settings.smsUpdates);
        }
    }

    if (settingsForm) {
        settingsForm.addEventListener("submit", event => {
            event.preventDefault();
            clearMessage(settingsMessage);

            if (!getCurrentCustomer()) {
                showMessage(
                    settingsMessage,
                    "Please log in before updating your settings.",
                    "error"
                );
                return;
            }

            const settings = {
                emailUpdates: Boolean(getElement("emailUpdates")?.checked),
                smsUpdates: Boolean(getElement("smsUpdates")?.checked)
            };

            if (!saveStoredData(STORAGE.settings, settings)) {
                showMessage(
                    settingsMessage,
                    "Your settings could not be saved.",
                    "error"
                );
                return;
            }

            showMessage(
                settingsMessage,
                "Your notification preferences have been saved."
            );
        });
    }

    /* ================= 12. DELIVERY HISTORY ================= */

    function refreshHistory() {
        const tableBody = getElement("customerHistoryBody");
        if (!tableBody) return;

        const email = getCustomerEmail();

        const deliveries = getDeliveryHistory().filter(delivery => {
            return String(delivery.customerEmail || "").toLowerCase() === email;
        });

        if (deliveries.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5">
                        No delivery history is available yet.
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = deliveries.map(delivery => `
            <tr>
                <td>${escapeHTML(delivery.reference || "—")}</td>
                <td>${escapeHTML(delivery.description || delivery.type || "Delivery")}</td>
                <td>${escapeHTML(delivery.status || "Pending")}</td>
                <td>${escapeHTML(formatDate(delivery.createdAt || delivery.date))}</td>
                <td>${escapeHTML(delivery.amount || "—")}</td>
            </tr>
        `).join("");
    }

    const refreshHistoryButton = getElement("refreshHistory");

    if (refreshHistoryButton) {
        refreshHistoryButton.addEventListener("click", () => {
            refreshHistory();
            updateDashboardStats();
        });
    }

    /* ================= 13. CUSTOMER SUPPORT REQUESTS ================= */

    const supportForm = getElement("customerSupportForm");
    const supportFormMessage = getElement("supportFormMessage");

    if (supportForm) {
        supportForm.addEventListener("submit", event => {
            event.preventDefault();
            clearMessage(supportFormMessage);

            if (!supportForm.checkValidity()) {
                supportForm.reportValidity();
                return;
            }

            const name = getFormValue(supportForm, "supportName");
            const email = getFormValue(supportForm, "supportEmail")
                .toLowerCase();
            const category = getFormValue(supportForm, "supportCategory");
            const subject = getFormValue(supportForm, "supportSubject");
            const message = getFormValue(supportForm, "supportMessage");

            if (!name || !email || !category || !subject || !message) {
                showMessage(
                    supportFormMessage,
                    "Please complete all required support fields.",
                    "error"
                );
                return;
            }

            const request = {
                reference: createReference("GR-SUPPORT"),
                name,
                email,
                category,
                subject,
                message,
                status: "Open",
                createdAt: new Date().toISOString()
            };

            const requests = getSupportRequests();
            requests.push(request);

            if (!saveStoredData(STORAGE.supportRequests, requests)) {
                showMessage(
                    supportFormMessage,
                    "Your request could not be saved. Please try again.",
                    "error"
                );
                return;
            }

            supportForm.reset();

            showMessage(
                supportFormMessage,
                `Your support request has been saved. Reference: ${request.reference}`
            );

            if (getCustomerEmail() === email) {
                refreshSupportHistory();
                updateDashboardStats();
            }
        });
    }

    /* ================= 14. SUPPORT REQUEST HISTORY ================= */

    function refreshSupportHistory() {
        const tableBody = getElement("supportHistoryBody");
        if (!tableBody) return;

        const email = getCustomerEmail();

        const requests = getSupportRequests().filter(request => {
            return String(request.email || "").toLowerCase() === email;
        });

        if (requests.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4">
                        You have not submitted any support requests yet.
                    </td>
                </tr>
            `;
            return;
        }

        tableBody.innerHTML = requests.map(request => `
            <tr>
                <td>${escapeHTML(request.reference)}</td>
                <td>${escapeHTML(request.subject)}</td>
                <td>${escapeHTML(request.status)}</td>
                <td>${escapeHTML(formatDate(request.createdAt))}</td>
            </tr>
        `).join("");
    }

    /* ================= 15. DASHBOARD STATISTICS ================= */

    function updateDashboardStats() {
        const email = getCustomerEmail();

        const deliveries = getDeliveryHistory().filter(delivery => {
            return String(delivery.customerEmail || "").toLowerCase() === email;
        });

        const requests = getSupportRequests().filter(request => {
            return String(request.email || "").toLowerCase() === email;
        });

        const deliveryCount = getElement("customerDeliveryCount");
        const supportCount = getElement("customerSupportCount");

        if (deliveryCount) {
            deliveryCount.textContent = String(deliveries.length);
        }

        if (supportCount) {
            supportCount.textContent = String(requests.length);
        }
    }

    /* ================= 16. LOGOUT ================= */

    const logoutButton = getElement("customerLogout");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            try {
                localStorage.removeItem(STORAGE.session);
            } catch (error) {
                console.error("Unable to log out:", error);
            }

            if (dashboard) {
                dashboard.hidden = true;
            }

            const registerSection = getElement("customer-register");
            const loginSection = getElement("customer-login");

            if (loginSection) {
                loginSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } else if (registerSection) {
                registerSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            showDashboardPanel("profile-panel");
        });
    }

    /* ================= 17. FOOTER YEAR ================= */

    const currentYear = getElement("currentYear");

    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }

    /* ================= 18. INITIAL PAGE STATE ================= */

    if (dashboard) {
        dashboard.hidden = true;
    }

    document.querySelectorAll("[data-faq-toggle]").forEach(question => {
        const answerId =
            question.getAttribute("aria-controls") ||
            question.dataset.faqToggle;

        const answer = answerId ? getElement(answerId) : null;

        if (answer) {
            answer.hidden = true;
        }
    });

    showDashboardPanel("profile-panel");

    /*
     * Restore an existing demo session on page refresh.
     */
    if (getCurrentCustomer()) {
        openDashboard();
    }
});
