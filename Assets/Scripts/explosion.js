#pragma strict

var GameManager : gameManager;

var lifeTime : float;
var force : float;
private var timeLeft : float;
private var spawnTime : float;
private var timeAlive : float;

function Start () {
	spawnTime = GameManager.instance.time;
}

function Update () {
	timeAlive = GameManager.instance.time - spawnTime;
	timeLeft = lifeTime - timeAlive;
	if (timeLeft < 0f) {
		Destroy(gameObject);
	}
}

function OnCollisionEnter2D (other : Collision2D) {
	if (other.gameObject.tag != "EnemyBoundry") {
		var rb : Rigidbody2D = other.gameObject.GetComponent.<Rigidbody2D>();
		var adjustedForce : float = Vector3.Distance(other.gameObject.transform.position, transform.position) * force;
		rb.AddForce(other.contacts[0].normal * adjustedForce);
	}
}
