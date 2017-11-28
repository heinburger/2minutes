#pragma strict

var GameManager : gameManager;
private var timeUtils : timeUtils;

var restartBtn : UnityEngine.UI.Button;
var homeBtn : UnityEngine.UI.Button;
var exitBtn : UnityEngine.UI.Button;
var timeText : UnityEngine.UI.Text;
var highestTimeText : UnityEngine.UI.Text;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  timeUtils = GetComponent.<timeUtils>();
  timeText.text = timeUtils.formatTime(GameManager.instance.time);
  highestTimeText.text = "(" + timeUtils.formatTime(GameManager.instance.highestTime) + ")";
  restartBtn.onClick.AddListener(onRestartClick);
  homeBtn.onClick.AddListener(onHomeClick);
  exitBtn.onClick.AddListener(onExitClick);
}

// ----------------------------------------------------------------------------- ONCLICK METHODS
function onRestartClick () {
	GameManager.instance.initGame();
}

function onHomeClick () {
	GameManager.instance.initInstructions();
}

function onExitClick () {
	GameManager.instance.exitGame();
}
