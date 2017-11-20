#pragma strict

var enemy : GameObject;
var enemies : Transform;
var enemyInitialCount : int;
var enemySpawnRate : float;

var powerUps : Transform;
var heartPowerUp : GameObject;
var heartPowerUpSpawnRate : float;

function Awake () {
	powerUps = new GameObject("PowerUps").transform;
	enemies = new GameObject("Enemies").transform;
	for (var i : int = 0; i < enemyInitialCount; i++) {
		var randPosition : Vector3 = getRandomPositionOnBoard();
		spawnEnemyAt(randPosition);
	}
}

// spawns
function FixedUpdate () {
	if (Random.value < enemySpawnRate) {
		var randPosition : Vector3 = getRandomPositionOffBoard();
		spawnEnemyAt(randPosition);
	}
	if (Random.value < heartPowerUpSpawnRate) {
		var randPositionHeart : Vector3 = getRandomPositionOnBoard();
		spawnHeartPowerUpAt(randPositionHeart);
	}
}

function spawnHeartPowerUpAt (position : Vector3) {
	var toInstantiate : GameObject = heartPowerUp;
	var instance : GameObject = Instantiate(toInstantiate, position, Quaternion.identity);
	instance.transform.SetParent(powerUps);
}

function spawnEnemyAt (position : Vector3) {
	var toInstantiate : GameObject = enemy;
	var instance : GameObject = Instantiate(toInstantiate, position, Quaternion.identity);
	instance.transform.SetParent(enemies);
}

function getRandomPositionOnBoard () : Vector3 {
	var onScreenPt : Vector3 = new Vector3(Random.Range(0f, Screen.width), Random.Range(0f, Screen.height), 0f);
	var position : Vector3 = Camera.main.ScreenToWorldPoint(onScreenPt);
	position.z = 0f;
	return position;
}

function getRandomPositionOffBoard () : Vector3 {
	if (Random.value < 0.5f) {
		return Random.value < 0.5f
			? randomPositionOffBoardLeft()
			: randomPositionOffBoardTop();
	} else {
		return Random.value < 0.5f
			? randomPositionOffBoardRight()
			: randomPositionOffBoardBottom();
	}
}

function randomPositionOffBoardLeft () : Vector3 {
	var halfWidth : float = 0.5f;
	var edgeScreenLeft : Vector3 = new Vector3(0f, Random.Range(0f, Screen.height), 0f);
	var position : Vector3 = Camera.main.ScreenToWorldPoint(edgeScreenLeft);
	position.x -= halfWidth;
	position.z = 0f;
	return position;
}

function randomPositionOffBoardRight () : Vector3 {
	var halfWidth : float = 0.5f;
	var edgeScreenRight : Vector3 = new Vector3(Screen.width, Random.Range(0, Screen.height), 0f);
	var position : Vector3 = Camera.main.ScreenToWorldPoint(edgeScreenRight);
	position.x += halfWidth;
	position.z = 0f;
	return position;
}

function randomPositionOffBoardTop () : Vector3 {
	var halfHeight : float = 0.5f;
	var edgeScreenTop : Vector3 = new Vector3(Random.Range(0f, Screen.width), Screen.height, 0f);
	var position : Vector3 = Camera.main.ScreenToWorldPoint(edgeScreenTop);
	position.y += halfHeight;
	position.z = 0f;
	return position;
}

function randomPositionOffBoardBottom () : Vector3 {
	var halfHeight : float = 0.5f;
	var edgeScreenBottom : Vector3 = new Vector3(Random.Range(0f, Screen.width), 0f, 0f);
	var position : Vector3 = Camera.main.ScreenToWorldPoint(edgeScreenBottom);
	position.y -= halfHeight;
	position.z = 0f;
	return position;
}
