#pragma strict

static var instance : gameManager;

var gameRunning : boolean = true;
var cursorOffset : float = 0f;
var time : float = 0f;
var timeFormatted : String = "00:00:000";
var lastGameTimeFormatted : String;
var isGameOver : boolean = false;
var hasHighestTime : boolean = false;
var isHighestTime : boolean = false;
var highestTime : float;
var highestTimeFormatted : String;

// --------------------------------------------------------------------- UNITY METHODS
function Awake () {
	if (instance == null) {
		instance = this;
	} else if (instance != this) {
		Destroy(gameObject);
	}

	DontDestroyOnLoad(gameObject);
	highestTime = PlayerPrefs.GetFloat("highestTime");
	highestTimeFormatted = formatTime(highestTime);
	hasHighestTime = !!highestTime;
}

function Update () {
	if (gameRunning) {
		checkGameOver();
		calcTime();
	}
}

// --------------------------------------------------------------------- GAME METHODS

function initGame () {
	SceneManagement.SceneManager.LoadScene("Main");
	time = 0f;
	gameRunning = true;
	isGameOver = false;
	isHighestTime = false;
}

function checkGameOver () {
	if (isGameOver) {
		gameRunning = false;
		SceneManagement.SceneManager.LoadScene("GameOver");
		lastGameTimeFormatted = timeFormatted;
		if (isHighestTime) {
			hasHighestTime = true;
			highestTime = time;
			highestTimeFormatted = timeFormatted;
			PlayerPrefs.SetFloat("highestTime", time);
		}
	}
}

function calcTime () {
	time += Time.deltaTime;
	timeFormatted = formatTime(time);
	if (!isHighestTime && time > highestTime) {
		isHighestTime = true;
	}
}

function formatTime (time : float) {
	var jsTime : int = Mathf.Floor(time * 1000);
	var milli : int = jsTime % 1000;
	var sec : int = Mathf.Floor(jsTime / 1000) % 60;
	var min : int = Mathf.Floor(jsTime / 60000);
	return min + ":" + sec + ":" + milli;
}
