#pragma strict

var GameManager : gameManager;
var startBtn : UnityEngine.UI.Button;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
    startBtn.onClick.AddListener(onStartClick);
}

// ----------------------------------------------------------------------------- ONCLICK METHODS
function onStartClick () {
	GameManager.instance.initGame();
}
