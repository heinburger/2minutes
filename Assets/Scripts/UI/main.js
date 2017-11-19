#pragma strict

var GameManager : gameManager;

private var timeText : UnityEngine.UI.Text;

function Awake () {
	timeText = GameObject.Find("text_Time").GetComponent.<UnityEngine.UI.Text>();
}

function Update () {
	var time = GameManager.instance.timeFormatted;
	timeText.text = time;
}