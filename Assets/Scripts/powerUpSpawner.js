#pragma strict

var GameManager : gameManager;
private var positionUtils : positionUtils;

var PowerUp : GameObject;
var continuousSpawn : boolean;
private var SpawnParent : GameObject;
private var pooledPowerUps = new List.<GameObject>();
private var pooledPowerUpAmount : int = 5;

private var timeUntilSpawn : float;
private var initialCount : int;
private var initialHaveBeenSpawned : boolean;
private var spawnTimeMin : float;
private var spawnTimeMax : float;
private var spawnerRunning : boolean;
private var validSpawnRange : boolean;

// ----------------------------------------------------------------------------- UNITY METHODS
function Start () {
  positionUtils = GetComponent.<positionUtils>();
  var parentName = PowerUp.name + "Spawns";
  SpawnParent = SpawnParent || GameObject.Find(parentName);
  if (!SpawnParent) {
    SpawnParent = new GameObject(parentName);
  }
  for (var i : int = 0; i < pooledPowerUpAmount; i++) {
    var powerUp : GameObject = Instantiate(PowerUp, Vector3.zero, Quaternion.identity);
    powerUp.SetActive(false);
    powerUp.transform.SetParent(SpawnParent.transform);
    pooledPowerUps.Add(powerUp);
  }

  var settings : PowerUpSettings = GameManager.instance.settings.getPowerUpSettings(PowerUp.name);
  timeUntilSpawn = settings.timeUntilSpawn;
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
function getPooledPowerUp () : GameObject {
  for (var i : int = 0; i < pooledPowerUps.Count; i++) {
    if (!pooledPowerUps[i].activeInHierarchy) {
      return pooledPowerUps[i];
    }
  }

  var newPowerUp : GameObject = Instantiate(PowerUp, Vector3.zero, Quaternion.identity);
  pooledPowerUps.Add(newPowerUp);
  newPowerUp.transform.SetParent(SpawnParent.transform);
  return newPowerUp;
}

function spawn () {
  var position : Vector3 = positionUtils.getRandomPositionOnBoard();
  var instance : GameObject = getPooledPowerUp();
  instance.transform.position = position;
  instance.SetActive(true);
}
