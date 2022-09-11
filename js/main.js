/**
 * Construction Variables: MAIN, STARTHTML, GAMECONTROLLER
 * Initial Variables: turn, player1Score, player2Score, againInterval, replay = true
 * Helpers: turnPlayer, checkScore, scoreTable, againGame, winLose
 * UI Functions: displayStart, displayController, displayGame
 * Event Delegation: start, play
 * Load Listen: Handled
 * Replay Event Handle: Handled
 * MAIN: displayStart
 **/
(function($, $$) {
	// Construction Variables BEGIN
	const MAIN = $$.querySelector("#main")
	const STARTHTML = `
		<div class="starting starting-effect">
			<img src="./img/logo.fw.png">
			<p class="question">Are you ready to play tictactoc? if you are ready let's get started</p>
			<button id="start">START GAME</button>
		</div>`
	const GAMECONTROLLER = `
		<div class="game-control">
			<h3>Player's Name</h3>
			<div class="players">
				<div class="player1">
					<h3>Player 1</h3>
					<input type="text" oninput="getTextPlayer1(this)" id="playerOne" maxlength="15" placeholder="nickname">  
				</div>
				<div class="player2">
					<h3>Player 2</h3>
					<input type="text" maxlength="15" oninput="getTextPlayer2(this)" id="playerTwo" placeholder="nickname">  
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
			<div class="error"></div>
			<button id="play">Play</button>
		</div>`
	// Construction Variables END

	// Initial Variables BEGIN
	let turn, player1Score, player2Score, againInterval, replay = true
	// Initial Variables END

	// Helpers BEGIN
	const turnPlayer = (playerOneName, playerTwoName) => {
		let playersEl = $$.querySelector(".players")
		let playersContent = playersEl.textContent
		if(playersContent === `${playerOneName}'s turn`) playersEl.textContent = `${playerTwoName}'s turn`
		else playersContent = `${playerOneName}'s turn`
	}
	const checkScore = (playerOneName, playerTwoName, p1score, p2score, scoreLimit) => {
		let playersEl = $$.querySelector(".players")
		if(p1score === scoreLimit) playersEl.textContent = `${playerOneName} win `
		else if(p2score === scoreLimit) playersEl.textContent = `${playerTwoName} win `
		if([p1score, p2score].includes(scoreLimit)) {
			setTimeout(() => {
				$$.querySelector("#playGame").remove()
				$$.querySelector("#rep").style.display = "block"
			}, 2500)
			$$.querySelector(".game-container").classList.add("gameEnd")
			replay = false
		}
	}
	const scoreTable = (playerOneName, playerTwoName, ScoreLimit) => {
		let players = $$.querySelector(".players")
		let playersContent = players.textContent
		if(playersContent === `${playerOneName}'s turn`) {
			players.textContent = `${playerTwoName} win`
			$$.querySelector(".p2-score").textContent++
		} else {
			players.textContent = `${playerOneName} win`
			$$.querySelector(".p1-score").textContent++
		}
		checkScore(playerOneName, playerTwoName, $$.querySelector(".p1-score").textContent, $$.querySelector(".p2-score").textContent, ScoreLimit)
	}
	const againGame = (playerOneName, playerTwoName) => {
		let playersEl = $$.querySelector(".players")
		let playersContent = playersEl.textContent
		$$.querySelector(".game-container").removeAttribute("style")
		for(let square of $$.querySelectorAll(".square")) {
			square.textContent = ""
			square.removeAttribute("style")
		}
		turn = "X"
		if(playersContent === `${playerTwoName} win`) playersEl.textContent = `${playerTwoName}'s turn`
		else playersEl.textContent = `${playerOneName}'s turn`
	}
	const winLose = (playerOneName, playerTwoName, ScoreLimit) => {
		let [s0, s1, s2, s3, s4, s5, s6, s7, s8] = $$.querySelectorAll(".square")
		let itsOkCase1 = s0.textContent === turn && s1.textContent === turn && s2.textContent === turn
		let itsOkCase2 = s0.textContent === turn && s3.textContent === turn && s6.textContent === turn
		let itsOkCase3 = s0.textContent === turn && s4.textContent === turn && s8.textContent === turn
		let itsOkCase4 = s1.textContent === turn && s4.textContent === turn && s7.textContent === turn
		let itsOkCase5 = s2.textContent === turn && s5.textContent === turn && s8.textContent === turn
		let itsOkCase6 = s2.textContent === turn && s4.textContent === turn && s6.textContent === turn
		let itsOkCase7 = s3.textContent === turn && s4.textContent === turn && s5.textContent === turn
		if(itsOkCase1 || itsOkCase2 || itsOkCase3 || itsOkCase4 || itsOkCase5 || itsOkCase6 || itsOkCase7) {
			$$.querySelector(".game-container").style.pointerEvents = "none"
			scoreTable(playerOneName, playerTwoName, ScoreLimit)
			clearTimeout(againInterval)
			if(replay) againInterval = setTimeout(againGame, 3500, playerOneName, playerTwoName)
			else replay = true
		} else if(![...$$.querySelectorAll(".square")].filter(x => !x.textContent).length) {
			$$.querySelector(".players").textContent = "Tie !"
			againInterval = setTimeout(() => againGame(playerOneName, playerTwoName), 3500)
		}
	}
	// Helpers END

	// UI Functions BEGIN
	const displayStart = () => MAIN.insertAdjacentHTML("beforeend", STARTHTML)
	const displayController = () => {
		MAIN.insertAdjacentHTML("beforeend", GAMECONTROLLER)
		for(let span of $$.querySelectorAll(".choose span")) {
			span.addEventListener("click", () => {
				$$.querySelector(".choose span.span-click-effect").classList.remove("span-click-effect")
				span.classList.add("span-click-effect")
			})
		}
	}
	const displayGame = (playerOneName, playerTwoName, chooseFirst, ScoreLimit) => {
		const game = `
			<div id="playGame">
				<div class="game-info">
					<div class="score"> 
						<h3 class="scoreHeader"> Score </h3> 
						<p class="scoreTable">
							<span>P: </span><span class="p1-name">${playerOneName}</span>
							<span>S: </span><span class="p1-score">0</span>  -  
							<span>P: </span><span class="p2-name">${playerTwoName}</span>
							<span>S: </span><span class="p2-score">0</span> 
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
			</div>`
		MAIN.insertAdjacentHTML("beforeend", game)

		for(let square of $$.querySelectorAll(".square")) {
			turn = "X"
			square.addEventListener("click", () => {
				square.style.pointerEvents = "none"
				square.style.userSelect = "none"
				square.style.color = "#A21E6A"
				square.textContent = `${turn}`
				turnPlayer(playerOneName, playerTwoName)
				winLose(playerOneName, playerTwoName, ScoreLimit)
				if(turn === "X") {
					turn = "O"
					square.style.color = "#064f56"
				} else {
					turn = "X"
				}
			})
		}
	}
	// UI Functions END

	// Event Delegation
	MAIN.addEventListener("click", (e) => {
		// Start Button in STARTHTML
		if(e.target.id === "start") {
			MAIN.querySelector(".starting").classList.add("starting-effect-pass")
			setTimeout(() => {
				MAIN.querySelector(".starting").remove()
				displayController()
			}, 1000)

			setTimeout(() => $$.querySelector(".game-control").classList.add("game-control-come"), 1200)
		}
		// Play Button in GAMECONTROLLER
		else if(e.target.id === "play") {
			let playerOneName = $$.querySelector("#playerOne").value
			let playerTwoName = $$.querySelector("#playerTwo").value
			let chooseFirstContent = $$.querySelector(".choose .span-click-effect").textContent
			let scoreLimit = $$.querySelector(".maxScore").value
			if(!playerOneName || !playerTwoName || !chooseFirstContent || !scoreLimit) {
				$$.querySelector(".error").textContent = "ERROR : Please fill in all the blanks"
				setTimeout(() => $$.querySelector(".error").textContent = "", 2000)
			} else if(scoreLimit > 15) {
				$$.querySelector(".error").textContent = "ERROR : score limit fazla"
				setTimeout(() => $$.querySelector(".error").textContent = "", 2000)
			} else {
				$$.querySelector(".game-control").classList.add("game-control-pass")
				setTimeout(() => {
					$$.querySelector(".game-control").remove()
					displayGame(playerOneName, playerTwoName, chooseFirstContent, scoreLimit, player1Score, player2Score)
				}, 1000)
				setTimeout(() => $$.querySelector("#playGame").classList.add("game-effect"), 1200)
			}
		}
		// Silent is gold :)
	})

	// Load Listen BEGIN
	$.addEventListener("load", () => $$.querySelector("#main .starting").classList.add("starting-effect"))
	// Load Listen END

	// Replay Event Handle BEGIN
	$$.querySelector("#rep").addEventListener("click", function() {
		$$.querySelector("#rep").style.display = "none"
		setTimeout(displayStart, 1000)
	})
	// Replay Event Handle END

	// MAIN BEGIN
	displayStart()
	// MAIN END
})(window, document)

// DOM Event Handlers BEGIN
const getTextPlayer1 = (input) => document.getElementById("player1").textContent = `${input.value || "Player1"}`
const getTextPlayer2 = (input) => document.getElementById("player2").textContent = `${input.value || "Player2"}`
// DOM Event Handlers END