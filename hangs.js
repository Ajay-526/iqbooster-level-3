    const app = function() {
	const gameValues = { cur:' ', solution:' ', correct: 0, incorrect: 0, total: 0 };
	const domEle = {};
	const myWords = ['learnjavascript', 'learnhtml', 'learncss'];

	function init() {
		domEle.gameArea = document.querySelector('.gameArea');
		domEle.letters = document.createElement('div', domEle.gameArea, 'letters');
		domEle.hiddenWord = document.createElement('div', domEle.gameArea, 'hiddenWord');
		domEle.score = document.createElement('div', domEle.gameArea, 'score');
		domEle.btn = document.createElement('button', domEle.gameArea, 'startGame');

		domEle.score.style.display = 'none';
		domEle.letters.style.display = 'none';
		domEle.hiddenWord.textContent = "Click the circle to start the Hangman game";
		//domEle.gamearea;
		//console.log(domEle);
		const data = document.createElement('h1');
		 data.textContent = 'You should identify the missing word by selecting random characters';

		 domEle.gameArea.append(data);

		domEle.btn.addEventListener('click', startGame);
		domEle.gameArea.append(domEle.letters);
        domEle.gameArea.append(domEle.hiddenWord);
         domEle.gameArea.append(domEle.btn);
         domEle.gameArea.append(domEle.score);

		 

		//{
		//	console.log(init);
		//}
	}
	function startGame() {

		domEle.btn.style.display = 'none';
		if (myWords.length > 0) {
			myWords.sort(() => {
				return .5 - Math.random();
			})
			gameValues.total = 0;
			gameValues.correct = 0;
			gameValues.incorrect = 0;
			gameValues.cur = myWords.shift();
			gameValues.solution = gameValues.cur.split('');
			domEle.score.style.display = 'block';
			domEle.letters.style.display = 'block';
			buildBoard();
			scoreBoard();
		}
	}
	function scoreBoard() {
		let output = `${gameValues.total}letters Found(${gameValues.correct})`
		domEle.score.innerHTML = output;
		if (gameValues.total == gameValues.correct) {
			gameOver();
		}
	}
	function gameOver() {
		if (myWords.length > 0) 
		{
			domEle.letters.style.display = 'none';
			domEle.btn.style.display = 'inline-block';
			domEle.btn.textContent = 'NextRound';
		} 
		else {
			domEle.letters.innerHTML = "You solved all game over";
		}
		let output = `you found all${gameValues.total}letters with${gameValues.incorrect}`
		domEle.score.innerHTML = output;
	}
	function checkLetters(val) {
		let solLetters = document.querySelectorAll('.boxE');
		let foundChecker = 0;
		solLetters.forEach((el) => {
			if (val == el.letter.toUpperCase()) {
				el.textContent = el.letter.toUpperCase();
				foundChecker++;
			}
		})
		//console.log(foundChecker);
		if (foundChecker != 0) {
			gameValues.correct += foundChecker;
		}
		else {
			gameValues.incorrect++;

		}
		scoreBoard();
	}
	function buildBoard() {
		domEle.letters.innerHTML = '';
		domEle.hiddenWord.innerHTML = '';
		gameValues.solution.forEach((lett) => {
			let div = createElements('div', domEle.hiddenWord, '-');
			div.classList.add('boxE');
			div.letter = lett;
			if (lett == '') {
				div.style.borderColor = 'white';
				div.textContent = ' ';
			}
			else {
				gameValues.total++;

			}
		})
		for (let i = 0; i < 26; i++) {
			let temp = String.fromCharCode(65 + i);
			let div= createElements('div', domEle.letters, temp);
			div.style.cursor = 'grab';
			div.classList.add('box');
			let checker = function (e) {
				checkLetters(temp);
				div.style.backgroundcolor = '#ddd';
				div.style.cursor = 'default';
				div.classList.remove('box');
				div.classList.add('boxD');
				div.removeEventListener('click', checker);
			}
			div.addEventListener('click', checker);
		}
	}
	function createElements(val, parentEle, output) {
		let temp = document.createElement(val);
		parentEle.append(temp);
		temp.textContent = output;
		return temp;
	}
	return {
		init : init
	}
}();