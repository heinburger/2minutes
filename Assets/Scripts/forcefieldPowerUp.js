#pragma strict

function Awake () {
	var PlayerForcefield : GameObject = GameObject.FindGameObjectWithTag("PlayerForcefield");
	Physics2D.IgnoreCollision(PlayerForcefield.GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
}
