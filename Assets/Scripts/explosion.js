#pragma strict

var GameManager : gameManager;
var ExplosionResidue : GameObject;

var lifeTime : float;
var force : float;
var maxRadius : float;

private var circleCollider : CircleCollider2D;
private var audioSource : AudioSource;
private var scale : float;
private var timeLeft : float;
private var spawnTime : float;
private var timeAlive : float;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
  scale = Random.Range(0.75f, 3f);
  circleCollider = GetComponent.<CircleCollider2D>();
  audioSource = GetComponent.<AudioSource>();
  timeLeft = lifeTime;
  transform.localScale = transform.localScale * scale;
  audioSource.volume = audioSource.volume * scale;
}

function Start () {
  audioSource.Play();
  createResidue();
  createResidue();
  createResidue();
  spawnTime = GameManager.instance.time;
}

function Update () {
  timeAlive = GameManager.instance.time - spawnTime;
  timeLeft = timeLeft <= 0f ? 0f : lifeTime - timeAlive;
  shakeCamera();
  if (timeLeft == 0f) {
    Destroy(gameObject);
  }
  if (circleCollider.radius < maxRadius) {
    circleCollider.radius += Time.deltaTime * maxRadius * 5f;
  }
}

function OnCollisionEnter2D (other : Collision2D) {
  if (other.gameObject.tag != "EnemyBoundary") {
    var rb : Rigidbody2D = other.gameObject.GetComponent.<Rigidbody2D>();
    var distance = Vector3.Distance(other.gameObject.transform.position, transform.position);
    var adjustedForce : float = (1f / distance) * force * scale;
    rb.AddForce(other.contacts[0].normal * adjustedForce * rb.mass, ForceMode2D.Impulse);
  }
}

function shakeCamera () {
  var random : Vector2 = Random.insideUnitCircle;
  Camera.main.transform.position = new Vector3(
    (Camera.main.transform.position.x + random.x * scale) * timeLeft,
    (Camera.main.transform.position.y + random.y * scale) * timeLeft,
    Camera.main.transform.position.z
  );
}

function createResidue () {
  var residue = Instantiate(ExplosionResidue, transform.position, Quaternion.identity);
  residue.transform.Rotate(new Vector3(Random.Range(0f, 30f), Random.Range(0f, 30f), Random.Range(0f, 360f)));
  residue.transform.localScale = residue.transform.localScale * scale * Random.Range(0.33f, 1f);
}
