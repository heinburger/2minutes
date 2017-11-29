#pragma strict

var GameManager : gameManager;
private var timeUtils : timeUtils;
private var winningPhrases : String[] = [
  "Neat!",
  "You Win!",
  "Schwifty.",
  "Nifty!",
  "Great.",
  "Woah!",
  "Holy Shit!"
];

var gold : Sprite;
var silver : Sprite;
var bronze : Sprite;

var unlockedText : UnityEngine.UI.Text;
var unlockedImage : UnityEngine.UI.Image;
var titleText : UnityEngine.UI.Text;
var replayBtn : UnityEngine.UI.Button;
var homeBtn : UnityEngine.UI.Button;
var exitBtn : UnityEngine.UI.Button;
var timeText : UnityEngine.UI.Text;
var highScoreText : UnityEngine.UI.Text;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  if (GameManager.instance.playerWin) {
    Camera.main.backgroundColor = Color.HSVToRGB(0.53f, 0.53f, 0.78f);
    titleText.text = winningPhrases[Random.Range(0, winningPhrases.length - 1)];
  }

  if (GameManager.instance.gameModeUnlocked) {
    unlockedText.enabled = true;
    unlockedImage.enabled = true;
    if (GameManager.instance.gameMode == "bronze") {
      unlockedImage.sprite = bronze;
    } else if (GameManager.instance.gameMode == "silver") {
      unlockedImage.sprite = silver;
    } else if (GameManager.instance.gameMode == "gold") {
      unlockedImage.sprite = gold;
    }
  } else {
    unlockedText.enabled = false;
    unlockedImage.enabled = false;
  }

  timeUtils = GetComponent.<timeUtils>();
  timeText.text = timeUtils.formatTime(GameManager.instance.gameTime);
  highScoreText.text = timeUtils.formatTime(GameManager.instance.highScore);
  replayBtn.onClick.AddListener(onReplayClick);
  homeBtn.onClick.AddListener(onHomeClick);
  exitBtn.onClick.AddListener(onExitClick);
}

// ----------------------------------------------------------------------------- ONCLICK METHODS
function onReplayClick () {
	GameManager.instance.initGame();
}

function onHomeClick () {
	GameManager.instance.initInstructions();
}

function onExitClick () {
	GameManager.instance.exitGame();
}
