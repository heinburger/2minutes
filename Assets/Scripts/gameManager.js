#pragma strict

static var instance : gameManager;

var time : float = 0f;
var timeFormatted : String = "00:00:000";
var lastGameTimeFormatted : String;
var isGameOver : boolean = false;

private var startTime : float = 0f;

// --------------------------------------------------------------------- UNITY METHODS
function Awake () {
	if (instance == null) {
		instance = this;
	} else if (instance != this) {
		Destroy(gameObject);
	}

	DontDestroyOnLoad(gameObject);
}

function Update () {
	calcTime();
	checkGameOver();
}

// --------------------------------------------------------------------- GAME METHODS

function initGame () {
	SceneManagement.SceneManager.LoadScene("Main");
	startTime = 0f;
	isGameOver = false;
}

function checkGameOver () {
	if (isGameOver) {
		SceneManagement.SceneManager.LoadScene("GameOver");
		lastGameTimeFormatted = timeFormatted;
		isGameOver = false;
	}
}

function calcTime () {
	time += Time.deltaTime;
	timeFormatted = formatTime(time);
}

function formatTime (time : float) {
	var jsTime : int = Mathf.Floor(time * 1000);
	var milli : int = jsTime % 1000;
	var sec : int = Mathf.Floor(jsTime / 1000) % 60;
	var min : int = Mathf.Floor(jsTime / 60000);
	return min + ":" + sec + ":" + milli;
}