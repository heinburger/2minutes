#pragma strict

private var startBtn : UnityEngine.UI.Button;

var BoundryX : GameObject;
var BoundryY : GameObject;

function Awake () {
    startBtn = GameObject.Find("btn_StartBtn").GetComponent.<UnityEngine.UI.Button>();
    startBtn.onClick.AddListener(startGame);
}

function startGame () {
	SceneManagement.SceneManager.LoadScene("Main");
}