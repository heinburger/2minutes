#pragma strict

var GameManager : gameManager;
var timeText : UnityEngine.UI.Text;

// ----------------------------------------------------------------------------- UNITY METHODS
function Update () {
	var time = GameManager.instance.timeFormatted;
	timeText.text = time;
}
