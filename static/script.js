function showMessage() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("message").style.display = "block";
}

function showMemories() {
    document.getElementById("message").style.display = "none";
    document.getElementById("memories").style.display = "block";
}

function toggleMemory(card) {
    card.classList.toggle("open");

    const hint = document.getElementById("clickHint");

    if (hint) {
        hint.style.opacity = "0";
    }
}

function showSurprise() {
    document.getElementById("surprise").style.display = "block";
}

let score = 0;
let timeLeft = 20;
let gameTimer;
let heartSpawner;

function startGame() {

    document.getElementById("surprise").style.display = "none";
    document.getElementById("game").style.display = "block";

    document.getElementById("finalSurprise").style.display = "none";

    score = 0;
    timeLeft = 20;

    document.getElementById("score").textContent = score;
    document.getElementById("timer").textContent = timeLeft;
    document.getElementById("gameResult").textContent = "";

    const gameArea = document.getElementById("gameArea");
    gameArea.innerHTML = "";

    clearInterval(gameTimer);
    clearInterval(heartSpawner);

    createHeart();

    heartSpawner = setInterval(createHeart, 700);

    gameTimer = setInterval(function () {

        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame(false);
        }

    }, 1000);
}

function createHeart() {

    if (score >= 10 || timeLeft <= 0) {
        return;
    }

    const gameArea = document.getElementById("gameArea");

    const heart = document.createElement("button");

    heart.className = "heart";
    heart.textContent = "❤️";

    heart.style.left = Math.random() * 85 + "%";
    heart.style.top = Math.random() * 80 + "%";

    heart.onclick = function () {

        score++;

        document.getElementById("score").textContent = score;

        heart.remove();

        if (score >= 10) {
            endGame(true);
        }
    };

    gameArea.appendChild(heart);

    setTimeout(function () {
        if (heart.parentElement) {
            heart.remove();
        }
    }, 1500);
}

function endGame(won) {

    clearInterval(gameTimer);
    clearInterval(heartSpawner);

    document.querySelectorAll(".heart").forEach(function (heart) {
        heart.remove();
    });

    const result = document.getElementById("gameResult");

    if (won) {

        result.innerHTML = `
            <h2>YOU WINNN 😭❤️</h2>
            <p>Okay okay... you earned the next surprise😁</p>
        `;

       document.getElementById("finalSurprise").style.display = "block";

setTimeout(function () {
    document.getElementById("finalSurprise").style.display = "block";

setTimeout(function () {
    document.getElementById("finalSurprise").classList.add("reveal");
}, 300);

createConfetti();
playMusic();
}, 300);

createConfetti();

playMusic();

    } else {

        result.innerHTML = `
            <h2>TIME'S UP 😭</h2>
            <p>You got ${score}/10. Try again 👀</p>

            <button onclick="startGame()">
                Try again 🔄
            </button>
        `;
    }
}
function createConfetti() {

    const symbols = ["❤️", "💖", "💕", "✨", "💗"];

    for (let i = 0; i < 35; i++) {

        const confetti = document.createElement("div");

        confetti.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        confetti.style.position = "fixed";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-30px";
        confetti.style.fontSize = Math.random() * 20 + 18 + "px";
        confetti.style.pointerEvents = "none";
        confetti.style.zIndex = "9999";

        document.body.appendChild(confetti);

        const duration = Math.random() * 2 + 2;

        confetti.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translateY(110vh) rotate(${Math.random() * 720 - 360}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration * 1000,
                easing: "ease-out"
            }
        );

        setTimeout(function () {
            confetti.remove();
        }, duration * 1000);
    }
}
function playMusic() {

    const music = document.getElementById("birthdayMusic");

    music.volume = 0.35;

    music.play()
        .then(function () {
            console.log("Music started!");
        })
        .catch(function (error) {
            console.log("Music failed:", error);
        });
}