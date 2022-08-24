const square = document.querySelectorAll(".all .square");
let turn;
let player1Score;
let player2Score;

var againInterval;

// play

const all = document.querySelector(".all");

window.addEventListener("load", () => {
  document.querySelector(".all .starting").classList.add("starting-effect");
});

const displayStart = () => {
  let start = `
    
    <div class="starting">
    <img src="logo.fw.png">
    <p class="question">Are you ready to play tictactoc? if you are ready let's get started
    </p>
    <button class="start">START GAME</button>
</div>
    
    `;

  all.insertAdjacentHTML("beforeend", start);

  const startBtn = document.querySelector(".all .start");

  startBtn.addEventListener("click", () => {
    document
      .querySelector(".all .starting")
      .classList.add("starting-effect-pass");

    setTimeout(() => {
      document.querySelector(".all .starting").remove();

      displayController();

      console.log(document.querySelector(".game-control"));
    }, 1000);

    setTimeout(() => {
      document
        .querySelector(".game-control")
        .classList.add("game-control-come");
    }, 1200);
  });
};

const displayController = () => {
  const gameController = `
    <div class="game-control">
            <h3>Player's Name</h3>
            <div class="players">
                <div class="player1">
                    <h3>Player 1</h3>
               
                        <input type="text" oninput="getTextPlayer1(this)" class="playerOne" maxlength="15" placeholder="nickname">  

                </div>
                <div class="player2">
                    <h3>Player 2</h3>
                  
                        <input type="text" maxlength="15" oninput="getTextPlayer2(this)"  class="playerTwo"
                        placeholder="nickname">  
                  
                </div>
            </div>
            <h3>Who will start first?</h3>
   
            <div class="choose">
            <span class="span-click-effect"id="player1">Player1</span>
             <h4 class="or">OR</h4>
            <span id="player2">Player2</span>
               
            </div>

            <div class="timeScore">
                <h3>What time will the game be over?</h3>
                <p class="TopTimeScore"> ( Top limit en fazla 15 olabilir ) </p> 
                <input type="number" max="15" min="1" placeholder="Score" class="maxScore">
            </div>

            <div class="error">

            </div>
            <button class="play">Play</button>
        </div>
    `;

  all.insertAdjacentHTML("beforeend", gameController);

  let playBtn = document.querySelector(".play");

  console.log(document.querySelectorAll(".choose span"));

  for (let span of document.querySelectorAll(".choose span")) {
    span.addEventListener("click", () => {
      document
        .querySelector(".choose span.span-click-effect")
        .classList.remove("span-click-effect");
      span.classList.add("span-click-effect");
    });
  }

  playBtn.addEventListener("click", () => {
    let playerOneName = document.querySelector(".playerOne").value;
    let playerTwoName = document.querySelector(".playerTwo").value;
    let chooseFirst = document.querySelector(
      ".choose .span-click-effect"
    ).textContent;
    let ScoreLimit = document.querySelector(".maxScore").value;

    if (
      playerOneName == "" ||
      playerTwoName == "" ||
      chooseFirst.textContent == "" ||
      ScoreLimit == ""
    ) {
      console.log("boşlukları doldurun");

      document.querySelector(".error").textContent =
        " ERROR : Please fill in all the blanks";

      setTimeout(() => {
        document.querySelector(".error").textContent = "";
      }, 2000);
    } else if (ScoreLimit > 15) {
      document.querySelector(".error").textContent =
        " ERROR : score limit fazla";

      setTimeout(() => {
        document.querySelector(".error").textContent = "";
      }, 2000);
    } else {
      // console.log(playerOneName);
      // console.log(playerTwoName);
      // console.log(chooseFirst);
      // console.log(ScoreLimit);
      document
        .querySelector(".game-control")
        .classList.add("game-control-pass");

      setTimeout(() => {
        document.querySelector(".game-control").remove();
        displayGame(
          playerOneName,
          playerTwoName,
          chooseFirst,
          ScoreLimit,
          player1Score,
          player2Score
        );
      }, 1000);

      setTimeout(() => {
        document.querySelector(".playGame").classList.add("game-effect");
      }, 1200);
    }
  });
};

const displayGame = (playerOneName, playerTwoName, chooseFirst, ScoreLimit) => {
  const game = `
<div class="playGame">
<div class="game-info">
<div class="score"> 
<h3 class="scoreHeader"> Score  </h3> 
<p class="scoreTable">
<span class="p1-name">${playerOneName}</span>
<span class="p1-score">0</span>  -  
<span class="p2-score">0</span> 
<span class="p2-name">${playerTwoName}</span>
</p> 

<p class="topLimit">Top limit: ${ScoreLimit} </p>
</div>
<p class="players">${chooseFirst}'s turn</p> 
</div>
<div class="game-container">
<div class="square" id="0"></div>
<div class="square" id="1"></div>
<div class="square" id="2"></div>
<div class="square" id="3"></div>
<div class="square" id="4"></div>
<div class="square" id="5"></div>
<div class="square" id="6"></div>
<div class="square" id="7"></div>
<div class="square" id="8"></div>
</div>
</div>


`;

  all.insertAdjacentHTML("beforeend", game);

  // console.log(document.querySelectorAll(".square"));
  // console.log(chooseFirst);

  for (let square of document.querySelectorAll(".square")) {
    turn = "X";
    square.addEventListener("click", () => {
      square.style.pointerEvents = "none";
      square.style.userSelect = "none";
      square.textContent = `${turn}`;
      turnPlayer(playerOneName, playerTwoName);
      winLose(playerOneName, playerTwoName, ScoreLimit);
      checkTie(playerOneName, playerTwoName);
      if (turn == "X") {
        turn = "O";
      } else {
        turn = "X";
      }
    });
  }
};

const turnPlayer = (playerOneName, playerTwoName) => {
  if (
    document.querySelector(".players").textContent == `${playerOneName}'s turn`
  ) {
    document.querySelector(".players").textContent = `${playerTwoName}'s turn`;
  } else {
    document.querySelector(".players").textContent = `${playerOneName}'s turn`;
  }
};

const winLose = (playerOneName, playerTwoName, ScoreLimit) => {
  if (
    (document.querySelectorAll(".square")[0].textContent == `${turn}` &&
      document.querySelectorAll(".square")[1].textContent == `${turn}` &&
      document.querySelectorAll(".square")[2].textContent == `${turn}`) ||
    (document.querySelectorAll(".square")[0].textContent == `${turn}` &&
      document.querySelectorAll(".square")[3].textContent == `${turn}` &&
      document.querySelectorAll(".square")[6].textContent == `${turn}`) ||
    (document.querySelectorAll(".square")[0].textContent == `${turn}` &&
      document.querySelectorAll(".square")[4].textContent == `${turn}` &&
      document.querySelectorAll(".square")[8].textContent == `${turn}`) ||
    (document.querySelectorAll(".square")[1].textContent == `${turn}` &&
      document.querySelectorAll(".square")[4].textContent == `${turn}` &&
      document.querySelectorAll(".square")[7].textContent == `${turn}`) ||
    (document.querySelectorAll(".square")[2].textContent == `${turn}` &&
      document.querySelectorAll(".square")[5].textContent == `${turn}` &&
      document.querySelectorAll(".square")[8].textContent == `${turn}`) ||
    (document.querySelectorAll(".square")[2].textContent == `${turn}` &&
      document.querySelectorAll(".square")[4].textContent == `${turn}` &&
      document.querySelectorAll(".square")[6].textContent == `${turn}`) ||
    (document.querySelectorAll(".square")[3].textContent == `${turn}` &&
      document.querySelectorAll(".square")[4].textContent == `${turn}` &&
      document.querySelectorAll(".square")[5].textContent == `${turn}`)
  ) {
    document.querySelector(".game-container").style.pointerEvents = "none";

    // setTimeout(() => {
    //     againGame(playerOneName,playerTwoName);
    // }, 3500);

    scoreTable(playerOneName, playerTwoName, ScoreLimit);
    againInterval = setTimeout(againGame, 3500, playerOneName, playerTwoName);
    console.log(againInterval);
    console.log(againGame);
  }
};

const scoreTable = (playerOneName, playerTwoName, ScoreLimit) => {
  if (
    document.querySelector(".players").textContent == `${playerOneName}'s turn`
  ) {
    document.querySelector(
      ".players"
    ).textContent = `${playerTwoName}  kazandı`;
    console.log(document.querySelector(".p2-score").textContent);
    document.querySelector(".p2-score").textContent++;
  } else {
    document.querySelector(".players").textContent = `${playerOneName} kazandı`;
    document.querySelector(".p1-score").textContent++;
  }
  console.log(document.querySelector(".scoreTable"));
  checkScore(
    playerOneName,
    playerTwoName,
    document.querySelector(".p1-score").textContent,
    document.querySelector(".p2-score").textContent,
    ScoreLimit
  );
};

const checkScore = (
  playerOneName,
  playerTwoName,
  p1score,
  p2score,
  ScoreLimit
) => {
  console.log(ScoreLimit);
  console.log(p1score);
  if (p1score == ScoreLimit) {
    console.log(playerOneName + " kazandı oyun bitti");
    document.querySelector(
      ".players"
    ).textContent = `${playerOneName}" kazandı oyun bitti" `;
    document.querySelector(".game-container").classList.add("gameEnd");
    // burada
  } else if (p2score == ScoreLimit) {
    console.log(playerTwoName + " kazandı oyun bitti");
    document.querySelector(
      ".players"
    ).textContent = `${playerTwoName}" kazandı oyun bitti" `;
    document.querySelector(".game-container").classList.add("gameEnd");
    // burada
  }
};

const checkTie = (playerOneName, playerTwoName) => {
  const value = [];
  for (let square of document.querySelectorAll(".square")) {
    value.push(square.textContent);
  }

  if (
    !value.includes("") &&
    !(
      (document.querySelectorAll(".square")[0].textContent == `${turn}` &&
        document.querySelectorAll(".square")[1].textContent == `${turn}` &&
        document.querySelectorAll(".square")[2].textContent == `${turn}`) ||
      (document.querySelectorAll(".square")[0].textContent == `${turn}` &&
        document.querySelectorAll(".square")[3].textContent == `${turn}` &&
        document.querySelectorAll(".square")[6].textContent == `${turn}`) ||
      (document.querySelectorAll(".square")[0].textContent == `${turn}` &&
        document.querySelectorAll(".square")[4].textContent == `${turn}` &&
        document.querySelectorAll(".square")[8].textContent == `${turn}`) ||
      (document.querySelectorAll(".square")[1].textContent == `${turn}` &&
        document.querySelectorAll(".square")[4].textContent == `${turn}` &&
        document.querySelectorAll(".square")[7].textContent == `${turn}`) ||
      (document.querySelectorAll(".square")[2].textContent == `${turn}` &&
        document.querySelectorAll(".square")[5].textContent == `${turn}` &&
        document.querySelectorAll(".square")[8].textContent == `${turn}`) ||
      (document.querySelectorAll(".square")[2].textContent == `${turn}` &&
        document.querySelectorAll(".square")[4].textContent == `${turn}` &&
        document.querySelectorAll(".square")[6].textContent == `${turn}`) ||
      (document.querySelectorAll(".square")[3].textContent == `${turn}` &&
        document.querySelectorAll(".square")[4].textContent == `${turn}` &&
        document.querySelectorAll(".square")[5].textContent == `${turn}`)
    )
  ) {
    console.log("boş yer yok");
    document.querySelector(".players").textContent = "Tie !";
    againInterval = setTimeout(() => {
      againGame(playerOneName, playerTwoName);
    }, 3500);
  }

  console.log(value);
};
const againGame = (playerOneName, playerTwoName) => {
  console.log(document.querySelector(".scoreTable"));
  clearTimeout(againInterval);
  document.querySelector(".game-container").removeAttribute("style");
  for (let square of document.querySelectorAll(".square")) {
    square.textContent = "";
    // square.style.pointerEvents="auto";
    // square.style.userSelect="auto";
    square.removeAttribute("style");
  }
  turn = "X";

  if (
    document.querySelector(".players").textContent ==
    `${playerTwoName}  kazandı`
  ) {
    document.querySelector(".players").textContent = `${playerTwoName}'s turn`;
  } else {
    document.querySelector(".players").textContent = `${playerOneName}'s turn`;
  }
};

const allGame = () => {
  displayStart();
};

allGame();

const getTextPlayer1 = (input) => {
  document.getElementById("player1").textContent = `${input.value}`;
  if (document.getElementById("player1").textContent == "") {
    document.getElementById("player1").textContent = "Player1";
  }
};

const getTextPlayer2 = (input) => {
  document.getElementById("player2").textContent = `${input.value}`;
  if (document.getElementById("player2").textContent == "") {
    document.getElementById("player2").textContent = "Player2";
  }
};
