import { openWindow } from "./windows.js";

const apps = [
    { id: "ai", name: "Fanz AI Assistant", icon: "🤖" },
    { id: "files", name: "File Manager", icon: "📁" },
    { id: "browser", name: "Fanz Browser", icon: "🌐" },
    { id: "notes", name: "Fanz Notes", icon: "📝" },
    { id: "music", name: "Fanz Music", icon: "🎵" },
    { id: "games", name: "Gaming Center", icon: "🎮" },
    { id: "calculator", name: "Calculator", icon: "🧮" },
    { id: "settings", name: "Settings", icon: "⚙️" }
];

export function initializeStartMenu() {
    const startButton = document.getElementById("start-button");
    const startMenu = document.getElementById("start-menu");
    const searchInput = document.getElementById("app-search");
    const appList = document.getElementById("start-app-list");

    if (!startButton || !startMenu || !appList) return;

    startButton.addEventListener("click", event => {
        event.stopPropagation();

        startMenu.classList.toggle("show");
    });

    startMenu.addEventListener("click", event => {
        event.stopPropagation();
    });

    document.addEventListener("click", event => {
        if (
            !startMenu.contains(event.target) &&
            !startButton.contains(event.target)
        ) {
            startMenu.classList.remove("show");
        }
    });

    function renderApps(search = "") {
        appList.innerHTML = "";

        const filtered = apps.filter(app =>
            app.name.toLowerCase().includes(search.toLowerCase())
        );

        if (!filtered.length) {
            appList.textContent = "Aplikasi tidak ditemukan.";
            return;
        }

        filtered.forEach(app => {
            const button = document.createElement("button");

            button.className = "start-app-item";

            const icon = document.createElement("span");
            icon.textContent = app.icon;

            const name = document.createElement("span");
            name.textContent = app.name;

            button.append(icon, name);

            button.addEventListener("click", () => {
                openWindow(app.id);
                startMenu.classList.remove("show");
            });

            appList.appendChild(button);
        });
    }

    searchInput?.addEventListener("input", () => {
        renderApps(searchInput.value);
    });

    renderApps();
        }
