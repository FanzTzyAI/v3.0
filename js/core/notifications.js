const STORAGE_KEY = "fanz_os_notifications";

function getNotifications() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveNotifications(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addNotification(title, message) {
    const notifications = getNotifications();

    notifications.unshift({
        id: Date.now(),
        title,
        message,
        time: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
        })
    });

    saveNotifications(notifications.slice(0, 30));

    renderNotifications();

    const center = document.getElementById("notification-center");

    if (center) {
        center.classList.add("has-notification");
    }
}

export function renderNotifications() {
    const list = document.getElementById("notification-list");

    if (!list) return;

    const notifications = getNotifications();

    list.innerHTML = "";

    if (notifications.length === 0) {
        list.innerHTML = `
            <div class="empty-notification">
                Belum ada notifikasi.
            </div>
        `;
        return;
    }

    notifications.forEach(item => {
        const element = document.createElement("div");

        element.className = "notification-item";

        const title = document.createElement("strong");
        title.textContent = item.title;

        const message = document.createElement("p");
        message.textContent = item.message;

        const time = document.createElement("small");
        time.textContent = item.time;

        element.append(title, message, time);
        list.appendChild(element);
    });
}

export function clearNotifications() {
    saveNotifications([]);
    renderNotifications();
}

export function initializeNotifications() {
    renderNotifications();

    const clearButton = document.getElementById("clear-notifications");

    clearButton?.addEventListener("click", clearNotifications);
          }
