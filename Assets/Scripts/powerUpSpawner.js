#pragma strict

var GameManager : gameManager;

var continuousSpawn : boolean = true;
var powerUps : Transform;
var heartPowerUp : GameObject;
var heartPowerUpInitialCount : int;
var heartPowerUpStartTime : float;
var heartPowerUpSpawnRate : float;
var starPowerUp : GameObject;
var starPowerUpStartTime : float;
var starPowerUpSpawnRate : float;
var forcefieldPowerUp : GameObject;
var forcefieldPowerUpStartTime : float;
var forcefieldPowerUpSpawnRate : float;

private var position : position;

// --------------------------------------------------------------------- UNITY METHODS
function Awake () {
	position = GetComponent.<position>();
	powerUps = new GameObject("PowerUps").transform;
	if (heartPowerUpInitialCount > 0) {
		for (var i : int = 0; i < heartPowerUpInitialCount; i++) {
			spawnPowerUp(heartPowerUp);
		}
	}
}

function Start () {
	// while (continuousSpawn) {
	// 	yield WaitForSeconds(1 / enemySpawnRate);
	// 	spawnEnemyOnscreen();
	// }
}

// --------------------------------------------------------------------- SPAWN METHODS
function spawnPowerUp (powerUp : GameObject) {
	var position : Vector3 = position.getRandomPositionOnBoard();
	var instance : GameObject = Instantiate(powerUp, position, Quaternion.identity);
	instance.transform.SetParent(powerUps);
}
