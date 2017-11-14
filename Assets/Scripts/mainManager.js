#pragma strict

private var boardScript : boardManager;

private var timeText : UnityEngine.UI.Text;
private var player : GameObject;
private var playerScript : player;

function Awake () {
	timeText = GameObject.Find("TimeText").GetComponent.<UnityEngine.UI.Text>();
	boardScript = GameObject.Find("Spawner").GetComponent.<boardManager>();

	initGame();
}

function Update () {
	var time = Time.realtimeSinceStartup;
	setTimeText(time);
	boardScript.continuousSpawner();
	handleGameOver();
}

function initGame () {
	player = GameObject.FindGameObjectWithTag("Player");
	playerScript = player.GetComponent.<player>();
	boardScript.setupBoard();
}


function handleGameOver () {
	if (player.transform.localScale[0] > 6) {
		SceneManagement.SceneManager.LoadScene("GameOver");
	}
}

function setTimeText (time : float) {
	var jsTime : int = Mathf.Floor(time * 1000);
	var milli : int = jsTime % 1000;
	var sec : int = Mathf.Floor(jsTime / 1000) % 60;
	var min : int = Mathf.Floor(jsTime / 60000);
	timeText.text = min + ":" + sec + ":" + milli;
}