#pragma strict

var GameManager : gameManager;
var AudioManager : audioManager;
var Player : GameObject;
var PlayerCrown : GameObject;
var PlayerInvincibleTrail : GameObject;
var PlayerForcefield : GameObject;
var gold : Sprite;
var silver : Sprite;
var bronze : Sprite;

private var player : player;
private var animator : Animator;
private var absorbAudioSource : AudioSource;
private var crownRenderer : SpriteRenderer;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  animator = GetComponent.<Animator>();
  absorbAudioSource = GetComponent.<AudioSource>();
  player = Player.GetComponent.<player>();
  crownRenderer = PlayerCrown.GetComponent.<SpriteRenderer>();
}

function Start () {
  if (GameManager.instance.gameMode == 'gold') {
    crownRenderer.sprite = gold;
  } else if (GameManager.instance.gameMode == 'silver') {
    crownRenderer.sprite = silver;
  } else {
    crownRenderer.sprite = bronze;
  }
}

function Update () {
  if (!player.isInvincible()) {
    animator.SetBool("isInvincible", false);
    PlayerInvincibleTrail.SetActive(false);
  }

  if (!player.hasForcefield()) {
    PlayerForcefield.SetActive(false);
  }
}

function OnCollisionEnter2D (other : Collision2D) {
  if (other.gameObject.tag == "Enemy") {
    if (!player.isInvincible()) {
      triggerEnemyHit(other.gameObject.transform.localScale.x);
    } else {
      AudioManager.instance.play("invincibleDestroy");
    }
    Destroy(other.gameObject);
  }
  else if (other.gameObject.tag == "HeartPowerUp") {
    triggerHeartPickUp();
    Destroy(other.gameObject);
  }
  else if (other.gameObject.tag == "ForcefieldPowerUp") {
    triggerForcefieldPickUp();
    Destroy(other.gameObject);
  }
  else if (other.gameObject.tag == "StarPowerUp") {
    triggerStarPickUp();
    Destroy(other.gameObject);
  }
  else if (other.gameObject.tag == "TurtlePowerUp") {
    triggerTurtlePickUp();
    Destroy(other.gameObject);
  }
  else if (other.gameObject.tag == "CrownPowerUp") {
    triggerCrownPickUp();
    Destroy(other.gameObject);
  }
  else if (other.gameObject.tag == "Bomb") {
    if (player.isInvincible()) {
      AudioManager.instance.play("invincibleDestroy");
      Destroy(other.gameObject);
    }
  }
}

// ----------------------------------------------------------------------------- TRIGGER METHODS
function triggerEnemyHit (difficultyScale : float) {
  absorbAudioSource.Play();
  player.handleEnemyHit(difficultyScale);
}

function triggerHeartPickUp () {
  AudioManager.instance.play("heartPickUp");
  player.handleHeartPickUp();
}

function triggerStarPickUp () {
  PlayerInvincibleTrail.SetActive(true);
  animator.SetBool("isInvincible", true);
  player.handleStarPickUp();
}

function triggerForcefieldPickUp () {
  AudioManager.instance.play("forcefieldPickUp");
  PlayerForcefield.SetActive(true);
  player.handleForcefieldPickUp();
}

function triggerTurtlePickUp () {
  AudioManager.instance.play("turtlePickUp");
  player.handleTurtlePickUp();
}

function triggerCrownPickUp () {
  AudioManager.instance.play("crownClapping");
  PlayerCrown.SetActive(true);
  player.handleCrownPickUp();
}
