#pragma strict

var AudioManager : audioManager;
var Player : GameObject;
var PlayerBody : GameObject;

private var player : player;
private var rb2D : Rigidbody2D;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  player = Player.GetComponent.<player>();
  rb2D = GetComponent.<Rigidbody2D>();
  Physics2D.IgnoreLayerCollision(9, 10);
}

function OnEnable () {
  Physics2D.IgnoreCollision(PlayerBody.GetComponent.<Collider2D>(),  GetComponent.<Collider2D>());
  transform.position = PlayerBody.transform.position;
}

function Update () {
  if (Player.transform.localScale.x > 10f) {
    AudioManager.instance.play("forcefieldBreak");
    gameObject.SetActive(false);
  }
}

function FixedUpdate () {
  rb2D.MovePosition(PlayerBody.transform.position);
}

function OnCollisionEnter2D (other : Collision2D) {
  if (other.gameObject.tag == "Explosion") {
    AudioManager.instance.play("forcefieldBreak");
    gameObject.SetActive(false);
  } else if ((other.gameObject.tag == "Enemy") && player.isInvincible()) {
    AudioManager.instance.play("invincibleDestroy");
    other.gameObject.SetActive(false);
  }
}
