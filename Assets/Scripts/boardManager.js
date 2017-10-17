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
		var randPosition : Vector3 = getRandomPositionOffBoard();
		spawnEnemyAt(randPosition);
	}
}

// boundries
function calculateBoundries () {
	var camDistance : float = Vector3.Distance(transform.position, Camera.main.transform.position);
	var bottomCorner : Vector2 = Camera.main.ViewportToWorldPoint(new Vector3(0,0, camDistance));
	var topCorner : Vector2 = Camera.main.ViewportToWorldPoint(new Vector3(1,1, camDistance));
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
	return new Vector3(Random.Range(-5,5), Random.Range(-5,5), 0);
}

function getRandomPositionOffBoard () : Vector3 {
	return new Vector3(Random.Range(-5,-6), Random.Range(-5,-6), 0);
}