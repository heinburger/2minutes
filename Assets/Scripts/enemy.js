#pragma strict

var rb2D : Rigidbody2D;
var animator : Animator;
var speed : float;

function Start () {
	rb2D = GetComponent.<Rigidbody2D>();
	animator = GetComponent.<Animator>();
	rb2D.velocity = new Vector2(Random.value * speed, Random.value * speed);
	Physics2D.IgnoreCollision(GameObject.Find("PlayerBoundry").GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
}

function Update () {
	
}

//
//
//
//
//
// custom stuff
