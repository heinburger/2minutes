#pragma strict

var AudioManager : audioManager;
static var instance : gameManager;

var isMobile : boolean;
var gameMode : String;
var gameModeUnlocked : boolean;
var gameRunning : boolean = true;
var time : float = 0f;
var timeDelta : float = 0f;
var goalTime : float;
var isGameOver : boolean = false;
var hasHighScore : boolean = false;
var isHighScore : boolean = false;
var highScore : float;
var gameTime : float;
var playerWin : boolean = false;

var hasBronze : boolean;
var hasSilver : boolean;
var hasGold : boolean;
var hasBronzeHighScore : boolean;
var hasSilverHighScore : boolean;
var hasGoldHighScore : boolean;
var bronzeHighScore : float;
var silverHighScore : float;
var goldHighScore : float;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  if (instance == null) {
    instance = this;
  } else if (instance != this) {
    Destroy(gameObject);
  }
  DontDestroyOnLoad(gameObject);
  PlayerPrefs.DeleteAll();

  isMobile = SystemInfo.deviceType != DeviceType.Desktop;

  checkPlayerPrefs();
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
  time = 0f;
  gameModeUnlocked = false;
  gameRunning = true;
  isGameOver = false;
  playerWin = false;
  isHighScore = false;
  hasHighScore = PlayerPrefs.HasKey(gameMode + "HighScore");
  SceneManagement.SceneManager.LoadScene("Main");
}

function initInstructions () {
  checkPlayerPrefs();
  Cursor.visible = true;
  time = 0f;
  gameRunning = true;
  isGameOver = false;
  SceneManagement.SceneManager.LoadScene("Instructions");
}

function initGameOver () {
  gameTime = time;
  highScore = hasHighScore
    ? PlayerPrefs.GetFloat(gameMode + "HighScore")
    : time;
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
  if (isHighScore) {
    highScore = time;
    PlayerPrefs.SetFloat(gameMode + "HighScore", time);
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

function checkPlayerPrefs () {
  hasBronze = PlayerPrefs.HasKey("bronzeUnlocked");
  hasSilver = PlayerPrefs.HasKey("silverUnlocked");
  hasGold = PlayerPrefs.HasKey("goldUnlocked");
  hasBronzeHighScore = PlayerPrefs.HasKey("bronzeHighScore");
  hasSilverHighScore = PlayerPrefs.HasKey("silverHighScore");
  hasGoldHighScore = PlayerPrefs.HasKey("goldHighScore");
  bronzeHighScore = hasBronzeHighScore ? PlayerPrefs.GetFloat("bronzeHighScore") : 0f;
  silverHighScore = hasSilverHighScore ? PlayerPrefs.GetFloat("silverHighScore"): 0f;
  goldHighScore = hasGoldHighScore ? PlayerPrefs.GetFloat("goldHighScore"): 0f;
}

function calcTime () {
  time += Time.deltaTime;
  timeDelta = goalTime - time;
  if (!isHighScore && time > highScore) {
    isHighScore = true;
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
