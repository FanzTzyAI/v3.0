import {
    getWindows,
    restoreWindow,
    focusWindow
} from "./windows.js";

export function initializeTaskbar() {
    updateClock();

    setInterval(updateClock, 1000);

    renderTaskbarApps();

    window.addEventListener("fanz:window-opened", renderTaskbarApps);
    window.addEventListener("fanz:window-closed", renderTaskbarApps);
    window.addEventListener("fanz:window-minimized", renderTaskbarApps);
    window.addEventListener("fanz:window-focused", renderTaskbarApps);
}

function updateClock() {
    const clock = document.getElementById("taskbar-clock");

    if (!clock) return;

    const now = new Date();

    clock.innerHTML = `
        <span>
            ${now.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit"
            })}
        </span>
        <small>
            ${now.toLocaleDateString("id-ID", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric"
            })}
        </small>
    `;
}

function renderTaskbarApps() {
    const container = document.getElementById("taskbar-apps");

    if (!container) return;

    container.innerHTML = "";

    getWindows().forEach(data => {
        const button = document.createElement("button");

        button.className = "taskbar-app-button";
        button.textContent = data.appId;

        button.title = "Buka " + data.appId;

        button.addEventListener("click", () => {
            if (data.minimized) {
                restoreWindow(data.id);
            } else {
                focusWindow(data.id);
            }
        });

        container.appendChild(button);
    });
                              }
