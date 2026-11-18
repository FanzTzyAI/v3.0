export function startBoot(onComplete) {
    const bootScreen = document.getElementById("boot-screen");
    const bootProgress = document.querySelector(".boot-progress");
    const bootStatus = document.getElementById("boot-status");

    if (!bootScreen) {
        onComplete();
        return;
    }

    const messages = [
        "Initializing FANZ OS...",
        "Loading system components...",
        "Preparing desktop environment...",
        "Starting system services...",
        "Almost ready..."
    ];

    let progress = 0;
    let messageIndex = 0;

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 12) + 5;

        if (progress > 100) {
            progress = 100;
        }

        if (bootProgress) {
            bootProgress.style.width = progress + "%";
        }

        if (bootStatus && messageIndex < messages.length) {
            bootStatus.textContent = messages[messageIndex];
            messageIndex++;
        }

        if (progress >= 100) {
            clearInterval(interval);

            setTimeout(() => {
                bootScreen.classList.add("hidden");

                setTimeout(() => {
                    bootScreen.style.display = "none";
                    onComplete();
                }, 500);
            }, 500);
        }
    }, 250);
        }
