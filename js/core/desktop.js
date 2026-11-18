import { openWindow } from "./windows.js";
import { addNotification } from "./notifications.js";

export function initializeDesktop() {
    const desktop = document.getElementById("desktop");

    if (!desktop) return;

    desktop.style.display = "block";

    const username = localStorage.getItem("fanz_os_current_user") || "User";

    const brand = document.querySelector(".desktop-brand");

    if (brand) {
        brand.title = "Logged in as " + username;
    }

    initializeDesktopIcons();

    addNotification(
        "FANZ OS 3.0",
        "Desktop berhasil dijalankan."
    );
}

function initializeDesktopIcons() {
    const icons = document.querySelectorAll(".desktop-icon");

    icons.forEach(icon => {
        const appId = icon.dataset.app;

        if (!appId) return;

        icon.addEventListener("dblclick", () => {
            openWindow(appId);
        });

        // Mendukung ketukan pada layar sentuh
        let lastTap = 0;

        icon.addEventListener("pointerup", event => {
            if (event.pointerType === "mouse") return;

            const now = Date.now();

            if (now - lastTap < 350) {
                openWindow(appId);
            }

            lastTap = now;
        });
    });
}
