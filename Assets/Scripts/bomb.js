#pragma strict

var GameManager : gameManager;
var Explosion : GameObject;

var lifeTimeMin : float;
var lifeTimeMax : float;

private var lifeTime : float;
private var timeLeft : float;
private var spawnTime : float;
private var timeAlive : float;

// ----------------------------------------------------------------------------- UNITY METHODS
function OnEnable () {
  spawnTime = GameManager.instance.time;
  lifeTime = Random.Range(lifeTimeMin, lifeTimeMax);
  timeAlive = 0f;
}

function Update () {
  timeAlive = GameManager.instance.time - spawnTime;
  timeLeft = lifeTime - timeAlive;
  if (timeLeft < 0f) {
    Instantiate(Explosion, transform.position, Quaternion.identity);
    gameObject.SetActive(false);
  }
}
