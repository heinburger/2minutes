#pragma strict

var GameManager : gameManager;

private var restartBtn : UnityEngine.UI.Button;

function Awake () {
    restartBtn = GameObject.Find("btn_RestartBtn").GetComponent.<UnityEngine.UI.Button>();
    restartBtn.onClick.AddListener(restartGame);
}

function restartGame () {
	GameManager.instance.initGame();
}

