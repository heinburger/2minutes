#pragma strict

var GameManager : gameManager;
var AudioManager : audioManager;
var PlayerInvincibleTrail : GameObject;

var initialInvincibilityTime : float;
var starPowerUpInvincibilityTime : float;
var forcefieldPowerUpTime : float;
var turtleBrakingForce : float;
var shrinkSpeed : float;
var growthSpeed : float;
var heartPowerUpShrinkAmount : float;
var enemyHitGrowthAmount : float;

private var ps : ParticleSystem;
private var invincibilityTimeLeft : float;
private var forcefieldTimeLeft : float;
private var scaleTo : Vector3;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
	invincibilityTimeLeft = initialInvincibilityTime; // allow for adjustments when game starts
	scaleTo = transform.localScale;
	ps = PlayerInvincibleTrail.gameObject.GetComponent.<ParticleSystem>();
}

function Update () {
	if (GameManager.instance.gameRunning) {
		handleGameOver();
		handleTimers();
		handleScaling();
	}
}

// ----------------------------------------------------------------------------- HANDLER METHODS
function handleGameOver () {
	if (transform.localScale.x > 50f) {
		AudioManager.instance.stopAll();
		GameManager.instance.isGameOver = true;
	}
}

function handleTimers () {
	invincibilityTimeLeft = invincibilityTimeLeft <= 0f ? 0f : invincibilityTimeLeft - Time.deltaTime;
	forcefieldTimeLeft = forcefieldTimeLeft <= 0f ? 0f : forcefieldTimeLeft - Time.deltaTime;
}

function handleScaling () {
	var padding : float = 0.1;
	var magnitude : float = scaleTo.x - transform.localScale.x;
	var factor : float = magnitude > 20f ? 20f : magnitude;
	if (magnitude > (0f + padding)) { // grow
		transform.localScale += transform.localScale * factor * growthSpeed * Time.deltaTime;
	} else if (magnitude < (0f - padding)) { // shrink
		transform.localScale += transform.localScale * factor * shrinkSpeed * Time.deltaTime;
	}
	ps.main.startSizeMultiplier = transform.localScale.x / 2f;
	ps.main.startSpeedMultiplier = transform.localScale.x;
}

function handleEnemyHit () {
	scaleTo += scaleTo * enemyHitGrowthAmount;
}

function handleCrownPickUp () {
	GameManager.instance.unlockGameMode();
}

function handleHeartPickUp () {
	scaleTo -= scaleTo * heartPowerUpShrinkAmount;
}

function handleStarPickUp () {
	invincibilityTimeLeft += starPowerUpInvincibilityTime;
}

function handleTurtlePickUp () {
	var Enemies : GameObject[] = GameObject.FindGameObjectsWithTag("Enemy");
	for (var Enemy : GameObject in Enemies) {
		Enemy.gameObject.GetComponent.<enemy>().brakingForce += turtleBrakingForce;
	}
}

function handleForcefieldPickUp () {
	forcefieldTimeLeft += forcefieldPowerUpTime;
}

// ----------------------------------------------------------------------------- STATUS METHODS
function isInvincible () : boolean {
	return invincibilityTimeLeft > 0f && GameManager.instance.time > initialInvincibilityTime;
}

function hasForcefield () : boolean {
	return forcefieldTimeLeft > 0f;
}
