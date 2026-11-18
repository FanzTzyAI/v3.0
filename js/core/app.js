import { startBoot } from "./boot.js";
import { initializeLogin } from "./login.js";
import { initializeDesktop } from "./desktop.js";
import { initializeStartMenu } from "./start-menu.js";
import { initializeTaskbar } from "./taskbar.js";
import { initializeWindows } from "./windows.js";
import { initializeDragDrop } from "./drag-drop.js";
import { initializeNotifications } from "./notifications.js";

function startSystem() {
    initializeWindows();
    initializeDesktop();
    initializeStartMenu();
    initializeTaskbar();
    initializeDragDrop();
    initializeNotifications();

    console.log("FANZ OS 3.0 started successfully.");

    document.dispatchEvent(
        new CustomEvent("fanz:system-ready")
    );
}

function initializeSystem() {
    startBoot(() => {
        initializeLogin(() => {
            startSystem();
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initializeSystem();

    // Registrasi PWA
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./service-worker.js")
            .then(() => {
                console.log("FANZ OS Service Worker registered.");
            })
            .catch(error => {
                console.error(
                    "Service Worker error:",
                    error
                );
            });
    }
});
