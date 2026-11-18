import { addNotification } from "./notifications.js";

let windowCounter = 0;
let activeWindow = null;
let highestZIndex = 100;

const windows = new Map();

const appInformation = {
    ai: {
        name: "Fanz AI Assistant",
        icon: "🤖"
    },
    files: {
        name: "File Manager",
        icon: "📁"
    },
    browser: {
        name: "Fanz Browser",
        icon: "🌐"
    },
    notes: {
        name: "Fanz Notes",
        icon: "📝"
    },
    music: {
        name: "Fanz Music",
        icon: "🎵"
    },
    games: {
        name: "Gaming Center",
        icon: "🎮"
    },
    calculator: {
        name: "Calculator",
        icon: "🧮"
    },
    settings: {
        name: "Settings",
        icon: "⚙️"
    }
};

export function openWindow(appId, customContent = null) {
    const info = appInformation[appId] || {
        name: appId,
        icon: "📦"
    };

    const id = "fanz-window-" + (++windowCounter);

    const container = document.getElementById("window-container");

    if (!container) return null;

    const windowElement = document.createElement("section");

    windowElement.className = "app-window active";
    windowElement.id = id;
    windowElement.dataset.app = appId;

    windowElement.style.zIndex = ++highestZIndex;

    const content = customContent || `
        <div class="app-placeholder">
            <div class="placeholder-icon">${info.icon}</div>
            <h2>${info.name}</h2>
            <p>Aplikasi sedang disiapkan.</p>
        </div>
    `;

    windowElement.innerHTML = `
        <div class="window-header">
            <div class="window-title">
                <span>${info.icon}</span>
                <span>${info.name}</span>
            </div>

            <div class="window-controls">
                <button class="window-minimize" title="Minimize">−</button>
                <button class="window-maximize" title="Maximize">□</button>
                <button class="window-close" title="Close">×</button>
            </div>
        </div>

        <div class="window-content"></div>
    `;

    const contentArea = windowElement.querySelector(".window-content");
    contentArea.innerHTML = content;

    container.appendChild(windowElement);

    const windowData = {
        id,
        appId,
        element: windowElement,
        minimized: false
    };

    windows.set(id, windowData);

    windowElement.querySelector(".window-close").addEventListener(
        "click",
        () => closeWindow(id)
    );

    windowElement.querySelector(".window-minimize").addEventListener(
        "click",
        () => minimizeWindow(id)
    );

    windowElement.querySelector(".window-maximize").addEventListener(
        "click",
        () => maximizeWindow(id)
    );

    windowElement.addEventListener("pointerdown", () => {
        focusWindow(id);
    });

    focusWindow(id);

    window.dispatchEvent(new CustomEvent("fanz:window-opened", {
        detail: { id, appId }
    }));

    return id;
}

export function focusWindow(id) {
    const data = windows.get(id);

    if (!data) return;

    windows.forEach(item => {
        item.element.classList.remove("active");
    });

    data.element.classList.add("active");
    data.element.style.zIndex = ++highestZIndex;

    activeWindow = id;

    window.dispatchEvent(new CustomEvent("fanz:window-focused", {
        detail: { id, appId: data.appId }
    }));
}

export function closeWindow(id) {
    const data = windows.get(id);

    if (!data) return;

    data.element.remove();
    windows.delete(id);

    if (activeWindow === id) {
        activeWindow = null;

        const remaining = Array.from(windows.keys());

        if (remaining.length) {
            focusWindow(remaining[remaining.length - 1]);
        }
    }

    window.dispatchEvent(new CustomEvent("fanz:window-closed", {
        detail: { id, appId: data.appId }
    }));
}

export function minimizeWindow(id) {
    const data = windows.get(id);

    if (!data) return;

    data.element.classList.add("minimized");
    data.minimized = true;

    if (activeWindow === id) {
        activeWindow = null;
    }

    window.dispatchEvent(new CustomEvent("fanz:window-minimized", {
        detail: { id, appId: data.appId }
    }));
}

export function maximizeWindow(id) {
    const data = windows.get(id);

    if (!data) return;

    data.element.classList.toggle("maximized");

    focusWindow(id);
}

export function restoreWindow(id) {
    const data = windows.get(id);

    if (!data) return;

    data.element.classList.remove("minimized");
    data.minimized = false;

    focusWindow(id);
}

export function getWindows() {
    return Array.from(windows.values());
}

export function getActiveWindow() {
    return activeWindow;
}

export function getWindowById(id) {
    return windows.get(id);
}

export function initializeWindows() {
    const container = document.getElementById("window-container");

    if (!container) {
        addNotification("System", "Window container tidak ditemukan.");
        return;
    }
      }
