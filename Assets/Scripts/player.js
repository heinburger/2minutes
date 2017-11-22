#pragma strict

var GameManager : gameManager;
var PlayerForcefield : GameObject;

var isInvincible : boolean = true;
var initialInvincibilityTime : int;
var starPowerUpInvincibilityTime : int;
var shrinkSpeed : float;
var growthSpeed : float;
var heartPowerUpShrinkAmount : float;
var enemyHitGrowthAmount : float;
var forcefieldPowerUpTime : float;

private var scaleTo : Vector3;

private var rb2D : Rigidbody2D;
private var animator : Animator;
private var playerForcefieldScript : playerForcefield;

// --------------------------------------------------------------------- UNITY METHODS
function Awake () {
	isInvincible = true;
	scaleTo = transform.localScale;
	playerForcefieldScript = PlayerForcefield.GetComponent.<playerForcefield>();
}

function Start () {
	rb2D = GetComponent.<Rigidbody2D>();
	animator = GetComponent.<Animator>();
	setInvincibilityFor(initialInvincibilityTime);
}

function Update () {
	if (GameManager.instance.gameRunning) {
		handleGameOver();
		handleScaling();
		handleMovement();
	}
}

function OnTriggerEnter2D (other : Collider2D) {
	if (other.tag == "HeartPowerUp") {
		scaleTo -= scaleTo * heartPowerUpShrinkAmount;
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
		Destroy(other.gameObject);
	}
	if (!isInvincible && other.gameObject.tag == "Enemy") {
		scaleTo += scaleTo * enemyHitGrowthAmount;
		other.gameObject.SetActive(false);
		Destroy(other.gameObject);
	}
}

// --------------------------------------------------------------------- HANDLER METHODS
function handleMovement () {
	var target : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	var offset : float = GameManager.instance.cursorOffset;
	var shrinkRatio : float = Input.mousePosition.y > 0f
		? (Input.mousePosition.y / Camera.main.orthographicSize) / (offset * 4f)
		: 1f;
	var offsetY : float = shrinkRatio > 1f ? offset : offset * shrinkRatio;
	var newPosition : Vector3 = new Vector3(target.x, target.y + offsetY, 0f);
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


// --------------------------------------------------------------------- TRIGGER AND FLAG METHODS
function setInvincibilityFor (time : int) {
	isInvincible = true;
	animator.SetBool("isInvincible", true);
	Invoke("clearInvincibility", time);
}

function clearInvincibility () {
	isInvincible = false;
	animator.SetBool("isInvincible", false);
}
