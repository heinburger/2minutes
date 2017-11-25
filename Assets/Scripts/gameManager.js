#pragma strict

static var instance : gameManager;

var isMobile : boolean;
var gameRunning : boolean = true;
var time : float = 0f;
var timeFormatted : String = "00:00:000";
var lastGameTimeFormatted : String;
var isGameOver : boolean = false;
var hasHighestTime : boolean = false;
var isHighestTime : boolean = false;
var highestTime : float;
var highestTimeFormatted : String;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
	if (instance == null) {
		instance = this;
	} else if (instance != this) {
		Destroy(gameObject);
	}
	DontDestroyOnLoad(gameObject);

	isMobile = SystemInfo.deviceType != DeviceType.Desktop;
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

// ----------------------------------------------------------------------------- GAME METHODS

function initGame () {
	Cursor.visible = false;
	SceneManagement.SceneManager.LoadScene("Main");
	time = 0f;
	gameRunning = true;
	isGameOver = false;
	isHighestTime = false;
}

function initInstructions () {
	Cursor.visible = true;
	time = 0f;
	gameRunning = true;
	isGameOver = false;
	SceneManagement.SceneManager.LoadScene("Instructions");
}

function initGameOver () {
	gameRunning = false;
	Cursor.visible = true;
	SceneManagement.SceneManager.LoadScene("GameOver");
	lastGameTimeFormatted = timeFormatted;
	if (isHighestTime) {
		hasHighestTime = true;
		highestTime = time;
		highestTimeFormatted = timeFormatted;
		PlayerPrefs.SetFloat("highestTime", time);
	}
}

function exitGame () {
	Application.Quit();
}

function checkGameOver () {
	if (isGameOver) {
		initGameOver();
	}
}

function calcTime () {
	time += Time.deltaTime;
	timeFormatted = formatTime(time);
	if (!isHighestTime && time > highestTime) {
		isHighestTime = true;
	}
}

// ----------------------------------------------------------------------------- UTIL METHODS
function formatTime (time : float) {
	var jsTime : int = Mathf.Floor(time * 1000);
	var milli : int = jsTime % 1000;
	var sec : int = Mathf.Floor(jsTime / 1000) % 60;
	var min : int = Mathf.Floor(jsTime / 60000);
	var minS : String = min < 10 ? "0" + min : min + "";
	var secS : String = sec < 10 ? "0" + sec : sec + "";
	var milliS : String = milli < 100 ? "0" + milli : milli + "";
	milliS = milli < 10 ? "00" + milli : milliS;
	milliS = milli == 0 ? "000" : milliS;


	return minS + ":" + secS + ":" + milliS;
}
