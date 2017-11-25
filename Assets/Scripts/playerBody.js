#pragma strict

var GameManager : gameManager;
var AudioManager : audioManager;
var PlayerCrown : GameObject;
var PlayerInvincibleTrail : GameObject;
var PlayerTarget : GameObject;
var PlayerForcefield : GameObject;

var starPowerUpInvincibilityTime : float;
var forcefieldPowerUpTime : float;
var shrinkSpeed : float;
var growthSpeed : float;
var heartPowerUpShrinkAmount : float;
var enemyHitGrowthAmount : float;

private var invincibilityTimeLeft : float;
private var forcefieldTimeLeft : float;
private var scaleTo : Vector3;

private var animator : Animator;
private var invincibleAudioSource : AudioSource;
private var absorbAudioSource : AudioSource;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
	animator = GetComponent.<Animator>();
	var audioSources = GetComponents(AudioSource);
	invincibleAudioSource = audioSources[0] as AudioSource;
	absorbAudioSource = audioSources[1] as AudioSource;

	invincibilityTimeLeft = 1f; // allow for adjustments when game starts
	scaleTo = transform.localScale;
}

function Update () {
	if (GameManager.instance.gameRunning) {
		handleGameOver();
		handlePowers();
		handleScaling();
	}
}

function OnTriggerEnter2D (other : Collider2D) {
	if (other.tag == "HeartPowerUp") {
		triggerHeart();
		Destroy(other.gameObject);
	}
	if (other.tag == "StarPowerUp") {
		triggerInvincibility();
		Destroy(other.gameObject);
	}
}

function OnCollisionEnter2D (other : Collision2D) {
	if (other.gameObject.tag == "ForcefieldPowerUp") {
		triggerForcefield();
		Destroy(other.gameObject);
	}
	if (other.gameObject.tag == "CrownPowerUp") {
		triggerCrown();
		Destroy(other.gameObject);
	}
	if (!isInvincible() && other.gameObject.tag == "Enemy") {
		triggerEnemyHit();
		Destroy(other.gameObject);
	}
}

// ----------------------------------------------------------------------------- HANDLER METHODS
function handlePowers () {
	invincibilityTimeLeft = invincibilityTimeLeft <= 0f ? 0f : invincibilityTimeLeft - Time.deltaTime;
	if (invincibilityTimeLeft <= 0f) {
		animator.SetBool("isInvincible", false);
		invincibleAudioSource.Stop();
		PlayerInvincibleTrail.SetActive(false);
	}
	forcefieldTimeLeft = forcefieldTimeLeft <= 0f ? 0f : forcefieldTimeLeft - Time.deltaTime;
	if (forcefieldTimeLeft <= 0f) {
		PlayerForcefield.SetActive(false);
	}
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
}

function handleGameOver () {
	if (transform.localScale.x > 50f) {
		GameManager.instance.isGameOver = true;
	}
}


// ----------------------------------------------------------------------------- TRIGGER AND FLAG METHODS
function triggerEnemyHit () {
	absorbAudioSource.Play();
	scaleTo += scaleTo * enemyHitGrowthAmount;
}

function triggerHeart () {
	AudioManager.instance.play("heartPickUp");
	scaleTo -= scaleTo * heartPowerUpShrinkAmount;
}

function triggerInvincibility () {
	AudioManager.instance.play("starPickUp");
	PlayerInvincibleTrail.SetActive(true);
	animator.SetBool("isInvincible", true);
	if (!invincibleAudioSource.isPlaying) {
		invincibleAudioSource.Play();
	}
	invincibilityTimeLeft += starPowerUpInvincibilityTime;
}

function triggerForcefield () {
	AudioManager.instance.play("forcefieldPickUp");
	PlayerForcefield.SetActive(true);
	forcefieldTimeLeft += forcefieldPowerUpTime;
}

function triggerCrown () {
	AudioManager.instance.play("crownClapping");
	PlayerCrown.SetActive(true);
}

// ----------------------------------------------------------------------------- STATUS METHODS
function isInvincible () : boolean {
	return invincibilityTimeLeft > 0f;
}
