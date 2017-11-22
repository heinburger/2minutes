#pragma strict

var GameManager : gameManager;
private var positionUtils : positionUtils;

var SpawnObject : GameObject;
var SpawnParent : GameObject;

var offscreen : boolean;
var initialCount : int;
var continuousSpawn : boolean;
private var spawnerRunning : boolean = false;
var initialSpawnRate : float;
var spawnRate : float;
var spawnAcceleration : float;

// --------------------------------------------------------------------- UNITY METHODS
function Awake () {
	positionUtils = GetComponent.<positionUtils>();
	spawnRate = initialSpawnRate;
	var parentName = SpawnObject.name + "Spawns";
	SpawnParent = SpawnParent || GameObject.Find(parentName);
	if (!SpawnParent) {
		SpawnParent = new GameObject(parentName);
	}
	spawnInitial();
}

function Update () {
	if (continuousSpawn && !spawnerRunning) {
		spawnCoroutine();
	}
}

// --------------------------------------------------------------------- COROUTINES
function spawnCoroutine () {
	spawnerRunning = true;
	while (spawnerRunning) {
		spawnerRunning = continuousSpawn;
		var rate : float = spawnRate > 0f ? spawnRate : Time.deltaTime;
		yield WaitForSeconds(1f / rate);
		spawn();
	}
}

// --------------------------------------------------------------------- SPAWN METHODS
function spawnInitial () {
	if (initialCount > 0) {
		for (var i : int = 0; i < initialCount; i++) {
			spawn();
		}
	}
}

function spawn () {
	var position : Vector3 = offscreen
		? positionUtils.getRandomPositionOffBoard()
		: positionUtils.getRandomPositionOnBoard();
	var instance : GameObject = Instantiate(SpawnObject, position, Quaternion.identity);
	if (SpawnParent) {
		instance.transform.SetParent(SpawnParent.transform);
	}
}
