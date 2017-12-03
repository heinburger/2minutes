#pragma strict

var GameManager : gameManager;
var gold : Sprite;
var silver : Sprite;
var bronze : Sprite;

// ----------------------------------------------------------------------------- UNITY METHODS
function OnEnable () {
  var spriteRenderer = GetComponent.<SpriteRenderer>();
  if (GameManager.instance.gameMode == 'gold') {
    spriteRenderer.sprite = gold;
  } else if (GameManager.instance.gameMode == 'silver') {
    spriteRenderer.sprite = silver;
  } else {
    spriteRenderer.sprite = bronze;
  }
}

function Update () {
  var PlayerForcefield : GameObject = GameObject.FindGameObjectWithTag("PlayerForcefield");
  if (PlayerForcefield) {
    Physics2D.IgnoreCollision(PlayerForcefield.GetComponent.<Collider2D>(), GetComponent.<Collider2D>());
  }
}
