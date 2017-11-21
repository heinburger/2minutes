#pragma strict

var Player : GameObject;
var active : boolean = false;
var maxThrust : float = 100f;
var gain : float = 5f;
var adjustVelocity : float = 10f;
var maxVelocity : float = 100f;

private var rb2D : Rigidbody2D;

function Awake () {
  rb2D = GetComponent.<Rigidbody2D>();
  Physics2D.IgnoreCollision(Player.GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
}

function Update () {
  transform.localScale = Player.transform.localScale;
}

function FixedUpdate () {
  var targetPoint : Vector3 = Player.transform.position - transform.position;
  var targetVelocity : Vector3 = Vector3.ClampMagnitude(targetPoint * adjustVelocity, maxVelocity);
  var velocityDifference : Vector3 = targetVelocity - rb2D.velocity;
  var force : Vector3 = Vector3.ClampMagnitude(gain * velocityDifference, maxThrust);
  rb2D.AddForce(force);
}

function activateFor (time : int) {
	// isInvincible = true;
	// animator.SetBool("isInvincible", true);
	// Invoke("clearInvincibility", time);
}
