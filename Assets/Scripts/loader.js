#pragma strict

var boardScript : boardManager;
private var startBtn : UnityEngine.UI.Button;

function Awake () {
    startBtn = GameObject.Find("btn_StartBtn").GetComponent.<UnityEngine.UI.Button>();
    startBtn.onClick.AddListener(startGame);

    boardScript.setupIdle();
}

function startGame () {
	SceneManagement.SceneManager.LoadScene("Main");
}

