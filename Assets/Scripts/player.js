#pragma strict

var GameManager : gameManager;
var AudioManager : audioManager;
var PlayerCrown : GameObject;
var PlayerInvincibleTrail : GameObject;
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
private var moveTo : Vector3;
private var clickTimer : float;

private var rb2D : Rigidbody2D;
private var animator : Animator;
private var invincibleAudioSource : AudioSource;
private var absorbAudioSource : AudioSource;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
	rb2D = GetComponent.<Rigidbody2D>();
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
		if (GameManager.instance.isMobile) {
			handleMovementMobile();
		} else {
			handleMovement();
		}
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
}

function handleMovementMobile () {
	var target : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	if (Input.GetMouseButton(0)) {
		clickTimer += Time.deltaTime;
		moveTo = new Vector3(target.x, target.y, 0f);
	}
	if (Input.GetMouseButtonUp(0)) {
		clickTimer = 0f;
	}
	if (clickTimer > 0.2f) {
		// takes 1 second
		var percent = (clickTimer - 0.2f) < 1f ? clickTimer - 0.2f : 1f;
		var offset : float = 1.5f * percent;
		var shrinkRatio : float = Input.mousePosition.y > 0f
			? (Input.mousePosition.y / Camera.main.orthographicSize) / (offset * 8f)
			: 1f;
		var offsetY : float = shrinkRatio > 1f ? offset : offset * shrinkRatio;
		moveTo = new Vector3(target.x, target.y + offsetY, 0f);
	}
	transform.position = Vector3.MoveTowards(transform.position, moveTo, 50f * Time.deltaTime);
}

function handleMovement () {
	var target : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	var newPosition : Vector3 = new Vector3(target.x, target.y, 0f);
	transform.position = newPosition;
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
	if (!invincibleAudioSource.isPlaying) {
		invincibleAudioSource.Play();
	}
	invincibilityTimeLeft += starPowerUpInvincibilityTime;
	animator.SetBool("isInvincible", true);
}

function triggerForcefield () {
	//forcefieldPowerUpTime
	AudioManager.instance.play("forcefieldPickUp");
}

function triggerCrown () {
	AudioManager.instance.play("crownClapping");
	PlayerCrown.SetActive(true);
}

// ----------------------------------------------------------------------------- STATUS METHODS
function isInvincible () : boolean {
	return invincibilityTimeLeft > 0f;
}
