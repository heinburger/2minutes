#pragma strict

var GameManager : gameManager;
var startBtn : UnityEngine.UI.Button;

function Awake () {
    startBtn.onClick.AddListener(onStartClick);
}

function onStartClick () {
	GameManager.instance.initGame();
}
