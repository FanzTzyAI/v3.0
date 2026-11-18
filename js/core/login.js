const USER_KEY = "fanz_os_user";
const PASSWORD_KEY = "fanz_os_password_hash";

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hash = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hash))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

export function initializeLogin(onSuccess) {
    const loginScreen = document.getElementById("login-screen");
    const usernameInput = document.getElementById("login-username");
    const passwordInput = document.getElementById("login-password");
    const loginButton = document.getElementById("login-button");
    const loginError = document.getElementById("login-error");

    if (!loginScreen || !loginButton) {
        onSuccess();
        return;
    }

    loginScreen.style.display = "flex";

    loginButton.addEventListener("click", async () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        if (!username || !password) {
            showError("Username dan password harus diisi.");
            return;
        }

        loginButton.disabled = true;
        loginButton.textContent = "Memproses...";

        try {
            const savedUsername = localStorage.getItem(USER_KEY);
            const savedPassword = localStorage.getItem(PASSWORD_KEY);
            const passwordHash = await hashPassword(password);

            if (!savedUsername || !savedPassword) {
                // Pendaftaran pertama
                localStorage.setItem(USER_KEY, username);
                localStorage.setItem(PASSWORD_KEY, passwordHash);

                showError("");
                enterDesktop(username);
                return;
            }

            if (
                username === savedUsername &&
                passwordHash === savedPassword
            ) {
                showError("");
                enterDesktop(username);
            } else {
                showError("Username atau password salah.");
            }
        } catch (error) {
            showError("Login tidak dapat diproses di browser ini.");
            console.error(error);
        } finally {
            loginButton.disabled = false;
            loginButton.textContent = "Masuk";
        }
    });

    function showError(message) {
        if (loginError) {
            loginError.textContent = message;
        }
    }

    function enterDesktop(username) {
        localStorage.setItem("fanz_os_current_user", username);

        loginScreen.classList.add("hidden");

        setTimeout(() => {
            loginScreen.style.display = "none";
            onSuccess();
        }, 400);
    }
                             }
