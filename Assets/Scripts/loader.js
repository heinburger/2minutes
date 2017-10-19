#pragma strict

var boardScript : boardManager;
private var startBtn : UnityEngine.UI.Button;

function Awake () {
    startBtn = GameObject.Find("btn_StartBtn").GetComponent.<UnityEngine.UI.Button>();
    startBtn.onClick.AddListener(startGame);

    for (var i : int = 0; i < 15; i++) {
		var randPosition : Vector3 = boardScript.getRandomPositionOnBoard();
		boardScript.spawnEnemyAt(randPosition);
	}
}

function startGame () {
	SceneManagement.SceneManager.LoadScene("Main");
}

