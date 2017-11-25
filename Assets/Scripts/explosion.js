#pragma strict

var GameManager : gameManager;

var lifeTime : float;
var force : float;
var maxRadius : float;
private var timeLeft : float;
private var spawnTime : float;
private var timeAlive : float;
private var circleCollider : CircleCollider2D;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
	circleCollider = GetComponent.<CircleCollider2D>();
}

function Start () {
	spawnTime = GameManager.instance.time;
}

function Update () {
	timeAlive = GameManager.instance.time - spawnTime;
	timeLeft = lifeTime - timeAlive;
	if (timeLeft < 0f) {
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
		var adjustedForce : float = (1f / distance) * force;
		rb.AddForce(other.contacts[0].normal * adjustedForce);
	}
}
