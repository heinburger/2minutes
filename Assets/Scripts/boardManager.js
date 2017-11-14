#pragma strict

var enemy : GameObject;
var enemies : Transform;
var enemyInitialCount : int;
var enemySpawnRate : float;

var powerUps : Transform;
var heartPowerUp : GameObject;
var heartPowerUpSpawnRate : float;

public function setupBoard () {
	powerUps = new GameObject("PowerUps").transform;
	enemies = new GameObject("Enemies").transform;
	spawnHeartPowerUp();
	for (var i : int = 0; i < enemyInitialCount; i++) {
		var randPosition : Vector3 = getRandomPositionOnBoard();
		spawnEnemyAt(randPosition);
	}
}

public function setupIdle () {
	if (!enemies) {
		enemies = new GameObject("Enemies").transform;
	}
	for (var i : int = 0; i < 15; i++) {
		var randPosition : Vector3 = getRandomPositionOnBoard();
		spawnEnemyAt(randPosition);
	}
}

// spawns
function continuousSpawner () {
	if (Random.value < enemySpawnRate) {
		var randPosition : Vector3 = getRandomPositionOffBoard();
		spawnEnemyAt(randPosition);
	}
	if (Random.value < heartPowerUpSpawnRate) {
		spawnHeartPowerUp();
	}
}

function spawnHeartPowerUp () {
	var toInstantiate : GameObject = heartPowerUp;
	var randPosition : Vector3 = getRandomPositionOnBoard();
	var instance : GameObject = Instantiate(toInstantiate, randPosition, Quaternion.identity);
	instance.transform.SetParent(powerUps);
}

function spawnEnemyAt (position : Vector3) {
	var toInstantiate : GameObject = enemy;
	var instance : GameObject = Instantiate(toInstantiate, position, Quaternion.identity);
	instance.transform.SetParent(enemies);
}

function getRandomPositionOnBoard () : Vector3 {
	return new Vector3(Random.Range(-5.0, 5.0), Random.Range(-3.5, 3.5), 0);
}

function getRandomPositionOffBoard () : Vector3 {
	return Random.value < 0.5
		? randomPositionOffBoardLeft()
		: randomPositionOffBoardTop();
}

function randomPositionOffBoardLeft () : Vector3 {
	return new Vector3(Random.Range(-5.5, -7.8), Random.Range(-5.9, 5.9), 0);
}

function randomPositionOffBoardTop () : Vector3 {
	return new Vector3(Random.Range(-7.8, 7.8), Random.Range(4.1, 5.9), 0);
}