#pragma strict

var GameManager : gameManager;

private var rb2D : Rigidbody2D;
private var moveTo : Vector3;
private var moveFrom : Vector3;
private var appliedMovementForce : Vector3;
private var clickTimer : float;

// ----------------------------------------------------------------------------- UNITY METHODS
function Awake () {
	rb2D = GetComponent.<Rigidbody2D>();
}

function Update () {
	moveTo = GameManager.instance.isMobile
		? getMousePosition() // FIXME NOW
		: getMousePosition();
}

function FixedUpdate () {
	rb2D.MovePosition(moveTo);
}

// ----------------------------------------------------------------------------- POSITION METHODS
function getMousePosition () : Vector3 {
	var target : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	return new Vector3(target.x, target.y, 0f);
}
// function handleMovementMobile () {
// 	var target : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
// 	if (Input.GetMouseButton(0)) {
// 		clickTimer += Time.deltaTime;
// 		moveTo = new Vector3(target.x, target.y, 0f);
// 	}
// 	if (Input.GetMouseButtonUp(0)) {
// 		clickTimer = 0f;
// 	}
// 	if (clickTimer > 0.2f) {
// 		// takes 1 second
// 		var percent = (clickTimer - 0.2f) < 1f ? clickTimer - 0.2f : 1f;
// 		var offset : float = 1.5f * percent;
// 		var shrinkRatio : float = Input.mousePosition.y > 0f
// 			? (Input.mousePosition.y / Camera.main.orthographicSize) / (offset * 8f)
// 			: 1f;
// 		var offsetY : float = shrinkRatio > 1f ? offset : offset * shrinkRatio;
// 		moveTo = new Vector3(target.x, target.y + offsetY, 0f);
// 	}
// }
