#pragma strict

var AudioManager : audioManager;
static var instance : gameManager;

var isMobile : boolean;
var gameMode : String;
var gameModeUnlocked : boolean;
var hasBronze : boolean;
var hasSilver : boolean;
var hasGold : boolean;
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

	setGameModes();
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
	gameModeUnlocked = false;
	gameRunning = true;
	isGameOver = false;
	playerWin = false;
	isHighestTime = false;
	hasHighestTime = PlayerPrefs.HasKey(gameMode + "HighestTime");
}

function initInstructions () {
	setGameModes();
	Cursor.visible = true;
	time = 0f;
	gameRunning = true;
	isGameOver = false;
	SceneManagement.SceneManager.LoadScene("Instructions");
}

function initGameOver () {
	highestTime = PlayerPrefs.GetFloat(gameMode + "HighestTime");
	gameRunning = false;
	Cursor.visible = true;
	if (time >= goalTime) {
		playerWin = true;
		AudioManager.instance.play("crownClapping");
		AudioManager.instance.play("win");
	} else {
		AudioManager.instance.play("lose");
	}
	SceneManagement.SceneManager.LoadScene("GameOver");
	if (isHighestTime) {
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

function setGameModes () {
	hasBronze = PlayerPrefs.HasKey("bronzeUnlocked");
	hasSilver = PlayerPrefs.HasKey("silverUnlocked");
	hasGold = PlayerPrefs.HasKey("goldUnlocked");
}

function calcTime () {
	time += Time.deltaTime;
	timeDelta = goalTime - time;
	if (!isHighestTime && time > highestTime) {
		isHighestTime = true;
	}
}

function setGameMode (mode : String) {
	gameMode = mode;
}

function unlockGameMode () {
	var count : int = PlayerPrefs.HasKey(gameMode + "Unlocked")
		? PlayerPrefs.GetInt(gameMode + "Unlocked") + 1
		: 1;
	PlayerPrefs.SetInt(gameMode + "Unlocked", count);
	gameModeUnlocked = count == 1;
}
