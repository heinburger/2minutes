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
function Start () {
  spawnTime = GameManager.instance.time;
  lifeTime = Random.Range(lifeTimeMin, lifeTimeMax);
}

function Update () {
  timeAlive = GameManager.instance.time - spawnTime;
  timeLeft = lifeTime - timeAlive;
  if (timeLeft < 0f) {
    Instantiate(Explosion, transform.position, Quaternion.identity);
    Destroy(gameObject);
  }
}
