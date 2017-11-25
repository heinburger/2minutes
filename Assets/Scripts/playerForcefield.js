#pragma strict

var Player : GameObject;

private var rb2D : Rigidbody2D;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  rb2D = GetComponent.<Rigidbody2D>();
  Physics2D.IgnoreCollision(Player.GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
  transform.position = Player.transform.position;
}
