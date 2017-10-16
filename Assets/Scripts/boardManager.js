#pragma strict

var heartPowerUp : GameObject;
var powerUps : Transform;

// spawns
function spawnHeartPowerUp () {
	var toInstantiate : GameObject = heartPowerUp;
	var randPosition : Vector3 = new Vector3(Random.Range(0,5), Random.Range(0,5), 0);
	var instance : GameObject = Instantiate(toInstantiate, randPosition, Quaternion.identity);
	instance.transform.SetParent(powerUps);
}

public function setupBoard () {
	powerUps = new GameObject("PowerUps").transform;
	spawnHeartPowerUp();
}