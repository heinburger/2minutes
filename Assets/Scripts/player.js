#pragma strict

var rb2D : Rigidbody2D;
var animator : Animator;

var isInvincible : boolean;
var initialInvincibilityTime : int;
var starPowerUpInvincibilityTime : int;

var heartPowerUpShrinkRatio : float;
var enemyHitGrowRatio : float;

function Start () {
	rb2D = GetComponent.<Rigidbody2D>();
	animator = GetComponent.<Animator>();
	setInvincibilityFor(initialInvincibilityTime);

}

function Update () {
	rb2D.MovePosition(Camera.main.ScreenToWorldPoint(Input.mousePosition));
}

function OnTriggerEnter2D (other : Collider2D) {
	if (other.tag == "HeartPowerUp") {
		shrinkBy(heartPowerUpShrinkRatio);
		Destroy(other.gameObject);
	}
}

function OnCollisionEnter2D (other : Collision2D) {
	if (other.gameObject.tag == "Enemy") {
		if (!isInvincible) {
			growBy(enemyHitGrowRatio);
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

function setInvincibilityFor (time : int) {
	isInvincible = true;
	animator.SetBool("isInvincible", true);
	Invoke("clearInvincibility", time);
}

function clearInvincibility () {
	isInvincible = false;
	animator.SetBool("isInvincible", false);
}

function growBy (amount : float) {
	transform.localScale += new Vector3(transform.localScale[0] * amount, transform.localScale[1] * amount, 0);
}

function shrinkBy (amount : float) {
	transform.localScale -= new Vector3(transform.localScale[0] * amount, transform.localScale[1] * amount, 0);
}
