#pragma strict

var AudioManager : audioManager;
var initialThrust : float;
@Range(0, 25)
var maxVelocity : float;

@HideInInspector
var brakingForce : float;

private var rb2D : Rigidbody2D;
private var bounceAudioSource : AudioSource;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
	rb2D = GetComponent.<Rigidbody2D>();
	bounceAudioSource = GetComponent.<AudioSource>();
	var AudioSources = GetComponents(AudioSource);
	var direction = Vector3(Random.Range(-1.0, 1.0), Random.Range(-1.0, 1.0), 0);
	rb2D.AddForce(direction * initialThrust);
}

function FixedUpdate () {
	rb2D.velocity = Vector2.ClampMagnitude(rb2D.velocity, maxVelocity);
	if (brakingForce > 0f) {
		var direction = -rb2D.velocity.normalized;
		rb2D.AddForce(direction * brakingForce);
		brakingForce = brakingForce - Time.deltaTime < 0f ? 0f : brakingForce - Time.deltaTime;
	}
}

function OnCollisionEnter2D (other : Collision2D) {
	if (other.gameObject.tag == "PlayerForcefield") {
		AudioManager.instance.playThrottledAudio(bounceAudioSource);
	}
}
