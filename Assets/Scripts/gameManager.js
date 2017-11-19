#pragma strict

static var instance : gameManager;

var time : float = 0f;
var lastGameTime : float = 0f;
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
	startTime = Time.realtimeSinceStartup;
	isGameOver = false;
}

function checkGameOver () {
	if (isGameOver) {
		SceneManagement.SceneManager.LoadScene("GameOver");
		lastGameTime = time;
		isGameOver = false;
	}
}

function calcTime () {
	time = Time.realtimeSinceStartup - startTime;
}
