#pragma strict

var GameManager : gameManager;
private var timeUtils : timeUtils;

var titleText : UnityEngine.UI.Text;
var start : GameObject;
var startBtn : UnityEngine.UI.Button;
var description : UnityEngine.UI.Text;
var bronze : GameObject;
var bronzeBtn : UnityEngine.UI.Button;
var bronzeHighScoreText : UnityEngine.UI.Text;
var silver : GameObject;
var silverBtn : UnityEngine.UI.Button;
var silverHighScoreText : UnityEngine.UI.Text;
var bronzeRequiredText : UnityEngine.UI.Text;
var bronzeRequiredImage : UnityEngine.UI.Image;
var gold : GameObject;
var goldBtn : UnityEngine.UI.Button;
var goldHighScoreText : UnityEngine.UI.Text;
var silverRequiredText : UnityEngine.UI.Text;
var silverRequiredImage : UnityEngine.UI.Image;

// ----------------------------------------------------------------------------- UNITY METHODS ALL
function Awake () {
  timeUtils = GetComponent.<timeUtils>();
  startBtn.onClick.AddListener(onStartClick);
  bronzeBtn.onClick.AddListener(onBronzeClick);
  silverBtn.onClick.AddListener(onSilverClick);
  goldBtn.onClick.AddListener(onGoldClick);
}

function Start () {
  if (GameManager.instance.replay) {
    setGameModeSelect();
  } else {
    setIntro();
  }
}

// ----------------------------------------------------------------------------- PANEL METHODS
function setIntro () {
  titleText.enabled = true;
  description.enabled = true;
  start.SetActive(true);
  bronze.SetActive(false);
  silver.SetActive(false);
  gold.SetActive(false);
  bronzeRequiredText.enabled = false;
  bronzeRequiredImage.enabled = false;
  silverRequiredImage.enabled = false;
  silverRequiredText.enabled = false;
  bronzeHighScoreText.enabled = false;
  silverHighScoreText.enabled = false;
  goldHighScoreText.enabled = false;
}

function setGameModeSelect () {
  titleText.enabled = false;
  description.enabled = false;
  start.SetActive(false);
  bronze.SetActive(true);
  silver.SetActive(true);
  gold.SetActive(true);
  bronzeRequiredText.enabled = !GameManager.instance.hasBronze;
  bronzeRequiredImage.enabled = !GameManager.instance.hasBronze;
  silverRequiredImage.enabled = !GameManager.instance.hasSilver;
  silverRequiredText.enabled = !GameManager.instance.hasSilver;
  bronzeHighScoreText.enabled = true;
  silverHighScoreText.enabled = true;
  goldHighScoreText.enabled = true;

  silverBtn.interactable = GameManager.instance.hasBronze;
  goldBtn.interactable = GameManager.instance.hasSilver;
  bronzeHighScoreText.text = GameManager.instance.hasBronzeHighScore
    ? timeUtils.formatTime(GameManager.instance.bronzeHighScore)
    : "";
  silverHighScoreText.text = GameManager.instance.hasSilverHighScore
    ? timeUtils.formatTime(GameManager.instance.silverHighScore)
    : "";
  goldHighScoreText.text = GameManager.instance.hasGoldHighScore
    ? timeUtils.formatTime(GameManager.instance.goldHighScore)
    : "";
}

// ----------------------------------------------------------------------------- ONCLICK METHODS
function onStartClick () {
  setGameModeSelect();
}

function onBronzeClick () {
  GameManager.instance.setGameMode("bronze");
  GameManager.instance.initGame();
}

function onSilverClick () {
  GameManager.instance.setGameMode("silver");
  GameManager.instance.initGame();
}

function onGoldClick () {
  GameManager.instance.setGameMode("gold");
  GameManager.instance.initGame();
}
