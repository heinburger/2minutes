#pragma strict

var AudioManager : audioManager;
static var instance : gameManager;

var isMobile : boolean;
var gameMode : String;
var gameRunning : boolean = true;
var time : float = 0f;
var timeDelta : float = 0f;
var goalTime : float;
var isGameOver : boolean = false;
var hasHighestTime : boolean = false;
var isHighestTime : boolean = false;
var highestTime : float;
var playerWin : boolean = false;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
	if (instance == null) {
		instance = this;
	} else if (instance != this) {
		Destroy(gameObject);
	}
	DontDestroyOnLoad(gameObject);

	isMobile = SystemInfo.deviceType != DeviceType.Desktop;
	gameMode = PlayerPrefs.HasKey("gameMode")
		? PlayerPrefs.GetString("gameMode")
		: 'bronze';

	hasHighestTime = PlayerPrefs.HasKey(gameMode + "HighestTime");
	highestTime = PlayerPrefs.GetFloat(gameMode + "HighestTime");
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
	playerWin = false;
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
	if (playerWin) {
		AudioManager.instance.play("crownClapping");
		AudioManager.instance.play("win");
	} else {
		AudioManager.instance.play("lose");
	}
	SceneManagement.SceneManager.LoadScene("GameOver");
	if (isHighestTime) {
		hasHighestTime = true;
		highestTime = time;
		PlayerPrefs.SetFloat(gameMode + "HighestTime", time);
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
	timeDelta = goalTime - time;
	if (!isHighestTime && time > highestTime) {
		isHighestTime = true;
	}
}
