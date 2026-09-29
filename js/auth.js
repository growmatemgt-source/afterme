const client = window.aftermeSupabase;


/* =========================
   ELEMENTS
========================= */

const loginTab =
    document.getElementById("loginTab");

const signupTab =
    document.getElementById("signupTab");

const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");

const authTitle =
    document.getElementById("authTitle");

const authMessage =
    document.getElementById("authMessage");

const loginButton =
    document.getElementById("loginButton");

const signupButton =
    document.getElementById("signupButton");

const forgotPassword =
    document.getElementById("forgotPassword");


/* =========================
   MESSAGE
========================= */

function showMessage(message, type = "success") {

    if (!authMessage) {
        return;
    }

    authMessage.textContent = message;

    authMessage.className =
        `auth-message show ${type}`;
}


function clearMessage() {

    if (!authMessage) {
        return;
    }

    authMessage.textContent = "";

    authMessage.className =
        "auth-message";
}


/* =========================
   TABS
========================= */

function showLogin() {

    clearMessage();

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    loginForm.classList.add("active");
    signupForm.classList.remove("active");

    authTitle.textContent =
        "Welcome back.";
}


function showSignup() {

    clearMessage();

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    signupForm.classList.add("active");
    loginForm.classList.remove("active");

    authTitle.textContent =
        "Begin your AFTERME.";
}


if (loginTab) {
    loginTab.addEventListener(
        "click",
        showLogin
    );
}


if (signupTab) {
    signupTab.addEventListener(
        "click",
        showSignup
    );
}


/* =========================
   LOGIN
========================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            clearMessage();

            if (!client) {

                showMessage(
                    "Supabase is not connected yet.",
                    "error"
                );

                return;
            }


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            if (!email || !password) {

                showMessage(
                    "Please enter your email and password.",
                    "error"
                );

                return;
            }


            loginButton.disabled = true;

            loginButton.textContent =
                "ENTERING...";


            try {

                const {
                    data,
                    error
                } =
                    await client.auth.signInWithPassword({
                        email,
                        password
                    });


                if (error) {
                    throw error;
                }


                if (!data || !data.user) {
                    throw new Error(
                        "Login could not be completed."
                    );
                }


                showMessage(
                    "Welcome back. Opening your AFTERME...",
                    "success"
                );


                setTimeout(() => {

                    window.location.href =
                        "dashboard.html";

                }, 700);


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                showMessage(
                    getFriendlyError(error),
                    "error"
                );


            } finally {

                loginButton.disabled = false;

                loginButton.textContent =
                    "ENTER AFTERME →";

            }

        }
    );
}


/* =========================
   SIGNUP
========================= */

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();

            clearMessage();

            if (!client) {

                showMessage(
                    "Supabase is not connected yet.",
                    "error"
                );

                return;
            }


            const name =
                document
                    .getElementById("signupName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("signupEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("signupPassword")
                    .value;


            if (!name || !email || !password) {

                showMessage(
                    "Please complete all fields.",
                    "error"
                );

                return;
            }


            if (password.length < 6) {

                showMessage(
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;
            }


            signupButton.disabled = true;

            signupButton.textContent =
                "CREATING...";


            try {

                const {
                    data,
                    error
                } =
                    await client.auth.signUp({

                        email,

                        password,

                        options: {

                            data: {
                                full_name: name
                            }

                        }

                    });


                if (error) {
                    throw error;
                }


                if (
                    data.user &&
                    !data.session
                ) {

                    showMessage(
                        "Account created. Check your email to confirm your account, then login.",
                        "success"
                    );


                    signupForm.reset();

                    setTimeout(
                        showLogin,
                        2500
                    );


                    return;
                }


                if (data.session) {

                    showMessage(
                        "Your AFTERME account is ready. Opening your space...",
                        "success"
                    );


                    setTimeout(() => {

                        window.location.href =
                            "dashboard.html";

                    }, 700);

                }


            } catch (error) {

                console.error(
                    "Signup error:",
                    error
                );


                showMessage(
                    getFriendlyError(error),
                    "error"
                );


            } finally {

                signupButton.disabled = false;

                signupButton.textContent =
                    "CREATE MY AFTERME →";

            }

        }
    );
}


/* =========================
   FORGOT PASSWORD
========================= */

if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        async () => {

            clearMessage();

            if (!client) {

                showMessage(
                    "Supabase is not connected yet.",
                    "error"
                );

                return;
            }


            const emailInput =
                document.getElementById(
                    "loginEmail"
                );


            const email =
                emailInput.value.trim();


            if (!email) {

                showMessage(
                    "Enter your email first, then choose forgot password.",
                    "error"
                );

                emailInput.focus();

                return;
            }


            try {

                const redirectUrl =
                    `${window.location.origin}/reset-password.html`;


                const {
                    error
                } =
                    await client.auth.resetPasswordForEmail(
                        email,
                        {
                            redirectTo: redirectUrl
                        }
                    );


                if (error) {
                    throw error;
                }


                showMessage(
                    "If an account exists for this email, a password reset link has been sent.",
                    "success"
                );


            } catch (error) {

                console.error(
                    "Password reset error:",
                    error
                );


                showMessage(
                    getFriendlyError(error),
                    "error"
                );

            }

        }
    );
}


/* =========================
   SHOW / HIDE PASSWORD
========================= */

const passwordToggles =
    document.querySelectorAll(
        ".password-toggle"
    );


passwordToggles.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const targetId =
                    button.dataset.target;

                const input =
                    document.getElementById(
                        targetId
                    );


                if (!input) {
                    return;
                }


                if (
                    input.type === "password"
                ) {

                    input.type = "text";

                    button.textContent =
                        "HIDE";

                } else {

                    input.type = "password";

                    button.textContent =
                        "SHOW";

                }

            }
        );

    }
);


/* =========================
   SESSION CHECK
========================= */

async function checkExistingSession() {

    if (!client) {
        return;
    }


    try {

        const {
            data,
            error
        } =
            await client.auth.getSession();


        if (error) {

            console.error(
                "Session error:",
                error
            );

            return;
        }


        if (
            data &&
            data.session &&
            window.location.pathname.endsWith(
                "login.html"
            )
        ) {

            window.location.href =
                "dashboard.html";

        }

    } catch (error) {

        console.error(
            "Session check failed:",
            error
        );

    }

}


checkExistingSession();


/* =========================
   FRIENDLY ERRORS
========================= */

function getFriendlyError(error) {

    const message =
        (
            error?.message ||
            ""
        ).toLowerCase();


    if (
        message.includes(
            "invalid login credentials"
        )
    ) {

        return "Email or password is incorrect.";

    }


    if (
        message.includes(
            "email not confirmed"
        )
    ) {

        return "Please confirm your email before logging in.";

    }


    if (
        message.includes(
            "user already registered"
        )
    ) {

        return "An account with this email already exists.";

    }


    if (
        message.includes(
            "password should be at least"
        )
    ) {

        return "Your password is too short.";

    }


    if (
        message.includes(
            "rate limit"
        )
    ) {

        return "Too many attempts. Please wait a little and try again.";

    }


    return (
        error?.message ||
        "Something went wrong. Please try again."
    );

}