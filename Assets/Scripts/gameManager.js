#pragma strict

var AudioManager : audioManager;
static var instance : gameManager;

var isMobile : boolean;
var goalTime : float;
var gameMode : String;
var settings : Settings;
var bronzeSettings : Settings;
var silverSettings : Settings;
var goldSettings : Settings;

@HideInInspector var gameRunning : boolean;
@HideInInspector var time : float;
@HideInInspector var timeDelta : float;
@HideInInspector var isGameOver : boolean;
@HideInInspector var playerWin : boolean;
@HideInInspector var gameTime : float;
@HideInInspector var hasHighScore : boolean;
@HideInInspector var isHighScore : boolean;
@HideInInspector var highScore : float;
@HideInInspector var gameModeUnlocked : String;
@HideInInspector var hasBronze : boolean;
@HideInInspector var hasSilver : boolean;
@HideInInspector var hasGold : boolean;
@HideInInspector var hasBronzeHighScore : boolean;
@HideInInspector var hasSilverHighScore : boolean;
@HideInInspector var hasGoldHighScore : boolean;
@HideInInspector var bronzeHighScore : float;
@HideInInspector var silverHighScore : float;
@HideInInspector var goldHighScore : float;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  if (instance == null) {
    instance = this;
  } else if (instance != this) {
    Destroy(gameObject);
  }
  DontDestroyOnLoad(gameObject);
  // PlayerPrefs.DeleteAll();
  time = 0f;
  gameRunning = true;
  gameModeUnlocked = "";

  isMobile = SystemInfo.deviceType != DeviceType.Desktop;

  checkPlayerPrefs();
  setDifficulty();
}

function Update () {
  if (gameRunning) {
    checkGameOver();
    calcTime();
  }
}

// ----------------------------------------------------------------------------- GAME RUNNING METHODS
function checkGameOver () {
  if (isGameOver) {
    initGameOver();
  }
}

function calcTime () {
  time += Time.deltaTime;
  timeDelta = goalTime - time;
  if (hasHighScore && time > highScore) {
    isHighScore = true;
  }
}

// ----------------------------------------------------------------------------- ROUTING METHODS
function initGame () {
  Cursor.visible = false;
  time = 0f;
  gameModeUnlocked = "";
  gameRunning = true;
  isGameOver = false;
  playerWin = false;
  isHighScore = false;
  hasHighScore = PlayerPrefs.HasKey(gameMode + "HighScore");
  setDifficulty();
  SceneManagement.SceneManager.LoadScene("Main");
}

function initInstructions () {
  checkPlayerPrefs();
  setDifficulty();
  Cursor.visible = true;
  time = 0f;
  gameRunning = true;
  isGameOver = false;

  SceneManagement.SceneManager.LoadScene("Instructions");
}

function initGameOver () {
  gameTime = time;
  gameRunning = false;
  Cursor.visible = true;
  if (gameTime >= goalTime) {
    playerWin = true;
    AudioManager.instance.play("crownClapping");
    AudioManager.instance.play("win");
  } else {
    AudioManager.instance.play("lose");
  }

  if (isHighScore || !hasHighScore) {
    highScore = gameTime;
    PlayerPrefs.SetFloat(gameMode + "HighScore", time);
  } else {
    highScore = PlayerPrefs.GetFloat(gameMode + "HighScore");
  }

  SceneManagement.SceneManager.LoadScene("GameOver");
}

function exitGame () {
  Application.Quit();
}

// ----------------------------------------------------------------------------- MISC GAME METHODS
function checkPlayerPrefs () {
  gameMode = PlayerPrefs.HasKey("gameMode") ? PlayerPrefs.GetString("gameMode") : "bronze";
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

function setDifficulty () {
  if (gameMode == 'gold') {
    settings = goldSettings;
  } else if (gameMode == 'silver') {
    settings = silverSettings;
  } else {
    settings = bronzeSettings;
  }
  settings.crown.timeUntilSpawn = goalTime;
}

function setGameMode (mode : String) {
  gameMode = mode;
  PlayerPrefs.SetString("gameMode", mode);
}

function unlockGameMode () {
  var count : int = PlayerPrefs.HasKey(gameMode + "Unlocked")
    ? PlayerPrefs.GetInt(gameMode + "Unlocked") + 1
    : 1;
  PlayerPrefs.SetInt(gameMode + "Unlocked", count);
  gameModeUnlocked = count == 1 ? gameMode : "";
}
