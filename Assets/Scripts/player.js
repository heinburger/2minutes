#pragma strict

var GameManager : gameManager;

var isInvincible : boolean = true;
var initialInvincibilityTime : int;
var starPowerUpInvincibilityTime : int;

var shrinkSpeed : float;
var growthSpeed : float;
var heartPowerUpShrinkAmount : float;
var enemyHitGrowthAmount : float;

private var scaleTo : Vector3;

private var rb2D : Rigidbody2D;
private var animator : Animator;

// --------------------------------------------------------------------- UNITY METHODS
function Awake () {
	isInvincible = true;
	scaleTo = transform.localScale;
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
}

function OnCollisionEnter2D (other : Collision2D) {
	if (!isInvincible && other.gameObject.tag == "Enemy") {
		scaleTo += scaleTo * enemyHitGrowthAmount;
		other.gameObject.SetActive(false);
		Destroy(other.gameObject);
	}
}

// --------------------------------------------------------------------- HANDLER METHODS
function handleMovement () {
	var target : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	transform.position = new Vector3(target.x, target.y, 0f);
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
