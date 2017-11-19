#pragma strict

var BoundryX : GameObject;
var BoundryY : GameObject;

private var timeText : UnityEngine.UI.Text;
private var player : GameObject;
private var playerScript : player;

function Awake () {
	timeText = GameObject.Find("TimeText").GetComponent.<UnityEngine.UI.Text>();

	initGame();
}

function Update () {
	var time = Time.realtimeSinceStartup;
	setTimeText(time);
	handleGameOver();
}

function initGame () {
	player = GameObject.FindGameObjectWithTag("Player");
	playerScript = player.GetComponent.<player>();
	addBoundries();
}


function handleGameOver () {
	if (player.transform.localScale[0] > 50) {
		SceneManagement.SceneManager.LoadScene("GameOver");
	}
}

function addBoundries () {
	Instantiate(BoundryX, Camera.main.ScreenToWorldPoint(Vector3(0, 0, 0)), Quaternion.identity);
	Instantiate(BoundryY, Camera.main.ScreenToWorldPoint(Vector3(0, 0, 0)), Quaternion.identity);
	Instantiate(BoundryX, Camera.main.ScreenToWorldPoint(Vector3(Screen.width, Screen.height, 0)), Quaternion.identity);
	Instantiate(BoundryY, Camera.main.ScreenToWorldPoint(Vector3(Screen.width, Screen.height, 0)), Quaternion.identity);
}

function setTimeText (time : float) {
	var jsTime : int = Mathf.Floor(time * 1000);
	var milli : int = jsTime % 1000;
	var sec : int = Mathf.Floor(jsTime / 1000) % 60;
	var min : int = Mathf.Floor(jsTime / 60000);
	timeText.text = min + ":" + sec + ":" + milli;
}