#pragma strict

var GameManager : gameManager;
private var positionUtils : positionUtils;

var Enemy : GameObject;
var continuousSpawn : boolean;
private var SpawnParent : GameObject;

private var initialCount : int;
private var spawnTime : float;
private var spawnAcceleration : float;
private var spawnerRunning : boolean;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  positionUtils = GetComponent.<positionUtils>();
  SpawnParent = new GameObject("enemySpawns");
}

function Start () {
  initialCount = GameManager.instance.settings.initialEnemyCount;
  spawnTime = GameManager.instance.settings.enemySpawnTime;
  spawnAcceleration = GameManager.instance.settings.enemySpawnAcceleration;
  for (var i : int = 0; i < initialCount; i++) {
    spawnOnScreen();
  }
}

function Update () {
  if (continuousSpawn && !spawnerRunning) {
    spawnCoroutine();
  }
}

// ----------------------------------------------------------------------------- COROUTINES
function spawnCoroutine () {
  spawnerRunning = true;
  while (spawnerRunning) {
    spawnerRunning = continuousSpawn;
    yield WaitForSeconds(spawnTime);
    spawnOffScreen();
    spawnTime -= spawnTime > Time.deltaTime ? spawnAcceleration * Time.deltaTime : 0f;
  }
}

// ----------------------------------------------------------------------------- SPAWN METHODS
function spawnOnScreen () {
  var position : Vector3 = positionUtils.getRandomPositionOnBoard();
  var instance : GameObject = Instantiate(Enemy, position, Quaternion.identity);
  instance.transform.SetParent(SpawnParent.transform);
}

function spawnOffScreen () {
  var position : Vector3 = positionUtils.getRandomPositionOffBoard();
  var instance : GameObject = Instantiate(Enemy, position, Quaternion.identity);
  instance.transform.SetParent(SpawnParent.transform);
}
