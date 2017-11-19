#pragma strict

private var startBtn : UnityEngine.UI.Button;

var BoundryX : GameObject;
var BoundryY : GameObject;

function Awake () {
    startBtn = GameObject.Find("btn_StartBtn").GetComponent.<UnityEngine.UI.Button>();
    startBtn.onClick.AddListener(startGame);
    addBoundries();
}

function startGame () {
	SceneManagement.SceneManager.LoadScene("Main");
}

function addBoundries () {
	Instantiate(BoundryX, Camera.main.ScreenToWorldPoint(Vector3(0, 0, 0)), Quaternion.identity);
	Instantiate(BoundryY, Camera.main.ScreenToWorldPoint(Vector3(0, 0, 0)), Quaternion.identity);
	Instantiate(BoundryX, Camera.main.ScreenToWorldPoint(Vector3(Screen.width, Screen.height, 0)), Quaternion.identity);
	Instantiate(BoundryY, Camera.main.ScreenToWorldPoint(Vector3(Screen.width, Screen.height, 0)), Quaternion.identity);
}