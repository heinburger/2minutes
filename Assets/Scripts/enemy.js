#pragma strict

var thrust : float;

private var player : GameObject;
private var playerScript : player;
private var rb2D : Rigidbody2D;
private var animator : Animator;
private var bounceAudioSource : AudioSource;

// --------------------------------------------------------------------- UNITY METHODS
function Awake () {
	player = GameObject.FindGameObjectWithTag("Player");
	if (player) {
		playerScript = player.GetComponent.<player>();
	}

	rb2D = GetComponent.<Rigidbody2D>();
	animator = GetComponent.<Animator>();
	bounceAudioSource = GetComponent.<AudioSource>();
	var AudioSources = GetComponents(AudioSource);
	var direction = Vector3(Random.Range(-1.0, 1.0), Random.Range(-1.0, 1.0), 0);
	rb2D.AddForce(direction * thrust);
}

function Update () {
	if (player) {
		handlePlayerCollisions();
	}
}

function OnCollisionEnter2D (other : Collision2D) {
	if (other.gameObject.tag == "PlayerForcefield") {
		bounceAudioSource.Play();
	}
}

// --------------------------------------------------------------------- ENEMY METHODS
function handlePlayerCollisions () {
	if (playerScript.isInvincible) {
		Physics2D.IgnoreCollision(player.GetComponent.<Collider2D>(), GetComponent.<Collider2D>(), true);
	} else {
		Physics2D.IgnoreCollision(player.GetComponent.<Collider2D>(), GetComponent.<Collider2D>(), false);
	}
}
