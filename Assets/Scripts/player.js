#pragma strict

var rb2D : Rigidbody2D;
var animator : Animator;

var initialInvincibilityTime : int;
var isInvincible : boolean;
var hitScaleRatio : float;

function Start () {
	rb2D = GetComponent.<Rigidbody2D>();
	animator = GetComponent.<Animator>();

	setInvincibility();
	Invoke("clearInvincibility", initialInvincibilityTime);
}

function Update () {
	rb2D.MovePosition(Camera.main.ScreenToWorldPoint(Input.mousePosition));
}

function OnTriggerEnter2D (other : Collider2D) {
	if (other.tag == "HeartPowerUp") {
		shrink();
		Destroy(other.gameObject);
	}
}

function OnCollisionEnter2D (other : Collision2D) {
	if (other.gameObject.tag == "Enemy") {
		if (!isInvincible) {
			grow();
			Destroy(other.gameObject);
		} else {
			Physics2D.IgnoreCollision(other.gameObject.GetComponent.<Collider2D>(), GetComponent.<Collider2D>(), true);
		}
	}
}

function OnCollisionExit2D (other : Collision2D) {
	if (other.gameObject.tag == "Enemy") {
		Physics2D.IgnoreCollision(other.gameObject.GetComponent.<Collider2D>(), GetComponent.<Collider2D>(), false);
	}
}
//
//
//
//
//
// custom stuff

function setInvincibility () {
	isInvincible = true;
	animator.SetBool("isInvincible", true);
}

function clearInvincibility () {
	isInvincible = false;
	animator.SetBool("isInvincible", false);
}

function grow () {
	transform.localScale += new Vector3(transform.localScale[0] * hitScaleRatio, transform.localScale[1] * hitScaleRatio, 0);
}

function shrink () {
	transform.localScale -= new Vector3(transform.localScale[0] * hitScaleRatio, transform.localScale[1] * hitScaleRatio, 0);
}
