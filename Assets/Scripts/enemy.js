#pragma strict

var AudioManager : audioManager;
var thrust : float;

private var rb2D : Rigidbody2D;
private var bounceAudioSource : AudioSource;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
	rb2D = GetComponent.<Rigidbody2D>();
	bounceAudioSource = GetComponent.<AudioSource>();
	var AudioSources = GetComponents(AudioSource);
	var direction = Vector3(Random.Range(-1.0, 1.0), Random.Range(-1.0, 1.0), 0);
	rb2D.AddForce(direction * thrust);
}

function OnCollisionEnter2D (other : Collision2D) {
	if (other.gameObject.tag == "PlayerForcefield") {
		AudioManager.instance.playThrottledAudio(bounceAudioSource);
	}
}
