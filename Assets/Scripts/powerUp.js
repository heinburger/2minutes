﻿#pragma strict

var GameManager : gameManager;
private var SpriteRenderer : SpriteRenderer;

var lifeTime : float;

private var timeLeft : float;
private var spawnTime : float;
private var timeAlive : float;
private var animating : boolean = false;

// key/door? - princess
// mystery potion - could be any powerup
// shield ?
// enemies carry poison ones****
// snail/spiderweb
// magnet
// poison mushroom
// bomb
// timer
// darkness
// hole
// arrow (direction to apply force to all enemies)

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  SpriteRenderer = GetComponent.<SpriteRenderer>();
}

function OnEnable () {
  spawnTime = GameManager.instance.time;
  timeAlive = 0f;
  animating = false;
}

function Update () {
  timeAlive = GameManager.instance.time - spawnTime;
  timeLeft = lifeTime - timeAlive;
  if (lifeTime) {
    if (lifeTime < timeAlive) {
      gameObject.SetActive(false);
    } else if (timeLeft < 5f && !animating) {
      lowLifeAnimationCoroutine();
    }
  }
}

function kill () {
  gameObject.SetActive(false);
}

// ----------------------------------------------------------------------------- COROUTINES
function lowLifeAnimationCoroutine () {
  animating = true;
  while (gameObject.activeInHierarchy) {
    var flashTime = timeLeft < 2f ? 0.2f : 0.6f;
    yield WaitForSeconds(SpriteRenderer.enabled ? flashTime : 0.2f);
    SpriteRenderer.enabled = !SpriteRenderer.enabled;
  }
}
