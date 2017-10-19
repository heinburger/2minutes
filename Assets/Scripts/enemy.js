#pragma strict

var rb2D : Rigidbody2D;
var animator : Animator;
var speedX : float;
var speedY : float;
private var player : GameObject;
private var playerScript : player;

function Start () {
	player = GameObject.FindGameObjectWithTag("Player");
	playerScript = player.GetComponent.<player>();
	rb2D = GetComponent.<Rigidbody2D>();
	animator = GetComponent.<Animator>();
	rb2D.velocity = new Vector2(Random.Range(-1.0, 1.0) * speedX, Random.Range(-1.0, 1.0) * speedY);
	Physics2D.IgnoreCollision(GameObject.Find("PlayerBoundry").GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
}

function Update () {
	if (playerScript.isInvincible) {
		Physics2D.IgnoreCollision(player.GetComponent.<Collider2D>(), GetComponent.<Collider2D>(), true);
	} else {
		Physics2D.IgnoreCollision(player.GetComponent.<Collider2D>(), GetComponent.<Collider2D>(), false);
	}
}