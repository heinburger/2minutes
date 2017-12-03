#pragma strict
import System.Collections.Generic;

var GameManager : gameManager;
private var positionUtils : positionUtils;

var Enemy : GameObject;
var continuousSpawn : boolean;
private var SpawnParent : GameObject;
private var pooledEnemies = new List.<GameObject>();
private var pooledEnemyAmount : int = 350;

private var initialCount : int;
private var spawnTime : float;
private var spawnAcceleration : float;
private var spawnerRunning : boolean;

// ----------------------------------------------------------------------------- UNITY METHODS
function Start () {
  positionUtils = GetComponent.<positionUtils>();
  SpawnParent = new GameObject("enemySpawns");
  for (var i : int = 0; i < pooledEnemyAmount; i++) {
    var enemy : GameObject = Instantiate(Enemy, Vector3.zero, Quaternion.identity);
    enemy.SetActive(false);
    enemy.transform.SetParent(SpawnParent.transform);
    pooledEnemies.Add(enemy);
  }

  initialCount = GameManager.instance.settings.initialEnemyCount;
  spawnTime = GameManager.instance.settings.enemySpawnTime;
  spawnAcceleration = GameManager.instance.settings.enemySpawnAcceleration;
  for (var j : int = 0; j < initialCount; j++) {
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
    spawnTime -= spawnTime > Time.deltaTime ? spawnAcceleration * 0.0167f : 0f;
  }
}

// ----------------------------------------------------------------------------- SPAWN METHODS
function getPooledEnemy () : GameObject {
  for (var i : int = 0; i < pooledEnemies.Count; i++) {
    if (!pooledEnemies[i].activeInHierarchy) {
      return pooledEnemies[i];
    }
  }

  var newEnemy : GameObject = Instantiate(Enemy, Vector3.zero, Quaternion.identity);
  pooledEnemies.Add(newEnemy);
  newEnemy.transform.SetParent(SpawnParent.transform);
  return newEnemy;
}

function spawnOnScreen () {
  var position : Vector3 = positionUtils.getRandomPositionOnBoard();
  var instance : GameObject = getPooledEnemy();
  instance.transform.position = position;
  instance.SetActive(true);
}

function spawnOffScreen () {
  var position : Vector3 = positionUtils.getRandomPositionOffBoard();
  var instance : GameObject = getPooledEnemy();
  instance.transform.position = position;
  instance.SetActive(true);
}
