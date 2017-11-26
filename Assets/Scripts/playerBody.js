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

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
	animator = GetComponent.<Animator>();
	absorbAudioSource = GetComponent.<AudioSource>();
	player = Player.GetComponent.<player>();
	var crownRenderer : SpriteRenderer = PlayerCrown.GetComponent.<SpriteRenderer>();
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

function OnTriggerEnter2D (other : Collider2D) {
	if (other.tag == "HeartPowerUp") {
		triggerHeartPickUp();
		Destroy(other.gameObject);
	}
	if (other.tag == "StarPowerUp") {
		triggerStarPickUp();
		Destroy(other.gameObject);
	}
}

function OnCollisionEnter2D (other : Collision2D) {
	if (other.gameObject.tag == "ForcefieldPowerUp") {
		triggerForcefieldPickUp();
		Destroy(other.gameObject);
	}
	if (other.gameObject.tag == "CrownPowerUp") {
		triggerCrownPickUp();
		Destroy(other.gameObject);
	}
	if (!player.isInvincible() && other.gameObject.tag == "Enemy") {
		triggerEnemyHit();
		Destroy(other.gameObject);
	}
}

// ----------------------------------------------------------------------------- TRIGGER METHODS
function triggerEnemyHit () {
	absorbAudioSource.Play();
	player.handleEnemyHit();
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

function triggerCrownPickUp () {
	AudioManager.instance.play("crownClapping");
	PlayerCrown.SetActive(true);
	player.handleCrownPickUp();
}
