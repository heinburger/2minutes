#pragma strict

var GameManager : gameManager;
private var positionUtils : positionUtils;

var PowerUp : GameObject;
var continuousSpawn : boolean;
private var SpawnParent : GameObject;

private var timeUntilSpawn : float;
private var initialCount : int;
private var initialHaveBeenSpawned : boolean;
private var spawnTimeMin : float;
private var spawnTimeMax : float;
private var spawnerRunning : boolean;
private var validSpawnRange : boolean;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  positionUtils = GetComponent.<positionUtils>();
  var parentName = PowerUp.name + "Spawns";
  SpawnParent = SpawnParent || GameObject.Find(parentName);
  if (!SpawnParent) {
    SpawnParent = new GameObject(parentName);
  }
}

function Start () {
  var settings : PowerUpSettings = GameManager.instance.settings.getPowerUpSettings(PowerUp.name);
  timeUntilSpawn = settings.timeUntilSpawn;
  print(this.name + ' ' + timeUntilSpawn);
  initialCount = settings.initialCount;
  spawnTimeMin = settings.spawnTimeMin;
  spawnTimeMax = settings.spawnTimeMax;
  validSpawnRange = spawnTimeMax > 0f;

}

function Update () {
  if (!initialHaveBeenSpawned && GameManager.instance.time > timeUntilSpawn) {
    for (var i : int = 0; i < initialCount; i++) {
      spawn();
    }
    initialHaveBeenSpawned = true;
  }

  if (validSpawnRange && continuousSpawn && GameManager.instance.time > timeUntilSpawn && !spawnerRunning) {
    spawnCoroutine();
  }
}

// ----------------------------------------------------------------------------- COROUTINES
function spawnCoroutine () {
  spawnerRunning = true;
  while (spawnerRunning) {
    spawnerRunning = continuousSpawn;
    var spawnTime : float = Random.Range(spawnTimeMin, spawnTimeMax);
    yield WaitForSeconds(spawnTime);
    spawn();
  }
}

// ----------------------------------------------------------------------------- SPAWN METHODS
function spawn () {
  var position : Vector3 = positionUtils.getRandomPositionOnBoard();
  var instance : GameObject = Instantiate(PowerUp, position, Quaternion.identity);
  instance.transform.SetParent(SpawnParent.transform);
}
