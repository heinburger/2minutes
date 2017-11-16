#pragma strict

var GameManager : GameObject;

function Awake () {
	if (GameManager.Instance() == null) {
		Instantiate(GameManager);
	}
}
