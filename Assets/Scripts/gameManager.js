#pragma strict

static var instance : gameManager = null;
var boardScript : boardManager;
private var timeText : UnityEngine.UI.Text;

function Awake () {
	if (instance == null) {
		instance = this;
	} else if (instance != this) {
		Destroy(gameObject); 
	}

	DontDestroyOnLoad(gameObject);

	timeText = GameObject.Find("TimeText").GetComponent.<UnityEngine.UI.Text>();
	boardScript = GetComponent.<boardManager>();

	initGame();
}

function Update () {
	var time = Time.realtimeSinceStartup;
	setTimeText(time);
	boardScript.continuousSpawner();
}

function initGame () {
	boardScript.setupBoard();
}

function setTimeText (time : float) {
	var jsTime = Mathf.Floor(time * 1000);
	var milli = jsTime % 1000;
	var sec = Mathf.Floor(jsTime / 1000) % 60;
	var min = Mathf.Floor(jsTime / 60000);
	timeText.text = min + ":" + sec + ":" + milli;
}