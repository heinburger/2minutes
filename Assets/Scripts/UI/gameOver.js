#pragma strict

var GameManager : gameManager;
var restartBtn : UnityEngine.UI.Button;
var timeText : UnityEngine.UI.Text;
var highestTimeText : UnityEngine.UI.Text;

function Awake () {
    timeText.text = GameManager.instance.lastGameTimeFormatted;
    highestTimeText.text = "(" + GameManager.instance.highestTimeFormatted + ")";
    restartBtn.onClick.AddListener(restartGame);
}

function restartGame () {
	GameManager.instance.initGame();
}
