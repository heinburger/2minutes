#pragma strict

var AudioManager : audioManager;
var GameManager : gameManager;
var EnemyFlameTrail : GameObject;

var initialThrustBronze : float;
var initialThrustSilverGold : float;
@Range(0, 25)
var maxVelocity : float;
var burnTime : float;

@HideInInspector
var brakingForce : float;

private var ps : ParticleSystem;
private var Player : GameObject;
private var rb2D : Rigidbody2D;
private var bounceAudioSource : AudioSource;
private var initialForce : Vector3;
private var homingForceMultiplier : float;
private var scaleMultiplier : float;
private var burnTimeLeft : float;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  Player = GameObject.FindGameObjectWithTag("Player");
  rb2D = GetComponent.<Rigidbody2D>();
  bounceAudioSource = GetComponent.<AudioSource>();
  ps = EnemyFlameTrail.gameObject.GetComponent.<ParticleSystem>();
  var AudioSources = GetComponents(AudioSource);

  handleGameModes();

  transform.localScale = transform.localScale * scaleMultiplier;
  ps.main.startSizeMultiplier = ps.main.startSizeMultiplier * scaleMultiplier;
  rb2D.mass = rb2D.mass * scaleMultiplier * scaleMultiplier;

  rb2D.AddForce(initialForce, ForceMode2D.Impulse);
}

function Update () {
  burnTimeLeft = burnTimeLeft <= 0f ? 0f : burnTimeLeft - Time.deltaTime;
  if (burnTimeLeft <= 0f) {
    ps.Stop();
  }
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
  if (other.gameObject.tag == "Explosion") {
    burnTimeLeft = burnTime;
    ps.Play();
  }
}

function handleGameModes () {
  var direction : Vector3 = Vector3(Random.Range(-1.0, 1.0), Random.Range(-1.0, 1.0), 0);
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
    initialForce = direction * initialThrustSilverGold;
  } else {
    scaleMultiplier = 1f;
    initialForce = direction * initialThrustBronze;
  }
}
