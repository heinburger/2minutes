#pragma strict

var GameManager : gameManager;
var AudioManager : audioManager;
private var timeUtils : timeUtils;

var timeText : UnityEngine.UI.Text;
var extraTimeText : UnityEngine.UI.Text;
var newRecordText : UnityEngine.UI.Text;
var fpsText : UnityEngine.UI.Text;

private var highScoreShown : boolean;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  timeUtils = GetComponent.<timeUtils>();
  extraTimeText.enabled = false;
  newRecordText.enabled = false;
  highScoreShown = false;
}

function Update () {
  var time = timeUtils.formatTime(GameManager.instance.timeDelta);
  if (GameManager.instance.timeDelta < 0f) {
    extraTimeText.enabled = true;
    extraTimeText.text = "+" + time;
    timeText.text = "0:00:000";
  } else {
    timeText.text = time;
  }

  if (GameManager.instance.isHighScore && !highScoreShown) {
    highScoreShown = true;
    AudioManager.instance.play("newHighScore");
    startNewRecordTextCoroutine();
  }
}

// ----------------------------------------------------------------------------- COROUTINES
function startNewRecordTextCoroutine () {
  newRecordText.enabled = true;
  yield WaitForSeconds(0.5);
  newRecordText.enabled = false;
  yield WaitForSeconds(0.5);
  newRecordText.enabled = true;
  yield WaitForSeconds(0.5);
  newRecordText.enabled = false;
  yield WaitForSeconds(0.5);
  newRecordText.enabled = true;
  yield WaitForSeconds(0.5);
  newRecordText.enabled = false;
  yield WaitForSeconds(0.5);
  newRecordText.enabled = true;
}
