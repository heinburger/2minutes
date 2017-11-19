#pragma strict

var GameManager : gameManager;

private var timeText : UnityEngine.UI.Text;

function Awake () {
	timeText = GameObject.Find("TimeText").GetComponent.<UnityEngine.UI.Text>();
}

function Update () {
	var time = GameManager.instance.time;
	setTimeText(time);
}

function setTimeText (time : float) {
	var jsTime : int = Mathf.Floor(time * 1000);
	var milli : int = jsTime % 1000;
	var sec : int = Mathf.Floor(jsTime / 1000) % 60;
	var min : int = Mathf.Floor(jsTime / 60000);
	timeText.text = min + ":" + sec + ":" + milli;
}