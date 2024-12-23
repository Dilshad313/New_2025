// Countdown Timer
const countdown = () => {
    const targetDate = new Date('January 1, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        document.querySelector(".countdown").style.display = "none";
        document.getElementById("message").classList.remove("hidden");
        startFireworks();
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % 1000) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
};

setInterval(countdown, 1000);

// Fireworks Animation
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

const createFirework = () => {
    const colors = ["#ffeb3b", "#f44336", "#3f51b5", "#4caf50", "#ff5722"];
    const firework = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 4 - 2,
        alpha: 1,
    };
    fireworks.push(firework);
};

const drawFireworks = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((fw, index) => {
        ctx.beginPath();
        ctx.arc(fw.x, fw.y, fw.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${parseInt(fw.color.slice(1, 3), 16)},${parseInt(fw.color.slice(3, 5), 16)},${parseInt(fw.color.slice(5, 7), 16)},${fw.alpha})`;
        ctx.fill();

        fw.x += fw.speedX;
        fw.y += fw.speedY;
        fw.alpha -= 0.01;

        if (fw.alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });
};

const startFireworks = () => {
    setInterval(createFirework, 100);
    setInterval(drawFireworks, 50);
    document.getElementById("message").style.display = "block";
};

// Button Celebration
document.getElementById("celebrate-btn").addEventListener("click", () => {
    startFireworks();
});

// Resize Fireworks on Window Resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
