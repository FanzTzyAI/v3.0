export function initializeDragDrop() {
    const container = document.getElementById("window-container");

    if (!container) return;

    container.addEventListener("pointerdown", event => {
        const header = event.target.closest(".window-header");

        if (!header) return;

        if (event.target.closest(".window-controls")) return;

        const windowElement = header.closest(".app-window");

        if (!windowElement) return;

        if (windowElement.classList.contains("maximized")) return;

        const rect = windowElement.getBoundingClientRect();

        const startX = event.clientX;
        const startY = event.clientY;

        const startLeft = rect.left;
        const startTop = rect.top;

        header.setPointerCapture(event.pointerId);

        function moveWindow(moveEvent) {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;

            const maxLeft = Math.max(
                0,
                window.innerWidth - windowElement.offsetWidth
            );

            const maxTop = Math.max(
                0,
                window.innerHeight - windowElement.offsetHeight
            );

            const newLeft = Math.max(
                0,
                Math.min(maxLeft, startLeft + deltaX)
            );

            const newTop = Math.max(
                0,
                Math.min(maxTop, startTop + deltaY)
            );

            windowElement.style.left = newLeft + "px";
            windowElement.style.top = newTop + "px";
        }

        function stopMoving() {
            header.removeEventListener("pointermove", moveWindow);
            header.removeEventListener("pointerup", stopMoving);
            header.removeEventListener("pointercancel", stopMoving);
        }

        header.addEventListener("pointermove", moveWindow);
        header.addEventListener("pointerup", stopMoving);
        header.addEventListener("pointercancel", stopMoving);
    });
              }
