#pragma strict

var GameManager : gameManager;

var lifeTime : float;
var initialOpacity : float;

var opacity : float;
private var spriteRendererColor : Color;
private var timeLeft : float;
private var spawnTime : float;
private var timeAlive : float;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
	timeLeft = lifeTime;
	opacity = initialOpacity;
}

function Start () {
	spawnTime = GameManager.instance.time;
}

function Update () {
	timeAlive = GameManager.instance.time - spawnTime;
	timeLeft = timeLeft <= 0f ? 0f : lifeTime - timeAlive;
	if (timeLeft == 0f) {
		Destroy(gameObject);
	}
	opacity = opacity - (Time.deltaTime / lifeTime) * initialOpacity;
	GetComponent.<SpriteRenderer>().material.color.a = opacity;
}
