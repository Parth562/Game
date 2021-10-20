const playerIdBox = document.querySelector(".player_ids");
const gameAreaBox = document.querySelector(".game_area");
const startBtn = document.getElementById("startBtn");
const result = document.getElementById("result");
const roundEl = document.querySelector(".round h1");

const playerOneBtn = document.getElementById("playerOneBtn");
const playerTwoBtn = document.getElementById("playerTwoBtn");

const icon1 = document.querySelectorAll(".fas")[0];
const icon2 = document.querySelectorAll(".fas")[1];

let scoreFirst = document.getElementById("scoreOne").textContent.split(" ");
let scoreSecond = document.getElementById("scoreTwo").textContent.split(" ");

let health1 = 100,
  health2 = 100,
  round = 1,
  score1 = 0,
  score2 = 0;

startBtn.addEventListener("click", (e) => {
  initialState();
});

playerOneBtn.addEventListener("click", (e) => {
  health2 -= randomNumber();
  if (health2 <= 0) health2 = 0;
  updateState(health1, health2, score1, score2, round);
  changeBtn(true, false);
  if (health2 <= 0) {
    nextRound();
    return;
  }
});

playerTwoBtn.addEventListener("click", (e) => {
  health1 -= randomNumber();
  if (health1 <= 0) health1 = 0;
  updateState(health1, health2, score1, score2, round);
  changeBtn(false, true);
  if (health1 <= 0) {
    nextRound();
    return;
  }
});

const nextRound = () => {
  // alert(`round ${round} over`);
  round += 1;
  if (round == 6) {
    gameOver();
    return;
  }
  if (health1 <= 0) score2 += 1;
  else score1 += 1;
  roundEl.textContent = `Round #${round}`;
  health1 = 100;
  health2 = 100;
  document.getElementById("curr_healthTwo").textContent = health2;
  document.getElementById("curr_healthOne").textContent = health1;
  scoreFirst[5] = score1;
  scoreSecond[5] = score2;
  document.getElementById("scoreOne").textContent = scoreFirst.join(" ");
  document.getElementById("scoreTwo").textContent = scoreSecond.join(" ");
};

const initialState = () => {
  health1 = 100;
  health2 = 100;
  round = 1;
  score1 = score2 = 0;
  if (playerIdBox.hasAttribute("hidden")) playerIdBox.removeAttribute("hidden");
  if (gameAreaBox.hasAttribute("hidden")) gameAreaBox.removeAttribute("hidden");
  startBtn.style.display = "none";
  icon1.classList.add("active");
  playerOneBtn.disabled = false;
  playerTwoBtn.disabled = true;
  updateState(100, 100, 0, 0, 1);
  result.textContent = "";
  roundEl.textContent = `Round #${round}`;
};

const updateState = (h1, h2, s1, s2, round) => {
  document.getElementById("curr_healthTwo").textContent = h2;
  document.getElementById("curr_healthOne").textContent = h1;
  scoreFirst[5] = s1;
  scoreSecond[5] = s2;
  document.getElementById("scoreOne").textContent = scoreFirst.join(" ");
  document.getElementById("scoreTwo").textContent = scoreSecond.join(" ");
  roundEl.textContent = `Round #${round}`;
};

const changeBtn = (b1, b2) => {
  playerOneBtn.disabled = b1;
  playerTwoBtn.disabled = b2;
  icon1.classList.toggle("active");
  icon2.classList.toggle("active");
};

const gameOver = () => {
  alert("game over");
  if (score1 > score2) result.textContent = "player 1 won the game";
  else result.textContent = "Player two won the game";
  playerOneBtn.disabled = true;
  playerTwoBtn.disabled = true;
  startBtn.style.display = "block";
  startBtn.textContent = "Restart";
  icon1.classList.remove("active");
  icon2.classList.remove("active");
};

const randomNumber = () => {
  return Math.floor((Math.random() * 1000) % 20);
};
