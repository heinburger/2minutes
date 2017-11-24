#pragma strict

var GameManager : gameManager;
var AudioManager : audioManager;
var PlayerForcefield : GameObject;
var PlayerCrown : GameObject;
var PlayerInvincibleTrail : GameObject;

var isInvincible : boolean;
var initialInvincibilityTime : float;
var invincibilityTimeLeft : float;
var starPowerUpInvincibilityTime : float;
var shrinkSpeed : float;
var growthSpeed : float;
var heartPowerUpShrinkAmount : float;
var enemyHitGrowthAmount : float;
var forcefieldPowerUpTime : float;

private var scaleTo : Vector3;

private var rb2D : Rigidbody2D;
private var animator : Animator;
private var playerForcefieldScript : playerForcefield;
private var invincibleAudioSource : AudioSource;
private var absorbAudioSource : AudioSource;

// --------------------------------------------------------------------- UNITY METHODS
function Awake () {
	rb2D = GetComponent.<Rigidbody2D>();
	animator = GetComponent.<Animator>();

	playerForcefieldScript = PlayerForcefield.GetComponent.<playerForcefield>();
	var audioSources = GetComponents(AudioSource);
	invincibleAudioSource = audioSources[0] as AudioSource;
	absorbAudioSource = audioSources[1] as AudioSource;
	isInvincible = true;
	setInvincibilityFor(initialInvincibilityTime);
	scaleTo = transform.localScale;
}

function Update () {
	if (GameManager.instance.gameRunning) {
		handleGameOver();
		handlePowers();
		handleScaling();
		handleMovement();
	}
}

function OnTriggerEnter2D (other : Collider2D) {
	if (other.tag == "HeartPowerUp") {
		scaleTo -= scaleTo * heartPowerUpShrinkAmount;
		AudioManager.instance.play("heartPickUp");
		Destroy(other.gameObject);
	}
	if (other.tag == "StarPowerUp") {
		setInvincibilityFor(starPowerUpInvincibilityTime);
		Destroy(other.gameObject);
	}
}

function OnCollisionEnter2D (other : Collision2D) {
	if (other.gameObject.tag == "ForcefieldPowerUp") {
		playerForcefieldScript.activateFor(forcefieldPowerUpTime);
		AudioManager.instance.play("forcefieldPickUp");
		Destroy(other.gameObject);
	}
	if (!isInvincible && other.gameObject.tag == "Enemy") {
		scaleTo += scaleTo * enemyHitGrowthAmount;
		absorbAudioSource.Play();
		Destroy(other.gameObject);
	}
}

// --------------------------------------------------------------------- HANDLER METHODS
function handlePowers () {
	invincibilityTimeLeft = invincibilityTimeLeft <= 0f ? 0f : invincibilityTimeLeft - Time.deltaTime;
	if (invincibilityTimeLeft <= 0f) {
		isInvincible = false;
		animator.SetBool("isInvincible", false);
		invincibleAudioSource.Stop();
		PlayerInvincibleTrail.SetActive(false);
	}
}

function handleMovement () {
	var target : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	var offset : float = GameManager.instance.cursorOffset;
	var shrinkRatio : float = Input.mousePosition.y > 0f
		? (Input.mousePosition.y / Camera.main.orthographicSize) / (offset * 8f)
		: 1f;
	var offsetY : float = shrinkRatio > 1f ? offset : offset * shrinkRatio;
	var newPosition : Vector3 = new Vector3(target.x, target.y + offsetY, 0f);
	if (offset) {
		transform.position = Vector3.MoveTowards(transform.position, newPosition, 50f * Time.deltaTime);
	} else {
		transform.position = newPosition;
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


// --------------------------------------------------------------------- TRIGGER AND FLAG METHODS
function setInvincibilityFor (time : float) {
	if (!isInvincible) {
		invincibleAudioSource.Play();
		PlayerInvincibleTrail.SetActive(true);
	}
	invincibilityTimeLeft += time;
	isInvincible = true;
	animator.SetBool("isInvincible", true);
}
