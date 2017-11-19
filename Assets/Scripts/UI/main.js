#pragma strict

var GameManager : gameManager;
var timeText : UnityEngine.UI.Text;

function Update () {
	var time = GameManager.instance.timeFormatted;
	timeText.text = time;
}
