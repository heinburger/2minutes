#pragma strict

var GameManager : gameManager;
var position : position;

var enemy : GameObject;
var enemies : Transform;
var enemyInitialCount : int;
var enemySpawnRate : float;

var powerUps : Transform;
var heartPowerUp : GameObject;
var heartPowerUpStartTime : float;
var heartPowerUpSpawnRate : float;
var starPowerUp : GameObject;
var starPowerUpStartTime : float;
var starPowerUpSpawnRate : float;
var forcefieldPowerUp : GameObject;
var forcefieldPowerUpStartTime : float;
var forcefieldPowerUpSpawnRate : float;

// --------------------------------------------------------------------- UNITY METHODS
function Awake () {
	position = GetComponent.<position>();
	powerUps = new GameObject("PowerUps").transform;
	enemies = new GameObject("Enemies").transform;
	for (var i : int = 0; i < enemyInitialCount; i++) {
		var randPosition : Vector3 = position.getRandomPositionOnBoard();
		spawnEnemyAt(randPosition);
	}
}

function FixedUpdate () {
	var time : float = GameManager.instance.time;
	if (Random.value < enemySpawnRate) {
		var randPosition : Vector3 = position.getRandomPositionOffBoard();
		spawnEnemyAt(randPosition);
	}
	if (time >= heartPowerUpStartTime && Random.value < heartPowerUpSpawnRate) {
		var randPositionHeart : Vector3 = position.getRandomPositionOnBoard();
		spawnPowerUpAt(randPositionHeart, heartPowerUp);
	}
	if (time >= starPowerUpStartTime && Random.value < starPowerUpSpawnRate) {
		var randPositionStar : Vector3 = position.getRandomPositionOnBoard();
		spawnPowerUpAt(randPositionStar, starPowerUp);
	}
	if (time >= forcefieldPowerUpStartTime && Random.value < forcefieldPowerUpSpawnRate) {
		var randPositionForcefield : Vector3 = position.getRandomPositionOnBoard();
		spawnPowerUpAt(randPositionForcefield, forcefieldPowerUp);
	}
}

// --------------------------------------------------------------------- SPAWN METHODS
function spawnPowerUpAt (position : Vector3, powerUp : GameObject) {
	var instance : GameObject = Instantiate(powerUp, position, Quaternion.identity);
	instance.transform.SetParent(powerUps);
}

function spawnEnemyAt (position : Vector3) {
	var toInstantiate : GameObject = enemy;
	var instance : GameObject = Instantiate(toInstantiate, position, Quaternion.identity);
	instance.transform.SetParent(enemies);
}
