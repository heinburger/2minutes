#pragma strict

var GameManager : gameManager;
var AudioManager : audioManager;

function Awake () {
	if (GameManager.instance == null) {
		Instantiate(GameManager);
	}
	if (AudioManager.instance == null) {
		Instantiate(AudioManager);
	}
}
