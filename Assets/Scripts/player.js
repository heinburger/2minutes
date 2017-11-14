#pragma strict

var isInvincible : boolean = true;
var initialInvincibilityTime : int;
var starPowerUpInvincibilityTime : int;
var heartPowerUpShrinkFactor : float;
var enemyHitGrowFactor : float;
var scaleFactorFrameAdjustment : float;

private var scaleFactorPositive : float = 0;
private var scaleFactorNegative : float = 0;

private var rb2D : Rigidbody2D;
private var animator : Animator;

// --------------------------------------------------------------------- UNITY METHODS
function Awake () {
	isInvincible = true;
}

function Start () {
	rb2D = GetComponent.<Rigidbody2D>();
	animator = GetComponent.<Animator>();
	setInvincibilityFor(initialInvincibilityTime);
}

function Update () {
	handleScaling();
	handleMovement();
}

function OnTriggerEnter2D (other : Collider2D) {
	if (other.tag == "HeartPowerUp") {
		scaleFactorNegative += heartPowerUpShrinkFactor;
		Destroy(other.gameObject);
	}
}

function OnCollisionEnter2D (other : Collision2D) {
	if (!isInvincible && other.gameObject.tag == "Enemy") {
		scaleFactorPositive += enemyHitGrowFactor;
		other.gameObject.SetActive(false);
		Destroy(other.gameObject);
	}
}

// --------------------------------------------------------------------- HANDLER METHODS
function handleMovement () {
	rb2D.MovePosition(Camera.main.ScreenToWorldPoint(Input.mousePosition));
}

function handleScaling () {
	if (scaleFactorPositive > 0) {
		scaleFactorPositive -= scaleFactorFrameAdjustment;
	} else {
		scaleFactorPositive = 0;
	}

	if (scaleFactorNegative > 0) {
		scaleFactorNegative -= scaleFactorFrameAdjustment;
	} else {
		scaleFactorNegative = 0;

	}
	var scale : float = scaleFactorPositive - scaleFactorNegative;
	transform.localScale += new Vector3(transform.localScale[0] * scale, transform.localScale[1] * scale, 0);
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
