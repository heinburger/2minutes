#pragma strict

var Player : GameObject;
var maxThrust : float;
var gain : float;
var adjustVelocity : float;
var maxVelocity : float;

private var rb2D : Rigidbody2D;
private var timeLeft : float = 0f;
private var playerToLarge : boolean;

function Awake () {
  rb2D = GetComponent.<Rigidbody2D>();
  transform.position = Player.transform.position;
}

function Update () {
  transform.localScale = Player.transform.localScale;
  playerToLarge = Player.transform.localScale.x > 30f;
  handleActive();
}

function FixedUpdate () {
  var targetPoint : Vector3 = Player.transform.position - transform.position;
  var targetVelocity : Vector3 = Vector3.ClampMagnitude(targetPoint * adjustVelocity, maxVelocity);
  var velocityDifference : Vector3 = targetVelocity - rb2D.velocity;
  var force : Vector3 = Vector3.ClampMagnitude(gain * velocityDifference, maxThrust);
  rb2D.AddForce(force);
}

function handleActive () {
  timeLeft = timeLeft <= 0f ? 0f : timeLeft - Time.deltaTime;
  if (timeLeft <= 0f || playerToLarge) {
    gameObject.SetActive(false);
  }
}

function activateFor (time : float) {
  if (!playerToLarge) {
    gameObject.SetActive(true);
    Physics2D.IgnoreCollision(Player.GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
    if (timeLeft <= 0f) {
      transform.position = Player.transform.position;
    }
    timeLeft += time;
  }
}
