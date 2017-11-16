#pragma strict

var GameManager : gameManager;

function Awake () {
	if (GameManager.instance == null) {
		Instantiate(GameManager);
	}
}
