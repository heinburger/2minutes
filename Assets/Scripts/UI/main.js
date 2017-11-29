#pragma strict

var GameManager : gameManager;
private var timeUtils : timeUtils;

var timeText : UnityEngine.UI.Text;
var extraTimeText : UnityEngine.UI.Text;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  timeUtils = GetComponent.<timeUtils>();
  extraTimeText.enabled = false;
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
}
