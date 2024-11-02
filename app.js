// Connect to the server with Socket.io
const socket = io();

// Button element
const highFiveBtn = document.getElementById("highFiveBtn");
const confettiContainer = document.getElementById("confettiContainer");

// Sound effect for high-five
const highFiveSound = new Audio("sounds/highfive.mp3");

// Emit a high-five event to the server
highFiveBtn.addEventListener("click", () => {
    socket.emit("highFive");
});

// Listen for high-five events from the server
socket.on("highFiveReceived", () => {
    showConfetti();
    highFiveSound.play();
});

// Confetti animation function
function showConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = Math.random() * 2 + 3 + "s";
        confettiContainer.appendChild(confetti);

        // Remove confetti after animation
        confetti.addEventListener("animationend", () => {
            confetti.remove();
        });
    }
}

