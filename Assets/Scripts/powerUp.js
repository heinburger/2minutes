#pragma strict

var GameManager : gameManager;
var AudioManager : audioManager;
private var SpriteRenderer : SpriteRenderer;

var lifeTime : float;
var pickUpSound : String;

private var timeLeft : float;
private var spawnTime : float;
private var timeAlive : float;
private var animating : boolean = false;

// key/door? - princess
// mystery potion - could be any powerup
// shield ?
// enemies carry poison ones****
// snail/spiderweb
// magnet
// poison mushroom
// bomb
// timer
// darkness
// hole
// arrow (direction to apply force to all enemies)

function Awake () {
	spawnTime = GameManager.instance.time;
	SpriteRenderer = GetComponent.<SpriteRenderer>();
}

function Update () {
	timeAlive = GameManager.instance.time - spawnTime;
	timeLeft = lifeTime - timeAlive;
	if (lifeTime) {
		if (lifeTime < timeAlive) {
			Destroy(gameObject);
		} else if (timeLeft < 5f && !animating) {
			lowLifeAnimationCoroutine();
		}
	}
}

function pickUp () {
	AudioManager.instance.play(pickUpSound);
	Destroy(gameObject);
}

function lowLifeAnimationCoroutine () {
	animating = true;
	while (gameObject.activeInHierarchy) {
		var flashTime = timeLeft < 2f ? 0.2f : 0.6f;
		yield WaitForSeconds(SpriteRenderer.enabled ? flashTime : 0.2f);
		SpriteRenderer.enabled = !SpriteRenderer.enabled;
	}
}
