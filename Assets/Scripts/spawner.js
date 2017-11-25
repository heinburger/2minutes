#pragma strict

var GameManager : gameManager;
private var positionUtils : positionUtils;

var SpawnObject : GameObject;
var SpawnParent : GameObject;

var offscreen : boolean;
var initialSpawnDelay : float;
var initialCount : int;
private var initialSpawned : boolean = false;
var continuousSpawnDelay : float;
var continuousSpawn : boolean;
private var spawnerRunning : boolean = false;
var spawnTimeMin : float;
var spawnTimeMax : float;
var spawnTimeFixed : float;
var spawnAcceleration : float;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
	positionUtils = GetComponent.<positionUtils>();
	var parentName = SpawnObject.name + "Spawns";
	SpawnParent = SpawnParent || GameObject.Find(parentName);
	if (!SpawnParent) {
		SpawnParent = new GameObject(parentName);
	}
}

function Start () {
	if (!initialSpawnDelay) {
		spawnInitial();
	}
}

function Update () {
	continuousSpawn = continuousSpawn || (
		continuousSpawnDelay != 0f && continuousSpawnDelay < GameManager.instance.time
	);
	if (continuousSpawn && !spawnerRunning) {
		spawnCoroutine();
	}
	if (!initialSpawned && initialSpawnDelay < GameManager.instance.time) {
		spawnInitial();
	}
}

// ----------------------------------------------------------------------------- COROUTINES
function spawnCoroutine () {
	spawnerRunning = true;
	while (spawnerRunning) {
		spawnerRunning = continuousSpawn;
		var time : float = spawnTimeFixed > 0f
			? spawnTimeFixed
			: Random.Range(spawnTimeMin, spawnTimeMax);
		yield WaitForSeconds(time);
		spawn();
	}
}

// ----------------------------------------------------------------------------- SPAWN METHODS
function spawnInitial () {
	initialSpawned = true;
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
