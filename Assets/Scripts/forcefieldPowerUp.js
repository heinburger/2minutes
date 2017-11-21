#pragma strict

function Update () {
	var PlayerForcefield : GameObject = GameObject.FindGameObjectWithTag("PlayerForcefield");
	if (PlayerForcefield) {
		Physics2D.IgnoreCollision(PlayerForcefield.GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
	}
}
