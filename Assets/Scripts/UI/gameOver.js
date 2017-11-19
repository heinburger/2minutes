#pragma strict

var GameManager : gameManager;

private var restartBtn : UnityEngine.UI.Button;
private var timeText : UnityEngine.UI.Text;

function Awake () {
    restartBtn = GameObject.Find("btn_RestartBtn").GetComponent.<UnityEngine.UI.Button>();
    timeText = GameObject.Find("text_Time").GetComponent.<UnityEngine.UI.Text>();
    timeText.text = GameManager.instance.lastGameTimeFormatted;
    restartBtn.onClick.AddListener(restartGame);
}

function restartGame () {
	GameManager.instance.initGame();
}

