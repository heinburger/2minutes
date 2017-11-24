#pragma strict

var GameManager : gameManager;

var lifeTime : float;
private var timeLeft : float;
private var spawnTime : float;
private var timeAlive : float;

function Start () {
	spawnTime = GameManager.instance.time;
}

function Update () {
	timeAlive = GameManager.instance.time - spawnTime;
	timeLeft = lifeTime - timeAlive;
	if (timeLeft < 0f) {
		Destroy(gameObject);
	}
}
