#pragma strict

var GameManager : gameManager;

var continuousSpawn : boolean = true;
var enemy : GameObject;
var enemies : Transform;
var enemyInitialCount : int;
var enemyInitialSpawnRate : float;
var enemySpawnAcceleration : float;

private var enemySpawnRate : float;
private var position : position;

// --------------------------------------------------------------------- UNITY METHODS
function Awake () {
	position = GetComponent.<position>();
	enemies = new GameObject("Enemies").transform;
	enemySpawnRate = enemyInitialSpawnRate;
	if (enemyInitialCount > 0) {
		for (var i : int = 0; i < enemyInitialCount; i++) {
			spawnEnemyOnscreen();
		}
	}
}

function Start () {

}

//
function enemySpawnCoroutine () {
	if (enemySpawnRate > 0f) {
		while (coutinuousSpawn) {
			yield WaitForSeconds(1 / enemySpawnRate);
			spawnEnemyOnscreen();
		}
	}
}

// --------------------------------------------------------------------- SPAWN METHODS
function spawnEnemyOffscreen () {
	var randPosition : Vector3 = position.getRandomPositionOffBoard();
	spawnEnemyAt(randPosition);
}

function spawnEnemyOnscreen () {
	var randPosition : Vector3 = position.getRandomPositionOnBoard();
	spawnEnemyAt(randPosition);
}

function spawnEnemyAt (position : Vector3) {
	var toInstantiate : GameObject = enemy;
	var instance : GameObject = Instantiate(toInstantiate, position, Quaternion.identity);
	instance.transform.SetParent(enemies);
}
