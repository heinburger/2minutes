#pragma strict

var AudioManager : audioManager;
var GameManager : gameManager;

var initialThrust : float;
@Range(0, 25)
var maxVelocity : float;

@HideInInspector
var brakingForce : float;

private var Player : GameObject;
private var rb2D : Rigidbody2D;
private var bounceAudioSource : AudioSource;
private var homingForceMultiplier : float;
private var scaleMultiplier : float;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  Player = GameObject.FindGameObjectWithTag("Player");
  rb2D = GetComponent.<Rigidbody2D>();
  bounceAudioSource = GetComponent.<AudioSource>();
  var AudioSources = GetComponents(AudioSource);

  handleGameModes();

  transform.localScale = transform.localScale * scaleMultiplier;
  // rb2D.mass = rb2D.mass * scaleMultiplier;

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

  if (homingForceMultiplier > 0f && Player) {
    var homingForceDirection = Player.transform.position - transform.position;
    rb2D.AddForce(homingForceDirection / homingForceDirection.magnitude * homingForceMultiplier);
  }
}

function OnCollisionEnter2D (other : Collision2D) {
  if (other.gameObject.tag == "PlayerForcefield") {
    AudioManager.instance.playThrottledAudio(bounceAudioSource);
  }
}

function handleGameModes () {
  if (GameManager.instance.gameMode == "gold") {
    homingForceMultiplier = Random.value > .9f ? 20f : 0f;
    if (homingForceMultiplier > 0f) {
      GetComponent.<SpriteRenderer>().color = Color.HSVToRGB(0.85f, 1f, 1f);
    }
  } else {
    homingForceMultiplier = 0f;
  }

  if (GameManager.instance.gameMode == "silver" || GameManager.instance.gameMode == "gold") {
    scaleMultiplier = Random.Range(1f, 4f);
  } else {
    scaleMultiplier = 1f;
  }
}
