#pragma strict

var GameManager : gameManager;
var startBtn : UnityEngine.UI.Button;

function Awake () {
    startBtn.onClick.AddListener(startGame);
}

function startGame () {
	GameManager.instance.initGame();
}
