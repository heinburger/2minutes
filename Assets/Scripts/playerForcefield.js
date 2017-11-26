#pragma strict

var AudioManager : audioManager;
var PlayerBody : GameObject;

private var rb2D : Rigidbody2D;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  rb2D = GetComponent.<Rigidbody2D>();
  Physics2D.IgnoreLayerCollision(9, 10);
}

function OnEnable () {
  Physics2D.IgnoreCollision(PlayerBody.GetComponent.<Collider2D>(),  GetComponent.<Collider2D>());
  transform.position = PlayerBody.transform.position;
}

function FixedUpdate () {
  rb2D.MovePosition(PlayerBody.transform.position);
}

function OnCollisionEnter2D (other : Collision2D) {
	if (other.gameObject.tag == "Explosion") {
    AudioManager.instance.play("forcefieldBreak");
		gameObject.SetActive(false);
	}
}
